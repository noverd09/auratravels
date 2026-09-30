import type { ContactMessage } from "@/types";
import type { ContactRepository, NewContactMessage } from "./repository";

const store = new Map<string, ContactMessage>();

export class MockContactRepository implements ContactRepository {
  async create(input: NewContactMessage) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const message: ContactMessage = {
      ...input,
      id: `msg_${crypto.randomUUID().slice(0, 8)}`,
      created_at: new Date().toISOString(),
    };
    store.set(message.id, message);
    return message;
  }
}
