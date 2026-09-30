import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlanCta } from "@/components/ui/PlanCta";
import { TripBrowser } from "@/components/trips/TripBrowser";
import { getDestinations } from "@/lib/destinations/service";
import { getTravelStyles } from "@/lib/travel-styles/service";
import { getTrips } from "@/lib/trips/service";

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Browse AURA TRAVEL signature journeys. Filter by destination, duration and travel style, then tell us how you would change one.",
  alternates: { canonical: "/trips" },
  openGraph: { title: "Trips | AURA TRAVEL", url: "/trips" },
};

export default async function TripsPage() {
  const [trips, destinations, styles] = await Promise.all([
    getTrips(),
    getDestinations(),
    getTravelStyles(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Signature journeys"
        title={<>Routes to <span className="hl">start</span> from.</>}
        intro="Every journey here is a starting point. Change the pace, the places, or the season and we will rebuild it around you."
      />
      <section className="py-16 md:py-20">
        <Container>
          <TripBrowser trips={trips} destinations={destinations} styles={styles} />
        </Container>
      </section>
      <PlanCta
        title="Don't see the trip you have in mind?"
        body="Most of our journeys begin as a conversation. Tell us what you want and we will design it from scratch."
      />
    </>
  );
}
