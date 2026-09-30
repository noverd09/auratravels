import type { TravelStyle, TravelStyleSlug } from "@/types";

export interface TravelStyleRepository {
  list(): Promise<TravelStyle[]>;
  getBySlug(slug: TravelStyleSlug | string): Promise<TravelStyle | null>;
}
