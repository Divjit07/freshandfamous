import Image from "next/image";
import { Grain } from "@/components/site/grain";
import { cn } from "@/lib/utils";

/** Interior-page masthead. Padded to clear the fixed header; dark by default. */
export function PageIntro({
  eyebrow,
  title,
  lede,
  align = "left",
  backgroundSrc,
  backgroundAlt = "",
  backgroundPosition = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  /** Optional full-bleed background image behind the intro. */
  backgroundSrc?: string | null;
  backgroundAlt?: string;
  /** object-position for the background image (default "center"). */
  backgroundPosition?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {backgroundSrc ? (
        <>
          {/* Full-bleed on mobile; anchored to the right half on desktop so the
              product sits clear of the copy on the left. */}
          <div className="absolute inset-0 lg:left-[32%]">
            <Image
              src={backgroundSrc}
              alt={backgroundAlt}
              fill
              priority
              quality={100}
              sizes="100vw"
              style={{ objectPosition: backgroundPosition }}
              className="pointer-events-none object-cover"
            />
          </div>
          {/* Legibility scrim — solid behind the copy, but kept light over the
              product on desktop so the bottles read bright, not muddy. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/45 lg:via-foreground/55 lg:to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-foreground/30"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_-10%,rgba(161,98,7,0.14),transparent_70%)]"
        />
      )}
      <Grain />
      <div
        className={cn(
          "relative mx-auto max-w-[88rem] px-8 pt-36 pb-16 md:px-16 md:pt-44 md:pb-24",
          align === "center" && "text-center",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-10 rule-gold sm:w-14" />
          <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
            {eyebrow}
          </span>
        </div>
        <h1
          className={cn(
            "mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-normal tracking-[-0.02em]",
            align === "center" && "mx-auto",
          )}
        >
          {title}
        </h1>
        {lede && (
          <p
            className={cn(
              "mt-7 max-w-[52ch] font-body text-base leading-relaxed font-light text-background/60 md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
