import type { ItineraryDay } from "@/types";

/* Compact builder keeps the data readable: [day, location, title, description, activities, image?] */
type Row = [number, string, string, string, string[], string?];

function days(tripId: string, rows: Row[]): ItineraryDay[] {
  return rows.map(([day, location, title, description, activities, image]) => ({
    id: `${tripId}_day_${String(day).padStart(2, "0")}`,
    trip_id: tripId,
    day_number: day,
    title,
    description,
    location,
    activities,
    image: image ? `/images/${image}.jpg` : null,
  }));
}

export const itineraryDays: ItineraryDay[] = [
  ...days("trip_japan_essential", [
    [1, "Tokyo", "Arrival and neighborhood exploration", "You are met at the airport and taken to your hotel. Later, a short walk through the streets nearby to find your bearings.", ["Airport meet and transfer", "Evening neighborhood walk", "Welcome dinner"], "japan-shibuya"],
    [2, "Tokyo", "Tsukiji, Asakusa and Ginza", "Start at the outer market for breakfast, cross the river to Asakusa's old temple streets, and finish with Ginza's after dark glow.", ["Tsukiji outer market breakfast", "Senso-ji temple visit", "Ginza evening stroll"], "japan-asakusa"],
    [3, "Tokyo", "Food and a cultural experience", "A hands on day: a morning cooking class, an afternoon in Yanaka's older streets, and a counter dinner booked in advance.", ["Cooking class", "Yanaka walking tour", "Counter dinner"], "japan-sushi"],
    [4, "Hakone", "Mountains and onsen", "Ride the Romancecar into the mountains. Cross Lake Ashi by boat, then settle into a ryokan with a private hot spring.", ["Romancecar transfer", "Lake Ashi crossing", "Kaiseki dinner and onsen"], "japan-fuji"],
    [5, "Kyoto", "Arrival and Gion", "Take the morning train to Kyoto. In the evening, a local guide leads a quiet walk through Gion and along the Shirakawa canal.", ["Shinkansen to Kyoto", "Gion evening walk", "Dinner in Pontocho"], "japan-yasaka"],
    [6, "Kyoto", "Temples and a tea experience", "Visit Ginkaku-ji and walk the Philosopher's Path, then spend the afternoon with a tea master learning how a bowl is prepared.", ["Ginkaku-ji temple", "Philosopher's Path", "Private tea lesson"], "japan-ginkakuji"],
    [7, "Kyoto", "Fushimi Inari and Arashiyama", "A dawn walk up through the torii gates before the crowds, then the bamboo grove and the river at Arashiyama.", ["Sunrise at Fushimi Inari", "Arashiyama bamboo grove", "Togetsukyo bridge at dusk"], "japan-bamboo"],
    [8, "Kyoto", "A free day and a craft workshop", "Sleep in if you like. Optional afternoon workshop with a textile or lacquer maker in a working studio.", ["Free morning", "Craft workshop", "Free evening"]],
    [9, "Osaka", "Arrival and Dotonbori", "Transfer to Osaka in the morning. Evening street food crawl through Dotonbori with a local guide.", ["Train to Osaka", "Kuromon market", "Dotonbori food evening"]],
    [10, "Osaka", "Nara day trip", "Take a short train to Nara to visit Todai-ji, meet the deer in the park, and walk through the old Naramachi streets.", ["Todai-ji temple", "Nara Park", "Naramachi lunch"]],
    [11, "Osaka", "Castle, markets and a farewell dinner", "See Osaka Castle in the morning, browse the department store food halls, and share a final dinner.", ["Osaka Castle", "Food hall tasting", "Farewell dinner"]],
    [12, "Osaka", "Departure", "Breakfast at leisure and a private transfer to Kansai airport.", ["Breakfast", "Airport transfer"]],
  ]),

  ...days("trip_japan_kyoto", [
    [1, "Kyoto", "Arrival and the river", "Settle into your townhouse and walk the Kamo river at dusk.", ["Airport transfer", "River walk", "Welcome dinner"], "japan-togetsukyo"],
    [2, "Kyoto", "Higashiyama in the early hours", "Old lanes and temples before the tour groups arrive, then a slow lunch.", ["Sunrise walk in Higashiyama", "Kiyomizu-dera", "Tofu lunch"], "japan-yasaka"],
    [3, "Arashiyama", "Bamboo and the river", "Arrive at first light for the grove, then ride the scenic train and float on the river.", ["Bamboo grove at dawn", "Sagano scenic train", "River boat"], "japan-bamboo"],
    [4, "Kyoto", "A day with makers", "Spend the day in workshops: dyeing, ceramics, or paper, depending on your interests.", ["Textile workshop", "Ceramics studio visit", "Free evening"]],
    [5, "Nara", "Nara and the deer park", "A gentle day trip to Nara's temples and old town streets.", ["Todai-ji", "Nara Park", "Naramachi walk"]],
    [6, "Kyoto", "Kaiseki and Gion", "A slow day, ending with a kaiseki dinner in a machiya in Gion.", ["Free morning", "Ginkaku-ji", "Kaiseki dinner"], "japan-ginkakuji"],
    [7, "Kyoto", "Departure", "Breakfast and a transfer to the airport.", ["Breakfast", "Airport transfer"]],
  ]),

  ...days("trip_italy_amalfi", [
    [1, "Naples", "Arrival and a first pizza", "Meet your driver in Naples. Stop for a pizza where locals eat before continuing to the coast.", ["Airport pickup", "Pizza in the old town", "Drive to Positano"], "italy-amalfi"],
    [2, "Positano", "Village mornings", "Wander the stepped lanes before the day trippers arrive, then a slow lunch above the sea.", ["Morning walk", "Beach club lunch", "Sunset aperitivo"], "italy-positano-view"],
    [3, "Positano", "Boat day", "A private boat takes you to coves the road cannot reach, with a swim and lunch on board.", ["Private boat", "Swim stops", "Lunch on board"], "italy-coast"],
    [4, "Positano", "The Path of the Gods", "Hike the high trail above the coast with a guide, then descend to the sea for a swim.", ["Guided hike", "Picnic lunch", "Free evening"]],
    [5, "Ravello", "Villas and gardens", "Move up to Ravello. Visit hilltop gardens and listen to music in a garden terrace at sunset.", ["Transfer to Ravello", "Villa Rufolo gardens", "Sunset concert"]],
    [6, "Ravello", "Cooking with a local family", "Pick lemons, make pasta, and share a long lunch in a family home.", ["Lemon grove visit", "Pasta making", "Family lunch"], "italy-sunset"],
    [7, "Amalfi", "The old republic", "Explore Amalfi's cathedral and paper museum, and take the small road to Atrani.", ["Cathedral cloister", "Paper mill", "Atrani walk"], "italy-atrani"],
    [8, "Naples", "Departure", "A relaxed morning and transfer to Naples airport.", ["Breakfast", "Airport transfer"]],
  ]),

  ...days("trip_bali_wellness", [
    [1, "Ubud", "Arrival in the interior", "Drive inland to Ubud through terraced hills. Rest, swim, and take a slow first dinner.", ["Airport pickup", "Villa check in", "Dinner at the villa"], "bali-ubud-fields"],
    [2, "Ubud", "Terraces at sunrise", "Walk Tegallalang before the crowds, then breakfast at a warung and a traditional massage.", ["Sunrise terrace walk", "Warung breakfast", "Massage"], "bali-terraces"],
    [3, "Ubud", "Yoga and a healer visit", "Morning yoga overlooking the rice, then an afternoon with a traditional healer.", ["Private yoga", "Healer visit", "Free evening"], "bali-ubud-terraces"],
    [4, "Ubud", "Cooking and market", "A market walk and a cooking class in a family compound.", ["Market visit", "Cooking class", "Shared lunch"], "bali-ducks"],
    [5, "Sidemen", "The quiet valley", "Move to Sidemen, a valley with fewer visitors. Walk between villages, watch weavers, and enjoy the views of Mount Agung.", ["Transfer to Sidemen", "Village walk", "Weaving workshop"]],
    [6, "Sidemen", "A free day in the valley", "Choose a hike, a bike ride, or a day of nothing at all.", ["Optional hike", "Pool time", "Sunset views"]],
    [7, "Uluwatu", "South to the cliffs", "Drive to the dry southern peninsula. Swim, settle in, and watch the sun set from a cliffside terrace.", ["Transfer to Uluwatu", "Beach time", "Sunset dinner"], "bali-uluwatu-cliff"],
    [8, "Uluwatu", "Temple and sunset", "Visit Uluwatu temple in late afternoon with a guide, followed by a kecak fire dance.", ["Guided temple visit", "Kecak performance", "Beach dinner"], "bali-uluwatu"],
    [9, "Uluwatu", "Departure", "Breakfast and transfer to the airport.", ["Breakfast", "Airport transfer"]],
  ]),

  ...days("trip_palawan_expedition", [
    [1, "Puerto Princesa", "Arrival and the city", "Arrive, transfer to your lodge, and take a short walk along the bay at sunset.", ["Airport pickup", "Bay walk", "Seafood dinner"]],
    [2, "Puerto Princesa", "The underground river", "A boat ride and paddle through the underground river, then the road north.", ["Boat to the park", "Underground river tour", "Drive to El Nido"], "palawan-river"],
    [3, "El Nido", "Bacuit Bay, first look", "Your first boat day: lagoons, limestone walls, and a beach lunch.", ["Small lagoon tour", "Snorkeling", "Beach lunch"], "palawan-lagoon"],
    [4, "El Nido", "Kayak and hike", "Paddle into a hidden lagoon at first light, then climb to a viewpoint over the bay.", ["Sunrise kayak", "Taraw Cliff viewpoint", "Free evening"], "palawan-limestone"],
    [5, "El Nido", "Private boat day", "A full day on a private boat to quieter islands, with snorkeling and grilled fish for lunch.", ["Private boat", "Snorkel stops", "Beach grill"], "palawan-twilight"],
    [6, "El Nido", "Rest day and optional dive", "Sleep late, swim from the beach, or arrange a guided dive on the reef.", ["Free morning", "Optional dive", "Sunset drinks"]],
    [7, "Coron", "Fly to Coron, Kayangan Lake", "A short flight to Coron, then a boat to Kayangan Lake for a swim in clear, cool water.", ["Flight to Coron", "Kayangan Lake", "Sunset from Mount Tapyas"], "palawan-kayangan"],
    [8, "Coron", "Departure", "Breakfast and a transfer to the airport.", ["Breakfast", "Airport transfer"]],
  ]),
];
