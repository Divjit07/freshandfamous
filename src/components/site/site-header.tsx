"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "6ES", href: "/6es" },
  { label: "Mr Fresh", href: "/shop#mr-fresh" },
  { label: "The 416", href: "/the-416" },
  { label: "Famous", href: "/famous" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, hydrated } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
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
            className="relative block transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="Fresh & Famous"
              width={140}
              height={28}
              priority
              className="h-6 w-auto md:h-7 object-contain"
            />
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
              className="relative z-[60] p-1 text-background/75 transition-colors duration-300 hover:text-accent md:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen overlay, no height animation jank */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-end bg-foreground/95 backdrop-blur-2xl transition-all duration-400 ease-[var(--ease-quiet)] md:hidden",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <nav aria-label="Primary mobile" className="px-8 pb-16 pt-6">
          <ul className="flex flex-col gap-1">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  "border-b border-white/8 transition-all duration-500 ease-[var(--ease-quiet)]",
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
                style={{
                  transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-5 font-display text-3xl text-background/85 transition-colors duration-300 hover:text-accent active:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
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
