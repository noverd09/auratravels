import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { JournalCard } from "@/components/ui/Cards";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { PlanCta } from "@/components/ui/PlanCta";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/format";
import { getJournalPosts } from "@/lib/journal/service";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Travel notes from AURA TRAVEL: field guides, slow travel writing, and planning advice for Japan, Bali, Italy and Palawan.",
  alternates: { canonical: "/journal" },
  openGraph: { title: "Journal | AURA TRAVEL", url: "/journal" },
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = await getJournalPosts();
  const categories = Array.from(new Set(all.map((p) => p.category)));
  const active = categories.find((c) => c === category);
  const posts = active ? all.filter((p) => p.category === active) : all;
  const [lead, ...rest] = posts;

  const chips = [
    { label: "All", href: "/journal", on: !active },
    ...categories.map((c) => ({
      label: c,
      href: `/journal?category=${encodeURIComponent(c)}`,
      on: active === c,
    })),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title={<>Travel <span className="hl">notes</span>.</>}
        intro="Field guides and slow travel writing from the people who plan the trips. Fictional editorial content for this portfolio."
      />
      <section className="py-16 md:py-20">
        <Container>
          <nav aria-label="Journal categories" className="mb-14">
            <ul className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    aria-current={c.on ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold transition-[background-color,color,border-color] duration-300 ${
                      c.on ? "border-fg bg-fg text-bg" : "border-line hover:border-fg"
                    }`}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {!lead ? (
            <EmptyState
              title="No articles here yet"
              body="We have not published anything in this category. Try another, or read everything."
              action={
                <ButtonLink href="/journal" variant="secondary">
                  All articles
                </ButtonLink>
              }
            />
          ) : (
            <>
              <article className="group grid gap-8 md:grid-cols-12 md:gap-12">
                <Link href={`/journal/${lead.slug}`} className="md:col-span-7" aria-label={lead.title}>
                  <Photo
                    src={lead.hero_image}
                    priority
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="aspect-[4/3]"
                    imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </Link>
                <div className="flex flex-col justify-center md:col-span-5">
                  <Eyebrow className="flex items-center gap-4 text-muted">
                    <span className="text-accent">{lead.category}</span>
                    <span className="tabular-nums">{lead.reading_minutes} min read</span>
                  </Eyebrow>
                  <h2 className="mt-4 text-4xl leading-none tracking-[-0.03em] md:text-5xl">
                    <Link href={`/journal/${lead.slug}`} className="link-underline">
                      {lead.title}
                    </Link>
                  </h2>
                  <p className="mt-6 text-lg text-muted">{lead.excerpt}</p>
                  <p className="mt-4 text-sm text-muted">
                    <time dateTime={lead.published_at}>{formatDate(lead.published_at)}</time>
                  </p>
                </div>
              </article>

              {rest.length > 0 && (
                <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <JournalCard key={p.id} post={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </section>
      <PlanCta
        title="Reading is a good start. Going is better."
        body="Tell us where your reading has taken you."
      />
    </>
  );
}
