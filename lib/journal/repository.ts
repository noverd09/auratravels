import type { JournalPost } from "@/types";

export interface JournalRepository {
  list(): Promise<JournalPost[]>;
  getBySlug(slug: string): Promise<JournalPost | null>;
}
