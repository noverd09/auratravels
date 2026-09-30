import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Closing conversion band shared by inner pages: signal orange, one dark button. */
export function PlanCta({
  title,
  body,
  href = "/plan-your-trip",
  label = "Plan your trip",
}: {
  title: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section
      aria-label="Plan your trip"
      className="relative overflow-hidden bg-signal py-20 text-fg md:py-28"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute -right-[12vmin] top-1/2 size-[70vmin] -translate-y-1/2 text-fg/30"
      >
        <circle cx="50" cy="50" r="49.5" stroke="currentColor" strokeWidth="0.2" />
        <circle cx="85.5" cy="14.5" r="1.8" fill="var(--butter)" />
      </svg>
      <Container className="relative">
        <Reveal>
          <h2 className="max-w-[820px] text-4xl leading-none tracking-[-0.03em] md:text-6xl">
            {title}
          </h2>
          {body && <p className="mt-6 max-w-[620px] text-lg text-fg">{body}</p>}
          <div className="mt-10">
            <ButtonLink href={href} variant="dark" arrow>
              {label}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-fg">
            A travel request, not a booking. No payment is taken.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
