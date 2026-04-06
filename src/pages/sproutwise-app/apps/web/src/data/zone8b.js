/** USDA Zone 8b reference data (Dallas–Fort Worth). Imported from GardenPal-style dataset. */
export const ZONE_DATA = {
  zone: "8b",
  location: "Dallas–Fort Worth, TX",
  classification: "Warm temperate",
  minWinterTemp: "15°F – 20°F (−9°C to −7°C)",
  growingSeason: "~278 days · Mar – Nov",
  annualRainfall: "~37 in · summer peaks",
  humidity: "Semi-humid · hot summers",
  summerHighs: "95–105°F · drought risk July–Aug",
  similarZones: "Atlanta GA · Tuscaloosa AL · Ft. Smith AR",
  lastFrost: "Feb 15",
  firstFrost: "Nov 20",
  soilType: "Blackland Prairie clay",
  soilPH: "pH 7.2–7.8 · expansive · slow drain",
  soilTags: ["Heavy clay", "Alkaline", "Amend w/ compost", "Raised beds ideal"],
};

export const WEATHER = {
  temp: "74°F",
  description: "Partly cloudy · good for planting",
  humidity: "40%",
  rain: '0.1"',
  wind: "8mph",
};

export const MOISTURE = {
  percent: 62,
  status: "adequate",
  nextWatering: "~3 days based on 5-day forecast",
};

/** Order for grouping / sorting in the Plant Library. */
export const PLANT_TYPE_ORDER = ["vegetable", "fruit", "herb", "flower"];

/** Matches `/api/plants` filter: `vegetable` | `fruit` | `herb` | `flower`. */
export const PLANT_TYPE_LABELS = {
  vegetable: "Vegetable",
  fruit: "Fruit",
  herb: "Herb",
  flower: "Flower",
};

export const PLANTS = [
  {
    emoji: "🍅",
    name: "Tomatoes",
    meta: "Heat-tolerant varieties · full sun",
    badge: "Plant now",
    badgeType: "green",
    plantType: "vegetable",
  },
  {
    emoji: "🌶️",
    name: "Peppers",
    meta: "Thrives in 8b heat · full sun",
    badge: "Plant now",
    badgeType: "green",
    plantType: "vegetable",
  },
  {
    emoji: "🍆",
    name: "Eggplant",
    meta: "Loves long warm season",
    badge: "Plant now",
    badgeType: "green",
    plantType: "vegetable",
  },
  {
    emoji: "🥬",
    name: "Okra",
    meta: "Zone 8b staple · drought ok",
    badge: "Late April",
    badgeType: "amber",
    plantType: "vegetable",
  },
  {
    emoji: "🌿",
    name: "Sweet basil",
    meta: "Plant after last frost passed",
    badge: "Plant now",
    badgeType: "green",
    plantType: "herb",
  },
  {
    emoji: "🌻",
    name: "Sunflowers",
    meta: "Heat & drought tolerant",
    badge: "Direct sow",
    badgeType: "clay",
    plantType: "flower",
  },
];

export const TIP = {
  icon: "💧",
  text: "Dallas clay soil cracks in summer heat. Mulch 3–4\" deep around all beds now to conserve moisture through July–August drought season.",
};

/** Tailwind classes for `PLANTS[].badgeType` chips (home + library). */
export function zonePlantBadgeClass(type) {
  if (type === "green") return "bg-[#E8F0E4] text-[#2F4F2F]";
  if (type === "amber") return "bg-amber-100 text-amber-900";
  return "bg-[#F5E6D3] text-[#6B4423] border border-[#C65D32]/30";
}
