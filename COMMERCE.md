# Commerce — Stripe (no Shopify)

The store runs on a **browser cart → Stripe Checkout**. The product catalog
lives in code (`src/lib/catalog.ts`); there is no database. Orders live in your
Stripe dashboard.

## What's built

- **Cart** — client-side, persisted to `localStorage`, synced across tabs
  (`src/lib/cart.tsx`). Header shows a live count badge.
- **Add to cart** — 6ES (per variant), all 8 Air & Body Mist scents, all 4
  MAG420 colourways.
- **Cart page** (`/cart`) — line items, quantity steppers, remove, subtotal,
  and **Proceed to checkout**.
- **Checkout** (`POST /api/checkout`) — builds a Stripe Checkout Session and
  redirects to Stripe's hosted, secure payment page. **Prices are re-derived
  server-side from the catalog**, so a tampered client cart can't change what's
  charged. Collects CA/US shipping addresses; promo codes on.
- **Success** (`/cart/success`) — clears the cart after Stripe returns.
- **Forms** — newsletter + contact POST to `/api/newsletter` and `/api/contact`
  and deliver via Resend.

Every piece **degrades gracefully**: with no keys set, add-to-cart and the cart
work fully; checkout returns a clear "not configured yet" message, and the forms
still confirm without sending mail. Nothing throws.

## To go live — the keys you provide

Copy `.env.example` to `.env.local` and fill in:

1. **`STRIPE_SECRET_KEY`** (required for checkout) — from
   https://dashboard.stripe.com → Developers → API keys. Use the **test** key
   (`sk_test_…`) first; card `4242 4242 4242 4242`, any future date/CVC, runs a
   full test purchase end to end. Swap to the live key when ready.
2. **`RESEND_API_KEY`** (optional, for the forms) — from https://resend.com.
   Set `CONTACT_FROM_EMAIL` to an address on a domain you've verified in Resend
   (or `onboarding@resend.dev` for testing), and `CONTACT_TO_EMAIL` to where
   enquiries should land. Optional `RESEND_AUDIENCE_ID` adds newsletter signups
   to an audience instead of emailing you each one.
3. **`NEXT_PUBLIC_SITE_URL`** — your production URL, so Stripe's success/cancel
   links are correct. Falls back to the request origin in dev.

`.env.local` is gitignored — keys never leave your machine/host.

## Not wired yet (say the word)

- **Stripe Tax** — one line in `src/app/api/checkout/route.ts`
  (`automatic_tax: { enabled: true }`), enable once Tax is set up in Stripe.
- **Order webhook** — Stripe already emails receipts. A
  `/api/webhooks/stripe` handler would let you send branded confirmations or
  record orders elsewhere.
- **Inventory** — three lines, no stock tracking. Add when you need it.
