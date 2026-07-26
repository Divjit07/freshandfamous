"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Iridescence from "@/components/Iridescence";
import { Grain } from "@/components/site/grain";
import { ProductImage } from "@/components/product/product-image";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

// Module constant, not an inline literal: Iridescence keys its WebGL setup
// effect on this array, so a new reference every render would tear down and
// rebuild the renderer on each pass.
const GOLD: [number, number, number] = [0.62, 0.42, 0.14];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Hero({ productSrc }: { productSrc?: string | null }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // matchMedia gives us the reduced-motion gate and the teardown in one
    // object: revert() kills every trigger and tween created inside it.
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The one authored moment: headline lines rise out from behind a mask,
      // the frame draws on, the product lifts. Everything eases out from an
      // already-composed page, so a failed JS load leaves the hero intact.
      const intro = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      intro
        .from(".hero-line > span", {
          yPercent: 118,
          duration: 1.5,
          stagger: 0.12,
        })
        .from(
          ".hero-frame",
          { opacity: 0, duration: 1.6, ease: "power2.out" },
          0.1,
        )
        .from(
          ".hero-rail",
          { opacity: 0, duration: 1.4, stagger: 0.1 },
          0.4,
        )
        .from(
          productRef.current,
          { autoAlpha: 0, y: 28, scale: 0.985, duration: 1.6 },
          0.35,
        )
        .from(
          ".hero-lift",
          { autoAlpha: 0, y: 18, duration: 1.2, stagger: 0.08 },
          0.6,
        );

      // Pin + scrub: gold drifts up, type and product part ways as the section
      // dissolves into the bone chapter below.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(bgRef.current, { yPercent: -20, ease: "none" }, 0)
        .to(contentRef.current, { y: -48, autoAlpha: 0, ease: "none" }, 0)
        .to(productRef.current, { y: 40, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero-scrollcue", { autoAlpha: 0, ease: "none" }, 0);
    });

    // Cormorant arrives over the network, and a display face reflowing at this
    // scale moves the pin's end point. Re-measure once the swap has landed.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[38rem] w-full overflow-hidden bg-foreground"
    >
      {/* Decorative WebGL — it drifts, body copy never does. Sized past the
          section so the -20% drift can't expose an edge at the bottom. */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[125%] will-change-transform"
      >
        {reduced === false ? (
          <Iridescence
            color={GOLD}
            speed={0.3}
            amplitude={0.02}
            mouseReact={false}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,#5a3a12_0%,#2a1d0c_45%,#0c0a09_100%)]" />
        )}
      </div>

      {/* Scrims — hold the gold down to atmosphere and give type its contrast.
          A soft gold spotlight lifts the centre where the bottle stands. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-foreground/55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_38%_50%_at_72%_48%,rgba(161,98,7,0.28),transparent_70%)] md:bg-[radial-gradient(ellipse_30%_55%_at_72%_50%,rgba(161,98,7,0.3),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-foreground)_82%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-foreground"
      />

      {/* Film grain over everything — paper stock, not noise. */}
      <Grain />

      {/* Foil-stamp frame + registration ticks — the carton motif, drawn thin. */}
      <div
        aria-hidden="true"
        className="hero-frame pointer-events-none absolute inset-4 z-10 border border-white/12 md:inset-7"
      >
        <Tick className="-top-px -left-px" />
        <Tick className="-top-px -right-px rotate-90" />
        <Tick className="-bottom-px -right-px rotate-180" />
        <Tick className="-bottom-px -left-px -rotate-90" />
      </div>

      {/* Edge rails — the signature carried up the sides: the line, the 416. */}
      <Rail className="left-4 md:left-7" side="left">
        N&deg;001 &mdash; Extrait de Parfum
      </Rail>
      <Rail className="right-4 md:right-7" side="right">
        43.6532&deg; N &middot; The 416
      </Rail>

      {/* Editorial split: statement left, the object right. */}
      <div
        ref={contentRef}
        className="relative z-20 mx-auto grid h-full max-w-[88rem] grid-rows-[auto_1fr_auto] gap-y-6 px-8 pt-20 pb-8 md:px-16 md:pt-24 md:pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-none lg:items-center lg:gap-x-10"
      >
        {/* LEFT — kicker, headline, spec, CTA */}
        <div className="row-start-2 flex flex-col justify-center lg:row-auto">
          <div className="hero-lift flex items-center gap-4">
            <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
              6ES&trade; House of Fragrance
            </span>
            <span className="h-px w-16 rule-gold sm:w-24" />
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,11vw,4rem)] leading-[0.98] font-normal tracking-[-0.02em] text-background md:mt-8 lg:text-[clamp(4rem,6.4vw,7rem)]">
            <span className="hero-line block overflow-hidden py-[0.06em]">
              <span className="block">Born to</span>
            </span>
            <span className="hero-line block overflow-hidden py-[0.06em]">
              <span className="block">
                Stand <span className="text-accent italic">Out.</span>
              </span>
            </span>
            <span className="hero-line mt-[0.12em] block overflow-hidden py-[0.06em] text-background/55">
              <span className="block">
                Built to Be <span className="italic text-background">Fresh.</span>
              </span>
            </span>
          </h1>

          <div className="hero-lift mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 md:mt-11">
            <a
              href="/shop"
              className="group relative inline-flex w-fit items-center gap-3 overflow-hidden border border-accent/70 px-8 py-4 font-body text-micro font-medium tracking-luxe text-accent uppercase transition-colors duration-500 ease-[var(--ease-quiet)] hover:text-foreground"
            >
              {/* Gold wipe fills from the left on hover — the label rides over it */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
              />
              <span className="relative">Discover 6ES</span>
              <span
                aria-hidden="true"
                className="relative transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>

            <p className="font-body text-micro font-light leading-relaxed text-background/55 uppercase">
              50ml &middot; 1.7 fl oz
              <br className="hidden sm:block" />
              <span className="text-background/40"> For Her &middot; For Him</span>
            </p>
          </div>
        </div>

        {/* RIGHT — the object, lit on a plinth */}
        <div className="row-start-1 flex items-center justify-center lg:row-auto lg:justify-end">
          <div ref={productRef} className="relative flex flex-col items-center">
            {/* Product shot — 4:5, height-driven so it can never push the
                composition off a short viewport. Falls back to the monogram
                until a render is dropped into /public/hero. */}
            <ProductImage
              src={productSrc}
              alt="6ES™ Extrait de Parfum"
              fit="cover"
              position="68% 55%"
              priority
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="h-[clamp(11rem,30svh,26rem)] w-auto"
            />

            {/* Plinth: a lit gold line with its own reflection */}
            <div className="mt-5 h-px w-[70%] rule-gold" />
            <div className="mt-4 font-body text-eyebrow font-medium tracking-luxe text-background/45 uppercase">
              Toronto &middot; MMXXVI
            </div>
          </div>
        </div>
      </div>

      {/* Baseline scroll cue */}
      <div
        aria-hidden="true"
        className="hero-lift hero-scrollcue absolute inset-x-0 bottom-6 z-20 hidden justify-center md:flex"
      >
        <span className="flex items-center gap-3 font-body text-[0.625rem] font-light tracking-luxe text-background/40 uppercase">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-accent/70 to-transparent" />
        </span>
      </div>
    </section>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 border-t border-l border-accent/70 ${className}`}
    />
  );
}

function Rail({
  children,
  side,
  className = "",
}: {
  children: React.ReactNode;
  side: "left" | "right";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`hero-rail pointer-events-none absolute top-1/2 z-10 hidden -translate-y-1/2 lg:block ${className}`}
    >
      <span
        className="block font-body text-[0.625rem] font-light tracking-luxe whitespace-nowrap text-background/40 uppercase"
        style={{
          writingMode: "vertical-rl",
          transform: side === "left" ? "rotate(180deg)" : undefined,
        }}
      >
        {children}
      </span>
    </div>
  );
}
