import type { Stats } from "@/lib/types";
import { formatPercent } from "@/lib/utils";

interface StatsBarProps {
  stats: Stats;
}

const statCards = [
  {
    key: "total_signals" as const,
    label: "Total Signals",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "accuracy" as const,
    label: "Accuracy",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    format: (v: number) => formatPercent(v),
  },
  {
    key: "assets_tracked" as const,
    label: "Assets Tracked",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 3h-8l-2 4h12l-2-4z" />
      </svg>
    ),
    format: (v: number) => v.toString(),
  },
  {
    key: "active_strategies" as const,
    label: "Active Strategies",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    format: (v: number) => v.toString(),
  },
  {
    key: "pending_signals" as const,
    label: "Pending Signals",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    format: (v: number) => v.toString(),
  },
];

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {statCards.map((card) => (
        <div
          key={card.key}
          className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {card.label}
            </span>
            <span className="text-muted-foreground">{card.icon}</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {card.format(stats[card.key])}
          </span>
        </div>
      ))}
    </div>
  );
}
