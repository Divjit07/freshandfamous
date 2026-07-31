// The catalog, as crawled in PRD §1. Three real sellable lines — no services,
// per the client directive. Prices in CAD.

export type Line = {
  id: string;
  name: string;
  wordmark: string;
  tagline: string;
  blurb: string;
  price: number;
  was?: number;
  unit: string;
  variants: string[];
  href: string;
  /** Optional thumbnail path (without extension); defaults to products/<id>. */
  thumb?: string;
};

export const lines: Line[] = [
  {
    id: "6es",
    name: "6ES™ Extrait de Parfum",
    wordmark: "6ES",
    tagline: "The signature.",
    blurb:
      "The house in one bottle. An extrait concentration built to last the night and read as intention, not volume.",
    price: 100,
    was: 150,
    unit: "50ml · 1.7 fl oz",
    variants: ["For Her", "For Him"],
    href: "/6es",
  },
  {
    id: "mist",
    name: "Air & Body Mist",
    wordmark: "Mist",
    tagline: "Eight moods, one house.",
    blurb:
      "A lighter register — dressed each morning, carried all day. Eight scents, from Ocean Fresh to Baby Powder.",
    price: 9.99,
    unit: "120mL",
    variants: ["8 scents"],
    href: "/shop#retail",
  },
  {
    id: "mag420",
    name: "Magnesium Vitamin Air Freshener",
    wordmark: "MAG420",
    tagline: "Wellness, bottled.",
    blurb:
      "A clean, magnesium-infused formula in seven signature scents designed to refresh your space.",
    price: 9.99,
    unit: "Magnesium Vitamin",
    variants: [
      "Tropical Islands",
      "Mother Earth",
      "Cherry Blossom",
      "Odourless Aura",
      "Baby Powder",
      "Fresh Vanilla",
      "Ocean Fresh"
    ],
    href: "/shop#mag420",
  },
];

// 6ES accord, composited for the detail page. Not drawn by the generator —
// written from the brand's stated character (PRD §5, rule 1).
export const sixEsNotes = {
  head: ["Bergamot", "Pink Pepper", "Saffron"],
  heart: ["Toronto Rose", "Orris", "Jasmine Sambac"],
  base: ["Oud", "Amber", "Vanilla Absolute"],
};

export const mistScents = [
  { slug: "divine-sensation", name: "Divine Sensation", note: "warm florals, amber close" },
  { slug: "baby-powder", name: "Baby Powder", note: "soft musk, clean cotton" },
  { slug: "tropical-islands", name: "Tropical Islands", note: "coconut, sun-warm fruit" },
  { slug: "fresh-vanilla", name: "Fresh Vanilla", note: "vanilla absolute, tonka" },
  { slug: "mother-earth", name: "Mother Earth", note: "vetiver, damp cedar" },
  { slug: "cherry-blossom", name: "Cherry Blossom", note: "sakura, white tea" },
  { slug: "odourless-aura", name: "Odourless Aura", note: "skin-clean, near-invisible" },
  { slug: "ocean-fresh", name: "Ocean Fresh", note: "salt air, bergamot" },
];

// ---------------------------------------------------------------------------
// Mr Fresh — the accessible house brand (auto + retail). Kept separate from
// the 6ES luxury register so the site can hold both without flattening either.
// Prices are placeholders until client locks retail CAD/USD.
// ---------------------------------------------------------------------------

export type MrFreshProduct = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  price: number;
  was?: number;
  unit: string;
  badge?: string;
  href: string;
};

export const mrFreshProducts: MrFreshProduct[] = [
  {
    id: "car-hang",
    name: "Mr Fresh Car Hanging Freshener",
    tagline: "Keep it fresh.™",
    blurb:
      "The cartoon that rides shotgun — long-lasting scent on a hang, with the Mr Fresh mark front and centre.",
    price: 4.99,
    unit: "Single hang",
    href: "/shop#car-hang",
  },
  {
    id: "caribbean",
    name: "Caribbean Island Collection",
    tagline: "Represent yuh islands.",
    blurb:
      "Limited island shapes in gold-edged hangs — Jamaica first, then the archipelago. Caribbean made. 100% vibes.",
    price: 4.99,
    unit: "Limited edition",
    badge: "Limited",
    href: "/shop#caribbean",
  },
  {
    id: "retail-can",
    name: "Mr Fresh Air & Body Mist",
    tagline: "Sold at Walmart · US",
    blurb:
      "Magnesium-infused air & body mist — 4 fl oz retail, eight scents, stocked where America shops.",
    price: 9.99,
    unit: "4 fl oz · 8 scents",
    badge: "Walmart US",
    href: "/shop#retail",
  },
];

