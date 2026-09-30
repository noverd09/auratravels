import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { DestinationPanels, type PanelItem } from "@/components/home/DestinationPanels";
import { Hero } from "@/components/home/Hero";
import { Rail } from "@/components/home/Rail";
import { StyleExplorer, type StyleItem } from "@/components/home/StyleExplorer";
import { AuraDot } from "@/components/ui/AuraMark";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { JournalCard, TripCard } from "@/components/ui/Cards";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { WordReveal } from "@/components/ui/WordReveal";
import { getDestinations } from "@/lib/destinations/service";
import { getImageAsset } from "@/lib/images";
import { getFeaturedJournalPosts } from "@/lib/journal/service";
import { SITE } from "@/lib/site";
import { getTravelStyles } from "@/lib/travel-styles/service";
import { getTripItinerary, getTrips } from "@/lib/trips/service";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  description:
    "Boutique travel agency designing personalized journeys to Japan, Bali, Italy and Palawan. Explore destinations, browse curated trips, and plan yours.",
  alternates: { canonical: "/" },
};

const WHY = [
  {
    title: "Designed around you",
    body: "Your trip is built around your interests, your pace, and your priorities, not a package someone else assembled.",
  },
  {
    title: "Local perspective",
    body: "Go beyond the obvious stops. We work with guides, cooks, and makers who live where you are traveling.",
  },
  {
    title: "Thoughtfully curated",
    body: "Boutique stays, memorable experiences, and meaningful places, chosen because we would send our own families.",
  },
  {
    title: "Personal support",
    body: "A real travel specialist shapes your journey, answers your messages, and is reachable while you are away.",
  },
];

const PROCESS = [
  ["Tell us", "Nine short questions about where, when, and how you like to travel."],
  ["We design", "A specialist drafts a route with real pacing and honest trade offs, then refines it with you."],
  ["You go", "One person answers your messages before and during the trip and adjusts when the day changes."],
];

