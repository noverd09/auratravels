export const SITE = {
  name: "AURA TRAVEL",
  tagline: "Curated journeys. Unforgettable places.",
  description:
    "AURA TRAVEL is a boutique travel agency that designs personalized journeys around the way you want to travel.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@auratravel.example",
  phone: "+1 (415) 555 0148",
  address: "Studio 4, 218 Harbor Lane, San Francisco, CA (placeholder)",
  disclaimer:
    "AURA TRAVEL is a fictional agency created for a portfolio project. Prices, trips, and contact details are illustrative.",
} as const;

export const NAV_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/trips", label: "Trips" },
  { href: "/experiences", label: "Experiences" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
] as const;