/** Walmart US Mr Fresh mist line — same 8 moods as the house mist index. */
export const retailMistScents = mistScents;

/** The two Mr Fresh retail products, shown as index rows in the /shop range. */
export const mrFreshShopLines: Line[] = [
  {
    id: "car-hang",
    name: "Mr Fresh Car Air Freshener",
    wordmark: "Mr Fresh",
    tagline: "Keep it fresh.™",
    blurb:
      "The daily-drive hang — long-lasting scent that rides shotgun, now on Walmart shelves across the US.",
    price: 4.99,
    unit: "Walmart US · Black Ice",
    variants: ["Black Ice"],
    href: "/shop#car-hang",
    thumb: "products/car-hang",
  },
  {
    id: "retail-can",
    name: "Mr Fresh Air & Body Mist",
    wordmark: "Mr Fresh",
    tagline: "Eight moods, everyday.",
    blurb:
      "Magnesium-infused air & body mist in eight scents — 4 fl oz, stocked at Walmart across the US.",
    price: 9.99,
    unit: "Walmart US · 4 fl oz",
    variants: ["8 scents"],
    href: "/shop#retail",
    thumb: "mr-fresh/retail-lineup-8",
  },
];

/** Homepage collection row — car hang + Caribbean limited (same card chrome as signature lines). */
export const collectionAutoLines: Line[] = [
  {
    id: "car-hang",
    name: "Car Hanging Freshener",
    wordmark: "Hang",
    tagline: "Keep it fresh.™",
    blurb:
      "Mr Fresh on a hang — Black Ice for the daily drive. Long-lasting scent, rides shotgun.",
    price: 4.99,
    unit: "Black Ice",
    variants: ["Black Ice"],
    href: "/shop#car-hang",
  },
  {
    id: "caribbean",
    name: "Caribbean Limited Edition",
    wordmark: "F&F",
    tagline: "Represent yuh islands.",
    blurb:
      "Island-shaped hangs, gold-edged — the full archipelago. Rep fresh. Stay famous. Caribbean made.",
    price: 4.99,
    unit: "Limited edition",
    variants: ["12 islands"],
    href: "/shop#caribbean",
  },
];

/** Core hang scent shown in client photography — expand as SKUs land. */
export const carHangScents = [
  { slug: "black-ice", name: "Black Ice", note: "cool, clean, night-drive" },
];

/** Island hangs from the Fresh & Famous Caribbean lineup. */
export const caribbeanIslands = [
  { slug: "jamaica", name: "Jamaica", note: "Island vibes" },
  { slug: "barbados", name: "Barbados", note: "Island vibes" },
  { slug: "trinidad-tobago", name: "Trinidad & Tobago", note: "Island vibes" },
  { slug: "bahamas", name: "Bahamas", note: "Island vibes" },
  { slug: "haiti", name: "Haiti", note: "Island vibes" },
  { slug: "grenada", name: "Grenada", note: "Island vibes" },
  { slug: "saint-lucia", name: "Saint Lucia", note: "Island vibes" },
  { slug: "antigua", name: "Antigua & Barbuda", note: "Island vibes" },
  { slug: "dominica", name: "Dominica", note: "Island vibes" },
  { slug: "st-vincent", name: "St. Vincent", note: "Island vibes" },
  { slug: "guyana", name: "Guyana", note: "Caribbean vibes" },
  { slug: "cuba", name: "Cuba", note: "Island vibes" },
];

export const certifications = [
  { id: "quality", label: "Premium fragrance", detail: "Long-lasting scents" },
  { id: "auto", label: "Made for the ride", detail: "Luxury hang quality" },
  { id: "caribbean", label: "Caribbean made", detail: "100% island energy" },
];

export const studio = {
  name: "Hudson’s Bay Centre",
  street: "2 Bloor Street East, Suite 3500",
  city: "Toronto, ON M4W 1A8",
  coords: "43.6532° N, 79.3832° W",
};

export function formatPrice(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

export function lineById(id: string): Line | undefined {
  return lines.find((l) => l.id === id);
}

/** Server-trusted unit price for a line, in dollars. Null if unknown. */
export function priceFor(productId: string): number | null {
  return lineById(productId)?.price ?? null;
}
