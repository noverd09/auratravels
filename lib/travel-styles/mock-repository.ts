import { travelStyles } from "@/data/travel-styles";
import type { TravelStyleRepository } from "./repository";

export class MockTravelStyleRepository implements TravelStyleRepository {
  async list() {
    return travelStyles;
  }
  async getBySlug(slug: string) {
    return travelStyles.find((s) => s.slug === slug) ?? null;
  }
}
