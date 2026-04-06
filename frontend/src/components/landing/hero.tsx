"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface LiveSignal {
  asset: string;
  direction: string;
  entry_price: number;
  target_price: number;
  stop_loss: number;
  confidence: number;
  strategy_name: string;
  created_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const fallback: LiveSignal = {
  asset: "BTC-USD",
  direction: "long",
  entry_price: 67240,
  target_price: 71500,
  stop_loss: 65800,
  confidence: 0.87,
  strategy_name: "whale_tracker",
  created_at: new Date().toISOString(),
};

function fmt(n: number) {
  return n >= 1000
    ? `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : `$${n.toFixed(2)}`;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Hero() {
  const [signal, setSignal] = useState<LiveSignal>(fallback);

  useEffect(() => {
    if (!API_BASE) return;
    fetch(`${API_BASE}/api/signals?limit=1`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: LiveSignal[]) => {
        if (data.length > 0) setSignal(data[0]);
      })
      .catch(() => {});
  }, []);

  const asset = signal.asset.replace("-", " / ").replace("_", " / ");
  const ticker = signal.asset.charAt(0).toUpperCase();
  const isLong = signal.direction === "long";
  const confPct = Math.round(signal.confidence * 100);

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

        {/* Right: Live signal preview card */}
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
                    {ticker}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {asset}
                    </div>
                    <div className="text-xs text-muted">
                      {isLong ? "Long" : "Short"} Signal
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                    isLong
                      ? "bg-success/10 text-success border-success/20"
                      : "bg-danger/10 text-danger border-danger/20"
                  }`}
                >
                  {isLong
                    ? confPct >= 80
                      ? "STRONG BUY"
                      : "BUY"
                    : confPct >= 80
                      ? "STRONG SELL"
                      : "SELL"}
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
                    {fmt(signal.entry_price)}
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-3">
                  <div className="text-xs text-muted mb-1">Target</div>
                  <div className="text-sm font-mono font-medium text-success">
                    {fmt(signal.target_price)}
                  </div>
                </div>
                <div className="rounded-lg bg-background/50 p-3">
                  <div className="text-xs text-muted mb-1">Stop Loss</div>
                  <div className="text-sm font-mono font-medium text-danger">
                    {fmt(signal.stop_loss)}
                  </div>
                </div>
              </div>

              {/* Confidence bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted">Confidence</span>
                  <span className="font-medium text-accent-foreground">
                    {confPct}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-foreground"
                    style={{ width: `${confPct}%` }}
                  />
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>{signal.strategy_name.replace(/_/g, " ")}</span>
                <span>{timeAgo(signal.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
