"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { myListings, statusStyles } from "@/lib/dash";
import { formatUGX, timeAgo } from "@/lib/utils";
import { categories } from "@/lib/catalog";
import { useApp } from "@/context/AppContext";
import type { AdStatus } from "@/lib/types";

const STATUSES: (AdStatus | "all")[] = ["all", "active", "pending", "draft", "expired", "sold", "rejected"];

function MyAdsInner() {
  const sp = useSearchParams();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>(sp.get("status") ?? "all");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [menuId, setMenuId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [date, setDate] = useState("");

  const mine = myListings();
  const { conversations } = useApp();
  const conversationsMsgCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of conversations) counts.set(c.adId, (counts.get(c.adId) ?? 0) + 1);
    return counts;
  }, [conversations]);
  const rows = useMemo(() => {
    let out = mine.filter((a) =>
      (status === "all" || a.status === status) &&
      (cat ? a.categoryId === cat : true) &&
      (minP ? a.price >= Number(minP) : true) &&
      (maxP ? a.price <= Number(maxP) : true) &&
      (date === "week" ? new Date().getTime() - new Date(a.createdAt).getTime() < 7 * 86400000 : date === "month" ? new Date().getTime() - new Date(a.createdAt).getTime() < 30 * 86400000 : true) &&
      a.title.toLowerCase().includes(q.toLowerCase())
    );
    switch (sort) {
      case "oldest": out = [...out].sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break;
      case "views": out = [...out].sort((a, b) => b.views - a.views); break;
      case "favorites": out = [...out].sort((a, b) => b.favorites - a.favorites); break;
      case "msgs": out = [...out].sort((a, b) => (conversationsMsgCount.get(b.id) ?? 0) - (conversationsMsgCount.get(a.id) ?? 0)); break;
      default: out = [...out].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return out;
  }, [mine, q, status, cat, sort, minP, maxP, date, conversationsMsgCount]);

  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Ads</h1>
        <Link href="/sell" className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ Post New Ad</Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your listings…" className="flex-1 rounded-lg border border-slate-300 p-2.5 text-sm" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-sm">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-sm">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="views">Most viewed</option>
          <option value="favorites">Most favorited</option>
          <option value="msgs">Most messages</option>
        </select>
        <input value={minP} onChange={(e) => setMinP(e.target.value)} type="number" placeholder="Min price" className="w-28 rounded-lg border border-slate-300 p-2.5 text-sm" />
        <input value={maxP} onChange={(e) => setMaxP(e.target.value)} type="number" placeholder="Max price" className="w-28 rounded-lg border border-slate-300 p-2.5 text-sm" />
        <select value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-sm">
          <option value="">Any date</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatus(s)} className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${status === s ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{s}</button>
        ))}
      </div>

      {selected.size > 0 && (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm">
          <span className="font-semibold">{selected.size} selected</span>
          {["Pause", "Mark Sold", "Renew", "Promote"].map((a) => (
            <button key={a} className="rounded border border-slate-200 bg-white px-3 py-1 text-xs">{a}</button>
          ))}
          <button onClick={() => setConfirm("delete")} className="rounded border border-red-200 bg-white px-3 py-1 text-xs text-red-600">Delete</button>
        </div>
      )}

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr>
              <th className="p-3"><input type="checkbox" onChange={(e) => setSelected(e.target.checked ? new Set(rows.map((a) => a.id)) : new Set())} /></th>
              <th>Listing</th><th>Status</th><th>Price</th><th>Views</th><th>Favs</th><th>Posted</th><th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((a) => (
              <tr key={a.id}>
                <td className="p-3"><input type="checkbox" checked={selected.has(a.id)} onChange={() => toggle(a.id)} /></td>
                <td className="max-w-[220px] truncate py-2 font-medium">{a.title}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[a.status]}`}>{a.status}</span></td>
                <td>{formatUGX(a.price)}</td>
                <td>{a.views}</td>
                <td>{a.favorites}</td>
                <td className="text-slate-400">{timeAgo(a.createdAt)}</td>
                <td className="relative py-2 pr-3">
                  <button onClick={() => setMenuId(menuId === a.id ? null : a.id)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">Actions ▾</button>
                  {menuId === a.id && (
                    <div className="absolute right-3 z-10 mt-1 w-40 rounded-lg border border-slate-200 bg-white text-sm shadow-lg" onMouseLeave={() => setMenuId(null)}>
                      {[
                        ["View Listing", `/ad/${a.slug}`],
                        ["Edit Listing", `/dashboard/ads/${a.id}/edit`],
                        ["Analytics", `/dashboard/ads/${a.id}/analytics`],
                        ["Promote", "/dashboard/promotions"],
                        ["Pause", "#"], ["Mark as Sold", "#"], ["Renew", "#"], ["Duplicate", "/sell"], ["Delete", "#"],
                      ].map(([l, h]) => (
                        <Link key={l} href={h} className="block px-3 py-1.5 hover:bg-slate-50">{l}</Link>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-slate-500">No listings match your filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5">
            <h3 className="font-bold">Delete selected listings?</h3>
            <p className="mt-1 text-sm text-slate-500">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setConfirm(null)} className="rounded-lg px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => { setConfirm(null); setSelected(new Set()); }} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyAdsPage() {
  return <Suspense><MyAdsInner /></Suspense>;
}
