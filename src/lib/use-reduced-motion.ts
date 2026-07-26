"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

let cached: MediaQueryList | null = null;

function mediaQuery() {
  cached ??= window.matchMedia(QUERY);
  return cached;
}

function subscribe(onChange: () => void) {
  const mq = mediaQuery();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean | null {
  return mediaQuery().matches;
}

/** Server and hydration pass: unknown, so callers hold back motion-only work. */
function getServerSnapshot(): boolean | null {
  return null;
}

/**
 * Tracks `prefers-reduced-motion`. Returns `null` until the client snapshot is
 * read, so callers can hold back motion-only work (WebGL, pins) through SSR and
 * hydration instead of guessing and then tearing it down.
 */
export function useReducedMotion(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
