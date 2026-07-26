"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { studio } from "@/lib/catalog";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";

const MARKS = [
  {
    k: "The vision",
    v: "Luxury isn’t a luxury here — it’s the baseline he set for the house.",
  },
  {
    k: "The craft",
    v: "Twenty years of scent mastery, poured into every extrait and mist.",
  },
  {
    k: "The city",
    v: "Toronto’s 416, worn on skin — the 6ix, signed in every bottle.",
  },
];

/**
 * The 416 — founder left, story right. Background carries a slow gold aurora
 * + foil dot field; type stays quiet (no oversized focus gimmicks).
 */
export function The416Feature({
  founderSrc,
}: {
  founderSrc?: string | null;
}) {
  const reduced = useReducedMotion();
  const motionOk = reduced === false;

  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      {/* --- Background atmosphere (the effect lives here) --- */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${motionOk ? "ff-aurora" : ""}`}
      >
        <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(161,98,7,0.16),transparent_68%)] blur-3xl" />
        <div className="absolute top-[10%] -right-[15%] h-[65%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-15%] left-[25%] h-[55%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(161,98,7,0.1),transparent_72%)] blur-3xl" />
      </div>

      {/* Foil dot field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(161,98,7,0.45) 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Soft vignette so edges stay clean */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_40%,rgba(250,250,249,0.85)_100%)]"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-1/2 z-0 -translate-x-1/2 font-display text-[36vw] leading-none font-semibold tracking-[-0.04em] text-transparent select-none md:-top-8 md:text-[22vw] lg:-top-12 lg:text-[20vw]"
        style={{ WebkitTextStroke: "1.5px rgba(161,98,7,0.22)" }}
      >
        416
      </span>

      <div className="relative z-10 mx-auto grid max-w-[88rem] items-stretch gap-10 px-8 pt-40 pb-28 md:gap-14 md:px-16 md:pt-52 md:pb-40 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pt-56 xl:gap-24">
        {/* Founder — left */}
        <Reveal className="relative order-1 flex h-full flex-col">
          {founderSrc ? (
            <figure className="group relative flex h-full flex-col">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 border border-accent/35 md:-inset-4"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1.5 border border-accent/15 md:-inset-2"
              />

              <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-foreground/5">
                <Image
                  src={founderSrc}
                  alt="Dwayne Nathaniel Wright, Founder & CEO of Fresh & Famous"
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-[28%_center] transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_50%,rgba(12,10,9,0.18)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 h-5 w-5 border-t border-l border-accent/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 h-5 w-5 border-t border-r border-accent/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-accent/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 h-5 w-5 border-r border-b border-accent/70"
                />
              </div>

              <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-foreground/10 pt-4">
                <div>
                  {motionOk ? (
                    <ShinyText
                      text="Dwayne Nathaniel Wright"
                      className="font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl"
                      color="#0c0a09"
                      shineColor="#A16207"
                      speed={4}
                      delay={2}
                    />
                  ) : (
                    <p className="font-display text-xl leading-tight tracking-[-0.02em] md:text-2xl">
                      Dwayne Nathaniel Wright
                    </p>
                  )}
                  <p className="mt-1 font-body text-micro font-medium tracking-luxe text-accent uppercase">
                    Founder &amp; CEO
                  </p>
                </div>
                <span className="shrink-0 font-body text-micro font-light tracking-luxe text-foreground/35 uppercase">
                  Toronto
                </span>
              </figcaption>
            </figure>
          ) : (
            <div className="aspect-[4/5] w-full bg-foreground/5" />
          )}
        </Reveal>

        {/* Client story — right */}
        <div className="order-2 flex flex-col justify-between lg:min-h-full lg:pt-2">
          <div>
            <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
              The Founder
            </span>

            {motionOk ? (
              <div className="mt-6">
                <BlurText
                  text="The man behind the house."
                  animateBy="words"
                  direction="bottom"
                  delay={70}
                  stepDuration={0.28}
                  className="max-w-[16ch] font-display text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.98] font-normal tracking-[-0.02em] text-foreground"
                />
              </div>
            ) : (
              <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.98] font-normal tracking-[-0.02em]">
                The man behind the{" "}
                <span className="text-accent italic">house.</span>
              </h2>
            )}

            {motionOk ? (
              <>
                <BlurText
                  text="Dwayne Nathaniel Wright built Fresh & Famous from Toronto — twenty years of scent mastery, decanted into a house that treats luxury as the baseline, not the exception. 6ES is his signature: the city, worn on skin."
                  animateBy="words"
                  direction="bottom"
                  delay={28}
                  stepDuration={0.22}
                  className="mt-8 max-w-[52ch] font-body text-base leading-relaxed font-light text-foreground/65 md:text-lg"
                />
                <BlurText
                  text="From the foil-stamped carton to the extrait in the flacon, every detail carries his standard — intentional, unhurried, and built to stand out."
                  animateBy="words"
                  direction="bottom"
                  delay={24}
                  stepDuration={0.2}
                  className="mt-5 max-w-[52ch] font-body text-base leading-relaxed font-light text-foreground/55 md:text-lg"
                />
              </>
            ) : (
              <>
                <p className="mt-8 max-w-[52ch] font-body text-base leading-relaxed font-light text-foreground/65 md:text-lg">
                  Dwayne Nathaniel Wright built Fresh &amp; Famous from Toronto —
                  twenty years of scent mastery, decanted into a house that treats
                  luxury as the baseline, not the exception. 6ES is his signature:
                  the city, worn on skin.
                </p>
                <p className="mt-5 max-w-[52ch] font-body text-base leading-relaxed font-light text-foreground/55 md:text-lg">
                  From the foil-stamped carton to the extrait in the flacon, every
                  detail carries his standard — intentional, unhurried, and built
                  to stand out.
                </p>
              </>
            )}
          </div>

          <Reveal
            stagger
            delay={0.1}
            as="ul"
            className="mt-12 grid gap-px overflow-hidden border-y border-foreground/10 sm:grid-cols-3 md:mt-16"
          >
            {MARKS.map((m) => (
              <li
                key={m.k}
                className="flex flex-col gap-3 bg-background/70 py-8 pr-4 backdrop-blur-[1px] sm:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                  {m.k}
                </span>
                <span className="font-body text-sm leading-relaxed font-light text-foreground/60">
                  {m.v}
                </span>
              </li>
            ))}
          </Reveal>

          <p className="mt-10 font-body text-micro font-light tracking-luxe text-foreground/40 uppercase">
            Fresh &amp; Famous Inc. · {studio.city}
          </p>
        </div>
      </div>
    </section>
  );
}
