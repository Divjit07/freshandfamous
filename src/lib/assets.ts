import "server-only";
import fs from "node:fs";
import path from "node:path";

// Resolves optional imagery dropped into /public. Server-only (touches fs), so
// client components must receive resolved paths as props. Any slot without a
// file returns null and the UI falls back to its crafted placeholder — so the
// site works whether or not the renders have landed yet.
//
// URLs include a file mtime query (?v=…) so replacing a public asset at the
// same path busts Next’s image optimizer cache automatically.

const PUBLIC_DIR = path.join(process.cwd(), "public");

// First match wins. Modern formats preferred; PNG kept for transparent bottles.
const EXTENSIONS = ["webp", "avif", "png", "jpg", "jpeg"] as const;

/** Given a public-relative path without extension, return the served URL or null. */
export function findAsset(relativeNoExt: string): string | null {
  const clean = relativeNoExt.replace(/^\/+/, "");
  for (const ext of EXTENSIONS) {
    const rel = `${clean}.${ext}`;
    const abs = path.join(PUBLIC_DIR, rel);
    try {
      if (!fs.existsSync(abs)) continue;
      const { mtimeMs } = fs.statSync(abs);
      return `/${rel}?v=${Math.floor(mtimeMs)}`;
    } catch {
      // Unreadable path — treat as absent and keep the fallback.
    }
  }
  return null;
}

/** Resolve several slots at once, keyed for convenient destructuring. */
export function findAssets<K extends string>(
  slots: Record<K, string>,
): Record<K, string | null> {
  const out = {} as Record<K, string | null>;
  for (const key in slots) out[key] = findAsset(slots[key]);
  return out;
}
