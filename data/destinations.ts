import type { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "dest_japan",
    name: "Japan",
    country: "Japan",
    region: "Asia",
    slug: "japan",
    description:
      "Tokyo to Kyoto, designed around food, culture, and slow exploration.",
    long_description:
      "Japan rewards the traveler who slows down. We pair Tokyo's neighborhood energy with Kyoto's quiet lanes and a night in the mountains at Hakone, then leave space for the things you cannot schedule: a counter seat that opens up, a shrine at closing time, a tea house that only takes six guests.",
    hero_image: "/images/japan-fushimi.jpg",
    gallery: [
      "/images/japan-yasaka.jpg",
      "/images/japan-bamboo.jpg",
      "/images/japan-shibuya.jpg",
      "/images/japan-fuji.jpg",
      "/images/japan-onsen.jpg",
    ],
    best_time_to_visit:
      "Late March to early April for blossom, and October to November for autumn color. Summer is hot and humid; winter is quiet, clear, and good for onsen.",
    travel_styles: ["culture", "food", "luxury"],
    featured: true,
    created_at: "2026-01-12T09:00:00Z",
    tags: ["cities", "culture"],
    themes: ["Culture", "Food", "Design"],
    coordinates: "35.0116° N, 135.7681° E",
    aura: "japan",
    hero_place: "Fushimi Inari, Kyoto",
    experiences: [
      {
        title: "Food",
        body: "Counter sushi, a night in the izakaya alleys, and a morning market walk with someone who knows the vendors by name.",
      },
      {
        title: "Culture",
        body: "A private tea lesson in Kyoto, temple visits timed for the quiet hours, and a craft studio you would not find alone.",
      },
      {
        title: "Nature",
        body: "Lake Ashi in the mountains, the bamboo groves of Arashiyama at first light, and a soak in a mountain onsen.",
      },
      {
        title: "Architecture",
        body: "From wooden machiya townhouses to Tokyo's concrete and glass, read the city through its buildings.",
      },
    ],
    planner_option: "Japan",
  },
  {
    id: "dest_bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    slug: "bali",
    description:
      "Rice terraces, temple cliffs, and slow mornings in the island's green interior.",
    long_description:
      "Bali is at its best away from the crowded beach strips. We base you inland among the rice fields around Ubud, add a stretch on the dry southern cliffs, and keep the days loose enough for a long lunch, a massage, or an early ceremony you were invited to.",
    hero_image: "/images/bali-terraces.jpg",
    gallery: [
      "/images/bali-ubud-terraces.jpg",
      "/images/bali-uluwatu.jpg",
      "/images/bali-ubud-fields.jpg",
      "/images/bali-ducks.jpg",
      "/images/bali-uluwatu-cliff.jpg",
    ],
    best_time_to_visit:
      "April to October is the dry season, with clear mornings and the best weather for temples and cliffs. November to March is greener and quieter, with afternoon rain.",
    travel_styles: ["wellness", "honeymoon", "adventure"],
    featured: true,
    created_at: "2026-01-14T09:00:00Z",
    tags: ["islands", "nature"],
    themes: ["Wellness", "Nature", "Escape"],
    coordinates: "8.5069° S, 115.2625° E",
    aura: "bali",
    hero_place: "Tegallalang, Ubud",
    experiences: [
      {
        title: "Wellness",
        body: "Morning yoga above the paddies, a traditional massage, and a day with a healer that is more conversation than treatment.",
      },
      {
        title: "Nature",
        body: "Walk the terraces before the tour buses arrive, and see the island's volcanic interior on foot.",
      },
      {
        title: "Culture",
        body: "Temple ceremonies, a woodcarving village, and a cooking class in a family compound.",
      },
      {
        title: "Food",
        body: "Warungs worth the detour, a market visit at dawn, and one long dinner built around local produce.",
      },
    ],
    planner_option: "Bali",
  },
  {
    id: "dest_italy",
    name: "Italy",
    country: "Italy",
    region: "Europe",
    slug: "italy",
    description:
      "The Amalfi Coast and its hill towns, planned around food, light, and long lunches.",
    long_description:
      "We keep Italy specific. Instead of ticking off cities, we pick one stretch of coast and go deep: lemon terraces above the sea, a village with no cars, and a table by the water booked for the hour the light turns gold.",
    hero_image: "/images/italy-positano.jpg",
    gallery: [
      "/images/italy-amalfi.jpg",
      "/images/italy-atrani.jpg",
      "/images/italy-sunset.jpg",
      "/images/italy-positano-view.jpg",
      "/images/italy-coast.jpg",
    ],
    best_time_to_visit:
      "May, June, and September are warm and workable. July and August are peak season, so we book early and plan around the heat. Winter is quiet and many coastal hotels close.",
    travel_styles: ["food", "culture", "honeymoon", "luxury"],
    featured: true,
    created_at: "2026-01-16T09:00:00Z",
    tags: ["coast", "cities"],
    themes: ["Food", "Culture", "Coast"],
    coordinates: "40.6280° N, 14.4850° E",
    aura: "italy",
    hero_place: "Positano, Amalfi Coast",
    experiences: [
      {
        title: "Food",
        body: "A lemon grove lunch, fresh pasta made with a local cook, and a fish dinner where the boat lands.",
      },
      {
        title: "Culture",
        body: "Cathedral cloisters, ceramic workshops, and paper mills that have run for centuries.",
      },
      {
        title: "Nature",
        body: "The Path of the Gods above the coast, and boat days to quiet coves that the road cannot reach.",
      },
      {
        title: "Architecture",
        body: "Stacked pastel villages, Moorish arches, and terraced gardens that climb the cliffs.",
      },
    ],
    planner_option: "Italy",
  },
  {
    id: "dest_palawan",
    name: "Palawan",
    country: "Philippines",
    region: "Southeast Asia",
    slug: "palawan",
    description:
      "Limestone islands, hidden lagoons, and open water for divers and slow sailors alike.",
    long_description:
      "Palawan is a place to travel by boat. We link El Nido's limestone bays with Coron's lakes and wrecks, balance active days with quiet ones, and choose small stays that put you near the water rather than near a crowd.",
    hero_image: "/images/palawan-elnido.jpg",
    gallery: [
      "/images/palawan-limestone.jpg",
      "/images/palawan-lagoon.jpg",
      "/images/palawan-twilight.jpg",
      "/images/palawan-kayangan.jpg",
      "/images/palawan-river.jpg",
    ],
    best_time_to_visit:
      "November to May is the dry season, with calm seas and the clearest water. June to October brings rain and rougher crossings, though it is quieter.",
    travel_styles: ["adventure", "honeymoon"],
    featured: true,
    created_at: "2026-01-18T09:00:00Z",
    tags: ["islands", "nature"],
    themes: ["Islands", "Diving", "Adventure"],
    coordinates: "11.1784° N, 119.3933° E",
    aura: "palawan",
    hero_place: "Bacuit Bay, El Nido",
    experiences: [
      {
        title: "Adventure",
        body: "Kayak into hidden lagoons, hike to viewpoints over Bacuit Bay, and take a paddle through an underground river.",
      },
      {
        title: "Nature",
        body: "Limestone karst, mangroves, and clear coves you reach by boat and share with almost no one.",
      },
      {
        title: "Diving",
        body: "Coral gardens in El Nido and wreck dives in Coron, with certified guides and small groups.",
      },
      {
        title: "Local experiences",
        body: "Fresh seafood grilled on the beach, and a day with a fishing family in a coastal village.",
      },
    ],
    planner_option: "Philippines",
  },
];
