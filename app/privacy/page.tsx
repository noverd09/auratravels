import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio demo handles the information you enter.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy." intro="AURA TRAVEL is a fictional agency built as a portfolio project. This page explains what the demo does with your input." />
      <Container className="py-16 md:py-24">
        <div className="max-w-[680px] space-y-6 text-lg">
          <h2 className="text-3xl tracking-[-0.02em]">What happens to your answers</h2>
          <p>
            The Plan your trip questionnaire and the contact form validate what you enter and then store it in
            temporary server memory, so the confirmation screen can show a summary. Nothing is written to a
            database, sent by email, or shared with anyone. It disappears when the server restarts.
          </p>
          <h2 className="pt-6 text-3xl tracking-[-0.02em]">If this were a live agency</h2>
          <p>
            A production version would store requests in a managed database, tell you exactly who can see them,
            and let you ask for a copy or deletion. Please do not enter real personal information in this demo.
          </p>
          <h2 className="pt-6 text-3xl tracking-[-0.02em]">Cookies and tracking</h2>
          <p>This demo sets no tracking cookies and includes no analytics.</p>
        </div>
      </Container>
    </>
  );
}
