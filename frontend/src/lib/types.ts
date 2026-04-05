export interface Signal {
  id: number;
  asset: string;
  direction: "long" | "short" | "neutral";
  confidence: number;
  strategy_source: string;
  reasoning: string;
  timestamp: string;
  outcome: "pending" | "hit" | "miss";
  entry_price: number;
  target_price: number;
  stop_loss: number;
}

export interface Strategy {
  id: number;
  name: string;
  description: string;
  type: string;
  hit_rate: number;
  total_signals: number;
  status: "active" | "inactive";
}

export interface Stats {
  total_signals: number;
  accuracy: number;
  assets_tracked: number;
  active_strategies: number;
  pending_signals: number;
}
