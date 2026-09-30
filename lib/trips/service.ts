import { tripRepository } from "@/lib/repositories";
import type { TravelStyleSlug } from "@/types";

export const getTrips = () => tripRepository.list();

export async function getFeaturedTrips() {
  return (await tripRepository.list()).filter((t) => t.featured);
}

export const getTripBySlug = (slug: string) => tripRepository.getBySlug(slug);

export const getTripItinerary = (tripId: string) =>
  tripRepository.listItinerary(tripId);

export async function getTripsForDestination(destinationId: string) {
  return (await tripRepository.list()).filter(
    (t) => t.destination_id === destinationId,
  );
}

export async function getTripsForStyle(style: TravelStyleSlug) {
  return (await tripRepository.list()).filter((t) =>
    t.travel_styles.includes(style),
  );
}
