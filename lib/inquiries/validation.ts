import { z } from "zod";

export const PLANNER_DESTINATIONS = [
  "Japan",
  "Italy",
  "Bali",
  "Philippines",
  "Thailand",
  "Not sure yet",
] as const;

export const COMPANY_OPTIONS = [
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "group", label: "Group" },
] as const;

export const STYLE_OPTIONS = [
  "Adventure",
  "Luxury",
  "Culture",
  "Food",
  "Wellness",
  "Honeymoon",
  "Relaxation",
] as const;

export const BUDGET_OPTIONS = [
  "Under $1,500",
  "$1,500 to $3,000",
  "$3,000 to $5,000",
  "$5,000 to $10,000",
  "$10,000 and above",
  "I am not sure yet",
] as const;

export const INTEREST_OPTIONS = [
  "Food",
  "Beaches",
  "Hiking",
  "Culture",
  "Shopping",
  "Architecture",
  "Nightlife",
  "Wellness",
  "Photography",
  "Local experiences",
] as const;

export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const todayIso = () => new Date().toISOString().slice(0, 10);

export const baseInquirySchema = z.object({
    destinations: z
      .array(z.string())
      .min(1, "Choose at least one destination, or pick “Not sure yet”."),
    flexible_dates: z.boolean(),
    departure_date: z
      .string()
      .refine((v) => v === "" || isoDate.test(v), "Enter a valid date."),
    return_date: z
      .string()
      .refine((v) => v === "" || isoDate.test(v), "Enter a valid date."),
    travelers_type: z.enum(["solo", "couple", "family", "friends", "group"], {
      error: "Tell us who is traveling.",
    }),
    travelers: z
      .number({ error: "Enter the number of travelers." })
      .int("Enter a whole number.")
      .min(1, "At least one traveler.")
      .max(30, "For groups over 30, please contact us directly."),
    travel_style: z.array(z.string()).min(1, "Choose at least one style."),
    budget: z.string().min(1, "Choose an approximate range."),
    interests: z.array(z.string()),
    message: z.string().max(1500, "Please keep this under 1,500 characters."),
    name: z.string().trim().min(2, "Enter your full name."),
    email: z.email("Enter a valid email address."),
    phone: z
      .string()
      .trim()
      .refine(
        (v) => v === "" || /^[+()\d][\d\s().-]{6,}$/.test(v),
        "Enter a valid phone number.",
      ),
    contact_method: z.enum(["email", "phone", "whatsapp"]),
    trip_id: z.string().nullable(),
});

export type InquiryFormValues = z.infer<typeof baseInquirySchema>;

export interface CrossFieldIssue {
  path: keyof InquiryFormValues;
  message: string;
}

/** Rules that compare fields. Run on their own so they still report while other fields are unfinished. */
export function crossFieldIssues(v: InquiryFormValues): CrossFieldIssue[] {
  const issues: CrossFieldIssue[] = [];
  if (!v.flexible_dates && v.departure_date === "") {
    issues.push({ path: "departure_date", message: "Choose a departure date, or mark your dates as flexible." });
  }
  if (v.departure_date && v.departure_date < todayIso()) {
    issues.push({ path: "departure_date", message: "Choose a date that is today or later." });
  }
  if (v.departure_date && v.return_date && v.return_date < v.departure_date) {
    issues.push({ path: "return_date", message: "Return date must be after your departure date." });
  }
  if (v.contact_method !== "email" && (v.phone ?? "").trim() === "") {
    issues.push({ path: "phone", message: "Add a phone number so we can reach you this way." });
  }
  return issues;
}

/** Full schema used on the server: field rules plus cross field rules. */
export const inquirySchema = baseInquirySchema.superRefine((v, ctx) => {
  for (const issue of crossFieldIssues(v)) {
    ctx.addIssue({ code: "custom", path: [issue.path], message: issue.message });
  }
});


/** Which fields belong to which questionnaire step, used for per step validation */
export const STEP_FIELDS: (keyof InquiryFormValues)[][] = [
  ["destinations"],
  ["flexible_dates", "departure_date", "return_date"],
  ["travelers_type", "travelers"],
  ["travel_style"],
  ["budget"],
  ["interests"],
  ["message"],
  ["name", "email", "phone", "contact_method"],
  [],
];
