import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Photograph-led opener for destination and trip pages. */
export function DetailHero({
  src,
  eyebrow,
  title,
  meta,
  children,
}: {
  src: string;
  eyebrow: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-inverse relative isolate flex min-h-[560px] h-[80svh] flex-col justify-end overflow-hidden bg-inverse text-on-inverse">
      <Photo
        src={src}
        priority
        sizes="100vw"
        outline={false}
        bgClass="bg-inverse"
        className="absolute inset-0 -z-20"
        imgClassName="drift"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-inverse/50" />
      <Container className="pb-10 pt-32 md:pb-14">
        <Eyebrow className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-inverse/85">
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-6 max-w-[1000px] text-5xl leading-none tracking-[-0.035em] md:text-7xl xl:text-8xl">
          {title}
        </h1>
        {children}
        {meta && (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-on-inverse/25 pt-5 text-sm">
            {meta}
          </div>
        )}
      </Container>
    </section>
  );
}
