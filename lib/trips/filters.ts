import type { Trip, TravelStyleSlug } from "@/types";

/** Pure filtering, safe to import from client components. */
export const DURATION_BUCKETS = [
  { value: "all", label: "Any length" },
  { value: "short", label: "Up to 7 days" },
  { value: "medium", label: "8 to 10 days" },
  { value: "long", label: "11 days or more" },
] as const;

export type DurationBucket = (typeof DURATION_BUCKETS)[number]["value"];

export interface TripFilters {
  destinationId?: string;
  duration?: DurationBucket;
  style?: TravelStyleSlug | "all";
}

export function filterTrips(
  list: Trip[],
  { destinationId = "all", duration = "all", style = "all" }: TripFilters,
) {
  return list.filter((t) => {
    if (destinationId !== "all" && t.destination_id !== destinationId) return false;
    if (style !== "all" && !t.travel_styles.includes(style)) return false;
    if (duration === "short" && t.duration > 7) return false;
    if (duration === "medium" && (t.duration < 8 || t.duration > 10)) return false;
    if (duration === "long" && t.duration < 11) return false;
    return true;
  });
}
