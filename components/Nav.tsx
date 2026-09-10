"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [isLanding, setIsLanding] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsLanding(window.scrollY < window.innerHeight * 0.8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colorClass = isLanding
    ? "text-[#666666]"
    : "text-white mix-blend-difference";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <a
        href="#"
        className={`font-display text-lg font-semibold tracking-tight ${colorClass}`}
      >
        M-Studios
      </a>

      <nav
        className={`hidden items-center gap-8 text-sm md:flex ${colorClass}`}
      >
        <a href="#work" className="transition-opacity duration-300 hover:opacity-60">
          Work
        </a>
        <a href="#about" className="transition-opacity duration-300 hover:opacity-60">
          About
        </a>
        <a href="#contact" className="transition-opacity duration-300 hover:opacity-60">
          Contact
        </a>
      </nav>

      <a
        href="https://wa.me/201041585881?text=Hi%20M-Studios%21%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full border px-4 py-2 text-sm transition-opacity duration-300 hover:opacity-60 ${isLanding
            ? "border-[#666666] text-[#666666]"
            : "border-white text-white mix-blend-difference"
          }`}
      >
        Start a project
      </a>
    </header>
  );
}