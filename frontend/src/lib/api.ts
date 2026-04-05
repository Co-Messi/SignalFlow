import type { Signal, Strategy, Stats } from "./types";
import { mockSignals, mockStrategies, mockStats } from "./mock-data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchAPI<T>(path: string, fallback: T): Promise<T> {
  if (!API_BASE) return fallback;
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
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
  return fetchAPI(`/api/signals${qs ? `?${qs}` : ""}`, mockSignals);
}

export async function getLatestSignals(): Promise<Signal[]> {
  return fetchAPI("/api/signals/latest", mockSignals.slice(0, 7));
}

export async function getStrategies(): Promise<Strategy[]> {
  return fetchAPI("/api/strategies", mockStrategies);
}

export async function getStats(): Promise<Stats> {
  return fetchAPI("/api/stats", mockStats);
}
