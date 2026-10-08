"use client";

import { useEffect, useRef } from "react";
import type { Project } from "./work-data";
import ScatteredGallery from "./ScatteredGallery";

export default function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 z-[90] overflow-y-auto text-paper"
      style={{ backgroundColor: project.bg }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close project"
        className="
          fixed right-6 top-6 z-[100]
          flex h-10 w-10
          items-center justify-center
          rounded-full
          border border-paper/60
          text-sm
          transition-all duration-300
          hover:bg-paper
          hover:text-ink
        "
      >
                <span className="arrow">{"\u2715\uFE0E"}</span>
      </button>

      {/* Header */}
      <section className="px-6 pb-8 pt-16 md:px-12 md:pt-20">
        <h1
          className="
            font-display
            text-[15vw]
            leading-[0.8]
            tracking-[-0.06em]
            md:text-[12vw]
          "
        >
          {project.name}
        </h1>

        <div className="mt-8 border-t border-paper/70 pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Services */}
            <div className="md:col-span-3">
              <div className="mb-3 text-[9px] uppercase tracking-widest opacity-60">
                Services /
              </div>

              <div className="text-xs uppercase leading-[1.7]">
                {project.tags?.map((tag) => (
                  <div key={tag}>{tag}</div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <div className="mb-3 text-[9px] uppercase tracking-widest opacity-60">
                Location /
              </div>

              <div className="text-xs uppercase">
                {project.location}
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-7">
              <p className="max-w-3xl text-xs leading-[1.5] md:text-sm">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated scattered images */}
      <ScatteredGallery
  images={project.images}
  scrollContainerRef={scrollRef}
  bg={project.bg}
/>
      {/* Long description + CTA */}
      <section className="flex flex-col items-center gap-16 px-6 py-32 text-center md:px-12">
        <p className="max-w-2xl text-lg leading-relaxed md:text-xl">
          {project.longDescription}
        </p>

        <div className="flex flex-col items-center gap-6">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-paper/60 underline underline-offset-4 transition-colors duration-300 hover:text-paper"
          >
                        View live website <span className="arrow">{"\u2197\uFE0E"}</span>
          </a>

          <a
            href="https://wa.me/201041585881?text=Hi%20M-Studios%21%20I%27d%20like%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-paper px-7 py-3 font-display text-xl font-semibold tracking-tight text-paper transition-colors duration-300 hover:bg-paper hover:text-ink md:text-2xl"
          >
            Start a project
          </a>
        </div>
      </section>

      {/* Bottom breathing room */}
      <div className="h-[1vh]" />
    </div>
  );
}