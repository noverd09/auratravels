import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { AuraMark } from "@/components/ui/AuraMark";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-inverse grain relative overflow-hidden bg-inverse text-on-inverse">
      <Container className="relative pt-16 md:pt-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <AuraMark size={36} />
              <span className="font-serif text-4xl tracking-[0.22em]">AURA</span>
            </div>
            <p className="mt-6 max-w-[460px] font-serif text-3xl leading-9 text-on-inverse/85">
              Curated journeys. <span className="hl">Unforgettable</span> places.
            </p>
            <Link href="/plan-your-trip" className={buttonClass("inverse", "mt-10")}>
              Plan your trip
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-inverse/60">
                Explore
              </p>
              <ul className="mt-5 space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline flex min-h-11 items-center">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-inverse/60">
                Contact
              </p>
              <ul className="mt-5 space-y-1">
                <li>
                  <Link href="/contact" className="link-underline flex min-h-11 items-center">
                    Get in touch
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline flex min-h-11 items-center break-all"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+14155550148"
                    className="link-underline flex min-h-11 items-center tabular-nums"
                  >
                    {SITE.phone}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-on-inverse/20 pt-8 text-sm text-on-inverse/70 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[560px]">{SITE.disclaimer}</p>
          <ul className="flex flex-wrap items-center gap-x-6">
            <li>
              <Link href="/privacy" className="link-underline flex min-h-11 items-center">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="link-underline flex min-h-11 items-center">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/credits" className="link-underline flex min-h-11 items-center">
                Photo credits
              </Link>
            </li>
            <li>
              <a href="#" className="link-underline flex min-h-11 items-center gap-2 font-bold text-on-inverse">
                Back to top
                <ArrowUp size={16} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        {/* Oversized wordmark, cropped by the edge of the page */}
        <p
          aria-hidden="true"
          className="pointer-events-none -mb-[4vw] mt-10 select-none text-center font-serif leading-[0.72] tracking-[-0.04em] text-on-inverse/[0.07]"
          style={{ fontSize: "clamp(8rem, 30vw, 28rem)" }}
        >
          AURA
        </p>
      </Container>
    </footer>
  );
}
