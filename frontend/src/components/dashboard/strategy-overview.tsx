import type { Strategy } from "@/lib/types";
import { cn, formatPercent } from "@/lib/utils";

interface StrategyOverviewProps {
  strategies: Strategy[];
}

function HitRateBar({ rate }: { rate: number }) {
  const pct = rate * 100;
  const color =
    pct >= 75
      ? "bg-success"
      : pct >= 65
        ? "bg-accent"
        : pct >= 55
          ? "bg-warning"
          : "bg-danger";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted tabular-nums w-10 text-right">
        {formatPercent(rate)}
      </span>
    </div>
  );
}

export default function StrategyOverview({ strategies }: StrategyOverviewProps) {
  const sorted = [...strategies].sort((a, b) => b.hit_rate - a.hit_rate);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Strategies
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {sorted.map((strategy) => (
          <div
            key={strategy.id}
            className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3.5 transition-colors hover:bg-card-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    strategy.status === "active" ? "bg-success" : "bg-muted-foreground"
                  )}
                />
                <span className="text-sm font-medium text-foreground">
                  {strategy.name}
                </span>
              </div>
              <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-foreground">
                {strategy.type}
              </span>
            </div>
            <HitRateBar rate={strategy.hit_rate} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{strategy.total_signals} signals</span>
              <span className={cn(
                strategy.status === "active" ? "text-success" : "text-muted-foreground"
              )}>
                {strategy.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
