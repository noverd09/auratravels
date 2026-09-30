import { destinations } from "@/data/destinations";
import type { DestinationRepository } from "./repository";

export class MockDestinationRepository implements DestinationRepository {
  async list() {
    return destinations;
  }
  async getBySlug(slug: string) {
    return destinations.find((d) => d.slug === slug) ?? null;
  }
  async getById(id: string) {
    return destinations.find((d) => d.id === id) ?? null;
  }
}
