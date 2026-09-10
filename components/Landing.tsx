"use client";

import { useRef, useState } from "react";

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX =
      (e.clientX - centerX) / (rect.width / 2);

    const offsetY =
      (e.clientY - centerY) / (rect.height / 2);

    const maxTilt = 5;

    setTilt({
      x: offsetY * -maxTilt,
      y: offsetX * maxTilt,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen items-center justify-center bg-[#f8f7f3]"
      style={{ perspective: "800px" }}
    >
      <div
        ref={containerRef}
        className="transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="M-Studios"
          draggable={false}
          className="w-48 select-none md:w-64"
        />
      </div>

      <span className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-xs text-[#666666]">
        Scroll
      </span>
    </section>
  );
}