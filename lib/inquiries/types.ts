import type { TripInquiry } from "@/types";

/** What the form sends. The repository adds id, status and timestamps. */
export type NewTripInquiry = Omit<
  TripInquiry,
  "id" | "status" | "created_at" | "updated_at"
>;
