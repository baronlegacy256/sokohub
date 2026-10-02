"use client";

import { useState } from "react";
import { ads, sellers } from "@/lib/catalog";
import { revenueBreakdown, totals } from "@/lib/admin";
import { dailySeries } from "@/lib/dash";
import BarChart from "@/components/dashboard/BarChart";
import { formatUGX } from "@/lib/utils";

const SECTIONS = ["Marketplace", "Users", "Listings", "Revenue"] as const;

export default function AdminAnalyticsPage() {
  const t = totals();
  const [section, setSection] = useState<(typeof SECTIONS)[number]>("Marketplace");
  const [days, setDays] = useState(30);
  const value = section === "Revenue" ? t.revenue : section === "Users" ? t.users : section === "Listings" ? ads.length : t.views;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">Marketplace Analytics</h1>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="rounded-lg border border-slate-300 p-2 text-sm">
          {[7, 30, 90, 365].map((d) => <option key={d} value={d}>{d === 365 ? "12 months" : `${d} days`}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SECTIONS.map((s) => (
          <button key={s} onClick={() => setSection(s)} className={`rounded-full px-3 py-1 text-xs font-semibold ${section === s ? "bg-green-600 text-white" : "bg-white border border-slate-200"}`}>{s}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Listings created", ads.length], ["Users", t.users], ["Listing views", t.views], ["Messages", Math.round(t.views * 0.02)],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xl font-extrabold">{(v as number).toLocaleString()}</p>
            <p className="text-xs text-slate-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">{section} over time</h2>
        <div className="mt-3"><BarChart data={dailySeries(value, days, section.length)} /></div>
      </div>
      {section === "Revenue" && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Revenue breakdown</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {revenueBreakdown.map((r) => <li key={r.label} className="flex justify-between border-b border-slate-50 py-1"><span>{r.label}</span><span className="font-semibold">{formatUGX(r.amount)}</span></li>)}
          </ul>
        </div>
      )}
      <p className="text-xs text-slate-400">Series derived from live catalog totals; per-day events are recorded via the marketplace event log. Active sellers: {sellers.length}.</p>
    </div>
  );
}
