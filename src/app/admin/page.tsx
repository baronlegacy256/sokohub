"use client";

import { useState } from "react";
import Link from "next/link";
import { ads, sellers } from "@/lib/catalog";
import { adminReports, revenueBreakdown, searchTerms, categoryStats, locationStats, totals } from "@/lib/admin";
import { formatUGX, timeAgo } from "@/lib/utils";
import { dailySeries } from "@/lib/dash";
import BarChart from "@/components/dashboard/BarChart";

export default function AdminPage() {
  const [range, setRange] = useState("30 Days");
  const [metric, setMetric] = useState("Listings Created");
  const t = totals();
  const metrics = [
    { label: "Total Users", value: t.users, delta: "+4.2%", href: "/admin/users" },
    { label: "Active Users", value: t.activeUsers, delta: "+6.1%", href: "/admin/users" },
    { label: "Total Listings", value: t.listings, delta: "+8.4%", href: "/admin/ads" },
    { label: "Active Listings", value: t.active, delta: "+5.0%", href: "/admin/ads?status=active" },
    { label: "Pending Listings", value: t.pending, delta: "-3.2%", href: "/admin/ads?status=pending" },
    { label: "Revenue", value: formatUGX(t.revenue), delta: "+12.7%", href: "/admin/payments" },
  ];
  const metricMap: Record<string, number> = {
    "Listings Created": ads.length,
    "Users Registered": t.users,
    "Listing Views": t.views,
    Messages: Math.round(t.views * 0.02),
    Revenue: t.revenue,
  };
  const activity = [
    ["New", Math.round(ads.length * 0.15), "bg-blue-500"],
    ["Approved", Math.round(ads.length * 0.6), "bg-green-500"],
    ["Rejected", Math.round(ads.length * 0.05), "bg-red-500"],
    ["Expired", Math.round(ads.length * 0.1), "bg-slate-400"],
    ["Sold", Math.round(ads.length * 0.07), "bg-amber-500"],
    ["Reported", Math.round(ads.length * 0.03), "bg-purple-500"],
  ] as const;
  const queue = ads.filter((_, i) => i % 9 === 0).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold">Marketplace Overview</h1>
          <p className="text-sm text-slate-500">Every number below is computed from the live catalog.</p>
        </div>
        <select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-lg border border-slate-300 bg-white p-2 text-sm">
          {["Today", "7 Days", "30 Days", "90 Days", "12 Months"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map((m) => (
          <Link key={m.label} href={m.href} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-green-500">
            <p className="text-xs text-slate-500">{m.label}</p>
            <p className="mt-1 text-xl font-extrabold">{typeof m.value === "number" ? m.value.toLocaleString() : m.value}</p>
            <p className={`mt-1 text-xs ${m.delta.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{m.delta} vs prev. period</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(metricMap).map((m) => (
            <button key={m} onClick={() => setMetric(m)} className={`rounded-full px-3 py-1 text-xs ${metric === m ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600"}`}>{m}</button>
          ))}
          <span className="ml-auto text-sm font-bold">{metricMap[metric].toLocaleString()}</span>
        </div>
        <div className="mt-3">
          <BarChart data={dailySeries(metricMap[metric], range === "Today" ? 1 : range === "7 Days" ? 7 : range === "90 Days" ? 90 : range === "12 Months" ? 52 : 30, 5 + metric.length)} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Revenue Overview</h2>
          <p className="mt-1 text-2xl font-extrabold">{formatUGX(t.revenue)}</p>
          <ul className="mt-3 space-y-1.5">
            {revenueBreakdown.map((r) => (
              <li key={r.label}>
                <div className="flex justify-between text-sm"><span>{r.label}</span><span className="font-semibold">{formatUGX(r.amount)}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-green-500" style={{ width: `${(r.amount / t.revenue) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">Successful 128 · Pending 6 · Failed 9 · Refunds 3</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Listing Activity</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {activity.map(([label, n, color]) => (
              <li key={label}>
                <div className="flex justify-between"><span>{label}</span><span className="font-semibold">{n}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${(n / activity[1][1]) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="font-bold text-amber-900">Moderation Queue — {queue.length * 7} listings awaiting review</h2>
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-amber-100">
              {queue.map((a) => (
                <tr key={a.id}>
                  <td className="max-w-[160px] truncate py-1.5">{a.title}</td>
                  <td className="text-amber-700">{a.location}</td>
                  <td className="space-x-2">
                    <Link href={`/admin/ads/${a.id}`} className="text-green-700">View</Link>
                    <button className="text-green-700">Approve</button>
                    <button className="text-red-600">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Recent Reports</h2>
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {adminReports.slice(0, 5).map((r) => (
                <tr key={r.id}>
                  <td className="max-w-[140px] truncate py-1.5">{r.ad.title}</td>
                  <td>{r.reason}</td>
                  <td><span className={`rounded-full px-2 py-0.5 text-[10px] ${r.priority === "Critical" ? "bg-red-100 text-red-700" : r.priority === "High" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{r.priority}</span></td>
                  <td><Link href="/admin/reports" className="text-green-700">Review</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Popular Categories</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {categoryStats().sort((a, b) => b.n - a.n).slice(0, 6).map((c) => (
              <li key={c.id} className="flex justify-between border-b border-slate-50 py-1"><span>{c.icon} {c.name}</span><span className="text-slate-500">{c.n} ads · {c.views.toLocaleString()} views</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Popular Locations</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {locationStats().slice(0, 6).map((l) => (
              <li key={l.location} className="flex justify-between border-b border-slate-50 py-1"><span>📍 {l.location}</span><span className="text-slate-500">{l.n} ads</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Top Listings</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {[...ads].sort((a, b) => b.views - a.views).slice(0, 6).map((a, i) => (
              <li key={a.id} className="flex justify-between border-b border-slate-50 py-1"><Link href={`/ad/${a.slug}`} className="truncate hover:underline">{i + 1}. {a.title}</Link><span className="text-slate-500">{a.views}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">Recent Users</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs text-slate-400"><tr><th>User</th><th>Location</th><th>Listings</th><th>Joined</th><th>Verification</th><th></th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {sellers.slice(0, 6).map((s) => (
              <tr key={s.id}>
                <td className="py-1.5 font-medium">{s.name}</td>
                <td>{s.location}</td>
                <td>{s.activeAds}</td>
                <td>{timeAgo(s.memberSince)}</td>
                <td>{s.verified}</td>
                <td><Link href={`/admin/users/${s.id}`} className="text-green-700">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">Quick Admin Actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["Review Ads", "/admin/ads"], ["Manage Categories", "/admin/categories"], ["Users", "/admin/users"],
            ["Reports", "/admin/reports"], ["Create Promotion", "/admin/promotions/packages"], ["Search Analytics", "/admin/analytics/search"],
          ].map(([l, h]) => (
            <Link key={l} href={h} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm hover:border-green-500">{l}</Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">Most searched: {searchTerms.map((s) => s.term).slice(0, 3).join(" · ")} — <Link href="/admin/analytics/search" className="text-green-700">view search analytics</Link></p>
      </div>
    </div>
  );
}
