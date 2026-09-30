import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AuraDot } from "@/components/ui/AuraMark";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Photo } from "@/components/ui/Photo";
import { formatDate, formatDuration, formatPrice } from "@/lib/format";
import type { Destination, JournalPost, Trip, TravelStyle } from "@/types";

const ZOOM =
  "transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

export function DestinationCard({
  destination,
  index,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  destination: Destination;
  index?: number;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <article className="group relative">
      <Link
        data-cursor="view"
        href={`/destinations/${destination.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        <MaskReveal>
          <Photo
          src={destination.hero_image}
          sizes={sizes}
          priority={priority}
          className={aspect}
          imgClassName={ZOOM}
        />
        </MaskReveal>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <Eyebrow className="flex items-center gap-3 text-muted">
              <AuraDot aura={destination.aura} />
              {typeof index === "number" && (
                <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              )}
              <span>{destination.country}</span>
            </Eyebrow>
            <h3 className="mt-3 text-4xl leading-none tracking-[-0.03em]">
              {destination.name}
            </h3>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.1em] text-muted">
              {destination.themes.join(" · ")}
            </p>
            <p className="mt-4 max-w-[440px] text-base text-muted">
              {destination.description}
            </p>
          </div>
          <ArrowUpRight
            size={28}
            aria-hidden="true"
            className="mt-2 shrink-0 text-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
        <span className="mt-5 inline-block min-h-6 text-base font-bold">
          <span className="link-underline group-hover:[text-decoration-color:currentColor]">
            Explore {destination.name}
          </span>
        </span>
      </Link>
    </article>
  );
}

export function TripCard({
  trip,
  destinationName,
  aspect = "aspect-[3/2]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  trip: Trip;
  destinationName: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <article className="group">
      <Link href={`/trips/${trip.slug}`} data-cursor="view" className="block focus-visible:outline-offset-4">
        <MaskReveal><Photo src={trip.hero_image} sizes={sizes} className={aspect} imgClassName={ZOOM} /></MaskReveal>
        <div className="mt-5">
          <Eyebrow className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
            <span>{destinationName}</span>
            <span className="tabular-nums">{formatDuration(trip.duration)}</span>
          </Eyebrow>
          <h3 className="mt-3 text-3xl leading-none tracking-[-0.02em]">
            {destinationName}: {trip.title}
          </h3>
          <p className="mt-3 text-sm font-bold text-muted">
            {trip.locations.join(" → ")}
          </p>
          <p className="mt-3 text-base text-muted">{trip.description}</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-sm text-muted">
              From{" "}
              <span className="font-bold tabular-nums text-fg">
                {formatPrice(trip.price_from)}
              </span>{" "}
              per person
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Travel styles">
              {trip.travel_styles.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-raised px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-fg"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function JournalCard({
  post,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspect = "aspect-[3/2]",
}: {
  post: JournalPost;
  sizes?: string;
  aspect?: string;
}) {
  return (
    <article className="group">
      <Link href={`/journal/${post.slug}`} data-cursor="view" className="block focus-visible:outline-offset-4">
        <MaskReveal><Photo src={post.hero_image} sizes={sizes} className={aspect} imgClassName={ZOOM} /></MaskReveal>
        <Eyebrow className="mt-5 flex items-center gap-4 text-muted">
          <span className="text-accent">{post.category}</span>
          <span className="tabular-nums">{post.reading_minutes} min read</span>
        </Eyebrow>
        <h3 className="mt-3 text-2xl leading-8 tracking-[-0.015em] md:text-3xl md:leading-9">
          <span className="link-underline group-hover:[text-decoration-color:currentColor]">
            {post.title}
          </span>
        </h3>
        <p className="mt-3 text-base text-muted">{post.excerpt}</p>
        <p className="mt-3 text-sm text-muted">
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
        </p>
        <span className="mt-4 inline-block text-base font-bold">Read article</span>
      </Link>
    </article>
  );
}

export function StyleCard({ style }: { style: TravelStyle }) {
  return (
    <article className="group">
      <Link
        data-cursor="view"
        href={`/experiences/${style.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        <MaskReveal>
          <Photo
          src={style.image}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3]"
          imgClassName={ZOOM}
        />
        </MaskReveal>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl leading-none tracking-[-0.02em]">{style.name}</h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em] text-muted">
              {style.tagline}
            </p>
          </div>
          <ArrowUpRight
            size={24}
            aria-hidden="true"
            className="mt-1 shrink-0 text-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
      </Link>
    </article>
  );
}
