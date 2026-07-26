import Link from "next/link";
import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { CollectionGrid } from "@/components/home/collection-grid";
import { findAssets } from "@/lib/assets";
import { collectionAutoLines, lines } from "@/lib/catalog";

/**
 * Collection chapter — premium house copy + a perspective 3D product grid
 * on a gold wireframe stage. Architectural, not particle theatre.
 */
export function Collection() {
  const thumbs = findAssets({
    "6es": "products/6es",
    mist: "products/mist",
    mag420: "products/mag420",
    "car-hang": "products/car-hang",
    caribbean: "products/caribbean-pack",
  });

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <Grain opacity={0.07} />

      {/* Knife-edge light cut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[min(52vw,36rem)]"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, transparent 42%, rgba(161,98,7,0.09) 48%, rgba(242,217,143,0.07) 52%, transparent 58%, transparent 100%)",
        }}
      />

      {/* Registration marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-8 hidden h-16 w-px bg-accent/40 md:right-16 md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-8 hidden h-px w-16 bg-accent/40 md:right-16 md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 bottom-10 hidden h-16 w-px bg-accent/25 md:right-16 md:block"
      />

      <div className="relative z-10 mx-auto max-w-[88rem] px-8 py-28 md:px-16 md:py-40">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <ChapterMark numeral="II" label="The Collection" />
            <h2 className="mt-7 max-w-[14ch] text-balance font-display text-[clamp(2.4rem,6.5vw,4.5rem)] leading-[0.98] font-normal tracking-[-0.02em]">
              Three pours.{" "}
              <span className="text-accent italic">One standard.</span>
            </h2>
            <p className="mt-8 max-w-[46ch] font-body text-base leading-relaxed font-light text-background/60 md:text-lg">
              A tight house, on purpose. Extrait for the night, mist for the
              hours between, MAG420 for motion — plus Mr Fresh for the ride.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:pb-1">
            <p className="max-w-[36ch] font-body text-sm leading-relaxed font-light text-background/45 lg:ml-auto lg:text-right">
              Luxury isn&rsquo;t a luxury here. It&rsquo;s the baseline —
              intentional concentration, Toronto-made, built to stand out.
            </p>
            <div className="mt-6 flex lg:justify-end">
              <Link
                href="/shop"
                className="group inline-flex w-fit items-center gap-2 border-b border-accent/40 pb-1 font-body text-micro font-medium tracking-luxe text-accent uppercase transition-colors duration-300 hover:border-accent"
              >
                Enter the house
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16 md:mt-24">
          <CollectionGrid items={lines} thumbs={thumbs} columns={3} />
        </Reveal>

        <Reveal delay={0.16} className="mt-5 md:mt-6">
          <CollectionGrid
            items={collectionAutoLines}
            thumbs={thumbs}
            columns={2}
            indexOffset={lines.length}
          />
        </Reveal>
      </div>
    </section>
  );
}
