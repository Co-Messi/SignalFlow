"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-foreground/5 rounded-full blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="animate-fade-in inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border bg-card/50 text-xs text-muted">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            Live signals active
          </div>

          <h1 className="animate-slide-up text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            AI-Powered
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
              Trading Signals
            </span>
          </h1>

          <p
            className="animate-slide-up mt-6 text-lg text-muted leading-relaxed max-w-lg mx-auto lg:mx-0"
            style={{ animationDelay: "0.1s" }}
          >
            Real-time signals derived from whale tracking, sentiment analysis,
            liquidation cascades, and funding rate extremes — all powered by
            autonomous AI agents.
          </p>

          <div
            className="animate-slide-up mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
            >
              Launch Dashboard
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-card-hover transition-all duration-200"
            >
              View Signals
            </Link>
          </div>
        </div>

        {/* Right: Signal preview card */}
        <div
          className="animate-slide-up flex-1 max-w-md w-full"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-2xl" />

            <div className="relative rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4">
              {/* Card header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-lg font-semibold text-accent">
                    B
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      BTC / USDT
                    </div>
                    <div className="text-xs text-muted">Long Signal</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                  STRONG BUY
                </span>
              </div>

              {/* Mini chart visualization */}
              <div className="h-20 flex items-end gap-[3px]">
                {[
                  40, 35, 45, 50, 38, 55, 48, 60, 52, 65, 58, 70, 62, 75, 68,
                  80, 72, 85, 78, 88, 82, 90, 85, 92, 88, 95, 90, 93, 96, 98,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-accent/30 hover:bg-accent/60 transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Signal details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-background/50 p-3">
                  <div className="text-xs text-muted mb-1">Entry</div>
                  <div className="text-sm font-mono font-medium text-foreground">
                    $67,240
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-3">
                  <div className="text-xs text-muted mb-1">Target</div>
                  <div className="text-sm font-mono font-medium text-success">
                    $71,500
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-3">
                  <div className="text-xs text-muted mb-1">Stop Loss</div>
                  <div className="text-sm font-mono font-medium text-danger">
                    $65,800
                  </div>
                </div>
              </div>

              {/* Confidence bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted">Confidence</span>
                  <span className="font-medium text-accent-foreground">
                    87%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-foreground"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Whale Tracker + Sentiment</span>
                <span>2m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
