import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { findAsset } from "@/lib/assets";

/** Homepage handoff into the Mr Fresh register — cabin + mist lineup. */
export function MrFreshBand() {
  const cabin = findAsset("mr-fresh/black-ice-cabin");
  const mistLineup = findAsset("mr-fresh/retail-lineup-8");
  const caribbean = findAsset("mr-fresh/caribbean/lineup");
  const logo = findAsset("mr-fresh/logo");
  const secondary = mistLineup ?? caribbean;

  return (
    <section className="relative overflow-hidden bg-[#0c0a09] text-background">
      <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 rule-gold" />
              <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                Also from the house
              </span>
            </div>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.98] font-normal tracking-[-0.02em]">
              Mr Fresh for the{" "}
              <span className="text-accent italic">ride.</span>
            </h2>
          </div>
          {logo && (
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 md:h-24 md:w-24">
              <Image
                src={logo}
                alt="Mr Fresh"
                fill
                sizes="96px"
                className="object-cover"
                quality={100}
              />
            </div>
          )}
        </Reveal>

        <Reveal className="mt-12 grid gap-px overflow-hidden border border-white/10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative aspect-[16/10] min-h-[18rem] lg:aspect-auto lg:min-h-[28rem]">
            {cabin && (
              <Image
                src={cabin}
                alt="Mr Fresh Black Ice in a modern cabin"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                quality={100}
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-[22ch] font-display text-2xl leading-tight md:bottom-8 md:left-8 md:text-3xl">
              Black Ice. Keep it fresh.™
            </p>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-auto">
            {secondary && (
              <Image
                src={secondary}
                alt={
                  mistLineup
                    ? "Mr Fresh magnesium mist — eight scents"
                    : "Caribbean island hanging fresheners"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                quality={100}
              />
            )}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[42ch] font-body text-sm leading-relaxed font-light text-background/50">
            Car hangs, Caribbean limited islands, and Walmart US magnesium mist
            — the louder side of Fresh &amp; Famous.
          </p>
          <Link
            href="/shop#mr-fresh"
            className="inline-flex items-center justify-center border border-accent px-7 py-3.5 font-body text-eyebrow font-medium tracking-luxe text-accent uppercase transition-colors duration-500 hover:bg-accent hover:text-foreground"
          >
            Shop Mr Fresh
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
