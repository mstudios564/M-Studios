"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BAR_COUNT = 10;
const IDLE_BARS: number[] = Array(BAR_COUNT).fill(2);

export default function MusicPlayer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const userControlledRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(IDLE_BARS);
  const [color, setColor] = useState("#111111");

  // Build the audio graph once, and only from inside a user gesture
  const ensureGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return null;

    if (!audioContextRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext: typeof window.AudioContext;
        }).webkitAudioContext;

      const context = new Ctx();
      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();

      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;

      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    return audioContextRef.current;
  }, []);

  const startSound = useCallback(async () => {
    const audio = audioRef.current;
    const context = ensureGraph(); // runs synchronously, inside the gesture
    if (!audio || !context) return false;

    try {
      await context.resume();
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      return false;
    }
  }, [ensureGraph]);

  // Start automatically on the visitor's first tap/click/key anywhere
  useEffect(() => {
    const events = ["pointerup", "touchend", "click", "keydown"] as const;
    let busy = false;

    const remove = () =>
      events.forEach((e) =>
        window.removeEventListener(e, onFirstGesture, { capture: true })
      );

    async function onFirstGesture(e: Event) {
      if (userControlledRef.current) {
        remove();
        return;
      }
      // Let the player button handle its own taps
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('[data-sound-player="true"]')) return;
      if (busy) return;

      busy = true;
      const ok = await startSound();
      busy = false;
      if (ok) remove();
    }

    events.forEach((e) =>
      window.addEventListener(e, onFirstGesture, {
        capture: true,
        passive: true,
      })
    );

    // Kept so your existing gate still works until you delete it
    const onGate = () => {
      startSound();
    };
    window.addEventListener("enable-sound", onGate);

    return () => {
      remove();
      window.removeEventListener("enable-sound", onGate);
    };
  }, [startSound]);

  // Animate waveform from the real audio
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setBars(IDLE_BARS);
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
      analyser!.getByteFrequencyData(data);

      setBars(
        Array.from({ length: BAR_COUNT }, (_, i) => {
          const index = Math.floor((i / BAR_COUNT) * data.length);
          return 2 + (data[index] / 255) * 30;
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  // Pick bar colour based on what's underneath the player
  useEffect(() => {
    function updateColor() {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;

      const elements = document.elementsFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      for (const element of elements) {
        if (
          !(element instanceof HTMLElement) ||
          element.closest('[data-sound-player="true"]')
        )
          continue;

        const background = getComputedStyle(element).backgroundColor;

        if (
          background &&
          background !== "rgba(0, 0, 0, 0)" &&
          background !== "transparent"
        ) {
          const rgb = background.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const brightness =
              Number(rgb[0]) * 0.299 +
              Number(rgb[1]) * 0.587 +
              Number(rgb[2]) * 0.114;
            setColor(brightness > 150 ? "#111111" : "#f8f7f3");
            return;
          }
        }
      }

      setColor("#111111");
    }

    window.addEventListener("scroll", updateColor, { passive: true });
    window.addEventListener("resize", updateColor);
    updateColor();

    return () => {
      window.removeEventListener("scroll", updateColor);
      window.removeEventListener("resize", updateColor);
    };
  }, []);

  async function toggleSound() {
    userControlledRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await startSound();
    }
  }

  return (
    <div
      ref={wrapperRef}
      data-sound-player="true"
      className="fixed z-50"
      style={{
        right: "max(1.5rem, env(safe-area-inset-right))",
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <audio ref={audioRef} src="/audio/Expansion.mp3" loop preload="auto" />

      <button
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute sound" : "Play sound"}
        className="flex h-11 w-16 touch-manipulation items-center justify-center"
      >
        <div className="flex h-8 items-center gap-[2px]">
          {bars.map((height, index) => (
            <span
              key={index}
              className="w-[2px] rounded-full transition-[height] duration-75"
              style={{ height: `${height}px`, backgroundColor: color }}
            />
          ))}
        </div>
      </button>
    </div>
  );
}