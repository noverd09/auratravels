"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Pause, Play } from "@phosphor-icons/react";
import { AuraDot } from "@/components/ui/AuraMark";
import { buttonClass } from "@/components/ui/Button";
import type { Destination } from "@/types";

interface Slide {
  slug: string;
  name: string;
  country: string;
  place: string;
  coordinates: string;
  aura: Destination["aura"];
  src: string;
  alt: string;
}

const INTERVAL = 7000;

export function Hero({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);

  // Autoplay only when the visitor has not asked for reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    setPlaying(!mq.matches);
    const onChange = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, index, next]);

  const active = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured destinations"
      className="on-inverse grain relative isolate flex min-h-[680px] h-svh flex-col justify-end overflow-hidden bg-inverse text-on-inverse"
    >
      {slides.map((s, i) => (
        <div
          key={s.slug}
          aria-hidden={i !== index}
          className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={i === index ? s.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "drift" : ""}`}
          />
        </div>
      ))}
      {/* Flat scrim keeps type legible over any photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-inverse/50" />

      {/* The aura: a large halo, cropped by the frame */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute -right-[18vmin] top-[10%] -z-10 hidden size-[88vmin] text-on-inverse/40 md:block"
      >
        <circle cx="50" cy="50" r="49.5" stroke="currentColor" strokeWidth="0.15" />
        <circle
          cx="85.5"
          cy="14.5"
          r="1.6"
          fill={`var(--aura-${active.aura})`}
          className="transition-[fill] duration-1000"
        />
      </svg>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-6 pt-32 md:px-10 md:pb-10">
        <p style={{ "--i": 0 } as React.CSSProperties} className="rise mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-on-inverse/85">
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
          Boutique travel design
        </p>
        <h1 style={{ "--i": 1 } as React.CSSProperties} className="rise max-w-[1000px] text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl xl:text-8xl">
          Your next <span className="hl">journey</span> starts here.
        </h1>
        <p style={{ "--i": 2 } as React.CSSProperties} className="rise mt-6 max-w-[680px] text-lg text-on-inverse/90 md:text-xl">
          Curated journeys designed around the way you want to travel.
        </p>
        <div style={{ "--i": 3 } as React.CSSProperties} className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/plan-your-trip" className={buttonClass("primary")}>
            Plan your trip
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link href="/destinations" className={buttonClass("outline")}>
            Explore destinations
          </Link>
        </div>

        {/* Destination switcher: thumbnails with a timer line */}
        <div style={{ "--i": 5 } as React.CSSProperties} className="rise mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-on-inverse/25 pt-5">
          <p aria-live={playing ? "off" : "polite"} className="flex items-center gap-3 text-sm">
            <AuraDot aura={active.aura} size={10} />
            <span className="font-bold">
              {active.place}, {active.country}
            </span>
            <span className="hidden tabular-nums text-on-inverse/70 sm:inline">
              {active.coordinates}
            </span>
          </p>

          <div className="flex items-center gap-3">
            <ul className="flex items-stretch gap-2 md:gap-3" aria-label="Choose destination photograph">
              {slides.map((s, i) => {
                const on = i === index;
                return (
                  <li key={s.slug}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show ${s.name}`}
                      aria-current={on}
                      className="group flex min-h-11 w-11 flex-col justify-center text-left md:block md:min-h-0 md:w-28"
                    >
                      <span className="relative hidden aspect-[3/2] w-full overflow-hidden bg-inverse md:block">
                        <Image
                          src={s.src}
                          alt=""
                          fill
                          sizes="112px"
                          className={`object-cover transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 ${
                            on ? "opacity-100" : "opacity-50 group-hover:opacity-90"
                          }`}
                        />
                      </span>
                      <span className="mt-2 hidden text-xs font-bold uppercase tracking-[0.12em] md:block">
                        {s.name}
                      </span>
                      <span className="relative mt-2 block h-[3px] w-full overflow-hidden bg-on-inverse/30">
                        <span
                          key={on ? `on-${index}` : "off"}
                          className="absolute inset-0 origin-left bg-signal"
                          style={{
                            transform: on ? undefined : "scaleX(0)",
                            animation:
                              on && playing ? `fill ${INTERVAL}ms linear forwards` : undefined,
                            ...(on && !playing ? { transform: "scaleX(1)" } : {}),
                          }}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {!reduced && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="flex size-11 items-center justify-center rounded-full border border-on-inverse/40 transition-[background-color,color,scale] duration-300 hover:bg-bg hover:text-fg active:scale-[0.96]"
              >
                {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-40 left-1/2 hidden h-16 w-px -translate-x-1/2 overflow-hidden bg-on-inverse/25 xl:block"
      >
        <span
          className="block h-full w-full bg-signal"
          style={{ animation: "cue 2.2s var(--ease-fluid) infinite" }}
        />
      </div>
    </section>
  );
}
