import { destinationRepository } from "@/lib/repositories";


export const getDestinations = () => destinationRepository.list();

export async function getFeaturedDestinations() {
  return (await destinationRepository.list()).filter((d) => d.featured);
}

export const getDestinationBySlug = (slug: string) =>
  destinationRepository.getBySlug(slug);

export const getDestinationById = (id: string) =>
  destinationRepository.getById(id);
