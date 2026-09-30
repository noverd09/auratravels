/**
 * Domain types. Field names mirror the future Supabase (PostgreSQL) columns, so a
 * Supabase repository can return these shapes without touching the UI.
 * Text[] columns are string arrays; ids are uuid strings.
 */

export type TravelStyleSlug =
  | "adventure"
  | "luxury"
  | "culture"
  | "food"
  | "wellness"
  | "honeymoon";

export type Region = "Asia" | "Southeast Asia" | "Europe";

export interface TravelStyle {
  slug: TravelStyleSlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: Region;
  slug: string;
  description: string;
  long_description: string;
  hero_image: string;
  gallery: string[];
  best_time_to_visit: string;
  travel_styles: TravelStyleSlug[];
  featured: boolean;
  created_at: string;
  /* Presentation columns that would also live on the row */
  /** Filter tags such as "islands" */
  tags: string[];
  /** Short display themes, e.g. Culture, Food, Design */
  themes: string[];
  coordinates: string;
  /** Where the hero photograph was taken */
  hero_place: string;
  aura: "japan" | "bali" | "italy" | "palawan";
  experiences: { title: string; body: string }[];
  /** Questionnaire option this destination rolls up to */
  planner_option: string;
}

export interface Trip {
  id: string;
  destination_id: string;
  title: string;
  slug: string;
  /** Length in days */
  duration: number;
  /** Illustrative starting price per person, USD */
  price_from: number;
  description: string;
  long_description: string;
  hero_image: string;
  travel_styles: TravelStyleSlug[];
  featured: boolean;
  created_at: string;
  locations: string[];
  highlights: string[];
  included: string[];
  not_included: string[];
  gallery: string[];
}

export interface ItineraryDay {
  id: string;
  trip_id: string;
  day_number: number;
  title: string;
  description: string;
  location: string;
  activities: string[];
  image: string | null;
}

export type JournalCategory =
  | "Guides"
  | "Slow travel"
  | "Food"
  | "Planning"
  | "Places";

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Lightweight markdown: `##` headings, `>` quotes, blank-line paragraphs */
  content: string;
  hero_image: string;
  category: JournalCategory;
  published_at: string;
  featured: boolean;
  reading_minutes: number;
  destination_slug: string | null;
}

export type InquiryStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "planning"
  | "converted"
  | "closed";

export type TravelCompany = "solo" | "couple" | "family" | "friends" | "group";
export type ContactMethod = "email" | "phone" | "whatsapp";

export interface TripInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  destination: string[];
  trip_id: string | null;
  travel_date: string | null;
  return_date: string | null;
  flexible_dates: boolean;
  travelers: number;
  travelers_type: TravelCompany;
  travel_style: string[];
  budget: string;
  interests: string[];
  message: string | null;
  contact_method: ContactMethod;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  created_at: string;
}

/** Image registry entry: alt text and attribution live beside the file path */
export interface ImageAsset {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  license: string;
  source_url: string;
}
