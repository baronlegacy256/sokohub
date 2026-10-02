"use client";

import { useMemo, useState } from "react";
import type { Ad } from "@/lib/types";
import { dailySeries, formatCount } from "@/lib/dash";
import BarChart from "./BarChart";
import { formatUGX } from "@/lib/utils";

const RANGES: Record<string, number> = { Today: 1, "7 days": 7, "30 days": 30, "All time": 60 };

export default function AnalyticsView({ ad }: { ad: Ad }) {
  const [range, setRange] = useState("30 days");
  const [tab, setTab] = useState<"Views" | "Engagement">("Views");
  const series = useMemo(
    () => dailySeries(tab === "Views" ? ad.views : ad.favorites + Math.round(ad.views * 0.02), RANGES[range], ad.views),
    [tab, range, ad]
  );
  const stats = [
    ["Views", ad.views], ["Favorites", ad.favorites], ["Messages", Math.round(ad.views * 0.02)],
    ["Phone clicks", Math.round(ad.views * 0.08)], ["WhatsApp clicks", Math.round(ad.views * 0.05)],
  ] as const;
  const sources = [
    ["Marketplace search", 54], ["Category page", 24], ["Homepage", 12], ["Direct link", 7], ["Shared", 3],
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Listing Analytics</h1>
          <p className="text-sm text-slate-500">{ad.title} · {formatUGX(ad.price)}</p>
        </div>
        <a href={`/ad/${ad.slug}`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">View listing</a>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xl font-extrabold">{formatCount(v)}</p>
            <p className="text-xs text-slate-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2">
          {(["Views", "Engagement"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-xs ${tab === t ? "bg-green-600 text-white" : "bg-slate-100"}`}>{t}</button>
          ))}
          <select value={range} onChange={(e) => setRange(e.target.value)} className="ml-auto rounded-lg border border-slate-200 px-2 py-1 text-xs">
            {Object.keys(RANGES).map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="mt-4"><BarChart data={series} /></div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">Traffic sources</h2>
        <ul className="mt-3 space-y-2">
          {sources.map(([l, v]) => (
            <li key={l}>
              <div className="flex justify-between text-sm"><span>{l}</span><span className="text-slate-500">{v}%</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-green-500" style={{ width: `${v}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
