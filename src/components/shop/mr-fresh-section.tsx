import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { AddButton } from "@/components/product/add-button";
import {
  caribbeanIslands,
  carHangScents,
  certifications,
  formatPrice,
  mrFreshProducts,
  retailMistScents,
} from "@/lib/catalog";
import { findAsset } from "@/lib/assets";

const carHang = mrFreshProducts.find((p) => p.id === "car-hang")!;
const caribbean = mrFreshProducts.find((p) => p.id === "caribbean")!;
const retail = mrFreshProducts.find((p) => p.id === "retail-can")!;

/** Prefer dedicated packshot, then lifestyle/action variants. */
function retailScentImage(slug: string): string | null {
  return (
    findAsset(`mr-fresh/retail-${slug}-pack`) ??
    findAsset(`mr-fresh/retail-${slug}`) ??
    findAsset(`mr-fresh/retail-${slug}-life`) ??
    findAsset(`mr-fresh/retail-${slug}-hand`) ??
    findAsset(`products/mist-${slug}-pack`) ??
    findAsset(`products/mist-${slug}`)
    // Note: intentionally skip `-mist` action shots for grid tiles
  );
}

/**
 * Mr Fresh chapter on /shop — auto hangs, Caribbean limited, Walmart retail.
 * Reads client drops from public/mr-fresh/*; missing slots keep crafted fallbacks.
 */
