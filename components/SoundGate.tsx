"use client";

import { useEffect, useState } from "react";

export default function SoundGate() {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(true);

  // Detect devices with no hover/cursor (phones, tablets)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!active || isTouch !== false) return;

    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    function handleScroll() {
      setVisible(window.scrollY < window.innerHeight * 0.15);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [active, isTouch]);

  function handleClick() {
    setActive(false);
    window.dispatchEvent(new Event("enable-sound"));
  }

  // Touch devices: no gate. MusicPlayer starts on the first tap.
  // Also render nothing until we know the device type (avoids a flash on mobile).
  if (isTouch !== false) return null;
  if (!active || !visible) return null;

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[100]"
      style={{ cursor: "none" }}
    >
      {pos && (
        <div
          className="
            pointer-events-none fixed
            -translate-x-1/2 -translate-y-1/2
            select-none whitespace-nowrap
            rounded-full
            border border-[#111111]
            bg-transparent
            px-4 py-2
            text-xs font-medium text-[#111111]
          "
          style={{ left: pos.x, top: pos.y }}
        >
          Click to enable sound
        </div>
      )}
    </div>
  );
}