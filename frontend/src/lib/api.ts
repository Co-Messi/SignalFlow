import type { Signal, Strategy, Stats } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (() => {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. The SignalFlow frontend requires a live backend API."
    );
  })();

async function fetchAPI<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(
      `API request failed: ${res.status} ${res.statusText} for ${path}`
    );
  }
  return res.json();
}

export async function getSignals(params?: {
  asset?: string;
  strategy?: string;
  min_confidence?: number;
  limit?: number;
}): Promise<Signal[]> {
  const searchParams = new URLSearchParams();
  if (params?.asset) searchParams.set("asset", params.asset);
  if (params?.strategy) searchParams.set("strategy", params.strategy);
  if (params?.min_confidence)
    searchParams.set("min_confidence", String(params.min_confidence));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  const qs = searchParams.toString();
  return fetchAPI(`/api/signals${qs ? `?${qs}` : ""}`);
}

export async function getLatestSignals(): Promise<Signal[]> {
  return fetchAPI("/api/signals/latest");
}

export async function getStrategies(): Promise<Strategy[]> {
  return fetchAPI("/api/strategies");
}

export async function getStats(): Promise<Stats> {
  return fetchAPI("/api/stats");
}
