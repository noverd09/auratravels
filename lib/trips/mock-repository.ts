import { itineraryDays } from "@/data/itineraries";
import { trips } from "@/data/trips";
import type { TripRepository } from "./repository";

export class MockTripRepository implements TripRepository {
  async list() {
    return trips;
  }
  async getBySlug(slug: string) {
    return trips.find((t) => t.slug === slug) ?? null;
  }
  async getById(id: string) {
    return trips.find((t) => t.id === id) ?? null;
  }
  async listItinerary(tripId: string) {
    return itineraryDays
      .filter((d) => d.trip_id === tripId)
      .sort((a, b) => a.day_number - b.day_number);
  }
}
