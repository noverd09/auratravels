import { journalRepository } from "@/lib/repositories";
import type { JournalPost } from "@/types";

export const getJournalPosts = () => journalRepository.list();

export async function getFeaturedJournalPosts(limit = 3) {
  const all = await journalRepository.list();
  const featured = all.filter((p) => p.featured);
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, limit);
}

export const getJournalPostBySlug = (slug: string) =>
  journalRepository.getBySlug(slug);

export async function getRelatedPosts(post: JournalPost, limit = 3) {
  const all = await journalRepository.list();
  return all
    .filter((p) => p.id !== post.id)
    .sort(
      (a, b) =>
        Number(b.category === post.category) - Number(a.category === post.category),
    )
    .slice(0, limit);
}
