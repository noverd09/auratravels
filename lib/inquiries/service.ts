import { inquiryRepository } from "@/lib/repositories";
import type { TripInquiry } from "@/types";
import { inquirySchema, type InquiryFormValues } from "./validation";

export type SubmitResult =
  | { ok: true; inquiry: TripInquiry }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitInquiry(
  values: InquiryFormValues,
): Promise<SubmitResult> {
  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Some details need another look.",
      fieldErrors: Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(([k, v]) => [
          k,
          v ?? [],
        ]),
      ),
    };
  }
  const v = parsed.data;
  try {
    const inquiry = await inquiryRepository.create({
      name: v.name,
      email: v.email,
      phone: v.phone || null,
      destination: v.destinations,
      trip_id: v.trip_id,
      travel_date: v.departure_date || null,
      return_date: v.return_date || null,
      flexible_dates: v.flexible_dates,
      travelers: v.travelers,
      travelers_type: v.travelers_type,
      travel_style: v.travel_style,
      budget: v.budget,
      interests: v.interests,
      message: v.message.trim() || null,
      contact_method: v.contact_method,
    });
    return { ok: true, inquiry };
  } catch {
    return {
      ok: false,
      error: "We could not send your request. Please try again in a moment.",
    };
  }
}
