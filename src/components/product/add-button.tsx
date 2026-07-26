"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";
import { cn } from "@/lib/utils";

/**
 * Adds one product+variant line to the cart with brief "Added" feedback.
 * Two visual sizes: `lg` for the flagship buy button, `sm` for grid tiles.
 */
export function AddButton({
  item,
  label,
  size = "sm",
  className,
}: {
  item: Omit<CartItem, "qty">;
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function onAdd() {
    add(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={onAdd}
      aria-live="polite"
      className={cn(
        "group relative flex items-center justify-center gap-3 overflow-hidden border border-accent font-body tracking-luxe uppercase transition-colors duration-500 ease-[var(--ease-quiet)]",
        size === "lg"
          ? "px-8 py-5 text-micro font-semibold"
          : "px-5 py-3 text-eyebrow font-medium",
        added ? "bg-accent text-foreground" : "text-accent hover:text-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-[var(--ease-quiet)]",
          added ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
      <span className="relative">{added ? "Added ✓" : (label ?? "Add to cart")}</span>
    </button>
  );
}
