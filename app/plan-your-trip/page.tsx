import type { Metadata } from "next";
import { PlanForm, type PlanPrefill } from "@/components/plan/PlanForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getDestinationById, getDestinationBySlug } from "@/lib/destinations/service";
import { getTravelStyles } from "@/lib/travel-styles/service";
import { getTripBySlug } from "@/lib/trips/service";

export const metadata: Metadata = {
  title: "Plan your trip",
  description:
    "Tell AURA TRAVEL where you want to go, when, and what matters to you. Nine short steps, then a travel specialist takes it from there.",
  alternates: { canonical: "/plan-your-trip" },
  openGraph: { title: "Plan your trip | AURA TRAVEL", url: "/plan-your-trip" },
};

export default async function PlanYourTripPage({
  searchParams,
}: {
  searchParams: Promise<{ trip?: string; destination?: string; style?: string }>;
}) {
  const { trip: tripSlug, destination: destSlug, style } = await searchParams;

  const prefill: PlanPrefill = { destinations: [], travel_style: [], trip_id: null, trip_label: null };

  if (tripSlug) {
    const trip = await getTripBySlug(tripSlug);
    if (trip) {
      const dest = await getDestinationById(trip.destination_id);
      prefill.trip_id = trip.id;
      prefill.trip_label = `${dest?.name ?? ""}: ${trip.title}`;
      if (dest) prefill.destinations = [dest.planner_option];
      prefill.travel_style = trip.travel_styles.map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    }
  }
  if (destSlug && prefill.destinations.length === 0) {
    const dest = await getDestinationBySlug(destSlug);
    if (dest) prefill.destinations = [dest.planner_option];
  }
  if (style && prefill.travel_style.length === 0) {
    const styles = await getTravelStyles();
    const match = styles.find((s) => s.slug === style);
    if (match) prefill.travel_style = [match.name];
  }

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Eyebrow className="text-accent">Plan your trip</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-9 tracking-[-0.02em] md:text-4xl md:leading-10">
              A few questions, then a specialist takes it from here.
            </p>
            <ul className="mt-8 space-y-3 text-muted">
              <li>About three minutes.</li>
              <li>No payment, no commitment.</li>
              <li>Skip anything you are unsure about.</li>
            </ul>
          </aside>
          <div className="lg:col-span-8">
            <PlanForm prefill={prefill} />
          </div>
        </div>
      </Container>
    </div>
  );
}
