import type { Destination } from "@/types";

/** Data access contract. A Supabase implementation only has to satisfy this. */
export interface DestinationRepository {
  list(): Promise<Destination[]>;
  getBySlug(slug: string): Promise<Destination | null>;
  getById(id: string): Promise<Destination | null>;
}
