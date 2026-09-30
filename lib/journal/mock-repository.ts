import { journalPosts } from "@/data/journal";
import type { JournalRepository } from "./repository";

export class MockJournalRepository implements JournalRepository {
  async list() {
    return [...journalPosts].sort(
      (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at),
    );
  }
  async getBySlug(slug: string) {
    return journalPosts.find((p) => p.slug === slug) ?? null;
  }
}
