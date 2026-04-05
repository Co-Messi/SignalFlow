"use client";

import type { Strategy } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AccuracyChartProps {
  strategies: Strategy[];
}

interface TooltipPayloadItem {
  value: number;
  payload: { name: string; hit_rate: number };
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl">
      <p className="text-sm font-medium text-foreground">{data.payload.name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Hit rate:{" "}
        <span className="font-mono text-accent-foreground">
          {(data.value * 100).toFixed(1)}%
        </span>
      </p>
    </div>
  );
}

export default function AccuracyChart({ strategies }: AccuracyChartProps) {
  const data = [...strategies]
    .sort((a, b) => b.hit_rate - a.hit_rate)
    .map((s) => ({
      name: s.name,
      hit_rate: s.hit_rate,
    }));

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Strategy Accuracy
      </h3>
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 1]}
                tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
                stroke="#71717a"
                fontSize={11}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#71717a"
                fontSize={11}
                width={120}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
              />
              <Bar
                dataKey="hit_rate"
                fill="#6366f1"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
