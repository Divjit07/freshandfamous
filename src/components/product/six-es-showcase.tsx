"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lines, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const line = lines.find((l) => l.id === "6es")!;

const VARIANT_DETAILS = {
  "For Him": {
    subtitle: "A Symphony of Elegance",
    description: "Indulge in the essence of sophistication with For Him. The top notes offer a captivating blend of fire-roasted pineapple and juniper, leading to a heart of French vanilla, nutmeg, and peach. The fragrance settles into a warm base of sandalwood and amber musk, creating a scent that exudes strength and charisma.",
    notes: {
      top: ["Fire Roasted Pineapple", "Juniper", "Dark Chocolate", "Bulgarian Rose"],
      middle: ["French Vanilla", "Nutmeg", "Peach", "Mandarin Orange"],
      base: ["Sandalwood", "Amber Musk"]
    }
  },
  "For Her": {
    subtitle: "A Symphony of Grace",
    description: "For the discerning woman, our For Her collection unveils a symphony of grace. The top notes burst with the sweetness of raspberry macaron, strawberry, and ripe Alphonso mango, complemented by the richness of dark chocolate and Bulgarian rose. The heart reveals a luxurious blend of French vanilla, coconut cream, and jasmine, while the base notes linger with the warmth of cashmere, blueberry, and almond.",
    notes: {
      top: ["Raspberry Macaron", "Strawberry", "Ripe Alphonso Mango", "Dark Chocolate", "Bulgarian Rose"],
      middle: ["French Vanilla", "Coconut Cream", "Jasmine"],
      base: ["Cashmere", "Blueberry", "Almond"]
    }
  }
} as const;

export function SixEsShowcase({
  images,
}: {
  images: Record<string, string | null>;
}) {
  const [variant, setVariant] = useState(line.variants[0]);
  const details = VARIANT_DETAILS[variant as keyof typeof VARIANT_DETAILS];
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function addToCart() {
    add({
      id: `6es:${variant}`,
      productId: "6es",
      name: line.name,
      variant,
      unit: line.unit,
      price: line.price,
      href: line.href,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
      {/* Visual — both variants stacked, cross-fading on selection */}
      <div className="flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="relative aspect-[4/5] h-[clamp(22rem,55svh,44rem)] w-auto overflow-hidden rounded-[3px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 rounded-[3px] border border-white/12"
            />
            {line.variants.map((v) => {
              const active = v === variant;
              const src = images[v];
              return (
                <div
                  key={v}
                  aria-hidden={!active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-quiet)]",
                    active ? "opacity-100" : "opacity-0",
                  )}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={`6ES™ Extrait de Parfum — ${v}`}
                      fill
                      priority={active}
                      sizes="(max-width: 1024px) 70vw, 35vw"
                      style={{ objectPosition: v === "For Her" ? "center" : "68% 55%" }}
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-[2px]">
                      <span className="font-display text-6xl font-light tracking-[0.15em] text-background/20">
                        6ES
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-5 h-px w-[70%] rule-gold" />
        </div>
      </div>

      {/* Details + buy */}
      <div className="flex flex-col justify-center">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/shop"
            className="font-body text-micro font-light tracking-luxe text-background/45 uppercase transition-colors hover:text-accent"
          >
            ← The House
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="h-px w-12 rule-gold" />
          <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
            Extrait de Parfum
          </span>
        </div>

        <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98] font-normal tracking-[-0.02em]">
          6ES<span className="align-super text-2xl">™</span>
        </h1>
        <p className="mt-5 max-w-[44ch] font-body text-base leading-relaxed font-light text-background/60 md:text-lg">
          <span className="text-background/85 font-medium block not-italic text-accent mb-2">
            {details.subtitle}
          </span>
          {details.description}
        </p>

        {/* Price */}
        <div className="mt-10 flex items-baseline gap-3">
          {line.was && (
            <span className="font-body text-lg font-light text-background/35 line-through">
              {formatPrice(line.was)}
            </span>
          )}
          <span className="font-display text-4xl leading-none text-background">
            {formatPrice(line.price)}
          </span>
          <span className="font-body text-micro font-light tracking-luxe text-background/45 uppercase">
            {line.unit}
          </span>
        </div>

        {/* Variant */}
        <fieldset className="mt-9">
          <legend className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
            Composition
          </legend>
          <div className="mt-4 flex gap-3">
            {line.variants.map((v) => {
              const active = v === variant;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  aria-pressed={active}
                  className={cn(
                    "flex-1 border px-5 py-4 font-body text-micro font-medium tracking-luxe uppercase transition-colors duration-300 ease-[var(--ease-quiet)]",
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/15 text-background/60 hover:border-white/35 hover:text-background",
                  )}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Dynamic Scent Tones */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase block mb-4">
            Scent Tones
          </span>
          <dl className="grid grid-cols-3 gap-4 border-y border-white/10 py-5">
            <div className="flex flex-col gap-1.5">
              <dt className="font-body text-[10px] font-semibold tracking-wider text-accent uppercase">Top</dt>
              <dd className="font-body text-[13px] font-light leading-snug text-background/85">{details.notes.top.join(", ")}</dd>
            </div>
            <div className="flex flex-col gap-1.5 border-x border-white/10 px-4">
              <dt className="font-body text-[10px] font-semibold tracking-wider text-accent uppercase">Middle</dt>
              <dd className="font-body text-[13px] font-light leading-snug text-background/85">{details.notes.middle.join(", ")}</dd>
            </div>
            <div className="flex flex-col gap-1.5 pl-4">
              <dt className="font-body text-[10px] font-semibold tracking-wider text-accent uppercase">Base</dt>
              <dd className="font-body text-[13px] font-light leading-snug text-background/85">{details.notes.base.join(", ")}</dd>
            </div>
          </dl>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={addToCart}
          aria-live="polite"
          className={cn(
            "group relative mt-8 flex items-center justify-center gap-3 overflow-hidden border border-accent px-8 py-5 font-body text-micro font-semibold tracking-luxe uppercase transition-colors duration-500 ease-[var(--ease-quiet)]",
            added ? "bg-accent text-foreground" : "text-accent hover:text-foreground",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-[var(--ease-quiet)]",
              added ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            )}
          />
          <span className="relative">
            {added ? "Added to cart ✓" : `Add ${variant} — ${formatPrice(line.price)}`}
          </span>
        </button>

        <p className="mt-4 font-body text-micro font-light leading-relaxed text-background/40">
          Complimentary carriage across Canada. Checkout lands with the next
          release.
        </p>
      </div>
    </div>
  );
}
