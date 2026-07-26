# Dropping in your renders

The site reads images straight out of `public/`. Drop a file with the name
below and it replaces the crafted placeholder automatically — **no code
changes.** Anything you haven't uploaded keeps its fallback, so the site is
always complete.

- **Accepted extensions**, first match wins: `.webp` → `.avif` → `.png` → `.jpg` → `.jpeg`
  (use `.png` with transparency for bottles that sit on the dark WebGL).
- Filenames are **exact and lowercase**. Just the extension is yours to choose.
- In `next dev` a new file shows on the next refresh. For a **production build,
  re-run `npm run build`** (assets are resolved at build time for static pages).

## Slots

| Drop file at | Where it appears | Ratio / note |
|---|---|---|
| `public/hero/6es-hero.png` | Homepage hero, centre | **4:5**, transparent PNG ideal (sits on gold WebGL) |
| `public/products/6es-for-her.*` | `/6es`, "For Her" selected | **4:5** |
| `public/products/6es-for-him.*` | `/6es`, "For Him" selected | **4:5** |
| `public/the-416/skyline.*` | "The 416" chapter + `/the-416` bg | **wide** (≥16:9), CN Tower nightline; auto-dimmed |
| `public/og.*` | Social share card (Open Graph / Twitter) | **1200×630** |

### Collection thumbnails (optional)
Shown as a small thumb beside each line in the `/shop` + homepage index.
Omit them and the index shows numerals instead.

| File | Line |
|---|---|
| `public/products/6es.*` | 6ES™ Extrait de Parfum |
| `public/products/mist.*` | Air & Body Mist |
| `public/products/mag420.*` | Sports MAG420™ Infusion |

### Air & Body Mist — 8 scents (optional)
Shown in the `/shop` mist grid (`#mist`). Each is **4:5**.

```
public/products/mist-divine-sensation.*
public/products/mist-baby-powder.*
public/products/mist-tropical-islands.*
public/products/mist-fresh-vanilla.*
public/products/mist-mother-earth.*
public/products/mist-cherry-blossom.*
public/products/mist-odourless-aura.*
public/products/mist-ocean-fresh.*
```

### Mr Fresh (auto + retail)
HD drops live under `public/mr-fresh/`. Source folder: `new products/`.

| Drop file at | Where it appears |
|---|---|
| `public/mr-fresh/logo.*` | Shop + homepage badge |
| `public/mr-fresh/black-ice-cabin.*` | Shop + homepage lifestyle |
| `public/mr-fresh/black-ice-cabin-dusk.*` | Shop cabin secondary |
| `public/mr-fresh/black-ice-hang.*` | Shop hang packshot |
| `public/mr-fresh/caribbean/lineup.*` | Caribbean chapter hero |
| `public/mr-fresh/caribbean/{island-slug}.*` | Island grid tiles |
| `public/mr-fresh/retail-lineup-8.*` | Walmart 8-scent family |
| `public/mr-fresh/retail-shelf-mix.*` | Walmart shelf scene |
| `public/mr-fresh/retail-flatlay-mix.*` | Mood-props still life |
| `public/mr-fresh/retail-{scent-slug}.*` | Per-scent tile (+ `-life` / `-mist` / `-hand`) |
| `public/mr-fresh/retail-can.*` | Fallback retail hero |

Mist scent slugs: `divine-sensation`, `baby-powder`, `tropical-islands`, `fresh-vanilla`, `mother-earth`, `cherry-blossom`, `odourless-aura`, `ocean-fresh`.

Island slugs: `jamaica`, `barbados`, `trinidad-tobago`, `bahamas`, `haiti`, `grenada`, `saint-lucia`, `antigua`, `dominica`, `st-vincent`, `guyana`, `cuba`.

## Asset rules (from PRD §5)
1. **Never let the generator draw the label** — composite the real 6ES lockup in post.
2. **Lock the gold** (`#A16207`) from the first hero render and reference it in every later prompt, so it never drifts.
3. **Mr Fresh mascot** — keep fedora, thick glasses, red bowtie, wide smile identical to the logo reference. Do not redesign the character.
