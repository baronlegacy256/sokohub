import { ads } from "./catalog";
import { mulberry32 } from "./utils";
import type { Ad, AdStatus } from "./types";

// Demo: the signed-in seller owns the ads from seller s1, plus a variety of statuses.
export function myListings(): Ad[] {
  const mine = ads.filter((a) => a.sellerId === "s1");
  const statuses: AdStatus[] = ["active", "active", "pending", "active", "sold", "expired", "active", "rejected", "draft", "active"];
  return mine.map((a, i) => ({ ...a, status: statuses[i % statuses.length] }));
}

export interface DayPoint { day: string; value: number }

// Deterministic historical breakdown of an ad's recorded totals.
export function dailySeries(total: number, days: number, seed: number): DayPoint[] {
  const r = mulberry32(seed);
  const raw = Array.from({ length: days }, () => 0.3 + r());
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((x, i) => ({
    day: new Date(Date.now() - (days - 1 - i) * 86400000).toLocaleDateString("en-UG", { month: "short", day: "numeric" }),
    value: Math.max(0, Math.round((x / sum) * total)),
  }));
}

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export const statusStyles: Record<AdStatus, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-slate-200 text-slate-600",
  sold: "bg-blue-100 text-blue-700",
  draft: "bg-slate-100 text-slate-500",
  archived: "bg-slate-100 text-slate-500",
};
