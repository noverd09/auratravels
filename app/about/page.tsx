import type { Metadata } from "next";
import { AuraDot } from "@/components/ui/AuraMark";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { PlanCta } from "@/components/ui/PlanCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind AURA TRAVEL, a fictional boutique agency built on the idea that a good trip is designed around the traveler, not sold off a shelf.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | AURA TRAVEL", url: "/about", images: [{ url: "/images/japan-yasaka.jpg" }] },
};

const SPECIALISTS = [
  {
    name: "Hana Sato",
    role: "Japan specialist",
    aura: "japan" as const,
    bio: "Lived in Kyoto for nine years. Plans by walking the route first, and never books a table she has not eaten at.",
  },
  {
    name: "Luca Ferraro",
    role: "Italy specialist",
    aura: "italy" as const,
    bio: "Grew up on the Amalfi Coast. Knows which terrace has the good lemons and which road to avoid on a Saturday.",
  },
  {
    name: "Ayu Prasetyo",
    role: "Southeast Asia specialist",
    aura: "palawan" as const,
    bio: "Spent a decade guiding in Bali and Palawan. Best known for finding the quiet hour at the busiest place.",
  },
];

const VALUES = [
  {
    title: "Fewer places, known well",
    body: "We work in a small number of destinations so that every recommendation comes from someone who has been there recently.",
  },
  {
    title: "Pace before itinerary",
    body: "A trip is not a list. We plan the rhythm first: what is busy, what is quiet, and where the empty afternoons go.",
  },
  {
    title: "People over properties",
    body: "The best moments come from a guide, a cook, or a host. We choose partners we would trust with our own families.",
  },
  {
    title: "Plain about trade offs",
    body: "Every choice gives something up. We tell you what a trip costs in time, money, and comfort before you decide.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About AURA"
        title={<>We design journeys around the way <span className="hl">you</span> want to travel.</>}
        intro="AURA TRAVEL is a fictional boutique travel consultancy created for this portfolio. What follows is the story we would tell if it were real."
      />

      <section aria-labelledby="philosophy-heading" className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <Photo src="/images/japan-yasaka.jpg" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5]" />
            </Reveal>
            <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
              <Reveal>
                <SectionHeading
                  index="01"
                  eyebrow="Philosophy"
                  title={<span id="philosophy-heading">Aura is the quality of light in a place.</span>}
                  titleClassName="text-4xl md:text-5xl"
                />
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 text-lg text-muted">
                  It is why Kyoto at dawn feels different from Kyoto at noon, and why the same beach can be
                  forgettable or unforgettable depending on the hour you arrive. Our job is to know that
                  difference and to put you in the right place at the right time.
                </p>
                <p className="mt-4 text-lg text-muted">
                  That is why every destination on this site carries its own small signature colour: the
                  vermilion of a torii gate, the green of a terrace, the gold of a lemon grove, the teal of a
                  lagoon.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="approach-heading" className="bg-raised py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Approach to planning"
              title={<span id="approach-heading">Why personalized travel matters.</span>}
              intro="A packaged tour serves the average traveler. Nobody is the average traveler. A trip built around your habits, your pace, and your questions asks more of us and gives far more back."
            />
          </Reveal>
          <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {[
              ["Listen", "You tell us how you like to travel, what went wrong last time, and what you have always wanted to see."],
              ["Design", "A specialist drafts a route with real pacing, real places, and honest trade offs, then refines it with you."],
              ["Support", "Before and during the trip, one person answers your messages and adjusts the plan when the day changes."],
            ].map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100}>
                <div className="border-t border-line pt-6">
                  <span className="font-serif text-5xl leading-none tabular-nums text-accent">0{i + 1}</span>
                  <h3 className="mt-4 text-3xl leading-none tracking-[-0.02em]">{title}</h3>
                  <p className="mt-4 text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="people-heading" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading index="03" eyebrow="Travel specialists" title={<span id="people-heading">The people who plan your trip.</span>} />
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {SPECIALISTS.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 100}>
                <div className="border-t border-line pt-6">
                  <div
                    aria-hidden="true"
                    className="flex size-16 items-center justify-center rounded-full border border-line font-serif text-2xl"
                  >
                    {p.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <h3 className="mt-6 text-3xl leading-none tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-2 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    <AuraDot aura={p.aura} />
                    {p.role}
                  </p>
                  <p className="mt-4 text-muted">{p.bio}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">Fictional team members created for this portfolio project.</p>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="on-inverse bg-inverse py-24 text-on-inverse md:py-32">
        <Container>
          <Reveal>
            <SectionHeading index="04" eyebrow="Values" title={<span id="values-heading">What we hold to.</span>} />
          </Reveal>
          <dl className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 100}>
                <div className="border-t border-on-inverse/25 pt-6">
                  <dt className="font-serif text-3xl leading-none tracking-[-0.02em]">{v.title}</dt>
                  <dd className="mt-4 max-w-[460px] text-on-inverse/75">{v.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <PlanCta title="Let us design the next one with you." body="Tell us where you want to go and how you like to travel." />
    </>
  );
}
