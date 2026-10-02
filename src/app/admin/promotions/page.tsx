"use client";

import { ads } from "@/lib/catalog";
import { formatUGX } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function AdminPromotionsPage() {
  const { promotions } = useApp();
  const promoted = ads.filter((a) => a.featured || a.urgent || a.top).slice(0, 15);
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="text-xl font-bold">Promotions</h1>
      {promotions.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-green-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-green-50 text-left text-xs text-green-800">
              <tr><th className="p-3">Ad</th><th>Package</th><th>Price</th><th>Gateway</th><th>Ends</th><th>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {promotions.map((p) => (
                <tr key={p.id}>
                  <td className="p-3">{ads.find((a) => a.id === p.adId)?.title ?? p.adId}</td>
                  <td>{p.packageName ?? p.type}</td>
                  <td>{formatUGX(p.price)}</td>
                  <td>{p.gateway}</td>
                  <td>{new Date(p.end).toLocaleDateString()}</td>
                  <td className="text-green-700">active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Ad</th><th>Promotion</th><th>Price</th><th>Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {promoted.map((a) => (
              <tr key={a.id}>
                <td className="p-3">{a.title}</td>
                <td>{a.featured ? "Featured" : a.urgent ? "Urgent" : "Top"}</td>
                <td>{formatUGX(a.featured ? 10000 : 5000)}</td>
                <td className="text-green-700">active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
