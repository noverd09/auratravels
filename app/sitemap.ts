import type { MetadataRoute } from "next";
import { getDestinations } from "@/lib/destinations/service";
import { getJournalPosts } from "@/lib/journal/service";
import { SITE } from "@/lib/site";
import { getTravelStyles } from "@/lib/travel-styles/service";
import { getTrips } from "@/lib/trips/service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, trips, posts, styles] = await Promise.all([
    getDestinations(),
    getTrips(),
    getJournalPosts(),
    getTravelStyles(),
  ]);
  const at = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });
  return [
    at("/", 1),
    at("/plan-your-trip", 0.9),
    at("/destinations", 0.8),
    at("/trips", 0.8),
    at("/experiences", 0.6),
    at("/journal", 0.6),
    at("/about", 0.5),
    at("/contact", 0.5),
    ...destinations.map((d) => at(`/destinations/${d.slug}`, 0.8, d.created_at)),
    ...trips.map((t) => at(`/trips/${t.slug}`, 0.8, t.created_at)),
    ...styles.map((s) => at(`/experiences/${s.slug}`, 0.5)),
    ...posts.map((p) => at(`/journal/${p.slug}`, 0.6, p.published_at)),
  ];
}
