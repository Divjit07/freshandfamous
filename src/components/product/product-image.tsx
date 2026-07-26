import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The framed 4:5 product slot. Renders a real render when one is resolved,
 * otherwise the gold-lit monogram placeholder. No fs access here — callers pass
 * an already-resolved `src`, so this is safe in server and client trees alike.
 */
export function ProductImage({
  src,
  alt,
  sizes = "(max-width: 1024px) 80vw, 40vw",
  fit = "cover",
  position = "center",
  monogram = "6ES",
  priority = false,
  className,
}: {
  src?: string | null;
  alt: string;
  sizes?: string;
  fit?: "cover" | "contain";
  position?: string;
  monogram?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[3px]", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 rounded-[3px] border border-white/12"
      />
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: position }}
          className={cn(fit === "contain" ? "object-contain" : "object-cover")}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-[2px]"
        >
          <span className="font-display text-5xl font-light tracking-[0.15em] text-background/20">
            {monogram}
          </span>
        </div>
      )}
    </div>
  );
}
