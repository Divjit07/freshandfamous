"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Grain } from "@/components/site/grain";

/* Instagram SVG logo — official glyph outline */
function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" fill="currentColor"/>
      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" fill="currentColor"/>
      <circle cx="18.406" cy="5.594" r="1.44" fill="currentColor"/>
    </svg>
  );
}

export function DrakeEndorsement() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_50%,rgba(212,164,58,0.06),transparent_65%)]"
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

            <Link
              href="/famous"
              className="mt-8 inline-flex items-center gap-3 border border-accent/40 px-6 py-3 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-all duration-300 hover:bg-accent hover:text-foreground"
            >
              See the full story
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          {/* Right — professional Instagram comment card */}
          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-[0_32px_70px_-12px_rgba(0,0,0,0.8)]">

              {/* Instagram header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <InstagramLogo className="h-5 w-5 text-white/70" />
                  <span className="font-body text-xs font-semibold text-white/80 tracking-wide">Instagram</span>
                </div>
                <span className="font-body text-[10px] text-white/35 tracking-wider uppercase">Verified Comment</span>
              </div>

              {/* Comment body */}
              <div className="px-5 py-5">
                {/* Drake profile row */}
                <div className="flex items-center gap-3.5">
                  {/* Drake avatar */}
                  <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden ring-2 ring-accent/50">
                    <Image
                      src="/celebrity/drake-comment.jpg"
                      alt="Drake profile"
                      fill
                      className="object-cover object-[50%_20%] scale-[2.5]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-body text-sm font-bold text-white">champagnepapi</span>
                      {/* Instagram verified badge */}
                      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="20" fill="#0095F6"/>
                        <path d="M17.5 27L10 19.5l2.5-2.5 5 5L27.5 12l2.5 2.5L17.5 27z" fill="white"/>
                      </svg>
                    </div>
                    <span className="font-body text-[11px] text-white/40">Drake · Toronto, ON</span>
                  </div>
                </div>

                {/* Comment text */}
                <div className="mt-4 pl-[3.375rem]">
                  <p className="font-body text-[15px] leading-relaxed text-white/90">
                    Hurry up and buy 6ES...cologniiiiiii
                  </p>
                  <div className="mt-3 flex items-center gap-5 font-body text-[11px] text-white/35">
                    <span>2d</span>
                    <span>12,842 likes</span>
                    <button className="text-white/50 hover:text-accent transition-colors duration-200">Reply</button>
                  </div>
                </div>
              </div>

              {/* Footer — post reference */}
              <div className="flex items-center gap-3 px-5 py-3 border-t border-white/6 bg-white/[0.02]">
                <div className="h-8 w-8 rounded overflow-hidden shrink-0 bg-white/10">
                  <Image
                    src="/celebrity/drake-comment.jpg"
                    alt="6ES post thumbnail"
                    width={32}
                    height={32}
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-body text-[11px] font-semibold text-white/60">6es_______</span>
                  <span className="block font-body text-[10px] text-white/30 truncate">Pinned comment on post</span>
                </div>
                <InstagramLogo className="h-4 w-4 text-white/20 shrink-0" />
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
