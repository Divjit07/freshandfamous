"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Non-pinning scroll reveal — the only motion the chapters below the hero get
 * (the hero owns the single pin on this page). Fades its element, or its direct
 * children when `stagger` is set, up from an already-visible default so a failed
 * JS load leaves the content composed. Skipped entirely under reduced motion.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = false,
  y = 32,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
  stagger?: boolean;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = stagger ? (el.children as unknown as Element[]) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1.1,
        delay,
        ease: "expo.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    });

    return () => mm.revert();
  }, [stagger, y, delay]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
