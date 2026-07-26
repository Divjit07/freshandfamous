import { GRAIN } from "@/lib/grain";
import { cn } from "@/lib/utils";

/** Full-bleed film grain. Blend mode set per surface — overlay on dark, soft-light on bone. */
export function Grain({
  className,
  blend = "overlay",
  opacity = 0.06,
}: {
  className?: string;
  blend?: "overlay" | "soft-light";
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        blend === "overlay" ? "mix-blend-overlay" : "mix-blend-soft-light",
        className,
      )}
      style={{
        opacity,
        backgroundImage: GRAIN,
        backgroundSize: "140px 140px",
      }}
    />
  );
}
