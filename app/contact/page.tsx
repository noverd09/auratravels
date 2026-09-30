import type { Metadata } from "next";
import { InstagramLogo, LinkedinLogo, PinterestLogo } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/plan/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AURA TRAVEL. Send a general question, or start planning your trip with our questionnaire.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | AURA TRAVEL", url: "/contact" },
};

const SOCIAL = [
  { label: "Instagram", Icon: InstagramLogo },
  { label: "Pinterest", Icon: PinterestLogo },
  { label: "LinkedIn", Icon: LinkedinLogo },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Say <span className="hl">hello</span>.</>}
        intro="For a question about the agency, write to us here. To start planning a trip, the questionnaire is the fastest route."
      >
        <div className="mt-8">
          <ButtonLink href="/plan-your-trip" arrow>
            Plan your trip
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow className="text-muted">Studio</Eyebrow>
              <address className="mt-4 text-lg not-italic">
                {SITE.address}
              </address>

              <Eyebrow className="mt-10 text-muted">Email</Eyebrow>
              <p className="mt-2 text-lg">
                <a href={`mailto:${SITE.email}`} className="link-underline inline-flex min-h-11 items-center break-all">
                  {SITE.email}
                </a>
              </p>

              <Eyebrow className="mt-6 text-muted">Phone</Eyebrow>
              <p className="mt-2 text-lg tabular-nums">
                <a href="tel:+14155550148" className="link-underline inline-flex min-h-11 items-center">
                  {SITE.phone}
                </a>
              </p>

              <Eyebrow className="mt-6 text-muted">Hours</Eyebrow>
              <p className="mt-2 text-lg">Monday to Friday, 9:00 to 17:30 Pacific</p>

              <Eyebrow className="mt-10 text-muted">Social</Eyebrow>
              <ul className="mt-3 flex gap-2">
                {SOCIAL.map(({ label, Icon }) => (
                  <li key={label}>
                    <a
                      href="#"
                      aria-label={`${label} (placeholder link)`}
                      aria-disabled="true"
                      className="flex size-11 items-center justify-center rounded-full border border-line transition-[background-color,color] hover:bg-fg hover:text-bg"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted">Social accounts are placeholders for this portfolio.</p>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow className="mb-6 text-muted">General inquiry</Eyebrow>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
