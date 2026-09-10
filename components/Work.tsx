"use client";

import { useState } from "react";
import WorkRow from "./WorkRow";
import ProjectOverlay from "./ProjectOverlay";
import { projects } from "./work-data";

export default function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openProject =
    projects.find((p) => p.slug === openSlug) || null;

  return (
    <section
      id="work"
      className="bg-ink px-0 pb-0 pt-24 md:pt-10"
    >
      <div className="flex items-end justify-between border-b border-line px-6 pb-8 md:px-10">
        <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
          Selected work
        </h2>

        <span className="text-sm text-muted">
          {projects.length} projects
        </span>
      </div>

      <div>
        {projects.map((project) => (
          <WorkRow
            key={project.slug}
            project={project}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </div>

      {/* View all button */}
      <div className="flex justify-center px-6 py-8 md:py-10">
        <a
          href="https://linktr.ee/mstudios.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-4 rounded-full border border-line px-8 py-3 text-sm font-medium uppercase text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          View All
          <span className="text-lg">↗</span>
        </a>
      </div>

      {openProject && (
        <ProjectOverlay
          project={openProject}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </section>
  );
}