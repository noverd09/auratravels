"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { buttonClass } from "@/components/ui/Button";

/**
 * A slim conversion bar that appears once the visitor has scrolled past the hero and
 * leaves again before the closing call to action, so it never stacks with it.
 */
export function StickyPlanBar({
  title,
  detail,
  href,
  label = "Plan this trip",
}: {
  title: string;
  detail?: string;
  href: string;
  label?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.8 && !nearEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`on-inverse fixed inset-x-3 bottom-3 z-40 mx-auto max-w-[760px] rounded-xs bg-inverse text-on-inverse transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-4 py-2 pl-5 pr-2">
        <p className="min-w-0">
          <span className="block truncate font-serif text-xl leading-6">{title}</span>
          {detail && <span className="block truncate text-xs text-on-inverse/70">{detail}</span>}
        </p>
        <Link href={href} className={buttonClass("inverse", "!min-h-11 shrink-0 !px-5 !py-2 text-sm")}>
          {label}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
