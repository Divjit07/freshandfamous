"use client";

import { useEffect, useRef } from "react";
import { stage } from "./stage-store";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Dust motes drifting through the light beam. A transparent canvas layered over
 * the marble set: slow-settling gold particles that brighten only where they
 * cross the diagonal beam, so the volumetric light reads as real air rather than
 * a flat gradient. Additive blending, pointer parallax, reduced-motion aware.
 */
type Mote = {
  x: number;
  y: number;
  /** depth 0..1 — drives size, fall speed and parallax. */
  z: number;
  sway: number;
  phase: number;
};

export function LightMotes({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let motes: Mote[] = [];
    let raf = 0;
    let t = 0;

    // How bright a mote is at a given normalised point — a soft diagonal band
    // running from the upper-right down to the centre pool of light.
    const beamAt = (nx: number, ny: number) => {
      const bx = 0.82 + (0.5 - 0.82) * ny; // beam centre x at this height
      const d = Math.abs(nx - bx);
      return Math.max(0, 1 - d / 0.24);
    };

    const spawn = (): Mote => ({
      x: (0.32 + Math.random() * 0.66) * w,
      y: Math.random() * h,
      z: Math.random(),
      sway: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
    });

    const seed = () => {
      const count = Math.round((w * h) / 24000);
      motes = Array.from({ length: Math.max(40, Math.min(130, count)) }, spawn);
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const px = stage.pointerX * 22;
      const py = stage.pointerY * 14;

      for (const m of motes) {
        m.y += 0.12 + m.z * 0.55; // settle downward, deeper ones faster
        if (m.y > h + 12) {
          m.y = -12;
          m.x = (0.32 + Math.random() * 0.66) * w;
        }
        const swayX = Math.sin(t * 0.5 + m.phase) * m.sway * (0.4 + m.z);
        const x = m.x + swayX + px * (0.25 + m.z);
        const y = m.y + py * (0.25 + m.z);

        const beam = beamAt(x / w, y / h);
        if (beam <= 0) continue;

        const size = (0.6 + m.z * 2.4) * (0.7 + beam * 0.6);
        const twinkle = 0.55 + 0.45 * Math.sin(t * 1.6 + m.phase);
        const alpha = (0.12 + m.z * 0.4) * beam * twinkle;

        const g = ctx.createRadialGradient(x, y, 0, x, y, size * 3.2);
        g.addColorStop(0, `rgba(255, 224, 158, ${alpha})`);
        g.addColorStop(1, "rgba(255, 224, 158, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, size * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
