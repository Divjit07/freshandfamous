"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "6ES", href: "/6es" },
  { label: "Mr Fresh", href: "/shop#mr-fresh" },
  { label: "The 416", href: "/the-416" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, hydrated } = useCart();

  useEffect(() => {
    // Passive listener + a single boolean flip: the header must never be the
    // thing that costs us frames while the hero is pinned.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[var(--ease-quiet)]",
        scrolled || menuOpen
          ? "border-b border-white/8 bg-foreground/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-5 md:h-16 md:px-10">
        <Link
          href="/"
          className="font-body text-[0.625rem] font-medium tracking-wordmark text-background uppercase transition-opacity duration-300 hover:opacity-70 md:text-[0.6875rem]"
        >
          Fresh and Famous
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative font-body text-micro font-light text-background/75 uppercase transition-colors duration-300 hover:text-background"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            aria-label={hydrated && count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
            className="relative p-1 text-background/75 transition-colors duration-300 hover:text-accent"
          >
            <CartIcon />
            {hydrated && count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-body text-[0.5625rem] font-semibold text-foreground tabular-nums">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-1 text-background/75 transition-colors duration-300 hover:text-accent md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile disclosure — a quiet panel, not a full-screen takeover. */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden transition-[height,opacity] duration-500 ease-[var(--ease-quiet)] md:hidden",
          menuOpen ? "h-56 opacity-100" : "h-0 opacity-0",
        )}
      >
        <nav aria-label="Primary mobile" className="px-5 pt-2 pb-8">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-white/8">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 font-display text-2xl text-background/85 transition-colors duration-300 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M3 5.25h12l-1 10.5H4L3 5.25Z" />
      <path d="M6.5 7.5v-3a2.5 2.5 0 0 1 5 0v3" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path
        d="M2 6h14"
        className="origin-center transition-transform duration-300 ease-[var(--ease-quiet)]"
        style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
      />
      <path
        d="M2 12h14"
        className="origin-center transition-transform duration-300 ease-[var(--ease-quiet)]"
        style={
          open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined
        }
      />
    </svg>
  );
}
