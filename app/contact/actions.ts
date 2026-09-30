"use server";

import { sendContactMessage, type ContactResult } from "@/lib/contact/service";
import type { ContactValues } from "@/lib/contact/schema";

export async function sendContactAction(values: ContactValues): Promise<ContactResult> {
  return sendContactMessage(values);
}
