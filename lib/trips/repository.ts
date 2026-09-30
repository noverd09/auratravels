import type { ItineraryDay, Trip } from "@/types";

export interface TripRepository {
  list(): Promise<Trip[]>;
  getBySlug(slug: string): Promise<Trip | null>;
  getById(id: string): Promise<Trip | null>;
  listItinerary(tripId: string): Promise<ItineraryDay[]>;
}
