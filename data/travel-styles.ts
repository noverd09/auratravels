import type { TravelStyle } from "@/types";

export const travelStyles: TravelStyle[] = [
  {
    slug: "adventure",
    name: "Adventure",
    tagline: "Trails, tides and the long way round",
    description:
      "For travelers who want mountains, oceans, trails, and experiences beyond the ordinary.",
    image: "/images/palawan-limestone.jpg",
  },
  {
    slug: "luxury",
    name: "Luxury",
    tagline: "Quiet rooms, private hours",
    description:
      "Small properties with real character, private guides, and time arranged so nothing feels rushed.",
    image: "/images/italy-positano-view.jpg",
  },
  {
    slug: "culture",
    name: "Culture",
    tagline: "Temples, craft and the people behind them",
    description:
      "Time with makers, historians, and neighbors who can explain why a place looks and tastes the way it does.",
    image: "/images/japan-ginkakuji.jpg",
  },
  {
    slug: "food",
    name: "Food",
    tagline: "Markets at dawn, long tables at night",
    description:
      "Trips built around the counter, the market stall, and the kitchen where a recipe is still made by hand.",
    image: "/images/japan-sushi.jpg",
  },
  {
    slug: "wellness",
    name: "Wellness",
    tagline: "Slow mornings, warm water",
    description:
      "Onsen, yoga in the rice fields, and unhurried days that leave you rested rather than recovered.",
    image: "/images/bali-ubud-fields.jpg",
  },
  {
    slug: "honeymoon",
    name: "Honeymoon",
    tagline: "Two people, one carefully paced plan",
    description:
      "Romantic without the cliché: sunsets you have to walk to, dinners you will remember, and space to just be together.",
    image: "/images/italy-sunset.jpg",
  },
];
