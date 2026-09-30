"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/FilterChips";
import { DURATION_BUCKETS, filterTrips, type DurationBucket } from "@/lib/trips/filters";
import type { Destination, TravelStyle, TravelStyleSlug, Trip } from "@/types";

export function TripBrowser({
  trips,
  destinations,
  styles,
}: {
  trips: Trip[];
  destinations: Destination[];
  styles: TravelStyle[];
}) {
  const [destinationId, setDestinationId] = useState("all");
  const [duration, setDuration] = useState<DurationBucket>("all");
  const [style, setStyle] = useState<TravelStyleSlug | "all">("all");

  const results = useMemo(
    () => filterTrips(trips, { destinationId, duration, style }),
    [trips, destinationId, duration, style],
  );

  const destinationOptions = [
    { value: "all", label: "All destinations" },
    ...destinations.map((d) => ({ value: d.id, label: d.name })),
  ];
  const styleOptions = [
    { value: "all" as const, label: "All styles" },
    ...styles.map((s) => ({ value: s.slug, label: s.name })),
  ];
  const filtered = destinationId !== "all" || duration !== "all" || style !== "all";
  const nameOf = (id: string) => destinations.find((d) => d.id === id)?.name ?? "";

  const reset = () => {
    setDestinationId("all");
    setDuration("all");
    setStyle("all");
  };

  return (
    <div>
      <form
        aria-label="Filter trips"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-8 border-b border-line pb-10"
      >
        <FilterChips
          label="Destination"
          options={destinationOptions}
          value={destinationId}
          onChange={setDestinationId}
        />
        <FilterChips
          label="Duration"
          options={DURATION_BUCKETS}
          value={duration}
          onChange={setDuration}
        />
        <FilterChips label="Travel style" options={styleOptions} value={style} onChange={setStyle} />
      </form>

      <p role="status" aria-live="polite" className="mt-8 text-sm text-muted">
        <span className="tabular-nums font-bold text-fg">{results.length}</span>{" "}
        {results.length === 1 ? "trip" : "trips"}
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="ml-3 inline-flex min-h-11 items-center font-bold text-accent underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </p>

      {results.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No trips found"
            body="No signature journey matches this combination yet. Clear the filters, or tell us what you have in mind and we will design one."
            action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <TripCard key={t.id} trip={t} destinationName={nameOf(t.destination_id)} />
          ))}
        </div>
      )}
      <p className="mt-12 text-sm text-muted">
        Trip content and starting prices are illustrative portfolio material.
      </p>
    </div>
  );
}
