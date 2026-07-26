import Image from "next/image";
import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { studio } from "@/lib/catalog";

const MARKS = [
  { k: "The area code", v: "416, foil-stamped into every carton spine." },
  { k: "The skyline", v: "A CN Tower nightline carried on the sample cards." },
  { k: "The read", v: "6ES for the 6ix — the city, worn on skin." },
];

export function The416({ skylineSrc }: { skylineSrc?: string | null }) {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* CN Tower nightline, when supplied — held dim so type stays the subject. */}
      {skylineSrc && (
        <>
          <Image
            src={skylineSrc}
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover opacity-25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground via-foreground/85 to-foreground/70"
          />
        </>
      )}
      {/* Signature atmosphere: a low gold glow off one corner, then grain. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_15%,rgba(161,98,7,0.16),transparent_65%)]"
      />
      <Grain />

      {/* The foil numeral, drawn as an outline behind the story. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[42vw] leading-none font-semibold tracking-[-0.04em] text-transparent select-none md:-top-16 md:text-[34vw]"
        style={{ WebkitTextStroke: "1px rgba(161,98,7,0.22)" }}
      >
        416
      </span>

      <div className="relative mx-auto max-w-[88rem] px-8 py-32 md:px-16 md:py-48">
        <Reveal className="max-w-2xl">
          <ChapterMark numeral="III" label="The 416" />
          <h2 className="mt-8 text-balance font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-normal tracking-[-0.02em]">
            6ES reads as the{" "}
            <span className="text-accent italic">6ix.</span>
          </h2>
          <p className="mt-8 max-w-[48ch] font-body text-base leading-relaxed font-light text-background/60 md:text-lg">
            Born in Toronto, built for the world. The city isn&rsquo;t a
            backdrop here — it&rsquo;s pressed into the object itself, from the
            spine of the carton to the name on the bottle.
          </p>
        </Reveal>

        <Reveal
          stagger
          delay={0.1}
          as="ul"
          className="mt-16 grid gap-px overflow-hidden border-y border-white/10 sm:grid-cols-3 md:mt-24"
        >
          {MARKS.map((m) => (
            <li
              key={m.k}
              className="flex flex-col gap-3 bg-foreground py-8 sm:px-7 sm:first:pl-0"
            >
              <span className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                {m.k}
              </span>
              <span className="font-body text-sm leading-relaxed font-light text-background/60">
                {m.v}
              </span>
            </li>
          ))}
        </Reveal>

        <p className="mt-14 font-body text-micro font-light tracking-luxe text-background/40 uppercase">
          {studio.coords}
        </p>
      </div>
    </section>
  );
}
