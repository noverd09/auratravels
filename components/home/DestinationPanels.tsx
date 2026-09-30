"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { AuraDot } from "@/components/ui/AuraMark";
import type { Destination } from "@/types";

export interface PanelItem {
  slug: string;
  name: string;
  country: string;
  description: string;
  themes: string[];
  coordinates: string;
  aura: Destination["aura"];
  src: string;
  alt: string;
}

/**
 * Four photographs as expanding strips. Hover or focus opens one; the rest fold to a
 * vertical name. Below the desktop breakpoint they stack as ordinary large cards.
 */
export function DestinationPanels({ items }: { items: PanelItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex flex-col gap-4 lg:h-[680px] lg:flex-row lg:gap-3">
      {items.map((d, i) => {
        const on = i === active;
        return (
          <li
            key={d.slug}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group relative min-h-[360px] overflow-hidden bg-inverse text-on-inverse transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] lg:min-h-0 ${
              on ? "lg:grow-[5]" : "lg:grow-[1]"
            } lg:basis-0`}
          >
            <Link
              href={`/destinations/${d.slug}`}
              data-cursor="view"
              className="on-inverse absolute inset-0 block focus-visible:outline-offset-[-6px]"
              aria-label={`Explore ${d.name}, ${d.country}`}
            >
              <Image
                src={d.src}
                alt={d.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={`object-cover transition-[scale,opacity] duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  on ? "scale-100 opacity-100" : "scale-110 opacity-70 lg:opacity-60"
                }`}
              />
              <span aria-hidden="true" className="absolute inset-0 bg-inverse/40" />

              {/* Folded state: vertical name */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 hidden w-full items-end justify-start p-6 transition-opacity duration-500 lg:flex ${
                  on ? "opacity-0" : "opacity-100 delay-300"
                }`}
              >
                <span className="font-serif text-4xl tracking-[-0.02em] [writing-mode:vertical-rl] rotate-180">
                  {d.name}
                </span>
              </span>

              <span
                className={`absolute inset-x-0 bottom-0 flex flex-col p-6 transition-opacity duration-500 md:p-8 lg:min-w-[520px] ${
                  on ? "opacity-100 delay-200" : "opacity-100 lg:opacity-0"
                }`}
              >
                <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em]">
                  <AuraDot aura={d.aura} size={10} />
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>{d.country}</span>
                </span>
                <span
                  className={`mt-3 font-serif text-6xl leading-none tracking-[-0.04em] transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:text-7xl ${
                    on ? "opacity-100 lg:translate-y-0" : "opacity-100 lg:pointer-events-none lg:translate-y-4 lg:opacity-0"
                  }`}
                >
                  {d.name}
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="mt-4 block text-sm font-bold uppercase tracking-[0.1em] text-on-inverse/80">
                      {d.themes.join(" · ")}
                    </span>
                    <span className="mt-3 block max-w-[440px] text-base text-on-inverse/90">
                      {d.description}
                    </span>
                    <span className="mt-5 flex items-center justify-between gap-4">
                      <span className="tabular-nums text-xs text-on-inverse/70">{d.coordinates}</span>
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-highlight px-5 text-sm font-bold text-fg">
                        Explore {d.name}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
