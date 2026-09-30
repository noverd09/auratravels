import type { Destination, TravelStyleSlug } from "@/types";

/** Pure filtering, safe to import from client components. */
export interface DestinationFilters {
  query?: string;
  style?: TravelStyleSlug | "all";
  region?: string;
}

/** Pure filter used by the destinations page. Kept here so a database query can replace it later. */
export function filterDestinations(
  list: Destination[],
  { query = "", style = "all", region = "All" }: DestinationFilters,
) {
  const q = query.trim().toLowerCase();
  return list.filter((d) => {
    if (style !== "all" && !d.travel_styles.includes(style)) return false;
    if (region !== "All") {
      const inRegion =
        region === "Islands" ? d.tags.includes("islands") : d.region === region;
      if (!inRegion) return false;
    }
    if (q) {
      const haystack = [d.name, d.country, d.region, d.description, ...d.themes]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const DESTINATION_REGIONS = [
  "All",
  "Asia",
  "Europe",
  "Southeast Asia",
  "Islands",
] as const;
