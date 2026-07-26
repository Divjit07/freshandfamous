import type { Metadata } from "next";
import { Grain } from "@/components/site/grain";
import { OrderConfirmed } from "@/components/cart/order-confirmed";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="relative overflow-hidden bg-foreground text-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_50%_35%,rgba(161,98,7,0.16),transparent_70%)]"
      />
      <Grain />
      <div className="relative">
        <OrderConfirmed />
      </div>
    </div>
  );
}
