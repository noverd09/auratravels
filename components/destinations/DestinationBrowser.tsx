"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { DestinationCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import {
  DESTINATION_REGIONS,
  filterDestinations,
} from "@/lib/destinations/filters";
import type { Destination, TravelStyle, TravelStyleSlug } from "@/types";

export function DestinationBrowser({
  destinations,
  styles,
  initialStyle = "all",
}: {
  destinations: Destination[];
  styles: TravelStyle[];
  initialStyle?: TravelStyleSlug | "all";
}) {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState<TravelStyleSlug | "all">(initialStyle);
  const [region, setRegion] = useState<string>("All");

  const results = useMemo(
    () => filterDestinations(destinations, { query, style, region }),
    [destinations, query, style, region],
  );

  const styleOptions = [
    { value: "all" as const, label: "All styles" },
    ...styles.map((s) => ({ value: s.slug, label: s.name })),
  ];
  const regionOptions = DESTINATION_REGIONS.map((r) => ({ value: r, label: r }));
  const filtered = query !== "" || style !== "all" || region !== "All";

  const reset = () => {
    setQuery("");
    setStyle("all");
    setRegion("All");
  };

  return (
    <div>
      <form
        role="search"
        aria-label="Filter destinations"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-8 border-b border-line pb-10"
      >
        <div>
          <label
            htmlFor="dest-search"
            className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-muted"
          >
            Search
          </label>
          <div className="relative max-w-[520px]">
            <MagnifyingGlass
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="dest-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “Kyoto”, “coast” or “diving”"
              autoComplete="off"
              className="min-h-12 w-full rounded-xs border border-line bg-bg py-3 pl-12 pr-4 text-base placeholder:text-muted/70 focus:border-fg"
            />
          </div>
        </div>
        <FilterChips
          label="Region"
          options={regionOptions}
          value={region}
          onChange={setRegion}
        />
        <FilterChips
          label="Travel style"
          options={styleOptions}
          value={style}
          onChange={setStyle}
        />
      </form>

      <p role="status" aria-live="polite" className="mt-8 text-sm text-muted">
        <span className="tabular-nums font-bold text-fg">{results.length}</span>{" "}
        {results.length === 1 ? "destination" : "destinations"}
        {filtered && (
          <>
            {" "}
            <button
              type="button"
              onClick={reset}
              className="ml-3 inline-flex min-h-11 items-center font-bold text-accent underline underline-offset-4"
            >
              Clear filters
            </button>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No destinations found"
            body={
              query
                ? `Nothing matches “${query}” with these filters. Try a broader search or clear the filters.`
                : "Nothing matches these filters. Try a different combination."
            }
            action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {results.map((d, i) => (
            <DestinationCard
              key={d.id}
              destination={d}
              index={i}
              aspect="aspect-[4/3]"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      )}
    </div>
  );
}
