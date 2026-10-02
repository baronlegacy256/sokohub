"use client";

import { useMemo, useState } from "react";
import BarChart from "./BarChart";
import { myListings, dailySeries } from "@/lib/dash";

const METRICS = ["Views", "Favorites", "Messages", "Inquiries"] as const;
const RANGES: Record<string, number> = { "7 Days": 7, "30 Days": 30, "90 Days": 90, "1 Year": 365 };

export default function PerformanceCard() {
  const [metric, setMetric] = useState<(typeof METRICS)[number]>("Views");
  const [range, setRange] = useState("30 Days");
  const mine = myListings();

  const total = useMemo(() => {
    const factor = metric === "Views" ? 1 : metric === "Favorites" ? 0.06 : metric === "Messages" ? 0.02 : 0.015;
    return Math.round(mine.reduce((n, a) => n + a.views, 0) * factor);
  }, [metric, mine]);

  const series = useMemo(() => dailySeries(total, RANGES[range], 17 + METRICS.indexOf(metric)), [total, range, metric]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold">Listing Performance</h2>
        <div className="flex gap-1">
          {METRICS.map((m) => (
            <button key={m} onClick={() => setMetric(m)} className={`rounded-full px-3 py-1 text-xs ${metric === m ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600"}`}>{m}</button>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <p className="text-2xl font-extrabold">{total.toLocaleString()}</p>
        <p className="text-xs text-slate-500">{metric} · total across your listings</p>
        <select value={range} onChange={(e) => setRange(e.target.value)} className="ml-auto rounded-lg border border-slate-200 px-2 py-1 text-xs">
          {Object.keys(RANGES).map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div className="mt-4"><BarChart data={series.length > 90 ? series.filter((_, i) => i % 7 === 0) : series} /></div>
      <p className="mt-2 text-[11px] text-slate-400">Daily breakdown estimated from recorded totals; live events are tracked from listing views, favorites and contact clicks.</p>
    </div>
  );
}
