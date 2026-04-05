const steps = [
  {
    number: "01",
    title: "AI Agents Scan Markets",
    description:
      "Our autonomous agents monitor on-chain data, social sentiment, and derivatives markets around the clock. They never sleep, never miss a move.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Signals Generated",
    description:
      "When converging patterns emerge across data sources, signals are generated with confidence scores, risk assessments, and supporting evidence.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12h4l3-8 4 16 3-10h6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "You Trade",
    description:
      "Receive real-time alerts with precise entry points, target prices, and stop-loss levels. Execute with confidence backed by AI-driven analysis.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="animate-fade-in text-3xl sm:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="animate-fade-in mt-4 text-muted max-w-xl mx-auto">
            From raw data to actionable trades in three simple steps.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-border via-accent/30 to-border hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="animate-slide-up relative flex gap-6 md:gap-8 items-start"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center">
                  <span className="text-sm font-bold text-accent-foreground font-mono">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent-foreground">{step.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
