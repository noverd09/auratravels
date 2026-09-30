"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Large statement whose words light up one at a time as they cross a trigger
 * line near the bottom of the viewport. Reversible on scroll back.
 */
export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState<boolean[]>(() => words.map(() => false));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(words.map(() => true));
      return;
    }
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          // Word is "lit" once its top edge is above the trigger line (at 70% of viewport height)
          const lit =
            entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.3;
          setActive((prev) => {
            if (prev[i] === lit) return prev;
            const next = prev.slice();
            next[i] = lit;
            return next;
          });
        },
        { rootMargin: "0px 0px -30% 0px", threshold: 0 },
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <p className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-hidden="true"
          className={`inline-block transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            active[i] ? "opacity-100" : "opacity-30"
          }`}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
