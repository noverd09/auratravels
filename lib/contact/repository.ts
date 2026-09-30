import type { ContactMessage } from "@/types";

export type NewContactMessage = Omit<ContactMessage, "id" | "created_at">;

export interface ContactRepository {
  create(input: NewContactMessage): Promise<ContactMessage>;
}
