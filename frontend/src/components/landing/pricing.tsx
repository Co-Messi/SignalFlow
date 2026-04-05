import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with delayed signals and basic tools.",
    features: [
      "Delayed signals (15 min)",
      "3 active strategies",
      "Basic dashboard",
      "Community access",
    ],
    cta: "Get Started Free",
    href: "/dashboard",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "Real-time signals with full platform access.",
    features: [
      "Real-time signals",
      "Unlimited strategies",
      "Advanced charts & analytics",
      "Email & push alerts",
      "Full API access",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/dashboard",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="animate-fade-in text-3xl sm:text-4xl font-bold tracking-tight">
            Simple Pricing
          </h2>
          <p className="animate-fade-in mt-4 text-muted max-w-xl mx-auto">
            Start free, upgrade when you need real-time edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={cn(
                "animate-slide-up relative rounded-xl p-6 transition-all duration-300",
                tier.featured
                  ? "border-2 border-accent/50 bg-card shadow-lg shadow-accent/10"
                  : "border border-border bg-card/50"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Featured glow */}
              {tier.featured && (
                <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-accent/20 to-transparent pointer-events-none" />
              )}

              {tier.featured && (
                <div className="relative inline-flex items-center px-2.5 py-0.5 mb-4 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground border border-accent/20">
                  Most Popular
                </div>
              )}

              <div className="relative">
                <h3 className="text-lg font-semibold text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-success flex-shrink-0"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={cn(
                    "mt-8 w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    tier.featured
                      ? "bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
                      : "border border-border text-foreground hover:bg-card-hover"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
