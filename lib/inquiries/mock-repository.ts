import type { TripInquiry } from "@/types";
import type { InquiryRepository } from "./repository";
import type { NewTripInquiry } from "./types";

/**
 * In memory only. Nothing is persisted between server restarts, and no real
 * request is sent anywhere. The Supabase version will insert into `trip_inquiries`.
 */
const store = new Map<string, TripInquiry>();

export class MockInquiryRepository implements InquiryRepository {
  async create(input: NewTripInquiry) {
    // Simulated network latency so loading states are exercised
    await new Promise((resolve) => setTimeout(resolve, 900));
    const now = new Date().toISOString();
    const inquiry: TripInquiry = {
      ...input,
      id: `inq_${crypto.randomUUID().slice(0, 8)}`,
      status: "new",
      created_at: now,
      updated_at: now,
    };
    store.set(inquiry.id, inquiry);
    return inquiry;
  }
  async getById(id: string) {
    return store.get(id) ?? null;
  }
}
