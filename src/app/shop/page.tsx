import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/site/page-intro";
import { LineIndex } from "@/components/home/line-index";
import { MrFreshSection } from "@/components/shop/mr-fresh-section";
import { Reveal } from "@/components/ui/reveal";
import { lines, mrFreshShopLines, formatPrice } from "@/lib/catalog";
import { findAsset } from "@/lib/assets";
import { AddButton } from "@/components/product/add-button";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "6ES Extrait, MAG420™ Magnesium Vitamin Air Freshener — plus Mr Fresh car hangs, Caribbean limited islands, and Walmart magnesium mist.",
};

const mag = lines.find((l) => l.id === "mag420")!;
const houseDuo = findAsset("products/shop-duo");

// Map each MAG420 scent variant to its product image slug
function magImage(variant: string): string {
  const map: Record<string, string> = {
    "Tropical Islands": "/products/mag420-tropical-islands.jpg",
    "Mother Earth": "/products/mag420-mother-earth.jpg",
    "Cherry Blossom": "/products/mag420-cherry-blossom.jpg",
    "Odourless Aura": "/products/mag420-odourless-aura.jpg",
    "Baby Powder": "/products/mag420-baby-powder.jpg",
    "Fresh Vanilla": "/products/mag420-fresh-vanilla.jpg",
    "Ocean Fresh": "/products/mag420-ocean-fresh.jpg",
  };
  return map[variant] ?? "/products/mag420.jpg";
}

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

      {/* The full range — signature pours + the Mr Fresh retail products */}
      <section className="mx-auto max-w-[88rem] px-8 pb-28 md:px-16 md:pb-36">
        <Reveal>
          <p className="mb-10 font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
            The Range
          </p>
          <LineIndex items={[...lines, ...mrFreshShopLines]} />
        </Reveal>
      </section>

      {/* MAG420 — Magnesium Vitamin Air Freshener with product images */}
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
                  MAG420™ — Magnesium Vitamin
                </span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-normal">
                Wellness, bottled.
              </h2>
              <p className="mt-5 max-w-[54ch] font-body text-base leading-relaxed font-light text-background/60">
                A clean, magnesium-infused formula in seven signature scents designed to refresh your space. $9.99 CAD each.
              </p>
            </div>
            <span className="font-body text-lg font-medium text-background shrink-0">
              {formatPrice(mag.price)} CAD
            </span>
          </Reveal>

          <Reveal
            stagger
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7"
          >
            {mag.variants.map((variant) => (
              <div
                key={variant}
                className="group flex flex-col gap-0 overflow-hidden border border-white/10 rounded-[4px] bg-foreground transition-colors duration-300 hover:border-accent/30"
              >
                {/* Product image */}
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={magImage(variant)}
                    alt={`MAG420™ ${variant} — Magnesium Vitamin Air Freshener`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                    className="object-contain p-2 transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-[1.05]"
                  />
                </div>
                {/* Name + CTA */}
                <div className="flex flex-col gap-3 p-4">
                  <span className="font-display text-sm leading-tight text-background">
                    {variant}
                  </span>
                  <AddButton
                    className="w-full"
                    label={`Add — ${formatPrice(mag.price)}`}
                    item={{
                      id: `mag420:${variant.toLowerCase().replace(/\s+/g, "-")}`,
                      productId: "mag420",
                      name: mag.name,
                      variant,
                      unit: mag.unit,
                      price: mag.price,
                      href: "/shop#mag420",
                    }}
                  />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <MrFreshSection />
    </div>
  );
}
