import type { Signal } from "@/lib/types";
import { cn, formatTimestamp, formatPrice } from "@/lib/utils";

interface SignalCardProps {
  signal: Signal;
}

function DirectionArrow({ direction }: { direction: Signal["direction"] }) {
  if (direction === "long") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-success/10 text-success">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    );
  }
  if (direction === "short") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-danger/10 text-danger">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-muted-foreground/10 text-muted-foreground">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
      </svg>
    </span>
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const color =
    confidence >= 85
      ? "bg-success"
      : confidence >= 70
        ? "bg-accent"
        : confidence >= 55
          ? "bg-warning"
          : "bg-danger";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted tabular-nums">{confidence}%</span>
    </div>
  );
}

function OutcomeBadge({ outcome }: { outcome: Signal["outcome"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        outcome === "pending" && "bg-warning/10 text-warning",
        outcome === "hit" && "bg-success/10 text-success",
        outcome === "miss" && "bg-danger/10 text-danger"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          outcome === "pending" && "bg-warning",
          outcome === "hit" && "bg-success",
          outcome === "miss" && "bg-danger"
        )}
      />
      {outcome === "pending" ? "Pending" : outcome === "hit" ? "Hit" : "Miss"}
    </span>
  );
}

export default function SignalCard({ signal }: SignalCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-colors hover:bg-card-hover hover:border-border/80">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <DirectionArrow direction={signal.direction} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">
                {signal.asset}
              </span>
              <span className="text-xs font-medium uppercase text-muted-foreground">
                {signal.direction}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(signal.timestamp)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-foreground">
            {signal.strategy_source}
          </span>
          <OutcomeBadge outcome={signal.outcome} />
        </div>
      </div>

      <div className="mt-3">
        <ConfidenceBar confidence={signal.confidence} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">
        {signal.reasoning}
      </p>

      <div className="mt-3 flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Entry</span>
          <span className="text-foreground">{formatPrice(signal.entry_price)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Target</span>
          <span className="text-success">{formatPrice(signal.target_price)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Stop</span>
          <span className="text-danger">{formatPrice(signal.stop_loss)}</span>
        </div>
      </div>
    </div>
  );
}
