import type { Metadata } from "next";
import { Grain } from "@/components/site/grain";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your 6ES cart.",
};

export default function CartPage() {
  return (
    <div className="relative overflow-hidden bg-foreground text-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_50%_20%,rgba(161,98,7,0.1),transparent_70%)]"
      />
      <Grain />
      <div className="relative">
        <CartView />
      </div>
    </div>
  );
}
