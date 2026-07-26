"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lines, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const line = lines.find((l) => l.id === "6es")!;

export function SixEsShowcase({
  images,
}: {
  images: Record<string, string | null>;
}) {
  const [variant, setVariant] = useState(line.variants[0]);
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
          <div className="relative aspect-[4/5] h-[clamp(16rem,44svh,34rem)] w-auto overflow-hidden rounded-[3px]">
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
          <span className="text-background/85 italic">{line.tagline}</span>{" "}
          {line.blurb}
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
