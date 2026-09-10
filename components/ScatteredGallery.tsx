"use client";

import { useEffect, useRef, useState } from "react";

const layout = [
  { top: "4%", left: "24%", width: "30%", height: "24%" },
  { top: "4%", left: "56%", width: "13%", height: "24%" },
  { top: "35%", left: "7%", width: "22%", height: "35%" },
  { top: "20%", left: "71%", width: "19%", height: "50%" },
  {
    // CENTER IMAGE
    top: "31%",
    left: "31%",
    width: "38%",
    height: "39%",
  },
  { top: "73%", left: "24%", width: "16%", height: "27%" },
  { top: "73%", left: "41%", width: "39%", height: "28%" },
];

const MIDDLE_INDEX = 4;

// Each outer image exits toward the edge it's already closest to:
// 0 top-left -> up, 1 top-right -> up, 2 left -> left,
// 3 right -> right, 5 bottom-left -> down, 6 bottom-right -> down
// Each outer image exits diagonally toward its nearest corner.
const EXIT_DIRECTION: Record<number, { x: number; y: number }> = {
  0: { x: -110, y: -110 }, // top-left -> up-left
  1: { x: 110, y: -110 },  // top-right -> up-right
  2: { x: -110, y: 40 },   // left -> left, slightly down
  3: { x: 110, y: -40 },   // right -> right, slightly up
  5: { x: -110, y: 110 },  // bottom-left -> down-left
  6: { x: 110, y: 110 },   // bottom-right -> down-right
};

export default function ScatteredGallery({
  images,
  scrollContainerRef,
  bg,
}: {
  images: string[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  bg: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillScaleRef = useRef(2.65);

  const [progress, setProgress] = useState(0);

  /*
   * Measure exactly how much the middle box needs to scale
   * to fully cover the viewport (recalculated on resize).
   */
  useEffect(() => {
    function measure() {
      const middleEl = wrapperRefs.current[MIDDLE_INDEX];
      if (!middleEl) return;
      const rect = middleEl.getBoundingClientRect();
      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      fillScaleRef.current = Math.max(scaleX, scaleY) * 1.02;
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /*
   * Scroll progress
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    function handleScroll() {
      const scrollableDistance = section!.offsetHeight - container!.clientHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = container!.scrollTop - section!.offsetTop;
      const p = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      setProgress(p);
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  /*
   * 1. All 6 outer images fly outward toward their nearest edge and fade — 0 to 0.4
   * 2. Middle image (4) zooms to fill the screen — 0 to 0.6 (runs the whole time)
   */
  useEffect(() => {
    wrapperRefs.current.forEach((wrapper, i) => {
      if (!wrapper) return;

      const isMiddleImg = i === MIDDLE_INDEX;

      if (isMiddleImg) {
        const zoomEnd = 0.6;
        const p = Math.min(progress / zoomEnd, 1);
        const scale = 1 + p * (fillScaleRef.current - 1);

        wrapper.style.transform = `scale(${scale})`;
        wrapper.style.opacity = "1";
        wrapper.style.borderRadius = `${12 * (1 - p)}px`;
        return;
      }

      const exitEnd = 0.4;
      const p = Math.min(progress / exitEnd, 1);
      const dir = EXIT_DIRECTION[i] ?? { x: 0, y: 0 };
      const translateX = dir.x * p;
      const translateY = dir.y * p;
      const opacity = Math.max(0, 1 - p);

      wrapper.style.transform = `translate(${translateX}%, ${translateY}%)`;
      wrapper.style.opacity = String(opacity);
    });
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh", backgroundColor: bg }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          {images.slice(0, 7).map((src, i) => {
            const item = layout[i];
            const isMiddleImg = i === MIDDLE_INDEX;

            return (
              <div
                key={i}
                ref={(el) => {
                  wrapperRefs.current[i] = el;
                }}
                className="absolute overflow-hidden rounded-xl shadow-[0_18px_50px_rgba(70,25,0,0.16)] origin-center transition-[transform,opacity,border-radius] duration-100 ease-out will-change-transform"
                style={{
                  top: item.top,
                  left: item.left,
                  width: item.width,
                  height: item.height,
                  zIndex: isMiddleImg ? 10 : 2,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}