export default async function HomePage() {
  const [destinations, allTrips, styles, posts] = await Promise.all([
    getDestinations(),
    getTrips(),
    getTravelStyles(),
    getFeaturedJournalPosts(3),
  ]);

  const featuredDestinations = destinations.filter((d) => d.featured);
  const heroSlides = featuredDestinations.map((d) => ({
    slug: d.slug,
    name: d.name,
    country: d.country,
    place: d.hero_place,
    coordinates: d.coordinates,
    aura: d.aura,
    src: d.hero_image,
    alt: getImageAsset(d.hero_image).alt,
  }));
  const panels: PanelItem[] = featuredDestinations.map((d) => ({
    slug: d.slug,
    name: d.name,
    country: d.country,
    description: d.description,
    themes: d.themes,
    coordinates: d.coordinates,
    aura: d.aura,
    src: d.hero_image,
    alt: getImageAsset(d.hero_image).alt,
  }));

  const nameOf = (id: string) => destinations.find((d) => d.id === id)?.name ?? "";

  const signature = allTrips.find((t) => t.slug === "japan-essential-journey") ?? allTrips[0];
  const signatureDestination = destinations.find((d) => d.id === signature.destination_id);
  const railTrips = [signature, ...allTrips.filter((t) => t.id !== signature.id)];
  const itinerary = (await getTripItinerary(signature.id)).slice(0, 6);

  const styleItems: StyleItem[] = styles.map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    description: s.description,
    image: s.image,
    destinations: destinations
      .filter((d) => d.travel_styles.includes(s.slug))
      .map((d) => ({ slug: d.slug, name: d.name })),
    tripCount: allTrips.filter((t) => t.travel_styles.includes(s.slug)).length,
  }));

  const marqueeItems = featuredDestinations.flatMap((d) => [
    <span key={d.slug} className="font-serif text-6xl leading-none tracking-[-0.03em] md:text-8xl">
      {d.name}
    </span>,
    <AuraDot key={`${d.slug}-dot`} aura={d.aura} size={18} className="ml-6 md:ml-10" />,
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: SITE.name,
          description: SITE.description,
          url: SITE.url,
          slogan: SITE.tagline,
          email: SITE.email,
          telephone: SITE.phone,
        }}
      />

      <Hero slides={heroSlides} />

      {/* Names on a butter band */}
      <div aria-hidden="true" className="border-y border-fg/15 bg-highlight py-6 text-fg md:py-8">
        <Marquee items={marqueeItems} />
      </div>

      {/* 01 Destinations */}
      <section aria-labelledby="destinations-heading" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                index="01"
                eyebrow="Destinations"
                title={<span id="destinations-heading">Four places we know well.</span>}
                intro="We keep our list short on purpose. Each destination is one we return to, so the advice you get is first hand."
              />
              <TextLink href="/destinations">See all destinations</TextLink>
            </div>
          </Reveal>
          <Reveal className="mt-14">
            <DestinationPanels items={panels} />
          </Reveal>
        </Container>
      </section>

      {/* 02 Signature journeys */}
      <section aria-labelledby="journeys-heading" className="bg-raised py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                index="02"
                eyebrow="Signature journeys"
                title={<span id="journeys-heading">Routes we have refined, ready to reshape.</span>}
                intro="Each journey is a starting point. Tell us what to change and we will rebuild it around you."
              />
              <TextLink href="/trips">Browse all trips</TextLink>
            </div>
          </Reveal>
          <div className="mt-14">
            <Rail label="Signature journeys">
              {railTrips.map((t) => (
                <li
                  key={t.id}
                  className="w-[82vw] shrink-0 snap-start sm:w-[420px] lg:w-[460px]"
                >
                  <TripCard
                    trip={t}
                    destinationName={nameOf(t.destination_id)}
                    aspect="aspect-[4/5]"
                    sizes="(min-width: 1024px) 460px, 82vw"
                  />
                </li>
              ))}
            </Rail>
          </div>
          <p className="mt-6 text-sm text-muted">
            Trip content and starting prices are illustrative portfolio material.
          </p>
        </Container>
      </section>

      {/* Tagline reveal */}
      <section
        aria-label="Our approach"
        className="on-inverse grain bg-inverse py-32 text-on-inverse md:py-48"
      >
        <Container>
          <Eyebrow className="mb-10 flex items-center gap-3 text-on-inverse/70">
            <span aria-hidden="true" className="h-px w-8 bg-signal" />
            How we work
          </Eyebrow>
          <WordReveal
            text="Curated journeys. Unforgettable places. We design each trip around the way you want to travel, so every day has a reason and nothing feels like a template."
            className="max-w-[1040px] font-serif text-4xl leading-tight tracking-[-0.02em] md:text-6xl"
          />
        </Container>
      </section>

      {/* 03 Travel styles */}
      <section aria-labelledby="styles-heading" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Travel styles"
              title={<span id="styles-heading">How do you like to travel?</span>}
              intro="Start with a feeling. Each style leads to the destinations and trips that suit it best."
            />
          </Reveal>
          <Reveal className="mt-14">
            <StyleExplorer styles={styleItems} />
          </Reveal>
        </Container>
      </section>

      {/* 04 Featured itinerary */}
      <section
        aria-labelledby="itinerary-heading"
        className="on-inverse grain bg-brand py-24 text-on-inverse md:py-32"
      >
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow className="flex items-center gap-4 text-on-inverse/75">
                  <span className="tabular-nums text-highlight">04</span>
                  <span>Featured itinerary</span>
                </Eyebrow>
                <h2
                  id="itinerary-heading"
                  className="mt-6 text-4xl leading-none tracking-[-0.03em] md:text-6xl"
                >
                  {signatureDestination?.name},{" "}
                  <span className="hl tabular-nums">{signature.duration} days</span>.
                </h2>
                <p className="mt-6 max-w-[420px] text-lg text-on-inverse/85">
                  A preview of how a journey unfolds: the pace, the places, and the room in between.
                </p>
                <p className="mt-6 font-serif text-2xl text-on-inverse/90">
                  {signature.locations.join(" → ")}
                </p>
                <div className="mt-10">
                  <ButtonLink href={`/trips/${signature.slug}#itinerary`} variant="inverse" arrow>
                    View full itinerary
                  </ButtonLink>
                </div>
              </div>
            </div>

            <ol className="lg:col-span-7">
              {itinerary.map((day, i) => (
                <li key={day.id} className="border-t border-on-inverse/25 first:border-t-0">
                  <Reveal delay={i * 40}>
                    <div className="grid grid-cols-[64px_1fr] gap-4 py-8 md:grid-cols-[112px_1fr] md:py-10">
                      <span className="font-serif text-5xl leading-none tabular-nums text-on-inverse/45 md:text-7xl">
                        {String(day.day_number).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-highlight">
                          {day.location}
                        </p>
                        <h3 className="mt-2 text-2xl leading-8 md:text-3xl md:leading-9">
                          {day.title}
                        </h3>
                        <p className="mt-3 max-w-[520px] text-on-inverse/80">{day.description}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 05 Why AURA */}
      <section aria-labelledby="why-heading" className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                index="05"
                eyebrow="Why AURA"
                title={<span id="why-heading">A travel specialist, not a search box.</span>}
              />
            </Reveal>
            <dl className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-7">
              {WHY.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="group border-t border-line pt-6 transition-colors duration-500 hover:border-fg">
                    <dt className="font-serif text-3xl leading-none tracking-[-0.02em]">
                      {item.title}
                    </dt>
                    <dd className="mt-4 text-muted">{item.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* How it works */}
          <ol className="mt-24 grid gap-px overflow-hidden bg-line md:grid-cols-3">
            {PROCESS.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100} className="bg-bg">
                <div className="group h-full p-8 transition-colors duration-500 hover:bg-highlight md:p-10">
                  <span className="font-serif text-7xl leading-none tabular-nums text-accent transition-colors duration-500 group-hover:text-fg">
                    0{i + 1}
                  </span>
                  <h3 className="mt-8 text-3xl leading-none tracking-[-0.02em]">{title}</h3>
                  <p className="mt-4 text-muted transition-colors duration-500 group-hover:text-fg">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 06 Travel notes */}
      <section aria-labelledby="notes-heading" className="bg-raised py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                index="06"
                eyebrow="Journal"
                title={<span id="notes-heading">Travel notes</span>}
                intro="Field guides and slow travel writing from the people who plan the trips."
              />
              <TextLink href="/journal">Read the journal</TextLink>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <JournalCard post={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Plan your trip */}
      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden bg-signal py-28 text-fg md:py-40"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          fill="none"
          className="pointer-events-none absolute -right-[16vmin] top-1/2 size-[96vmin] -translate-y-1/2 text-fg/30"
        >
          <circle cx="50" cy="50" r="49.5" stroke="currentColor" strokeWidth="0.15" />
          <circle cx="85.5" cy="14.5" r="1.6" fill="var(--butter)" />
        </svg>
        <Container className="relative">
          <Reveal>
            <Eyebrow className="flex items-center gap-3 text-fg">
              <span aria-hidden="true" className="h-px w-8 bg-fg" />
              Plan your trip
            </Eyebrow>
            <h2
              id="cta-heading"
              className="mt-8 max-w-[900px] text-5xl leading-[0.95] tracking-[-0.04em] md:text-8xl"
            >
              Tell us where you want to go. We will help shape the journey.
            </h2>
            <p className="mt-8 max-w-[680px] text-lg text-fg md:text-xl">
              Tell us what you are looking for, and our travel specialists will help create a trip
              around your interests, schedule, and budget.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/plan-your-trip" variant="dark" arrow>
                Plan your trip
              </ButtonLink>
              <Link
                href="/trips"
                className="group inline-flex min-h-11 items-center gap-2 px-2 font-bold"
              >
                <span className="link-underline">Or browse signature journeys</span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <p className="mt-6 text-sm text-fg">
              This is a travel request, not a booking. No payment is taken.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
