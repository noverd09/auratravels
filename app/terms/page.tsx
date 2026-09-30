import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the AURA TRAVEL portfolio demo.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms." intro="AURA TRAVEL is a fictional agency. These terms describe the limits of this demonstration." />
      <Container className="py-16 md:py-24">
        <div className="max-w-[680px] space-y-6 text-lg">
          <h2 className="text-3xl tracking-[-0.02em]">Not a real service</h2>
          <p>
            No trips are sold on this site. Destinations, itineraries, prices, team members, and articles are
            fictional or illustrative. A travel request sent through the questionnaire is not a booking and
            creates no obligation.
          </p>
          <h2 className="pt-6 text-3xl tracking-[-0.02em]">Photography</h2>
          <p>
            Photographs come from Wikimedia Commons under Creative Commons or public domain licenses. Credits
            and licenses are listed on the photo credits page.
          </p>
        </div>
      </Container>
    </>
  );
}
