"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Line } from "@/lib/catalog";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Product grid on a perspective stage — slight 3D tilt, gold wireframe floor.
 * Architectural set piece, not a floating-card playground.
 */
export function CollectionGrid({
  items,
  thumbs,
  columns = 3,
  indexOffset = 0,
  className,
}: {
  items: Line[];
  thumbs: Record<string, string | null>;
  columns?: 2 | 3;
  indexOffset?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const flat = reduced !== false;

  return (
    <div
      className={cn("relative", className)}
      style={flat ? undefined : { perspective: "1400px" }}
    >
      {!flat && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-10%] top-[12%] bottom-[-24%] opacity-[0.85]"
          style={{
            transform: "rotateX(62deg) translateZ(-40px)",
            transformOrigin: "center top",
            backgroundImage: `
              linear-gradient(to right, rgba(161,98,7,0.72) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(161,98,7,0.58) 1px, transparent 1px)
            `,
            backgroundSize: "10% 100%, 100% 12%",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
          }}
        />
      )}

      <ul
        className={cn(
          "relative grid gap-5 md:gap-6",
          columns === 3 ? "md:grid-cols-3" : "md:mx-auto md:max-w-[44rem] md:grid-cols-2 lg:max-w-[58rem]",
        )}
        style={
          flat
            ? undefined
            : {
                transform: "rotateX(8deg) translateZ(0)",
                transformStyle: "preserve-3d",
              }
        }
      >
        {items.map((line: Line, i) => {
          const thumb = thumbs[line.id];
          const n = indexOffset + i;
          return (
            <li
              key={line.id}
              className="group"
              style={
                flat
                  ? undefined
                  : {
                      transform: `translateZ(${12 - n * 4}px)`,
                      transformStyle: "preserve-3d",
                    }
              }
            >
              <Link
                href={line.href}
                className="relative flex h-full flex-col border border-white/10 bg-foreground/80 transition-[border-color,transform,background-color] duration-500 ease-[var(--ease-quiet)] hover:border-accent/50 hover:bg-foreground md:hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-white/10">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={line.name}
                      fill
                      quality={95}
                      sizes={
                        columns === 3
                          ? "(max-width: 768px) 90vw, 30vw"
                          : "(max-width: 768px) 90vw, 40vw"
                      }
                      className={cn(
                        "object-cover transition-transform duration-700 ease-[var(--ease-quiet)] group-hover:scale-[1.04]",
                        line.id === "caribbean" && "object-top object-center",
                        line.id === "car-hang" && "object-center",
                      )}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
                      <span className="font-display text-5xl font-light text-background/15">
                        {line.wordmark}
                      </span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 font-body text-micro font-light tabular-nums tracking-luxe text-background/70 uppercase">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  {line.id === "caribbean" && (
                    <span className="absolute top-4 right-4 border border-accent/50 bg-foreground/70 px-2 py-1 font-body text-micro font-medium tracking-luxe text-accent uppercase backdrop-blur-sm">
                      Limited
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.05] font-normal tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent">
                    {line.name}
                  </h3>
                  <p className="font-body text-sm leading-relaxed font-light text-background/55">
                    <span className="text-background/80 italic">{line.tagline}</span>{" "}
                    {line.blurb}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div className="flex items-baseline gap-2">
                      {line.was && (
                        <span className="font-body text-sm font-light text-background/35 line-through">
                          {formatPrice(line.was)}
                        </span>
                      )}
                      <span className="font-body text-lg font-medium">
                        {formatPrice(line.price)}
                      </span>
                    </div>
                    <span className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                      {line.unit}
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
