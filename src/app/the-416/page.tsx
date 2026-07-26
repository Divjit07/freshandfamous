import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/site/page-intro";
import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";
import { studio } from "@/lib/catalog";
import { findAsset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "The 416",
  description:
    "6ES for the 6ix. The area code, the skyline, the city — pressed into the object itself.",
};

const STORY = [
  {
    k: "The area code",
    v: "416 is Toronto's original code — and it's foil-stamped into the spine of every carton, so the city is the first thing you touch.",
  },
  {
    k: "The skyline",
    v: "Sample cards carry a CN Tower nightline, the view that raised the house, printed in the same gold as the seal.",
  },
  {
    k: "The read",
    v: "6ES reads as the 6ix. The name isn't decoration — it's where this was made, worn on skin from Bloor Street to anywhere.",
  },
];

export default function The416Page() {
  const cartons = findAsset("the-416/cartons");
  return (
    <div className="bg-foreground text-background">
      <PageIntro
        eyebrow="Toronto · The 416"
        title={
          <>
            6ES reads as the <span className="text-accent italic">6ix.</span>
          </>
        }
        lede="Born in Toronto, built for the world. The most ownable thing this house has isn't a note or a bottle — it's a city, pressed into everything it makes."
      />

      {/* Giant foil numeral + the three marks */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_10%,rgba(161,98,7,0.14),transparent_65%)]"
        />
        <Grain />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[44vw] leading-none font-semibold tracking-[-0.04em] text-transparent select-none md:text-[32vw]"
          style={{ WebkitTextStroke: "1px rgba(161,98,7,0.18)" }}
        >
          416
        </span>

        <div className="relative mx-auto max-w-[88rem] px-8 py-28 md:px-16 md:py-40">
          <Reveal
            stagger
            as="ul"
            className="grid gap-px overflow-hidden border-y border-white/10 md:grid-cols-3"
          >
            {STORY.map((s) => (
              <li
                key={s.k}
                className="flex flex-col gap-4 bg-foreground/80 py-10 backdrop-blur-sm md:px-8 md:first:pl-0"
              >
                <span className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                  {s.k}
                </span>
                <span className="font-body text-base leading-relaxed font-light text-background/65">
                  {s.v}
                </span>
              </li>
            ))}
          </Reveal>

          {cartons && (
            <Reveal className="mt-16 overflow-hidden rounded-[3px] border border-white/10 md:mt-20">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={cartons}
                  alt="6ES cartons, foil-stamped 416 on the spine"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          <Reveal className="mt-20 flex flex-col gap-3 md:mt-28">
            <p className="font-display text-2xl font-light text-background/80 md:text-3xl">
              {studio.name} · {studio.street}
            </p>
            <p className="font-body text-micro font-light tracking-luxe text-background/40 uppercase">
              {studio.city} — {studio.coords}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
