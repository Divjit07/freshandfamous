import Stripe from "stripe";
import { lineById } from "@/lib/catalog";

export const runtime = "nodejs";

type IncomingItem = { productId?: string; variant?: string; qty?: number };

function resolveOrigin(req: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return req.headers.get("origin") ?? new URL(req.url).origin;
}

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    // Keys not in yet — tell the cart plainly instead of failing opaquely.
    return Response.json(
      { error: "Checkout isn't configured yet. Add STRIPE_SECRET_KEY to enable payments." },
      { status: 503 },
    );
  }

  let body: { items?: IncomingItem[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const incoming = Array.isArray(body.items) ? body.items : [];
  if (incoming.length === 0) {
    return Response.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Never trust client prices — rebuild every line from the server catalog.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const raw of incoming) {
    const line = raw.productId ? lineById(raw.productId) : undefined;
    const qty = Math.max(1, Math.min(99, Math.floor(Number(raw.qty) || 0)));
    if (!line || !qty) {
      return Response.json({ error: "That item is no longer available." }, { status: 400 });
    }
    const variant = String(raw.variant ?? "").slice(0, 80);
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "cad",
        unit_amount: Math.round(line.price * 100),
        product_data: {
          name: variant ? `${line.name} — ${variant}` : line.name,
          metadata: { productId: line.id, variant },
        },
      },
    });
  }

  const origin = resolveOrigin(req);
  const stripe = new Stripe(key);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: { allowed_countries: ["CA", "US"] },
      allow_promotion_codes: true,
      // Turn on once Stripe Tax is configured for the account:
      // automatic_tax: { enabled: true },
    });
    return Response.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not start checkout.";
    return Response.json({ error: message }, { status: 500 });
  }
}