export function MrFreshSection() {
  const logo = findAsset("mr-fresh/logo");
  const cabin = findAsset("mr-fresh/black-ice-cabin");
  const cabinDusk = findAsset("mr-fresh/black-ice-cabin-dusk");
  const hang = findAsset("mr-fresh/black-ice-hang");
  const lineup =
    findAsset("mr-fresh/caribbean/lineup-v2") ??
    findAsset("mr-fresh/caribbean/lineup");
  const retailPack =
    findAsset("mr-fresh/retail-divine-sensation-flatlay") ??
    findAsset("mr-fresh/retail-divine-sensation") ??
    findAsset("mr-fresh/retail-can");
  const retailLineup = findAsset("mr-fresh/retail-lineup-8");
  const retailShelf = findAsset("mr-fresh/retail-shelf-mix");
  const retailFlatlay = findAsset("mr-fresh/retail-flatlay-mix");
  const retailMoodGarden =
    findAsset("mr-fresh/retail-mood-garden") ?? retailFlatlay;
  const retailMistPlume = findAsset("mr-fresh/retail-mother-earth-mist");
  const retailScenes = [
    findAsset("mr-fresh/retail-divine-sensation-34"),
    findAsset("mr-fresh/retail-tropical-islands-life"),
    findAsset("mr-fresh/retail-ocean-fresh-life"),
    findAsset("mr-fresh/retail-cherry-blossom-hand"),
  ].filter(Boolean) as string[];

  return (
    <>
      <section
        id="mr-fresh"
        className="scroll-mt-24 border-t border-white/10 bg-[#0c0a09]"
      >
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)] lg:gap-10 xl:gap-14">
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 rule-gold" />
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  Mr Fresh · Auto &amp; Retail
                </span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.98] font-normal tracking-[-0.02em]">
                Keep it{" "}
                <span className="text-accent italic">fresh.</span>
              </h2>
              <p className="mt-6 max-w-[46ch] font-body text-base leading-relaxed font-light text-background/60">
                The everyday face of Fresh &amp; Famous — the line you&rsquo;ll
                actually find on the shelf and on the road. Mr Fresh{" "}
                <span className="text-background">car air fresheners</span> keep
                the daily drive fresh, and our magnesium-infused{" "}
                <span className="text-background">Air &amp; Body Mist</span> is
                stocked at Walmart across the United States. Same Toronto house.
                Made for every day.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/45 bg-accent/[0.07] px-5 py-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                  Now at Walmart · United States
                </span>
              </div>
            </div>
            {logo && (
              <div className="relative mx-auto aspect-square w-full max-w-[20rem] overflow-hidden rounded-[2px] border border-white/10 bg-white lg:mx-0 lg:max-w-none">
                <Image
                  src={logo}
                  alt="Mr Fresh — Keep it Fresh"
                  fill
                  sizes="(max-width: 1024px) 20rem, 28rem"
                  className="object-contain p-3 md:p-4"
                  quality={100}
                  priority
                />
              </div>
            )}
          </Reveal>

          {/* Three pillars */}
          <Reveal
            stagger
            className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-3"
          >
            {mrFreshProducts.map((p) => (
              <article
                key={p.id}
                className="flex flex-col justify-between gap-8 bg-[#0c0a09] p-7 md:p-8"
              >
                <div>
                  {p.badge && (
                    <span className="font-body text-micro font-medium tracking-luxe text-accent uppercase">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-2xl leading-tight text-background md:text-[1.75rem]">
                    {p.name}
                  </h3>
                  <p className="mt-2 font-body text-sm font-light text-background/45">
                    {p.tagline}
                  </p>
                  <p className="mt-4 font-body text-sm leading-relaxed font-light text-background/55">
                    {p.blurb}
                  </p>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-body text-micro font-light tracking-luxe text-background/35 uppercase">
                    {p.unit}
                  </span>
                  <span className="font-body text-lg font-medium text-background">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </article>
            ))}
          </Reveal>

          {/* Black Ice — lifestyle + hang */}
          <div
            id="car-hang"
            className="mt-20 scroll-mt-24 grid gap-px overflow-hidden border border-white/10 lg:grid-cols-2"
          >
            <Reveal className="relative aspect-[4/5] min-h-[22rem] bg-black lg:aspect-auto">
              {(cabin || hang) && (
                <Image
                  src={(cabin ?? hang)!}
                  alt="Mr Fresh Black Ice hanging in a car cabin"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={100}
                />
              )}
            </Reveal>
            <Reveal className="flex flex-col justify-between gap-10 bg-[#141110] p-8 md:p-12">
              <div>
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  Car air freshener · {carHangScents[0]?.name}
                </span>
                <h3 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none">
                  {carHang.name}
                </h3>
                <p className="mt-5 max-w-[40ch] font-body text-base leading-relaxed font-light text-background/55">
                  {carHang.blurb} Cool, clean, night-drive — the scent that
                  rides shotgun, now hanging on Walmart shelves across the US.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-micro font-semibold tracking-luxe text-accent uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  At Walmart · US
                </span>
                <div className="mt-10 flex gap-3">
                  {hang && (
                    <div className="relative aspect-square w-36 overflow-hidden rounded-[2px] border border-white/10 md:w-40">
                      <Image
                        src={hang}
                        alt="Mr Fresh Black Ice hang — product detail"
                        fill
                        sizes="160px"
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  )}
                  {cabinDusk && (
                    <div className="relative aspect-square w-36 overflow-hidden rounded-[2px] border border-white/10 md:w-40">
                      <Image
                        src={cabinDusk}
                        alt="Mr Fresh Black Ice — golden hour cabin"
                        fill
                        sizes="160px"
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              </div>
              <AddButton
                size="lg"
                className="w-full sm:w-auto"
                label={`Add Black Ice — ${formatPrice(carHang.price)}`}
                item={{
                  id: "mr-fresh:black-ice",
                  productId: "car-hang",
                  name: carHang.name,
                  variant: "Black Ice",
                  unit: carHang.unit,
                  price: carHang.price,
                  href: "/shop#car-hang",
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Caribbean limited */}
      <section
        id="caribbean"
        className="scroll-mt-24 border-t border-white/10 bg-foreground"
      >
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 rule-gold" />
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  Limited · Caribbean Collection
                </span>
              </div>
              <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-normal">
                Represent yuh islands.
              </h2>
              <p className="mt-5 max-w-[46ch] font-body text-base leading-relaxed font-light text-background/55">
                {caribbean.blurb}
              </p>
            </div>
            <span className="font-body text-lg font-medium text-background">
              {formatPrice(caribbean.price)}
            </span>
          </Reveal>

          {lineup && (
            <Reveal className="mt-14 overflow-hidden rounded-[2px] border border-accent/25">
              <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
                <Image
                  src={lineup}
                  alt="Fresh & Famous Caribbean island hanging fresheners"
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                  quality={95}
                />
              </div>
            </Reveal>
          )}

          <Reveal
            stagger
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 sm:grid-cols-3 lg:grid-cols-4"
          >
            {caribbeanIslands.map((island, i) => {
              const solo = findAsset(`mr-fresh/caribbean/${island.slug}`);
              const isHero = island.slug === "jamaica";
              return (
                <div
                  key={island.slug}
                  className="group flex flex-col justify-between gap-6 bg-foreground p-5 transition-colors duration-500 hover:bg-white/[0.03] md:p-6"
                >
                  {solo ? (
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] border border-white/10">
                      <Image
                        src={solo}
                        alt={`${island.name} island hang`}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <span className="font-body text-micro font-light tabular-nums text-background/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <div>
                    {isHero && (
                      <span className="mb-2 block font-body text-micro font-medium tracking-luxe text-accent uppercase">
                        Featured
                      </span>
                    )}
                    <h3 className="font-display text-xl leading-tight text-background transition-colors duration-500 group-hover:text-accent md:text-2xl">
                      {island.name}
                    </h3>
                    <p className="mt-1 font-body text-micro font-light text-background/45">
                      {island.note}
                    </p>
                    <AddButton
                      className="mt-4 w-full"
                      label={`Add — ${formatPrice(caribbean.price)}`}
                      item={{
                        id: `caribbean:${island.slug}`,
                        productId: "caribbean",
                        name: caribbean.name,
                        variant: island.name,
                        unit: caribbean.unit,
                        price: caribbean.price,
                        href: "/shop#caribbean",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Walmart retail mist */}
      <section
        id="retail"
        className="scroll-mt-24 border-t border-white/10 bg-[#141110]"
      >
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 rule-gold" />
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  Retail · Walmart US
                </span>
              </div>
              <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-normal">
                Magnesium mist. Eight moods.
              </h2>
              <p className="mt-5 max-w-[48ch] font-body text-base leading-relaxed font-light text-background/60">
                Our best-seller — a magnesium-infused Air &amp; Body Mist in
                eight scents, 4&nbsp;fl&nbsp;oz, now stocked at{" "}
                <span className="text-background">Walmart across the United
                States</span>. Everyday price. Made to move off the shelf.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/45 bg-accent/[0.07] px-4 py-2 font-body text-micro font-semibold tracking-luxe text-accent uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Now at Walmart · US
              </span>
              <span className="font-body text-lg font-medium text-background">
                {formatPrice(retail.price)}
              </span>
            </div>
          </Reveal>

          {retailLineup && (
            <Reveal className="mt-14 overflow-hidden rounded-[2px] border border-white/10">
              <div className="relative aspect-[21/9] w-full min-h-[14rem]">
                <Image
                  src={retailLineup}
                  alt="Mr Fresh Air & Body Mist — eight scent lineup"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  quality={100}
                />
              </div>
            </Reveal>
          )}

          <Reveal
            stagger
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 sm:grid-cols-3 lg:grid-cols-4"
          >
            {retailMistScents.map((s, i) => {
              const img = retailScentImage(s.slug);
              return (
                <div
                  key={s.slug}
                  className="group flex flex-col justify-between gap-6 bg-[#141110] p-5 transition-colors duration-500 hover:bg-white/[0.03] md:p-6"
                >
                  {img ? (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-white/10 bg-black">
                      <Image
                        src={img}
                        alt={`Mr Fresh ${s.name} Air & Body Mist`}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-105"
                        quality={100}
                      />
                    </div>
                  ) : (
                    <span className="font-body text-micro font-light tabular-nums text-background/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <div>
                    <h3 className="font-display text-xl leading-tight text-background transition-colors duration-500 group-hover:text-accent md:text-2xl">
                      {s.name}
                    </h3>
                    <p className="mt-1 font-body text-micro font-light text-background/45">
                      {s.note}
                    </p>
                    <AddButton
                      className="mt-4 w-full"
                      label={`Add — ${formatPrice(retail.price)}`}
                      item={{
                        id: `retail-mist:${s.slug}`,
                        productId: "retail-can",
                        name: retail.name,
                        variant: s.name,
                        unit: retail.unit,
                        price: retail.price,
                        href: "/shop#retail",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Reveal>

          {/* Lifestyle / retail scenes */}
          {(retailScenes.length > 0 ||
            retailShelf ||
            retailMoodGarden ||
            retailMistPlume) && (
            <Reveal
              stagger
              className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-white/10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {retailPack && (
                <div className="relative aspect-[4/5] bg-black sm:aspect-auto sm:min-h-[22rem]">
                  <Image
                    src={retailPack}
                    alt="Mr Fresh Divine Sensation — rose petals and gold ribbon"
                    fill
                    sizes="33vw"
                    className="object-cover object-center"
                    quality={100}
                  />
                </div>
              )}
              {retailMistPlume && (
                <div className="relative aspect-[4/5] bg-black sm:aspect-auto sm:min-h-[22rem]">
                  <Image
                    src={retailMistPlume}
                    alt="Mr Fresh Mother Earth — mist in air"
                    fill
                    sizes="33vw"
                    className="object-cover object-[18%_center]"
                    quality={100}
                  />
                </div>
              )}
              {retailShelf && (
                <div className="relative aspect-[4/5] bg-black sm:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={retailShelf}
                    alt="Mr Fresh mist on a Walmart retail shelf"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    quality={100}
                  />
                </div>
              )}
              {retailScenes.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/5] bg-black sm:aspect-auto sm:min-h-[20rem]"
                >
                  <Image
                    src={src}
                    alt="Mr Fresh Air & Body Mist — lifestyle"
                    fill
                    sizes="33vw"
                    className="object-cover"
                    quality={100}
                  />
                </div>
              ))}
              {retailMoodGarden && (
                <div className="relative aspect-[16/10] bg-black sm:col-span-2 sm:min-h-[20rem] lg:min-h-[22rem]">
                  <Image
                    src={retailMoodGarden}
                    alt="Mr Fresh mist scents with garden mood props"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    quality={100}
                  />
                </div>
              )}
            </Reveal>
          )}

          <Reveal
            stagger
            className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-white/10 sm:grid-cols-3"
          >
            {certifications.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-2 bg-[#141110] px-6 py-8 md:px-8"
              >
                <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                  {c.label}
                </span>
                <span className="font-body text-sm font-light text-background/50">
                  {c.detail}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
