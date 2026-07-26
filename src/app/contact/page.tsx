import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { ContactForm } from "@/components/site/contact-form";
import { studio } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the house. Fresh & Famous Inc., Hudson's Bay Centre, 2 Bloor Street East, Toronto.",
};

export default function ContactPage() {
  return (
    <div className="bg-foreground text-background">
      <PageIntro
        eyebrow="The House"
        title={
          <>
            Say <span className="text-accent italic">hello.</span>
          </>
        }
        lede="For orders, press, or a word about scent. The house is small on purpose — a real person reads every note."
      />

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-[88rem] gap-16 px-8 py-24 md:px-16 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Details */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                The Studio
              </h2>
              <address className="mt-5 not-italic font-body text-base leading-relaxed font-light text-background/65">
                {studio.name}
                <br />
                {studio.street}
                <br />
                {studio.city}
              </address>
              <p className="mt-4 font-body text-micro font-light tracking-luxe text-background/40 uppercase">
                {studio.coords}
              </p>
            </div>

            <div>
              <h2 className="font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase">
                Direct
              </h2>
              <ul className="mt-5 flex flex-col gap-2 font-body text-base font-light text-background/65">
                <li>
                  <a
                    href="mailto:concierge@freshandfamous.com"
                    className="transition-colors hover:text-accent"
                  >
                    concierge@freshandfamous.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:press@freshandfamous.com"
                    className="transition-colors hover:text-accent"
                  >
                    press@freshandfamous.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
