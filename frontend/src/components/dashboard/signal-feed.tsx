"use client";

import { useState, useEffect, useMemo } from "react";
import type { Signal } from "@/lib/types";
import { cn } from "@/lib/utils";
import SignalCard from "./signal-card";

interface SignalFeedProps {
  initialSignals: Signal[];
}

const confidenceLevels = [
  { label: "All", min: 0 },
  { label: "70+", min: 70 },
  { label: "80+", min: 80 },
  { label: "90+", min: 90 },
];

export default function SignalFeed({ initialSignals }: SignalFeedProps) {
  const [signals] = useState<Signal[]>(initialSignals);
  const [assetFilter, setAssetFilter] = useState("All");
  const [strategyFilter, setStrategyFilter] = useState("All");
  const [confidenceMin, setConfidenceMin] = useState(0);

  const assets = useMemo(() => {
    const unique = Array.from(new Set(signals.map((s) => s.asset))).sort();
    return ["All", ...unique];
  }, [signals]);

  const strategies = useMemo(() => {
    const unique = Array.from(new Set(signals.map((s) => s.strategy_source))).sort();
    return ["All", ...unique];
  }, [signals]);

  const filtered = useMemo(() => {
    return signals.filter((s) => {
      if (assetFilter !== "All" && s.asset !== assetFilter) return false;
      if (strategyFilter !== "All" && s.strategy_source !== strategyFilter) return false;
      if (s.confidence < confidenceMin) return false;
      return true;
    });
  }, [signals, assetFilter, strategyFilter, confidenceMin]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("would refresh");
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mr-1">
            Asset
          </span>
          {assets.map((asset) => (
            <button
              key={asset}
              onClick={() => setAssetFilter(asset)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                assetFilter === asset
                  ? "bg-accent text-white"
                  : "bg-card-hover text-muted hover:text-foreground"
              )}
            >
              {asset}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mr-1">
            Strategy
          </span>
          <select
            value={strategyFilter}
            onChange={(e) => setStrategyFilter(e.target.value)}
            className="rounded-md border border-border bg-card-hover px-2.5 py-1 text-xs font-medium text-foreground outline-none focus:border-accent"
          >
            {strategies.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mr-1">
            Confidence
          </span>
          {confidenceLevels.map((level) => (
            <button
              key={level.label}
              onClick={() => setConfidenceMin(level.min)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                confidenceMin === level.min
                  ? "bg-accent text-white"
                  : "bg-card-hover text-muted hover:text-foreground"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {filtered.length} signal{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center rounded-lg border border-border bg-card py-12">
            <span className="text-sm text-muted-foreground">
              No signals match the current filters.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
