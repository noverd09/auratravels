"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

/**
 * Horizontal snap scroller with previous / next controls and a progress line.
 * Cards are passed in as children so they can stay server rendered.
 */
export function Rail({ label, children }: { label: string; children: ReactNode }) {
  const scroller = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
      }
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 400) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow =
    "flex size-12 items-center justify-center rounded-full border border-current transition-[background-color,color,opacity,scale] duration-300 hover:bg-fg hover:text-bg active:scale-[0.96] disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <ul
        ref={scroller}
        aria-label={label}
        tabIndex={0}
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-4 md:scroll-px-10 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className="mt-8 flex items-center gap-6">
        <div aria-hidden="true" className="relative h-[3px] flex-1 bg-line">
          <span
            className="absolute inset-y-0 left-0 w-1/4 bg-fg transition-[left] duration-150"
            style={{ left: `${progress * 75}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Previous journeys" className={arrow}>
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Next journeys" className={arrow}>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
