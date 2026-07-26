# Mr. Fresh — 6ES Luxury Commerce Revamp

**Client:** Fresh & Famous Inc. (Toronto) · CEO Dwayne Nathaniel Wright
**Current site:** https://www.freshandfamous.com (Shopify)
**Goal:** Awwwards-level luxury fragrance e-commerce. Expensive, classy, brand-first.

---

## 1. What the business actually sells

Crawled 2026-07-24. The site's navigation implies a large catalog; the sitemap contains **8 products**, of which 3 are real sellable lines.

| Line | Price | Variants |
|---|---|---|
| **6ES™ Extrait de Parfum** | $150 → **$100** | For Her · For Him · 50ml / 1.7 fl oz |
| **Air & Body Mist** | $25 → **$15** | 120mL · 8 scents |
| **Sports MAG420™ Infusion** | **$19.99** | Blue · White · Red · Black |

Air & Body Mist scents: Divine Sensation, Baby Powder, Tropical Islands, Fresh Vanilla,
Mother Earth, Cherry Blossom, Odourless Aura, Ocean Fresh.

Supporting SKUs: sample cards, eGift card.

### Out of scope — client directive
No barber, no barbershop, no salon services. The existing Grooming / SPA / Skincare /
Haircare / Body Care / Lip Care pages are **appointment-booking products**, not physical
goods. They are all excluded.

### ⚠️ Open decision blocking IA
Removing services empties four of six nav categories. Skincare, Haircare, Body Care and
Lip Care have **no physical products behind them**. Two paths:

- **A (recommended):** Build a tight three-line fragrance house. Fewer products,
  photographed exceptionally, reads *more* luxury — not less.
- **B:** Client supplies real skincare / haircare / cosmetics SKUs before IA is locked.

Do not build category pages until this is settled.

---

## 2. Brand

**Founded on:** 20+ years of scent mastery. *"Born in Toronto. Built for the world."*

**Voice, verbatim from client copy:**
- "Look fresh, feel famous, live confidently"
- "Born to Stand Out. Built to Be Fresh."
- "Luxury isn't a luxury here. It's the baseline."
- "This is not mass-produced energy. This is intentional luxury."

**The 416.** Carton spines are foil-stamped **416** — Toronto's area code. Sample cards
carry a CN Tower night skyline. `6ES` reads as *the 6ix*. This is the most ownable thing
in the brand and should carry a dedicated scroll chapter.

**Address:** Hudson's Bay Centre, 2 Bloor Street East, Suite 3500, Toronto ON M4W 1A8

---

## 3. Design direction

Sourced from `/ui-ux-pro-max`.

**Type** — Cormorant (display) + Montserrat (body)
```
https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap
```

**Palette** — luxury/premium
| Token | Hex |
|---|---|
| `--ink` | `#1C1917` |
| `--foreground` | `#0C0A09` |
| `--secondary` | `#44403C` |
| `--accent` (gold) | `#A16207` |
| `--background` (bone) | `#FAFAF9` |
| `--muted` | `#E8ECF0` |

**Rule:** spend boldness on the gold. Everything around it stays quiet. Gold must be
consistent across every asset — drifting gold is what kills the expensive read.

---

## 4. Motion & 3D

Stack installed: `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`.
React Bits registry wired — 139 components, 556 registry items.

**Candidates:** `LiquidChrome`, `Iridescence`, `Prism`, `Aurora`, `Silk`, `DarkVeil`,
`ScrollFloat`, `ScrollReveal`, `CircularGallery`, `ModelViewer`

Install pattern — the `-TS-TW` suffix is mandatory:
```bash
npx shadcn@latest add @react-bits/Dither-TS-TW
```

**Scroll rules** (from ui-ux-pro-max `motion.csv`):
- `scrub: 1`, never instant jumps
- **Pin at most 1–2 sections per page** — excessive pinning fights mobile scroll
- Parallax on decorative layers only, never body copy
- Stagger max ~8 children
- Test pinning on mid-tier mobile; it forces layout reflow

---

## 5. Assets

Reference photos: `reference/product-photos/` (10 files)
Generation brief with 14 prompts: see the 6ES Asset Generation Brief artifact.

**Two hard rules:**
1. Never let the generator draw the label — composite the real 6ES lockup in post.
2. Lock the gold from the first hero render and reference it in every later prompt.

---

## 6. Build order

1. Settle the category question (§1)
2. Design tokens into `globals.css` from §3
3. Hero — 6ES pair, WebGL ground, GSAP pin
4. Product detail — 6ES For Her / For Him
5. Air & Body Mist collection — 8-scent grid
6. The 416 chapter — Toronto story
7. Cart / checkout (Shopify headless or keep Shopify hosted checkout)
8. `/impeccable audit` → `/impeccable polish`

---

## 7. Stack

Next.js 16.2.11 · React 19.2.4 · TypeScript · Tailwind v4 · App Router · `src/` · `@/*`
