import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Editorial page opener used on inner pages: a cropped halo, a rule, one highlighted word. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pb-14 pt-16 md:pb-20 md:pt-28">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute -right-[14vmin] top-1/2 hidden size-[64vmin] -translate-y-1/2 text-fg/25 md:block"
      >
        <circle cx="50" cy="50" r="49.5" stroke="currentColor" strokeWidth="0.15" />
        <circle cx="85.5" cy="14.5" r="1.6" fill="var(--signal)" />
      </svg>
      <Container className="relative">
        <Eyebrow className="flex items-center gap-3 text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-6 max-w-[900px] text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl xl:text-8xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-[680px] text-lg text-muted md:text-xl">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}
