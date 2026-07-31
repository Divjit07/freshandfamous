"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Grain } from "@/components/site/grain";

export function DrakeEndorsement() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(212,164,58,0.04),transparent_70%)]"
      />
      <Grain />

      <div className="relative mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-36">

        {/* Centred editorial layout */}
        <Reveal className="text-center max-w-[52rem] mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Instagram logo (left) */}
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="font-body text-[10px] font-semibold tracking-[0.3em] text-accent uppercase">
              Backed by the 6ix
            </span>
            {/* Twitter / X logo (right) */}
            <svg className="h-4.5 w-4.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </div>

          <h2 className="mt-8 font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[0.95] font-normal text-background">
            &ldquo;Hurry up and buy 6ES&hellip;<br className="hidden sm:inline" />cologniiiiiii&rdquo;
          </h2>

          <p className="mt-6 font-body text-base font-light text-background/40 tracking-wide">
            — Drake&ensp;·&ensp;@champagnepapi&ensp;·&ensp;Verified&ensp;✓
          </p>
        </Reveal>

        {/* Real screenshot — the proof */}
        <Reveal delay={0.15} className="mt-16 flex justify-center">
          <div className="relative w-full max-w-[400px] group">
            {/* Gold accent border glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-px rounded-lg bg-gradient-to-b from-accent/25 via-accent/10 to-transparent blur-[1px]"
            />
            <div className="relative overflow-hidden rounded-lg border border-accent/20 bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              <Image
                src="/celebrity/drake-comment.jpg"
                alt="Drake's verified Instagram comment on the 6ES post: Hurry up and buy 6ES...cologniiiiiii"
                width={400}
                height={520}
                className="w-full h-auto transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.01]"
                priority
              />
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={0.25} className="mt-14 text-center">
          <Link
            href="/famous"
            className="inline-flex items-center gap-3 border border-accent/30 px-8 py-3.5 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-all duration-300 hover:bg-accent hover:text-foreground"
          >
            See the full story
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

      </div>
    </section>
  );
}
