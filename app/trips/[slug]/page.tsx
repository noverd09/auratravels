import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { Itinerary } from "@/components/trips/Itinerary";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DetailHero } from "@/components/ui/DetailHero";
import { Gallery } from "@/components/ui/Gallery";
import { JsonLd } from "@/components/ui/JsonLd";
import { PlanCta } from "@/components/ui/PlanCta";
import { StickyPlanBar } from "@/components/ui/StickyPlanBar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDestinationById } from "@/lib/destinations/service";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";
import { getTripBySlug, getTripItinerary, getTrips } from "@/lib/trips/service";

export async function generateStaticParams() {
  return (await getTrips()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) return { title: "Trip not found" };
  const dest = await getDestinationById(trip.destination_id);
  const title = `${dest?.name}: ${trip.title}, ${trip.duration} days`;
  return {
    title,
    description: trip.description,
    alternates: { canonical: `/trips/${trip.slug}` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: trip.description,
      url: `/trips/${trip.slug}`,
      images: [{ url: trip.hero_image }],
    },
  };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) notFound();

  const [destination, itinerary] = await Promise.all([
    getDestinationById(trip.destination_id),
    getTripItinerary(trip.id),
  ]);
  const planHref = `/plan-your-trip?trip=${trip.slug}`;
  const name = destination?.name ?? "";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: `${name}: ${trip.title}`,
          description: trip.description,
          url: `${SITE.url}/trips/${trip.slug}`,
          image: `${SITE.url}${trip.hero_image}`,
          touristType: trip.travel_styles,
          itinerary: {
            "@type": "ItemList",
            itemListElement: itinerary.map((d) => ({
              "@type": "ListItem",
              position: d.day_number,
              name: `Day ${d.day_number}: ${d.title}`,
            })),
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: trip.price_from,
            description: "Illustrative starting price per person",
          },
        }}
      />

      <DetailHero
        src={trip.hero_image}
        eyebrow={
          <>
            <span>{name}</span>
            <span className="tabular-nums">{trip.duration} days</span>
          </>
        }
        title={
          <>
            {name} — {trip.title}
          </>
        }
        meta={
          <>
            <span className="font-bold">{trip.locations.join(" → ")}</span>
            <span className="capitalize text-on-inverse/75">{trip.travel_styles.join(", ")}</span>
            <span className="text-on-inverse/75">
              From <span className="font-bold tabular-nums text-on-inverse">{formatPrice(trip.price_from)}</span>{" "}
              per person (illustrative)
            </span>
          </>
        }
      >
        <div className="mt-8">
          <ButtonLink href={planHref} arrow>
            Plan this trip
          </ButtonLink>
        </div>
      </DetailHero>

      {/* Overview */}
      <section aria-labelledby="overview-heading" className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                index="01"
                eyebrow="Overview"
                title={<span id="overview-heading">{trip.description}</span>}
                titleClassName="text-3xl md:text-5xl"
              />
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <p className="text-lg text-muted md:text-xl">{trip.long_description}</p>
              </Reveal>
              <Reveal delay={160}>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
                  <Fact label="Duration" value={`${trip.duration} days`} />
                  <Fact label="Locations" value={String(trip.locations.length)} />
                  <Fact label="Style" value={trip.travel_styles.join(", ")} capitalize />
                  <Fact label="From" value={formatPrice(trip.price_from)} />
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section aria-labelledby="highlights-heading" className="bg-raised py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Highlights"
              title={<span id="highlights-heading">What makes this journey.</span>}
            />
          </Reveal>
          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {trip.highlights.map((h, i) => (
              <Reveal as="li" key={h} delay={(i % 2) * 100}>
                <div className="flex gap-6 border-t border-line pt-6">
                  <span className="font-serif text-4xl leading-none tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg">{h}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Itinerary */}
      <section id="itinerary" aria-labelledby="itinerary-heading" className="scroll-mt-24 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Itinerary"
              title={<span id="itinerary-heading">Day by day.</span>}
              intro="A working plan. We adjust the pace, the stays, and the activities once we know how you like to travel."
            />
          </Reveal>
          <div className="mt-14">
            <Itinerary days={itinerary} />
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="bg-raised py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Gallery"
              title={<span id="gallery-heading">Along the way.</span>}
            />
          </Reveal>
          <div className="mt-14">
            <Gallery images={trip.gallery} />
          </div>
        </Container>
      </section>

      {/* Inclusions */}
      <section aria-labelledby="included-heading" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Details"
              title={<span id="included-heading">What is included.</span>}
            />
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <Reveal>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Included</h3>
              <ul className="mt-6 space-y-4">
                {trip.included.map((item) => (
                  <li key={item} className="flex gap-4">
                    <Check size={20} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Not included</h3>
              <ul className="mt-6 space-y-4">
                {trip.not_included.map((item) => (
                  <li key={item} className="flex gap-4">
                    <X size={20} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-muted" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <p className="mt-12 max-w-[680px] text-sm text-muted">
            Illustrative portfolio content. Prices, inclusions, and availability shown here are not real offers.
          </p>
        </Container>
      </section>

      <StickyPlanBar
        title={`${name} — ${trip.title}`}
        detail={`${trip.duration} days · from ${formatPrice(trip.price_from)} (illustrative)`}
        href={planHref}
      />

      <PlanCta
        title={`Plan this ${name} journey.`}
        body="Send us a few details and a travel specialist will come back with a proposal shaped around your dates, pace, and budget."
        href={planHref}
        label="Plan this trip"
      />
    </>
  );
}

function Fact({ label, value, capitalize = false }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className={`mt-1 font-bold tabular-nums ${capitalize ? "capitalize" : ""}`}>{value}</dd>
    </div>
  );
}
