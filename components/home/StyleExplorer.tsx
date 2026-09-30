"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Photo } from "@/components/ui/Photo";

export interface StyleItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  destinations: { slug: string; name: string }[];
  tripCount: number;
}

/** Tabs pattern: arrow keys move between styles, the panel shows where each one leads. */
export function StyleExplorer({ styles }: { styles: StyleItem[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % styles.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = (active - 1 + styles.length) % styles.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = styles.length - 1;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const current = styles[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div
        role="tablist"
        aria-label="Travel styles"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {styles.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`style-tab-${s.slug}`}
              aria-selected={selected}
              aria-controls="style-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`group flex min-h-11 shrink-0 snap-start items-baseline gap-4 border-b py-3 text-left transition-[color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:py-5 ${
                selected
                  ? "border-accent text-fg"
                  : "border-line text-muted hover:text-fg"
              }`}
            >
              <span className="text-xs font-bold tabular-nums tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-3xl leading-none tracking-[-0.02em] lg:text-5xl">
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="style-panel"
        aria-labelledby={`style-tab-${current.slug}`}
        className="lg:col-span-7"
      >
        <Photo
          key={current.slug}
          src={current.image}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[4/3] md:aspect-[16/10]"
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              {current.tagline}
            </p>
            <p className="mt-3 text-lg text-muted">{current.description}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Where it leads
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-bold transition-[background-color,color] duration-300 hover:bg-fg hover:text-bg"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/experiences/${current.slug}`}
              className="group mt-4 inline-flex min-h-11 items-center gap-2 font-bold"
            >
              <span className="link-underline">
                See {current.name.toLowerCase()} trips ({current.tripCount})
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
