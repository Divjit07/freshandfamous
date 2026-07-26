"use client";

import {
  Component,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BottleStage from "./bottle-stage";
import { LightMotes } from "./light-motes";
import { stage } from "./stage-store";
import { Grain } from "@/components/site/grain";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Choreography — one entry per act. The bottle lerps toward BOTTLE[i] and     */
/*  the backdrop crossfades to TINT[i] as each act takes the stage. Keep these  */
/*  in sync with the six frames rendered below.                                 */
/* -------------------------------------------------------------------------- */

const BOTTLE = [
  { rotY: -0.15, posX: 0.55, posY: 0.16, scale: 0.72 }, // 01 Flagship — resting on the slab in the beam, right
  { rotY: Math.PI * 0.85, posX: -1.35, posY: 0, scale: 1.0 }, // 02 Concentration — left
  { rotY: Math.PI * 1.7, posX: 0.85, posY: 0.05, scale: 0.92 }, // 03 Two Expressions
  { rotY: Math.PI * 2.5, posX: 1.25, posY: 0, scale: 0.85 }, // 04 The House — right
  { rotY: Math.PI * 3.3, posX: 1.2, posY: 0, scale: 0.85 }, // 05 Invitation — right, at eye level
] as const;

const TINT = [
  { warm: 0.55, rose: 0, night: 0 }, // 01 him — soft gold
  { warm: 0.85, rose: 0, night: 0 }, // 02 him — warmer gold
  { warm: 0, rose: 0.8, night: 0 }, // 03 her — muted plum
  { warm: 0.6, rose: 0, night: 0 }, // 04 him — gold
  { warm: 0.4, rose: 0, night: 0.25 }, // 05 invitation
] as const;

// Bottle variant per act — 0 = gold "For Him", 1 = frosted "For Her". The
// dissolve happens on the handoff into Act 03, then reverts for the finale.
const MORPH = [0, 0, 1, 1, 0] as const;

const ACTS = BOTTLE.length;

/* -------------------------------------------------------------------------- */
/*  WebGL guard — if the canvas fails to initialise, fall back to the still.    */
/* -------------------------------------------------------------------------- */

class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Static hero — SSR/first-paint baseline and the reduced-motion / mobile view */
/*  Full render at quality, no crop, no pin, no WebGL.                          */
/* -------------------------------------------------------------------------- */

function StaticHero({
  heroSrc,
  stageSrc,
}: {
  heroSrc?: string | null;
  stageSrc?: string | null;
}) {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-foreground">
      {stageSrc && (
        <Image
          src={stageSrc}
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(161,98,7,0.22),transparent_70%)]"
      />
      <Grain />
      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] items-center gap-10 px-8 pt-28 pb-16 md:px-16 lg:grid-cols-[1.05fr_0.95fr]">
        <SceneCopy
          marker="01 — The Flagship"
          kicker="Fresh & Famous — Toronto"
          wordmark
          sub="One scent. Two expressions."
          body="An extrait de parfum built for longevity — the highest fragrance concentration, offered as For Him and For Her."
          ctas
        />
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
          {heroSrc && (
            <Image
              src={heroSrc}
              alt="6ES™ Extrait de Parfum"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain"
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene copy — shared building block for the acts.                           */
/* -------------------------------------------------------------------------- */

function SceneCopy({
  marker,
  kicker,
  wordmark = false,
  heading,
  sub,
  body,
  extra,
  ctas = false,
  closingCta = false,
  align = "left",
}: {
  marker: string;
  kicker?: string;
  wordmark?: boolean;
  heading?: ReactNode;
  sub?: string;
  body: string;
  extra?: ReactNode;
  ctas?: boolean;
  closingCta?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto flex max-w-2xl flex-col items-center text-center"
          : "flex flex-col items-start"
      }
    >
      <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
        {marker}
      </span>

      {kicker && (
        <span className="mt-6 font-body text-eyebrow font-light tracking-luxe text-background/55 uppercase">
          {kicker}
        </span>
      )}

      {wordmark && (
        <h1 className="mt-4 font-display text-[clamp(4.5rem,16vw,11rem)] leading-[0.9] font-normal tracking-[-0.03em] text-background">
          6ES<span className="align-super text-[0.28em] text-accent">™</span>
        </h1>
      )}

      {heading && (
        <h2 className="mt-4 max-w-[16ch] text-balance font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.02em] text-background">
          {heading}
        </h2>
      )}

      {sub && (
        <p className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight font-light text-background/85 italic">
          {sub}
        </p>
      )}

      <p
        className={`mt-7 max-w-[46ch] font-body text-base leading-relaxed font-light text-background/60 md:text-lg ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {body}
      </p>

      {extra}

      {ctas && (
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <ShimmerCta href="/6es">Discover 6ES</ShimmerCta>
          <Link
            href="/shop"
            className="group inline-flex w-fit items-center gap-2 border-b border-background/25 pb-1 font-body text-micro font-medium tracking-luxe text-background/80 uppercase transition-colors duration-300 hover:border-accent hover:text-background"
          >
            Shop all
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      )}

      {closingCta && (
        <div className="mt-10">
          <ShimmerCta href="/shop">Enter the house</ShimmerCta>
        </div>
      )}
    </div>
  );
}

/** Magic-UI-style shimmer button — a gold wipe fills on hover, a sheen sweeps. */
function ShimmerCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex w-fit items-center gap-3 overflow-hidden border border-accent/70 px-9 py-4 font-body text-micro font-medium tracking-luxe text-accent uppercase transition-colors duration-500 ease-[var(--ease-quiet)] hover:text-foreground"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-[var(--ease-quiet)] group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden="true"
        className="relative transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  The storyboard — one pinned viewport, six cross-fading acts, one bottle     */
/*  that turns and travels the whole way through on a single scrubbed timeline. */
/* -------------------------------------------------------------------------- */

function Storyboard({
  heroSrc,
  stageSrc,
}: {
  heroSrc?: string | null;
  stageSrc?: string | null;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    if (!root || !sticky) return;

    const ctx = gsap.context(() => {
      gsap.set(stage, { ...BOTTLE[0], morph: MORPH[0], duo: 1 });
      gsap.set(".sb-0", { autoAlpha: 1, y: 0 });
      for (let i = 1; i < ACTS; i++) {
        gsap.set(`.sb-${i}`, { autoAlpha: 0, y: 28 });
      }
      gsap.set(".sb-5", { autoAlpha: 0, y: 20 });
      gsap.set(".tint-warm", { opacity: TINT[0].warm });
      gsap.set(".tint-rose", { opacity: TINT[0].rose });
      gsap.set(".tint-night", { opacity: TINT[0].night });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // The landing companion "For Her" recedes behind, rotating, the moment
      // the story starts scrolling.
      tl.to(stage, { duo: 0, duration: 0.6, ease: "power2.inOut" }, 0.15);

      // One beat per transition. Each act holds, then hands off to the next.
      for (let i = 1; i < ACTS; i++) {
        const at = i - 1 + 0.4;
        tl.to(stage, { ...BOTTLE[i], duration: 0.6, ease: "power2.inOut" }, at)
          .to(stage, { morph: MORPH[i], duration: 0.5, ease: "power2.inOut" }, at)
          .to(".tint-warm", { opacity: TINT[i].warm, duration: 0.6 }, at)
          .to(".tint-rose", { opacity: TINT[i].rose, duration: 0.6 }, at)
          .to(".tint-night", { opacity: TINT[i].night, duration: 0.6 }, at)
          .to(`.sb-${i - 1}`, { autoAlpha: 0, y: -24, duration: 0.3 }, at)
          .to(`.sb-${i}`, { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.15);
      }

      // Act 06 — copy clears, the pair centres at a modest size, companion
      // returns, then both settle front-facing (labels to camera). No yoyo /
      // repeat on scrubbed props — those fight ScrollTrigger and glitch the scroll.
      const outro = ACTS - 1 + 0.5;
      // Hero sits left of centre so the pair (hero + companion at +0.95) is centred.
      const FINALE = {
        posX: -0.48,
        posY: -0.08, // sit lower so the Act 06 type never rides the caps
        scale: 0.58,
        rotY: Math.PI * 4, // exact front face (2 full turns from 0)
      };
      tl.to(`.sb-${ACTS - 1}`, { autoAlpha: 0, y: -24, duration: 0.45 }, outro)
        .to(stage, { ...FINALE, duration: 1.2, ease: "power2.inOut" }, outro)
        .to(stage, { duo: 1, duration: 0.9, ease: "power2.inOut" }, outro)
        .to(".tint-warm", { opacity: 0.18, duration: 0.8 }, outro)
        // Act 06 copy frames the pair as they settle front-facing
        .to(".sb-5", { autoAlpha: 1, y: 0, duration: 0.55 }, outro + 0.35)
        .to(".sb-scroll-cue", { autoAlpha: 0, duration: 0.35 }, outro + 0.2)
        // hold on the front-facing pair so the settle is actually seen
        .to({}, { duration: 1.1 });

      tl.fromTo(
        ".sb-progress-fill",
        { scaleY: 0 },
        { scaleY: 1, duration: tl.duration(), ease: "none" },
        0,
      );
    }, root);

    const onPointer = (e: PointerEvent) => {
      const r = sticky.getBoundingClientRect();
      stage.pointerX = ((e.clientX - r.left) / r.width) * 2 - 1;
      stage.pointerY = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    sticky.addEventListener("pointermove", onPointer);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      sticky.removeEventListener("pointermove", onPointer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-[560vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-foreground"
      >
        {/* Marble stage — the lit set the 3D bottle stands in. Served at full
            quality so the beam and marble grain stay crisp. */}
        {stageSrc && (
          <Image
            src={stageSrc}
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="pointer-events-none object-cover object-center"
          />
        )}
        {/* Backdrop base + animated tints — kept low and warm so the marble set
            and its light beam stay the subject. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_52%_46%,rgba(161,98,7,0.10),transparent_74%)]"
        />
        {/* him — soft gold, echoing the beam */}
        <div
          aria-hidden="true"
          className="tint-warm pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_50%_52%,rgba(161,98,7,0.30),rgba(70,42,12,0.10)_58%,transparent_84%)]"
        />
        {/* her — muted plum / mauve, warm enough to sit with the gold */}
        <div
          aria-hidden="true"
          className="tint-rose pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,rgba(122,66,80,0.40),rgba(48,22,30,0.14)_62%,transparent_88%)]"
        />
        {/* finale — a quiet, near-neutral cool to close */}
        <div
          aria-hidden="true"
          className="tint-night pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_112%,rgba(40,44,64,0.38),transparent_74%)]"
        />

        {/* The 3D bottle — persistent across every act. Mounts client-side only. */}
        <CanvasBoundary>
          <div className="pointer-events-none absolute inset-0">
            <BottleStage />
          </div>
        </CanvasBoundary>

        {/* Dust drifting through the beam — the set breathing. */}
        <LightMotes className="pointer-events-none absolute inset-0 z-[5]" />

        {/* Poster underlay — shows if the canvas is still warming up */}
        {heroSrc && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40"
          >
            <div className="relative aspect-[4/5] h-[60%]">
              <Image
                src={heroSrc}
                alt=""
                fill
                priority
                sizes="40vw"
                className="object-contain"
              />
            </div>
          </div>
        )}

        <Grain />

        {/* Progress rail */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-6 z-20 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block"
        >
          <div className="sb-progress-fill absolute inset-x-0 top-0 h-full origin-top bg-accent" />
        </div>

        {/* Acts */}
        <div className="absolute inset-0 z-20">
          {/* 01 — The Flagship */}
          <Frame>
            <div className="sb-0 grid w-full max-w-[88rem] items-center gap-10 px-8 md:px-16 lg:grid-cols-[1.05fr_0.95fr]">
              <SceneCopy
                marker="01 — The Flagship"
                kicker="Fresh & Famous — Toronto"
                wordmark
                sub="One scent. Two expressions."
                body="An extrait de parfum built for longevity — the highest fragrance concentration, offered as For Him and For Her."
                ctas
              />
            </div>
          </Frame>

          {/* 02 — The Concentration */}
          <Frame>
            <div className="sb-1 grid w-full max-w-[88rem] px-8 md:px-16 lg:grid-cols-[0.95fr_1.05fr]">
              <span className="hidden lg:block" />
              <SceneCopy
                marker="02 — The Concentration"
                heading={
                  <>
                    Poured richer.
                    <br />
                    <span className="text-accent italic">Made to last.</span>
                  </>
                }
                body="Extrait is the highest concentration a house can pour — worn close, it lasts the night and reads as intention, not volume."
              />
            </div>
          </Frame>

          {/* 03 — Two Expressions */}
          <Frame>
            <div className="sb-2 grid w-full max-w-[88rem] px-8 md:px-16 lg:grid-cols-[1.05fr_0.95fr]">
              <SceneCopy
                marker="03 — Two Expressions"
                heading={
                  <>
                    For Her. <span className="text-accent italic">For Him.</span>
                  </>
                }
                body="One accord, two temperaments — a frosted flacon and a mirror-gold twin. The same signature, dressed for two."
              />
            </div>
          </Frame>

          {/* 04 — The House */}
          <Frame>
            <div className="sb-3 grid w-full max-w-[88rem] px-8 md:px-16 lg:grid-cols-[1.05fr_0.95fr]">
              <SceneCopy
                marker="04 — The House"
                heading={
                  <>
                    Luxury isn&rsquo;t a luxury here. It&rsquo;s the{" "}
                    <span className="text-accent italic">baseline.</span>
                  </>
                }
                body="Twenty years of scent mastery, decanted in Toronto. Not mass-produced energy — intentional luxury, dressed for the world."
                extra={
                  <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden border-y border-white/10">
                    {[
                      ["Est. 20 yrs", "Scent mastery"],
                      ["The 416", "Made in Toronto"],
                      ["Extrait", "Richest pour"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1.5 py-5 pr-4">
                        <dt className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                          {k}
                        </dt>
                        <dd className="font-body text-micro font-light text-background/55">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                }
              />
            </div>
          </Frame>

          {/* 05 — The Invitation */}
          <Frame>
            <div className="sb-4 grid w-full max-w-[88rem] items-center px-8 md:px-16 lg:grid-cols-[1.05fr_0.95fr]">
              <SceneCopy
                marker="05 — The Invitation"
                heading={
                  <>
                    Born to stand out.
                    <br />
                    Built to be <span className="text-accent italic">fresh.</span>
                  </>
                }
                body="The house, in one bottle. Step inside and find your expression."
                closingCta
              />
            </div>
          </Frame>

          {/* 06 — The Pair — type pinned to top/bottom bands so the bottles stay clear */}
          <Frame>
            <div className="sb-5 pointer-events-none relative h-full w-full max-w-[88rem] px-8 md:px-16">
              {/* Top band — sits above the caps */}
              <div className="absolute inset-x-8 top-[9vh] flex flex-col items-center text-center md:inset-x-16 md:top-[10vh]">
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  06 — The Pair
                </span>
                <div
                  aria-hidden="true"
                  className="mt-4 flex w-full max-w-md items-center gap-3"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/45 to-accent/15" />
                  <span className="size-1 rotate-45 bg-accent/80" />
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/45 to-accent/15" />
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-none font-normal tracking-[-0.02em] text-background">
                  Him. Her.{" "}
                  <span className="text-accent italic">One signature.</span>
                </h2>
              </div>

              {/* Side captions — outside the bottle column */}
              <div className="absolute inset-x-8 top-[48%] hidden -translate-y-1/2 items-center justify-between md:inset-x-12 md:flex lg:inset-x-20">
                <span className="font-body text-micro font-medium tracking-luxe text-background/40 uppercase">
                  For Him
                </span>
                <span className="font-body text-micro font-medium tracking-luxe text-background/40 uppercase">
                  For Her
                </span>
              </div>

              {/* Bottom band — below the slab / bottle bases */}
              <div className="pointer-events-auto absolute inset-x-8 bottom-[4vh] flex flex-col items-center text-center md:inset-x-16 md:bottom-[5vh]">
                <div
                  aria-hidden="true"
                  className="mb-4 flex w-full max-w-md items-center gap-3"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/45 to-accent/15" />
                  <span className="size-1 rotate-45 bg-accent/80" />
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/45 to-accent/15" />
                </div>
                <p className="max-w-[34ch] font-body text-sm leading-relaxed font-light text-background/55">
                  The same house. Dressed for two. Choose the one that wears like you.
                </p>
                <div className="mt-5">
                  <ShimmerCta href="/6es">Choose your expression</ShimmerCta>
                </div>
              </div>
            </div>
          </Frame>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="sb-scroll-cue absolute inset-x-0 bottom-6 z-20 flex justify-center"
        >
          <span className="flex items-center gap-3 font-body text-[0.625rem] font-light tracking-luxe text-background/40 uppercase">
            Scroll the story
            <span className="h-8 w-px bg-gradient-to-b from-accent/70 to-transparent" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** A single frame layer inside the pinned viewport. */
function Frame({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "center" | "end";
}) {
  return (
    <div
      className={`absolute inset-0 flex justify-center ${
        align === "end" ? "items-end" : "items-center"
      }`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Entry — baseline first, storyboard once we know motion + width are welcome. */
/* -------------------------------------------------------------------------- */

export function Storyboard6ES({
  heroSrc,
  stageSrc,
}: {
  heroSrc?: string | null;
  stageSrc?: string | null;
}) {
  const reduced = useReducedMotion();
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnhance(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enhance || reduced !== false) {
    return <StaticHero heroSrc={heroSrc} stageSrc={stageSrc} />;
  }
  return <Storyboard heroSrc={heroSrc} stageSrc={stageSrc} />;
}
