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

          {/* Left — label + headline */}
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 rule-gold" />
              <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                The Endorsement
              </span>
            </div>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-normal text-background">
              Drake backed the house.
            </h2>
            <p className="mt-5 max-w-[44ch] font-body text-base leading-relaxed font-light text-background/60">
              Toronto&apos;s most globally recognised artist commented directly on the 6ES Instagram post.
              When the city&apos;s voice speaks, the world listens.
            </p>

            {/* Quote pull */}
            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p className="font-display text-xl font-light text-background/85 italic leading-snug">
                &ldquo;Hurry up and buy 6ES&hellip;cologniiiiiii&rdquo;
              </p>
              <footer className="mt-2 font-body text-xs font-medium tracking-luxe text-accent uppercase">
                — champagnepapi (Drake) ✓ Verified
              </footer>
            </blockquote>

            <Link
              href="/famous"
              className="mt-8 inline-flex items-center gap-2 font-body text-micro font-medium tracking-luxe text-accent uppercase transition-opacity duration-300 hover:opacity-70"
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
