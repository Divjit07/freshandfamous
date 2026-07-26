import Link from "next/link";
import Image from "next/image";
import { lines, formatPrice } from "@/lib/catalog";
import { findAsset } from "@/lib/assets";

/**
 * The three lines as an editorial index — full-width rows on a gold hairline,
 * not a grid of matching cards. Reused on the home Collection chapter and /shop.
 */
export function LineIndex() {
  return (
    <ul className="border-t border-white/10">
      {lines.map((line, i) => {
        const thumb = findAsset(`products/${line.id}`);
        return (
        <li key={line.id}>
          <Link
            href={line.href}
            className="group relative flex flex-col gap-5 border-b border-white/10 py-9 transition-colors duration-500 ease-[var(--ease-quiet)] hover:bg-white/[0.02] md:grid md:grid-cols-[4.5rem_1fr_auto] md:items-center md:gap-8 md:py-11"
          >
            {/* Gold rule that draws in on hover, along the row's top edge */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 rule-gold transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-x-100"
            />

            {thumb ? (
              <div className="relative aspect-[4/5] w-12 overflow-hidden rounded-[2px] border border-white/12">
                <Image
                  src={thumb}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-105"
                />
              </div>
            ) : (
              <span className="font-body text-micro font-light tabular-nums text-background/35">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none font-normal text-background transition-colors duration-500 group-hover:text-accent">
                {line.name}
              </h3>
              <p className="max-w-[42ch] font-body text-sm leading-relaxed font-light text-background/55">
                <span className="text-background/80 italic">{line.tagline}</span>{" "}
                {line.blurb}
              </p>
            </div>

            <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:gap-3">
              <div className="flex items-baseline gap-2.5">
                {line.was && (
                  <span className="font-body text-sm font-light text-background/35 line-through">
                    {formatPrice(line.was)}
                  </span>
                )}
                <span className="font-body text-lg font-medium text-background">
                  {formatPrice(line.price)}
                </span>
              </div>
              <span className="flex items-center gap-2 font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                {line.unit}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </span>
            </div>
          </Link>
        </li>
        );
      })}
    </ul>
  );
}
