import { cn } from "@/lib/utils";

/**
 * The narrative's wayfinding: a roman chapter numeral + label. The sequence is
 * information the reader uses to place themselves in a long scroll, which is the
 * one case section numbering earns its keep. Tint follows the surface.
 */
export function ChapterMark({
  numeral,
  label,
  tone = "dark",
  className,
}: {
  numeral: string;
  label: string;
  tone?: "dark" | "bone";
  className?: string;
}) {
  const muted = tone === "dark" ? "text-background/45" : "text-secondary/70";
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-display text-lg leading-none text-accent italic">
        {numeral}
      </span>
      <span className="h-px w-10 rule-gold sm:w-14" />
      <span
        className={cn(
          "font-body text-eyebrow font-medium tracking-luxe uppercase",
          muted,
        )}
      >
        {label}
      </span>
    </div>
  );
}
