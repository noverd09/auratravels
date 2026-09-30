import type { Metadata } from "next";
import { StyleCard } from "@/components/ui/Cards";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlanCta } from "@/components/ui/PlanCta";
import { Reveal } from "@/components/ui/Reveal";
import { getTravelStyles } from "@/lib/travel-styles/service";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Adventure, luxury, culture, food, wellness and honeymoon journeys. Start with how you like to travel and find the places and trips that suit it.",
  alternates: { canonical: "/experiences" },
  openGraph: { title: "Experiences | AURA TRAVEL", url: "/experiences" },
};

export default async function ExperiencesPage() {
  const styles = await getTravelStyles();
  return (
    <>
      <PageHeader
        eyebrow="Experiences"
        title={<>Start with how you <span className="hl">like to travel</span>.</>}
        intro="Six ways into a trip. Choose the one that sounds most like you and see the destinations and journeys that fit."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <StyleCard style={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <PlanCta title="Mix and match. Most trips do." body="Many of our travelers combine two or three styles. Tell us your mix and we will shape the days." />
    </>
  );
}
