import type { TripInquiry } from "@/types";
import type { NewTripInquiry } from "./types";

export interface InquiryRepository {
  create(input: NewTripInquiry): Promise<TripInquiry>;
  getById(id: string): Promise<TripInquiry | null>;
}
