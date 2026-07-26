"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { lineById, formatPrice } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function CartView() {
  const { items, subtotal, hydrated, setQty, remove } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variant: i.variant,
            qty: i.qty,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout is unavailable right now.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  // Pre-hydration: hold the layout so the badge/count don't flash.
  if (!hydrated) {
    return <div className="min-h-[60svh]" aria-hidden="true" />;
  }

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-[88rem] px-8 pt-36 pb-28 md:px-16 md:pt-44 md:pb-36">
      <div className="flex items-center gap-4">
        <span className="h-px w-12 rule-gold" />
        <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
          Your Cart
        </span>
      </div>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] leading-none font-normal tracking-[-0.02em]">
        The bag.
      </h1>

      <div className="mt-14 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
        {/* Line items */}
        <ul className="border-t border-white/10">
          {items.map((i) => {
            const wordmark = lineById(i.productId)?.wordmark ?? "6ES";
            return (
              <li
                key={i.id}
                className="flex gap-5 border-b border-white/10 py-7 md:gap-7"
              >
                <div className="relative flex aspect-[4/5] w-20 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-white/12 bg-gradient-to-b from-white/[0.05] to-transparent md:w-24">
                  <span className="font-display text-lg font-light tracking-[0.1em] text-background/25">
                    {wordmark}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl leading-tight text-background md:text-2xl">
                        {i.name}
                      </h2>
                      <p className="mt-1 font-body text-micro font-light tracking-luxe text-background/50 uppercase">
                        {i.variant} · {i.unit}
                      </p>
                    </div>
                    <span className="font-body text-base font-medium text-background tabular-nums">
                      {formatPrice(i.price * i.qty)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center border border-white/15">
                      <Stepper
                        label="Decrease quantity"
                        onClick={() => setQty(i.id, i.qty - 1)}
                      >
                        −
                      </Stepper>
                      <span className="min-w-8 text-center font-body text-sm text-background tabular-nums">
                        {i.qty}
                      </span>
                      <Stepper
                        label="Increase quantity"
                        onClick={() => setQty(i.id, i.qty + 1)}
                      >
                        +
                      </Stepper>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i.id)}
                      className="font-body text-eyebrow font-medium tracking-luxe text-background/45 uppercase transition-colors duration-300 hover:text-accent"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="lg:pt-2">
          <div className="border border-white/10 p-8">
            <h2 className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
              Summary
            </h2>
            <dl className="mt-6 flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <dt className="font-body text-sm font-light text-background/60">
                  Subtotal
                </dt>
                <dd className="font-body text-base text-background tabular-nums">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="font-body text-sm font-light text-background/60">
                  Shipping &amp; tax
                </dt>
                <dd className="font-body text-micro font-light tracking-luxe text-background/45 uppercase">
                  At checkout
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-6">
              <span className="font-display text-2xl text-background">Total</span>
              <span className="font-display text-2xl text-background tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              className="group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden border border-accent px-8 py-5 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-colors duration-500 ease-[var(--ease-quiet)] hover:text-foreground disabled:opacity-60"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
              />
              <span className="relative">
                {busy ? "Taking you to checkout…" : "Proceed to checkout"}
              </span>
            </button>

            {error && (
              <p role="alert" className="mt-4 font-body text-micro text-accent">
                {error}
              </p>
            )}

            <p className="mt-4 font-body text-micro font-light leading-relaxed text-background/40">
              Secure payment by Stripe. Complimentary carriage across Canada.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-6 inline-block font-body text-micro font-medium tracking-luxe text-background/60 uppercase transition-colors duration-300 hover:text-accent"
          >
            ← Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Stepper({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center font-body text-lg text-background/70 transition-colors duration-300 hover:bg-white/[0.04] hover:text-accent"
    >
      {children}
    </button>
  );
}

function EmptyCart() {
  return (
    <div className="relative flex min-h-[70svh] items-center justify-center px-8 text-center">
      <div className="flex flex-col items-center">
        <span className="font-display text-6xl font-light tracking-[0.15em] text-background/15">
          6ES
        </span>
        <div className="mt-8 h-px w-16 rule-gold" />
        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight font-normal">
          Your cart is quiet.
        </h1>
        <p className="mt-5 max-w-[38ch] font-body text-base leading-relaxed font-light text-background/55">
          Nothing here yet. The house is three lines deep — start with the
          signature, or browse everything.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/6es"
            className={cn(
              "group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-accent px-8 py-4 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-colors duration-500 ease-[var(--ease-quiet)] hover:text-foreground",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
            />
            <span className="relative">Discover 6ES</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center border-b border-white/20 px-2 py-4 font-body text-micro font-medium tracking-luxe text-background/70 uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Browse the house
          </Link>
        </div>
      </div>
    </div>
  );
}
