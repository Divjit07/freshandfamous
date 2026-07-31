import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/site/page-intro";
import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Famous — Celebrity Endorsements",
  description:
    "Fresh & Famous in the city. See the faces, events, and moments where Mr Fresh became part of the culture — from Toronto stages to global platforms.",
};

const PROMO_IMAGES = Array.from({ length: 20 }, (_, i) => ({
  src: `/celebrity/promo-${i + 1}.jpg`,
  alt: `Mr Fresh celebrity promotional moment ${i + 1}`,
}));

export default function FamousPage() {
  return (
    <div className="bg-foreground text-background">
      <PageIntro
        eyebrow="Backed by the City"
        title={
          <>
            The 6ix is Fresh &amp; <span className="text-accent italic">Famous.</span>
          </>
        }
        lede="Built in Toronto, validated by the tastemakers who shape the global culture. From youth entrepreneur stages to global recognition — Fresh & Famous moves in every room."
        backgroundSrc="/celebrity/famous-hero-bg.jpg"
        backgroundAlt="6ES luxury perfume bottle on marble"
      />

      {/* Drake / Toronto Endorsement Banner */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_40%,rgba(161,98,7,0.12),transparent_65%)]"
        />
        <Grain />

        <div className="relative mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">

            {/* Left — Stylized Drake Instagram Comment Card */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 rule-gold" />
                  <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                    Toronto&apos;s Own
                  </span>
                </div>
                <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-normal">
                  Certified by the 6ix.
                </h2>
                <p className="mt-6 font-body text-base leading-relaxed font-light text-background/65 max-w-[50ch]">
                  When you represent the 416, the city notices. Drake — Toronto&apos;s most globally recognised voice — backed the release, confirming that the house is delivering real luxury to the baseline.
                </p>
              </Reveal>

              {/* Real quote pull */}
              <Reveal className="mt-8 border-l-2 border-accent pl-6 max-w-[480px]">
                <blockquote>
                  <p className="font-display text-2xl font-light text-background/90 italic leading-snug">
                    &ldquo;Hurry up and buy 6ES&hellip;cologniiiiiii&rdquo;
                  </p>
                  <footer className="mt-3 font-body text-xs font-medium tracking-luxe text-accent uppercase">
                    — champagnepapi (Drake) · Verified ✓ · Instagram
                  </footer>
                </blockquote>
              </Reveal>
            </div>

            {/* Right — Actual Drake Instagram Screenshot */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal className="w-full max-w-[360px] overflow-hidden rounded-[12px] border border-white/15 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75)] group">
                {/* Phone-frame header */}
                <div className="flex items-center justify-between bg-white px-4 py-2.5 border-b border-black/8">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gray-200" />
                    <span className="font-body text-[11px] font-semibold text-black/80">6es_______</span>
                  </div>
                  <span className="font-body text-[11px] text-black/40">Instagram</span>
                </div>
                {/* Screenshot */}
                <div className="relative w-full bg-white">
                  <Image
                    src="/celebrity/drake-comment.jpg"
                    alt="Drake (champagnepapi) verified Instagram comment: Hurry up and buy 6ES...cologniiiiiii"
                    width={360}
                    height={480}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.01]"
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Campaign Gallery — All promo images */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 rule-gold" />
              <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                Campaign Gallery
              </span>
            </div>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-normal">
              Seen. Recognised. Remembered.
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed font-light text-background/65 max-w-[60ch]">
              From award ceremonies and city stages to industry events and youth entrepreneur programs — Mr Fresh has been in every room that matters.
            </p>
          </Reveal>

          {/* Masonry-style grid — large hero + smaller grid */}
          <div className="mt-16 space-y-4">

            {/* Row 1 — 3 columns */}
            <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PROMO_IMAGES.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[4px] border border-white/10"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent"
                    />
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Row 2 — wide left + 2 right */}
            <Reveal stagger className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <div className="group relative overflow-hidden rounded-[4px] border border-white/10 md:col-span-3">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/celebrity/promo-4.jpg"
                    alt="Mr Fresh celebrity campaign moment"
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.02]"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4 md:col-span-2">
                {PROMO_IMAGES.slice(4, 6).map((img, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-[4px] border border-white/10">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Row 3 — 4 columns */}
            <Reveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {PROMO_IMAGES.slice(6, 10).map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-[4px] border border-white/10">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Row 4 — 2 wide + 1 narrow */}
            <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PROMO_IMAGES.slice(10, 13).map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-[4px] border border-white/10">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Row 5 — 4 columns */}
            <Reveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {PROMO_IMAGES.slice(13, 17).map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-[4px] border border-white/10">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Row 6 — last 3 images */}
            <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PROMO_IMAGES.slice(17, 20).map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-[4px] border border-white/10">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ))}
            </Reveal>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <Reveal className="text-center">
            <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
              The Scent
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.02] font-normal">
              Worn by the city&apos;s finest.
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed font-light text-background/60 max-w-[48ch] mx-auto">
              Fresh &amp; Famous is more than a scent — it&apos;s the signature of everyone who&apos;s been in the room and made it count.
            </p>
            <a
              href="/6es"
              className="mt-10 inline-flex items-center gap-2 border border-accent px-8 py-4 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-all duration-300 hover:bg-accent hover:text-foreground"
            >
              Shop 6ES™
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
