"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Grain } from "@/components/site/grain";

export function DrakeEndorsement() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 md:py-32 border-t border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,164,58,0.03),transparent_75%)]"
      />
      <Grain />

      <div className="relative mx-auto max-w-[80rem] px-6 md:px-12">
        
        {/* Header Social Bar */}
        <Reveal className="flex items-center justify-center gap-4 mb-16">
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
          <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          
          {/* Left — Drake's Portrait */}
          <Reveal className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[380px] group aspect-square md:aspect-[4/5] overflow-hidden rounded-lg border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]">
              <Image
                src="/celebrity/drake-portrait.png"
                alt="Drake (champagnepapi) wearing OVO Owl necklace"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                priority
              />
              {/* Subtle gold overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5">
                <span className="font-body text-[11px] font-medium text-accent tracking-widest uppercase">The Artist</span>
                <h3 className="font-display text-xl text-background mt-1 font-normal">Drake</h3>
              </div>
            </div>
          </Reveal>

          {/* Right — Instagram Comment Screenshot */}
          <Reveal delay={0.15} className="flex flex-col items-center md:items-start">
            <div className="relative w-full max-w-[380px] group">
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-lg bg-gradient-to-b from-accent/20 via-accent/5 to-transparent blur-[1px]"
              />
              <div className="relative overflow-hidden rounded-lg border border-accent/20 bg-black shadow-[0_32px_64px_-16px_rgba(0,0,0,0.9)]">
                <Image
                  src="/celebrity/drake-comment.jpg"
                  alt="Drake's verified comment: Hurry up and buy 6ES...cologniiiiiii"
                  width={380}
                  height={494}
                  className="w-full h-auto transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.01]"
                />
              </div>
            </div>

            {/* Quote details */}
            <div className="mt-8 text-center md:text-left">
              <p className="font-body text-xs font-light text-background/50 tracking-wider">
                — champagnepapi&ensp;·&ensp;Verified&ensp;✓&ensp;·&ensp;Instagram Comment
              </p>
              
              <div className="mt-6">
                <Link
                  href="/famous"
                  className="inline-flex items-center gap-3 border border-accent/30 px-6 py-3 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-all duration-300 hover:bg-accent hover:text-foreground"
                >
                  See the full story
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
