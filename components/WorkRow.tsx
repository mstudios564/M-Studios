"use client";

import type { Project } from "./work-data";

export default function WorkRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article className="group relative overflow-hidden border-b border-line bg-ink">
      {/* Project color — only visible on hover */}
      <span
        className="
          pointer-events-none absolute inset-0
          opacity-0
          transition-opacity duration-500 ease-out
          group-hover:opacity-100
        "
        style={{ backgroundColor: project.bg }}
      />

      <div className="relative z-10">
        {/* Main row */}
        <button
          onClick={onOpen}
          className="flex w-full items-center gap-6 px-6 py-8 text-left md:px-10 md:py-10"
        >
          <span className="w-40 shrink-0 font-display text-2xl font-medium tracking-tight text-paper md:w-64 md:text-4xl">
            {project.name}
          </span>

          <span className="hidden flex-1 text-sm text-muted md:block">
            {project.description}
          </span>

          <span className="hidden text-xs text-muted md:block">
            {project.year}
          </span>

          <span className="text-paper transition-transform duration-500 group-hover:rotate-45">
            ↗
          </span>
        </button>

        {/* Expanded hover content */}
        <div
          className="
            grid grid-rows-[0fr]
            transition-[grid-template-rows]
            duration-700
            ease-[cubic-bezier(.16,1,.3,1)]
            group-hover:grid-rows-[1fr]
          "
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-10 pt-0 md:px-10 md:pb-12">
              
              {/* Extra project information */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">

                {/* Tags */}
                <div className="md:col-span-4">
                  <div className="text-sm font-medium uppercase leading-[1.45] text-paper">
                    {project.tags?.map((tag) => (
                      <div key={tag}>{tag}</div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="md:col-span-3">
                  {project.location && (
                    <div className="text-sm font-medium uppercase text-paper">
                      {project.location}
                    </div>
                  )}
                </div>

                {/* Open case study */}
                <div className="flex justify-start md:col-span-5 md:justify-end">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}
                    className="cursor-pointer border-b border-paper pb-2 text-sm font-medium uppercase text-paper transition-opacity hover:opacity-60"
                  >
                    View Case Study →
                  </span>
                </div>
              </div>

              {/* Gallery */}
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
                {project.images.slice(0, 3).map((src, index) => (
                  <div
                    key={src}
                    className={
                      index === 0
                        ? "overflow-hidden rounded-xl md:col-span-6"
                        : "overflow-hidden rounded-xl md:col-span-3"
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="
                        h-full min-h-[260px] w-full object-cover
                        transition-transform duration-1000
                        ease-[cubic-bezier(.16,1,.3,1)]
                        group-hover:scale-[1.04]
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}