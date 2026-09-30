import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  topic: z.string().min(1, "Choose a topic."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more, at least 10 characters.")
    .max(2000, "Please keep this under 2,000 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;
