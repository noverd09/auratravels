"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuraMark } from "@/components/ui/AuraMark";
import { buttonClass } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Close the menu when the route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Solid once scrolled; slides away on the way down, returns on the way up.
  // Throttled through requestAnimationFrame so scrolling never waits on it.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 240) setHidden(false);
      else if (Math.abs(y - lastY) > 6) setHidden(y > lastY);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Menu: lock scroll, focus management, Escape to close
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const transparent = overlay && !scrolled && !open;
  const tone = transparent || open ? "text-on-inverse" : "text-fg";
  const surface = transparent || open ? "bg-transparent" : "bg-bg/95 border-b border-line";
  const slide = hidden && !open ? "-translate-y-full" : "translate-y-0";

  return (
    <>
      <header
        className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-50 transition-[background-color,color,border-color,translate] duration-500 ${EASE} ${slide} ${surface} ${tone} ${open ? "on-inverse" : ""}`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            aria-label="AURA TRAVEL, home"
            className="group flex min-h-11 items-center gap-3"
          >
            <AuraMark className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-[120deg]" />
            <span className="font-serif text-2xl tracking-[0.22em]">AURA</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] ${
                    current ? "" : "link-underline"
                  }`}
                >
                  {current && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-signal"
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/plan-your-trip"
              className={buttonClass(
                "primary",
                "hidden !min-h-11 !px-5 !py-2 text-sm sm:inline-flex",
              )}
            >
              Plan your trip
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="relative flex size-11 items-center justify-center lg:hidden"
            >
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ${EASE} ${
                  open ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ${EASE} ${
                  open ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="on-inverse grain fixed inset-0 z-40 flex flex-col bg-inverse px-6 pb-10 pt-28 text-on-inverse lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
          {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link, i) => (
            <div key={link.href} className="overflow-hidden">
              <Link
                ref={i === 0 ? firstLink : undefined}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                className={`flex items-baseline gap-4 py-1 font-serif text-5xl tracking-[-0.03em] transition-[transform,opacity] duration-700 ${EASE} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
              >
                <span className="font-sans text-xs font-bold tabular-nums tracking-[0.14em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        <Link href="/plan-your-trip" className={buttonClass("primary", "w-full")}>
          Plan your trip
        </Link>
      </div>
    </>
  );
}
