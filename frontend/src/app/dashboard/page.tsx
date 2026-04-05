import { getSignals, getStrategies, getStats } from "@/lib/api";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import StatsBar from "@/components/dashboard/stats-bar";
import SignalFeed from "@/components/dashboard/signal-feed";
import StrategyOverview from "@/components/dashboard/strategy-overview";
import AccuracyChart from "@/components/dashboard/accuracy-chart";

export default async function DashboardPage() {
  const [signals, strategies, stats] = await Promise.all([
    getSignals(),
    getStrategies(),
    getStats(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <StatsBar stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SignalFeed initialSignals={signals} />
        </div>
        <div className="flex flex-col gap-6">
          <StrategyOverview strategies={strategies} />
          <AccuracyChart strategies={strategies} />
        </div>
      </div>
    </div>
  );
}
