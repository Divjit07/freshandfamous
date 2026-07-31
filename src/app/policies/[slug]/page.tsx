import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/site/page-intro";

type Policy = { title: string; eyebrow: string; body: string[] };

const POLICIES: Record<string, Policy> = {
  shipping: {
    eyebrow: "Policies",
    title: "Shipping",
    body: [
      "Complimentary carriage on every order across Canada. Orders leave the studio within two business days and travel tracked.",
      "International destinations are quoted at checkout. Duties and local taxes, where they apply, are the recipient's responsibility.",
    ],
  },
  returns: {
    eyebrow: "Policies",
    title: "Returns",
    body: [
      "Unopened fragrance may be returned within thirty days for a full refund to the original payment method.",
      "Opened bottles can't be returned for hygiene reasons — but if something arrived wrong, write to the house and we'll set it right.",
    ],
  },
  privacy: {
    eyebrow: "Policies",
    title: "Privacy",
    body: [
      "We collect only what an order or an enquiry needs, and we never sell it. Your details stay with the house.",
      "You can ask us to show or delete what we hold at any time by writing to concierge@freshandfamous.com.",
    ],
  },
  terms: {
    eyebrow: "Policies",
    title: "Terms",
    body: [
      "By ordering from Fresh & Famous Inc. you agree to these terms. Prices are in Canadian dollars and can change without notice.",
      "6ES™, MAG420™ Magnesium Vitamin Air Freshener and the Fresh & Famous name are marks of Fresh & Famous Inc., Toronto.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];
  return { title: policy ? policy.title : "Policies" };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <div className="bg-foreground text-background">
      <PageIntro eyebrow={policy.eyebrow} title={policy.title} />
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[88rem] px-8 py-24 md:px-16 md:py-32">
          <div className="max-w-[62ch] space-y-6">
            {policy.body.map((p, i) => (
              <p
                key={i}
                className="font-body text-base leading-relaxed font-light text-background/65 md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
