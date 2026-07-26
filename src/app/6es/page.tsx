import type { Metadata } from "next";
import Image from "next/image";
import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";
import { SixEsShowcase } from "@/components/product/six-es-showcase";
import { sixEsNotes } from "@/lib/catalog";
import { findAsset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "6ES™ Extrait de Parfum",
  description:
    "The signature. An extrait concentration built to last the night — For Her and For Him, 50ml.",
};

const PYRAMID = [
  { label: "Head", notes: sixEsNotes.head },
  { label: "Heart", notes: sixEsNotes.heart },
  { label: "Base", notes: sixEsNotes.base },
];

export default function SixEsPage() {
  const images = {
    "For Her": findAsset("products/6es-for-her"),
    "For Him": findAsset("products/6es-for-him"),
  };
  const floatSrc = findAsset("products/6es");
  const unboxSrc = findAsset("products/6es-unboxing");
  const detailSrc = findAsset("products/6es-detail");

  const gallery = [
    {
      src: floatSrc,
      alt: "6ES For Her and For Him — floating studio portrait",
      caption: "Two expressions",
      span: "md:col-span-2",
      aspect: "aspect-[16/10]",
    },
    {
      src: unboxSrc,
      alt: "Unboxing 6ES For Him from the black carton",
      caption: "The reveal",
      span: "",
      aspect: "aspect-[4/5]",
    },
    {
      src: detailSrc,
      alt: "Close-up of the gold atomizer on 6ES",
      caption: "The finish",
      span: "",
      aspect: "aspect-[4/5]",
    },
  ].filter((g) => g.src);

  return (
    <div className="bg-foreground text-background">
      {/* Product — variant-linked visual + buy controls */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_55%_at_28%_45%,rgba(161,98,7,0.2),transparent_68%)]"
        />
        <Grain />
        <div className="relative mx-auto max-w-[88rem] px-8 pt-36 pb-24 md:px-16 md:pt-44 md:pb-32">
          <SixEsShowcase images={images} />
        </div>
      </section>

      {/* Editorial gallery — floating duo, unboxing, atomizer detail */}
      {gallery.length > 0 && (
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 rule-gold" />
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  The Object
                </span>
              </div>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-normal">
                Photographed like it costs more — because it should.
              </h2>
            </Reveal>

            <Reveal
              stagger
              as="ul"
              className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5"
            >
              {gallery.map((g) => (
                <li
                  key={g.caption}
                  className={`group relative overflow-hidden ${g.span}`}
                >
                  <div className={`relative w-full overflow-hidden ${g.aspect}`}>
                    <Image
                      src={g.src!}
                      alt={g.alt}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 border border-white/10"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent"
                    />
                    <span className="absolute bottom-5 left-5 font-body text-micro font-medium tracking-luxe text-background/80 uppercase">
                      {g.caption}
                    </span>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* The accord */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 rule-gold" />
              <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                The Accord
              </span>
            </div>
            <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-normal">
              Read from the top down, it tells the night.
            </h2>
          </Reveal>

          <Reveal
            stagger
            as="ul"
            className="mt-14 grid gap-px overflow-hidden border-y border-white/10 md:grid-cols-3"
          >
            {PYRAMID.map((tier) => (
              <li
                key={tier.label}
                className="flex flex-col gap-5 bg-foreground py-9 md:px-8 md:first:pl-0"
              >
                <span className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                  {tier.label}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {tier.notes.map((n) => (
                    <li
                      key={n}
                      className="font-display text-2xl leading-tight font-light text-background/85"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
