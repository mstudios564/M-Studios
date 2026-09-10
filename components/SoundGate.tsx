"use client";

import { useEffect, useState } from "react";

export default function SoundGate() {
  const [active, setActive] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active) return;

    function handleMove(e: MouseEvent) {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    }

    function handleScroll() {
      setVisible(window.scrollY < window.innerHeight * 0.15);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [active]);

  function handleClick() {
    setActive(false);
    window.dispatchEvent(new Event("enable-sound"));
  }

  if (!active || !visible) return null;

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[100]"
      style={{ cursor: "none" }}
    >
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
        style={{
          left: pos.x,
          top: pos.y,
        }}
      >
        Click to enable sound
      </div>
    </div>
  );
}