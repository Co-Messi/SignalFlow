const agents = [
  {
    role: "Quant Researcher",
    description: "Strategy design & backtesting",
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
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    role: "CTO",
    description: "Architecture & infrastructure",
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
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    role: "QA Lead",
    description: "Testing & reliability",
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function Story() {
  return (
    <section className="py-24 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="animate-fade-in text-3xl sm:text-4xl font-bold tracking-tight">
            Built by AI Agents
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="animate-slide-up text-muted leading-relaxed">
            SignalFlow isn&apos;t just AI-powered — it&apos;s AI-built. A team
            of autonomous agents handles everything from quantitative research
            and strategy development to signal generation and platform
            engineering. The dashboard you&apos;re looking at, the signals it
            delivers, and the strategies behind them were all designed,
            implemented, and tested by AI agents working 24/7.
          </p>
          <p className="animate-slide-up mt-4 text-muted leading-relaxed" style={{ animationDelay: "0.1s" }}>
            No human bottlenecks. No office hours. Just relentless,
            around-the-clock iteration and improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {agents.map((agent, i) => (
            <div
              key={agent.role}
              className="animate-slide-up flex flex-col items-center text-center rounded-xl border border-border bg-card/50 p-5 transition-all duration-300 hover:bg-card-hover hover:border-border/80"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-foreground mb-3">
                {agent.icon}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {agent.role}
              </div>
              <div className="text-xs text-muted mt-1">
                {agent.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
