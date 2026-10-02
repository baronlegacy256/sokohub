"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ads, categories } from "@/lib/catalog";
import { formatUGX } from "@/lib/utils";
import Link from "next/link";

function AdminAdsInner() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [cat, setCat] = useState("");
  const filtered = ads
    .filter((a) => (cat ? a.categoryId === cat : true) && a.title.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 30);
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="text-xl font-bold">Manage Ads</h1>
      <div className="mt-3 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ads…" className="flex-1 rounded-lg border border-slate-300 p-2.5 text-sm" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-sm">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Title</th><th>Category</th><th>Price</th><th>Location</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((a) => (
              <tr key={a.id}>
                <td className="p-3 font-medium"><Link href={`/admin/ads/${a.id}`} className="hover:underline">{a.title}</Link></td>
                <td>{categories.find((c) => c.id === a.categoryId)?.name}</td>
                <td>{formatUGX(a.price)}</td>
                <td>{a.location}</td>
                <td>{a.status}</td>
                <td className="space-x-2 text-xs">
                  <Link href={`/admin/ads/${a.id}`} className="text-green-700">View</Link>
                  <button className="text-red-600">Reject</button>
                  <button className="text-amber-600">Feature</button>
                  <button className="text-slate-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminAdsPage() {
  return <Suspense><AdminAdsInner /></Suspense>;
}
