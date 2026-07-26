import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { LineIndex } from "@/components/home/line-index";
import { MrFreshSection } from "@/components/shop/mr-fresh-section";
import { Reveal } from "@/components/ui/reveal";
import { lines, formatPrice } from "@/lib/catalog";
import { findAsset } from "@/lib/assets";
import { AddButton } from "@/components/product/add-button";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "6ES Extrait, MAG420™ — plus Mr Fresh car hangs, Caribbean limited islands, and Walmart magnesium mist.",
};

const mag = lines.find((l) => l.id === "mag420")!;
const houseDuo = findAsset("products/shop-duo");

export default function ShopPage() {
  return (
    <div className="bg-foreground text-background">
      <PageIntro
        eyebrow="The House"
        title={
          <>
            Everything Fresh &amp;{" "}
            <span className="text-accent italic">Famous</span> makes.
          </>
        }
        lede="Signature pours upstairs. Mr Fresh downstairs — car hangs, Caribbean limited, and the Walmart can. Same house. Two registers."
        backgroundSrc={houseDuo}
        backgroundAlt="6ES For Her and For Him — floating studio portrait"
      />

      {/* Signature lines */}
      <section className="mx-auto max-w-[88rem] px-8 pb-28 md:px-16 md:pb-36">
        <Reveal>
          <p className="mb-10 font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
            Signature
          </p>
          <LineIndex />
        </Reveal>
      </section>

      {/* Sports MAG420 — colourways */}
      <section
        id="mag420"
        className="scroll-mt-24 border-t border-white/10"
      >
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 rule-gold" />
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  Sports MAG420™ Infusion
                </span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-normal">
                Motion, bottled.
              </h2>
            </div>
            <span className="font-body text-lg font-medium text-background">
              {formatPrice(mag.price)}
            </span>
          </Reveal>

          <Reveal
            stagger
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 sm:grid-cols-4"
          >
            {mag.variants.map((c) => (
              <div
                key={c}
                className="flex flex-col gap-5 bg-foreground p-6 md:p-7"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full ring-1 ring-white/15"
                    style={{ backgroundColor: swatch(c) }}
                  />
                  <span className="font-display text-2xl leading-none text-background">
                    {c}
                  </span>
                </div>
                <AddButton
                  className="w-full"
                  label={`Add — ${formatPrice(mag.price)}`}
                  item={{
                    id: `mag420:${c.toLowerCase()}`,
                    productId: "mag420",
                    name: mag.name,
                    variant: c,
                    unit: mag.unit,
                    price: mag.price,
                    href: "/shop#mag420",
                  }}
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <MrFreshSection />
    </div>
  );
}

function swatch(color: string): string {
  switch (color) {
    case "Blue":
      return "#3b5b8c";
    case "White":
      return "#e8ecf0";
    case "Red":
      return "#8c3b3b";
    default:
      return "#1c1917";
  }
}
