import type { Metadata } from "next";
import { DestinationBrowser } from "@/components/destinations/DestinationBrowser";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlanCta } from "@/components/ui/PlanCta";
import { getDestinations } from "@/lib/destinations/service";
import { getTravelStyles } from "@/lib/travel-styles/service";
import type { TravelStyleSlug } from "@/types";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore AURA TRAVEL destinations: Japan, Bali, Italy and Palawan. Filter by region and travel style to find your next journey.",
  alternates: { canonical: "/destinations" },
  openGraph: { title: "Destinations | AURA TRAVEL", url: "/destinations" },
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string }>;
}) {
  const { style } = await searchParams;
  const [destinations, styles] = await Promise.all([getDestinations(), getTravelStyles()]);
  const initialStyle = styles.some((s) => s.slug === style)
    ? (style as TravelStyleSlug)
    : "all";

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title={<>Where would you like to <span className="hl">be</span>?</>}
        intro="A short list of places we know well, each one planned with local partners. Filter by region or travel style, or search for something specific."
      />
      <section className="py-16 md:py-20">
        <Container>
          <DestinationBrowser
            destinations={destinations}
            styles={styles}
            initialStyle={initialStyle}
          />
        </Container>
      </section>
      <PlanCta
        title="Not sure where to go? Start with how you want to feel."
        body="Tell us what you are after and we will suggest places you may not have considered."
      />
    </>
  );
}
