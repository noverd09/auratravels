"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Opens an image frame like a curtain the first time it scrolls into view. */
export function MaskReveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The observed wrapper is never clipped: a fully clipped element reports zero intersection.
  return (
    <div ref={ref} className={className}>
      <div
        data-visible={visible}
        style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
        className="mask"
      >
        {children}
      </div>
    </div>
  );
}
