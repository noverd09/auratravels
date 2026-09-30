"use server";

import { submitInquiry, type SubmitResult } from "@/lib/inquiries/service";
import type { InquiryFormValues } from "@/lib/inquiries/validation";

/** Server action: validates again on the server, then hands off to the inquiry service. */
export async function submitInquiryAction(values: InquiryFormValues): Promise<SubmitResult> {
  return submitInquiry(values);
}
