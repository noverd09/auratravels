import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationCard, TripCard } from "@/components/ui/Cards";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlanCta } from "@/components/ui/PlanCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDestinations } from "@/lib/destinations/service";
import { getTravelStyle, getTravelStyles } from "@/lib/travel-styles/service";
import { getTripsForStyle } from "@/lib/trips/service";
import type { TravelStyleSlug } from "@/types";

export async function generateStaticParams() {
  return (await getTravelStyles()).map((s) => ({ style: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ style: string }>;
}): Promise<Metadata> {
  const { style } = await params;
  const s = await getTravelStyle(style);
  if (!s) return { title: "Experience not found" };
  return {
    title: `${s.name} travel`,
    description: s.description,
    alternates: { canonical: `/experiences/${s.slug}` },
    openGraph: { title: `${s.name} travel | AURA TRAVEL`, description: s.description, url: `/experiences/${s.slug}`, images: [{ url: s.image }] },
  };
}

export default async function StylePage({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const s = await getTravelStyle(style);
  if (!s) notFound();

  const [allDestinations, trips] = await Promise.all([
    getDestinations(),
    getTripsForStyle(s.slug as TravelStyleSlug),
  ]);
  const destinations = allDestinations.filter((d) => d.travel_styles.includes(s.slug));
  const nameOf = (id: string) => allDestinations.find((d) => d.id === id)?.name ?? "";

  return (
    <>
      <PageHeader eyebrow={`Experiences · ${s.name}`} title={s.tagline} intro={s.description} />

      <section aria-labelledby="dest-heading" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading index="01" eyebrow="Destinations" title={<span id="dest-heading">Where {s.name.toLowerCase()} lives.</span>} />
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {destinations.map((d, i) => (
              <Reveal key={d.id} delay={(i % 2) * 100}>
                <DestinationCard destination={d} index={i} aspect="aspect-[4/3]" sizes="(min-width: 640px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="trip-heading" className="bg-raised py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading index="02" eyebrow="Journeys" title={<span id="trip-heading">Trips built around it.</span>} />
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 100}>
                <TripCard trip={t} destinationName={nameOf(t.destination_id)} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">Starting prices are illustrative portfolio content.</p>
        </Container>
      </section>

      <PlanCta
        title={`Plan a ${s.name.toLowerCase()} journey.`}
        body="Tell us your dates and what matters most. We will suggest where and how."
        href={`/plan-your-trip?style=${s.slug}`}
      />
    </>
  );
}
