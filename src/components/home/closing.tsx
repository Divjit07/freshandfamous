import { Grain } from "@/components/site/grain";
import { Reveal } from "@/components/ui/reveal";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { NewsletterForm } from "@/components/site/newsletter-form";

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-background text-ink">
      <Grain blend="soft-light" opacity={0.5} />
      <div className="relative mx-auto max-w-[88rem] px-8 py-28 md:px-16 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-24">
          <Reveal>
            <ChapterMark numeral="IV" label="The List" tone="bone" />
            <h2 className="mt-8 max-w-[15ch] text-balance font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-normal tracking-[-0.02em]">
              Born in Toronto. Built for the{" "}
              <span className="text-accent italic">world.</span>
            </h2>
            <p className="mt-8 max-w-[42ch] font-body text-base leading-relaxed font-light text-secondary">
              New releases, restocks and the occasional letter from the house.
              No noise — this is a quiet list.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:pb-2">
            <NewsletterForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
