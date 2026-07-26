import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";
import { ChapterMark } from "@/components/ui/chapter-mark";

const PILLARS = [
  { k: "Est. 20 yrs", v: "Two decades of scent mastery, decanted." },
  { k: "Made in the 416", v: "Composed and bottled in Toronto." },
  { k: "Extrait", v: "The richest concentration a house can pour." },
];

export function Ethos() {
  return (
    <section className="relative overflow-hidden bg-background text-ink">
      <Grain blend="soft-light" opacity={0.5} />
      <div className="relative mx-auto max-w-[88rem] px-8 py-28 md:px-16 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal className="flex flex-col">
            <ChapterMark numeral="I" label="The House" tone="bone" />
            <h2 className="mt-8 max-w-[14ch] text-balance font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.02] font-normal tracking-[-0.02em] text-ink">
              Luxury isn&rsquo;t a luxury here. It&rsquo;s the{" "}
              <span className="text-accent italic">baseline.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-end">
            <p className="max-w-[46ch] font-body text-base leading-relaxed font-light text-secondary md:text-lg">
              Fresh &amp; Famous was founded on a simple refusal — that scent
              should be an afterthought. This is not mass-produced energy. It is
              intentional luxury, built in Toronto and dressed for the world.
            </p>

            <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden border-y border-ink/10 sm:grid-cols-3">
              {PILLARS.map((p) => (
                <div
                  key={p.k}
                  className="flex flex-col gap-2 bg-background py-6 pr-6 sm:px-6 sm:first:pl-0"
                >
                  <dt className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                    {p.k}
                  </dt>
                  <dd className="font-body text-sm leading-relaxed font-light text-secondary">
                    {p.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
