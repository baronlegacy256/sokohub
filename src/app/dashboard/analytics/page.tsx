"use client";

import Link from "next/link";
import { myListings, formatCount } from "@/lib/dash";
import PerformanceCard from "@/components/dashboard/PerformanceCard";

export default function AnalyticsPage() {
  const mine = myListings();
  const top = [...mine].sort((a, b) => b.views - a.views).slice(0, 5);
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Analytics</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Total views", mine.reduce((n, a) => n + a.views, 0)],
          ["Favorites", mine.reduce((n, a) => n + a.favorites, 0)],
          ["Avg. views / listing", Math.round(mine.reduce((n, a) => n + a.views, 0) / Math.max(1, mine.length))],
          ["Inquiries", Math.round(mine.reduce((n, a) => n + a.views, 0) * 0.02)],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xl font-extrabold">{formatCount(v as number)}</p>
            <p className="text-xs text-slate-500">{l}</p>
          </div>
        ))}
      </div>
      <PerformanceCard />
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">Top performing listings</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {top.map((a, i) => (
            <li key={a.id} className="flex items-center justify-between border-b border-slate-50 py-1.5">
              <Link href={`/dashboard/ads/${a.id}/analytics`} className="hover:underline">{i + 1}. {a.title}</Link>
              <span className="text-slate-400">{formatCount(a.views)} views · {a.favorites} favs</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
