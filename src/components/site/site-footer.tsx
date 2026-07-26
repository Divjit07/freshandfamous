import Link from "next/link";

const POLICIES = [
  { label: "Shipping", href: "/policies/shipping" },
  { label: "Returns", href: "/policies/returns" },
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-foreground">
      <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-14 md:flex-row md:justify-between md:gap-8">
          <div className="max-w-sm">
            <p className="font-body text-[0.625rem] font-medium tracking-wordmark text-background uppercase md:text-[0.6875rem]">
              Fresh and Famous
            </p>
            <p className="mt-6 font-display text-2xl leading-tight text-background/70 md:text-3xl">
              Born in Toronto.
              <br />
              Built for the world.
            </p>
          </div>

          <div className="flex flex-col gap-12 sm:flex-row sm:gap-20">
            <address className="not-italic">
              <h2 className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                Studio
              </h2>
              <p className="mt-5 font-body text-sm leading-relaxed font-light text-background/60">
                Hudson&rsquo;s Bay Centre
                <br />
                2 Bloor Street East, Suite 3500
                <br />
                Toronto, ON M4W 1A8
              </p>
            </address>

            <nav aria-label="Policies">
              <h2 className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase">
                Information
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {POLICIES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm font-light text-background/60 transition-colors duration-300 hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 h-px w-full rule-gold opacity-40 md:mt-24" />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-micro font-light text-background/40 uppercase">
            &copy; {new Date().getFullYear()} Fresh &amp; Famous Inc.
          </p>
          <p className="font-body text-micro font-light text-background/40 uppercase">
            Toronto &middot; The 416
          </p>
        </div>
      </div>
    </footer>
  );
}
