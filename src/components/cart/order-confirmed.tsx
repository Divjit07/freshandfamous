"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export function OrderConfirmed() {
  const { clear, hydrated } = useCart();

  // Stripe redirected back on success — the bag has been paid for, so empty it.
  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);

  return (
    <div className="relative flex min-h-[80svh] items-center justify-center px-8 text-center">
      <div className="flex flex-col items-center">
        <span className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
          Order confirmed
        </span>
        <div className="mt-6 h-px w-16 rule-gold" />
        <h1 className="mt-8 max-w-[16ch] text-balance font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.02] font-normal">
          Thank you. The house is on its way.
        </h1>
        <p className="mt-6 max-w-[42ch] font-body text-base leading-relaxed font-light text-background/60">
          A receipt and tracking are headed to your inbox. Wear it well — you
          were born to stand out.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center border-b border-white/20 px-2 py-3 font-body text-micro font-medium tracking-luxe text-background/70 uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          Back to Fresh &amp; Famous
        </Link>
      </div>
    </div>
  );
}
