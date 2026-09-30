import { contactSchema, type ContactValues } from "./schema";
import { contactRepository } from "@/lib/repositories";


export type ContactResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(
  values: ContactValues,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: "Some details need another look." };
  try {
    await contactRepository.create(parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: "We could not send your message. Please try again." };
  }
}
