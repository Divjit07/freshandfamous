"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Grain } from "@/components/site/grain";

export function DrakeEndorsement() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_50%,rgba(161,98,7,0.1),transparent_65%)]"
      />
      <Grain />

      <div className="relative mx-auto max-w-[88rem] px-8 py-20 md:px-16 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 items-center">

          {/* Left — structured endorsement details */}
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 rule-gold" />
              <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                The Endorsement
              </span>
            </div>

            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.02] font-normal text-background">
              Drake backed the house.
            </h2>

            {/* Stat row */}
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-b border-white/10 py-5">
              <div>
                <span className="block font-body text-[10px] font-medium tracking-luxe text-accent uppercase">Artist</span>
                <span className="mt-1 block font-display text-lg text-background">Drake</span>
              </div>
              <div>
                <span className="block font-body text-[10px] font-medium tracking-luxe text-accent uppercase">Platform</span>
                <span className="mt-1 block font-display text-lg text-background">Instagram</span>
              </div>
              <div>
                <span className="block font-body text-[10px] font-medium tracking-luxe text-accent uppercase">Status</span>
                <span className="mt-1 block font-display text-lg text-accent">Verified ✓</span>
              </div>
            </div>

            <p className="mt-6 max-w-[48ch] font-body text-sm leading-relaxed font-light text-background/55">
              Toronto&apos;s most globally recognised artist commented directly on the 6ES Instagram post — putting the house on the global stage overnight.
            </p>

            {/* Quote */}
            <blockquote className="mt-8 border-l-2 border-accent/80 bg-white/[0.02] pl-6 pr-5 py-5 rounded-r-[4px]">
              <p className="font-display text-2xl font-light text-background italic leading-snug">
                &ldquo;Hurry up and buy 6ES&hellip;cologniiiiiii&rdquo;
              </p>
              <footer className="mt-3 font-body text-[10px] font-semibold tracking-luxe text-accent uppercase">
                @champagnepapi · Drake · 2d
              </footer>
            </blockquote>

            <Link
              href="/famous"
              className="mt-8 inline-flex items-center gap-3 border border-accent/40 px-6 py-3 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-all duration-300 hover:bg-accent hover:text-foreground"
            >
              See the full story
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          {/* Right — actual Drake Instagram screenshot */}
          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[360px] overflow-hidden rounded-[12px] border border-white/15 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.7)] group">
              {/* Phone-style header bar */}
              <div className="flex items-center justify-between bg-white px-4 py-2.5 border-b border-black/8">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  </div>
                  <span className="font-body text-[11px] font-semibold text-black/80">6es_______</span>
                </div>
                <span className="font-body text-[11px] text-black/40">Instagram</span>
              </div>
              {/* Screenshot */}
              <div className="relative w-full bg-white">
                <Image
                  src="/celebrity/drake-comment.jpg"
                  alt="Drake (champagnepapi) verified Instagram comment: Hurry up and buy 6ES...cologniiiiiii"
                  width={360}
                  height={480}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
