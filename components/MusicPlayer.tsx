"use client";

import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 10;

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>(
    Array(BAR_COUNT).fill(2)
  );
  const [color, setColor] = useState("#111111");

  // Set up the analyser once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setupAudio = () => {
      if (analyserRef.current) return;

      const AudioContext =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext: typeof window.AudioContext;
        }).webkitAudioContext;

      const context = new AudioContext();

      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();

      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.000035;

      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      sourceRef.current = source;
      analyserRef.current = analyser;
    };

    audio.addEventListener("play", setupAudio);

    return () => {
      audio.removeEventListener("play", setupAudio);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      audioContextRef.current?.close();
    };
  }, []);

  // Animate waveform from actual audio
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      setBars(Array(BAR_COUNT).fill(2));
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
  if (!analyser) return;

  analyser.getByteFrequencyData(data);

      const nextBars = Array.from(
        { length: BAR_COUNT },
        (_, i) => {
          const index = Math.floor(
            (i / BAR_COUNT) * data.length
          );

          const value = data[index] / 255;

          // Minimum height + actual audio movement
          return 2 + value * 30;
        }
      );

      setBars(nextBars);

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Change waveform colour depending on what's underneath it
  useEffect(() => {
    function updateColor() {
      const x = window.innerWidth - 50;
      const y = window.innerHeight - 45;

      const elements = document.elementsFromPoint(x, y);

      for (const element of elements) {
        if (
          element instanceof HTMLElement &&
          element.dataset.soundPlayer !== "true"
        ) {
          const background =
            getComputedStyle(element).backgroundColor;

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

              setColor(
                brightness > 150 ? "#111111" : "#f8f7f3"
              );

              return;
            }
          }
        }
      }

      setColor("#111111");
    }

    window.addEventListener("scroll", updateColor);
    window.addEventListener("resize", updateColor);

    updateColor();

    return () => {
      window.removeEventListener("scroll", updateColor);
      window.removeEventListener("resize", updateColor);
    };
  }, []);

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!analyserRef.current) {
      const AudioContext =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext: typeof window.AudioContext;
        }).webkitAudioContext;

      const context = new AudioContext();

      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();

      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;

      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      sourceRef.current = source;
      analyserRef.current = analyser;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audioContextRef.current?.resume();

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }

  function enableFromGate() {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }

  useEffect(() => {
    window.addEventListener("enable-sound", enableFromGate);

    return () =>
      window.removeEventListener("enable-sound", enableFromGate);
  }, []);

  return (
    <div
      data-sound-player="true"
      className="fixed bottom-6 right-6 z-50"
    >
      <audio
        ref={audioRef}
        src="/audio/Expansion.mp3"
        loop
      />

      <button
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute sound" : "Play sound"}
        className="flex h-10 w-16 items-center justify-center"
      >
        <div className="flex h-8 items-center gap-[2px]">
          {bars.map((height, index) => (
            <span
              key={index}
              className="w-[2px] rounded-full transition-[height] duration-75"
              style={{
                height: `${height}px`,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </button>
    </div>
  );
}