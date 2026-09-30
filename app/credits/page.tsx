import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllImageAssets } from "@/lib/images";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Photographer credits and licenses for images used on the AURA TRAVEL portfolio site.",
  alternates: { canonical: "/credits" },
  robots: { index: false },
};

export default function CreditsPage() {
  const list = getAllImageAssets();
  return (
    <>
      <PageHeader
        eyebrow="Credits"
        title="Photo credits."
        intro="Every photograph is from Wikimedia Commons under the license shown. They stand in for final client photography."
      />
      <Container className="py-16 md:py-24">
        <ul className="divide-y divide-line border-y border-line">
          {list.map((img) => (
            <li key={img.src} className="grid gap-2 py-5 md:grid-cols-[1fr_260px_140px] md:gap-8">
              <p>{img.alt}</p>
              <p className="text-muted">{img.credit}</p>
              <p>
                <a
                  href={img.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex min-h-11 items-center text-sm font-bold"
                >
                  {img.license}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
