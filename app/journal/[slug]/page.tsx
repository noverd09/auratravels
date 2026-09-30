import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { JournalCard } from "@/components/ui/Cards";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { PlanCta } from "@/components/ui/PlanCta";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/format";
import { getImageAsset } from "@/lib/images";
import {
  getJournalPostBySlug,
  getJournalPosts,
  getRelatedPosts,
} from "@/lib/journal/service";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  return (await getJournalPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/journal/${post.slug}`,
      publishedTime: post.published_at,
      images: [{ url: post.hero_image }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post, 3);
  const asset = getImageAsset(post.hero_image);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.published_at,
          image: `${SITE.url}${post.hero_image}`,
          author: { "@type": "Organization", name: SITE.name },
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />
      <article>
        <header className="pb-12 pt-16 md:pb-16 md:pt-24">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm">
              <Link
                href="/journal"
                className="link-underline inline-flex min-h-11 items-center font-bold"
              >
                Journal
              </Link>
            </nav>
            <Eyebrow className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
              <span className="text-accent">{post.category}</span>
              <span className="tabular-nums">{post.reading_minutes} min read</span>
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </Eyebrow>
            <h1 className="mt-6 max-w-[960px] text-5xl leading-none tracking-[-0.035em] md:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[680px] text-xl text-muted">{post.excerpt}</p>
          </Container>
        </header>

        <Container>
          <figure>
            <Photo src={post.hero_image} priority sizes="100vw" className="aspect-[16/9]" />
            {asset.credit && (
              <figcaption className="mt-3 text-sm text-muted">
                {asset.alt}. Photo: {asset.credit}, {asset.license}.
              </figcaption>
            )}
          </figure>
        </Container>

        <Container className="py-16 md:py-24">
          <div className="lg:ml-[calc((100%/12)*2)]">
            <ArticleBody content={post.content} />
            <p className="mt-16 max-w-[680px] border-t border-line pt-6 text-sm text-muted">
              Fictional editorial content written for a portfolio project.
            </p>
          </div>
        </Container>
      </article>

      <section aria-labelledby="related-heading" className="bg-raised py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Keep reading"
            title={<span id="related-heading">Related articles</span>}
            titleClassName="text-3xl md:text-5xl"
          />
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {related.map((p) => (
              <JournalCard key={p.id} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <PlanCta
        title="Ready to turn reading into a trip?"
        body="Tell us where you would like to go and we will build the journey."
        href={
          post.destination_slug
            ? `/plan-your-trip?destination=${post.destination_slug}`
            : "/plan-your-trip"
        }
      />
    </>
  );
}
