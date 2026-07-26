"use client";

import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string; // `${productId}:${variant}` — one line per product+variant
  productId: string; // "6es" | "mist" | "mag420"
  name: string;
  variant: string;
  unit: string;
  price: number; // display dollars; the checkout route re-derives the charge
  href: string;
  qty: number;
};

const STORAGE_KEY = "ff-cart-v1";
const EMPTY: CartItem[] = [];

// Module-level store. localStorage is the source of truth, so the cart survives
// reloads and stays in sync across tabs — and reads through useSyncExternalStore,
// which is SSR-safe (no hydration mismatch, no setState-in-effect).
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Quota or private mode — cart just won't persist.
  }
}

function loadOnce() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = EMPTY;
  }
}

function subscribe(cb: () => void): () => void {
  loadOnce();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    try {
      items = e.newValue ? JSON.parse(e.newValue) : EMPTY;
    } catch {
      items = EMPTY;
    }
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getItems = () => items;
const getServerItems = () => EMPTY;
const getLoaded = () => loaded;
const getServerLoaded = () => false;

// ── Mutations ────────────────────────────────────────────────────────
export function addItem(item: Omit<CartItem, "qty">, qty = 1) {
  const existing = items.find((i) => i.id === item.id);
  items = existing
    ? items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
    : [...items, { ...item, qty }];
  persist();
  emit();
}

export function setItemQty(id: string, qty: number) {
  items =
    qty <= 0
      ? items.filter((i) => i.id !== id)
      : items.map((i) => (i.id === id ? { ...i, qty } : i));
  persist();
  emit();
}

export function removeItem(id: string) {
  items = items.filter((i) => i.id !== id);
  persist();
  emit();
}

export function clearCart() {
  items = EMPTY;
  persist();
  emit();
}

// ── Hook ─────────────────────────────────────────────────────────────
export function useCart() {
  const list = useSyncExternalStore(subscribe, getItems, getServerItems);
  const hydrated = useSyncExternalStore(subscribe, getLoaded, getServerLoaded);
  const count = list.reduce((n, i) => n + i.qty, 0);
  const subtotal = list.reduce((s, i) => s + i.price * i.qty, 0);
  return {
    items: list,
    count,
    subtotal,
    hydrated,
    add: addItem,
    setQty: setItemQty,
    remove: removeItem,
    clear: clearCart,
  };
}
