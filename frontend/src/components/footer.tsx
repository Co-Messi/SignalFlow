import Link from "next/link";

const links = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Signals", href: "/dashboard" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Resources: [
    { label: "API", href: "https://signalflow-api-deploy.vercel.app/docs", external: true },
    { label: "GitHub", href: "https://github.com/Co-Messi/SignalFlow", external: true },
  ],
  Company: [
    { label: "Twitter", href: "https://twitter.com/saboriagroup", external: true },
    { label: "Built by Siew Capital", href: "https://siews-capital-site.vercel.app", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent"
              >
                <path
                  d="M2 12h4l3-8 4 16 3-10h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold text-foreground">
                SignalFlow
              </span>
            </Link>
            <p className="text-xs text-muted leading-relaxed">
              AI-powered trading signals built by autonomous agents.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} SignalFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
