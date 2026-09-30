import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuraDot } from "@/components/ui/AuraMark";
import { TripCard } from "@/components/ui/Cards";
import { Container } from "@/components/ui/Container";
import { DetailHero } from "@/components/ui/DetailHero";
import { Gallery } from "@/components/ui/Gallery";
import { JsonLd } from "@/components/ui/JsonLd";
import { PlanCta } from "@/components/ui/PlanCta";
import { StickyPlanBar } from "@/components/ui/StickyPlanBar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDestinationBySlug, getDestinations } from "@/lib/destinations/service";
import { SITE } from "@/lib/site";
import { getTripsForDestination } from "@/lib/trips/service";

export async function generateStaticParams() {
  return (await getDestinations()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) return { title: "Destination not found" };
  return {
    title: `${d.name}: ${d.themes.join(", ")}`,
    description: d.description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: `${d.name} | ${SITE.name}`,
      description: d.description,
      url: `/destinations/${d.slug}`,
      images: [{ url: d.hero_image }],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const trips = await getTripsForDestination(destination.id);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.description,
          url: `${SITE.url}/destinations/${destination.slug}`,
          image: `${SITE.url}${destination.hero_image}`,
        }}
      />

      <DetailHero
        src={destination.hero_image}
        eyebrow={
          <>
            <AuraDot aura={destination.aura} size={10} />
            <span>{destination.country}</span>
            <span>{destination.region}</span>
          </>
        }
        title={destination.name}
        meta={
          <>
            <span className="font-bold">{destination.hero_place}</span>
            <span className="tabular-nums text-on-inverse/75">{destination.coordinates}</span>
            <span className="text-on-inverse/75">{destination.themes.join(" · ")}</span>
          </>
        }
      />

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                index="01"
                eyebrow="Why visit"
                title={<span id="intro-heading">{destination.description}</span>}
                titleClassName="text-3xl md:text-5xl"
              />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <p className="font-serif text-2xl leading-9 text-fg md:text-3xl md:leading-10">
                {destination.long_description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Best time */}
      <section aria-labelledby="time-heading" className="bg-raised py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <h2
              id="time-heading"
              className="text-xs font-bold uppercase tracking-[0.14em] text-muted lg:col-span-5"
            >
              <span className="mr-4 tabular-nums text-accent">02</span>Best time to visit
            </h2>
            <p className="max-w-[680px] text-lg lg:col-span-7 lg:col-start-6 md:text-xl">
              {destination.best_time_to_visit}
            </p>
          </div>
        </Container>
      </section>

      {/* Experiences */}
      <section aria-labelledby="exp-heading" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Experiences"
              title={<span id="exp-heading">What you can expect.</span>}
            />
          </Reveal>
          <dl className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {destination.experiences.map((e, i) => (
              <Reveal key={e.title} delay={(i % 2) * 100}>
                <div className="border-t border-line pt-6">
                  <dt className="font-serif text-3xl leading-none tracking-[-0.02em]">
                    {e.title}
                  </dt>
                  <dd className="mt-4 max-w-[460px] text-muted">{e.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Recommended trips */}
      <section aria-labelledby="trips-heading" className="bg-raised py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Recommended trips"
              title={<span id="trips-heading">Journeys through {destination.name}.</span>}
            />
          </Reveal>
          {trips.length === 0 ? (
            <p className="mt-10 max-w-[520px] text-muted">
              We are refreshing our {destination.name} routes.{" "}
              <Link href="/plan-your-trip" className="font-bold underline underline-offset-4">
                Tell us what you have in mind
              </Link>{" "}
              and we will design one for you.
            </p>
          ) : (
            <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {trips.map((t, i) => (
                <Reveal key={t.id} delay={i * 100}>
                  <TripCard trip={t} destinationName={destination.name} />
                </Reveal>
              ))}
            </div>
          )}
          <p className="mt-10 text-sm text-muted">
            Starting prices are illustrative portfolio content.
          </p>
        </Container>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Gallery"
              title={<span id="gallery-heading">A closer look.</span>}
            />
          </Reveal>
          <div className="mt-14">
            <Gallery images={destination.gallery} />
          </div>
        </Container>
      </section>

      <StickyPlanBar
        title={`Ready to explore ${destination.name}?`}
        detail={destination.themes.join(" · ")}
        href={`/plan-your-trip?destination=${destination.slug}`}
        label="Plan your trip"
      />

      <PlanCta
        title={`Ready to explore ${destination.name}?`}
        body={`Tell us when you would like to go and what matters to you. We will shape a ${destination.name} journey around it.`}
        href={`/plan-your-trip?destination=${destination.slug}`}
      />
    </>
  );
}
