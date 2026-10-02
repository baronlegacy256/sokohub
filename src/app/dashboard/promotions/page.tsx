"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";
import { promotionPackages } from "@/lib/packages";
import { formatUGX } from "@/lib/utils";

export default function PromotionsPage() {
  const { promotions, promoteAd, gateways } = useApp();
  const [adId, setAdId] = useState(ads[0]?.id ?? "");
  const [pkgId, setPkgId] = useState(promotionPackages[0].id);
  const [gatewayId, setGatewayId] = useState(gateways.find((g) => g.enabled)?.id ?? "");
  const [state, setState] = useState<"idle" | "paying" | "done" | "error">("idle");

  const pkg = promotionPackages.find((p) => p.id === pkgId)!;
  const enabledGateways = gateways.filter((g) => g.enabled);

  const pay = () => {
    if (!adId || !gatewayId) return;
    setState("paying");
    setTimeout(() => {
      try {
        promoteAd(adId, pkgId, gatewayId);
        setState("done");
      } catch {
        setState("error");
      }
    }, 900);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Promotions</h1>

      <div>
        <h2 className="font-bold">Your active promotions</h2>
        {promotions.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            No promotions yet. Promote an ad below to boost its visibility.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs text-slate-500">
                <tr><th className="p-3">Listing</th><th>Package</th><th>Start</th><th>End</th><th>Status</th><th>Paid</th><th></th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {promotions.map((p) => {
                  const ad = ads.find((a) => a.id === p.adId);
                  return (
                    <tr key={p.id}>
                      <td className="max-w-[180px] truncate p-3 font-medium">{ad?.title ?? p.adId}</td>
                      <td>{p.packageName ?? p.type}</td>
                      <td>{new Date(p.start).toLocaleDateString()}</td>
                      <td>{new Date(p.end).toLocaleDateString()}</td>
                      <td><span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">active</span></td>
                      <td>{formatUGX(p.price)}</td>
                      <td>{ad && <Link href={`/ad/${ad.slug}`} className="text-xs text-green-700">View</Link>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-bold">Promote an ad</h2>
        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-5">
          <label className="block text-sm">
            <span className="font-semibold">Choose a listing</span>
            <select value={adId} onChange={(e) => setAdId(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5">
              {ads.slice(0, 30).map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          </label>

          <p className="mt-4 text-sm font-semibold">Package</p>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            {promotionPackages.filter((p) => p.active).map((p) => (
              <button key={p.id} onClick={() => setPkgId(p.id)} type="button"
                className={`rounded-xl border p-4 text-left ${pkgId === p.id ? "border-green-500 bg-green-50" : "border-slate-200 bg-white"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-bold">{p.name}</p>
                  <p className="font-extrabold text-green-700">{formatUGX(p.price)}</p>
                </div>
                <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
                <p className="mt-1 text-xs text-slate-400">{p.days} days · {p.placement}</p>
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm">
            <span className="font-semibold">Payment gateway</span>
            <select value={gatewayId} onChange={(e) => setGatewayId(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5">
              {enabledGateways.map((g) => <option key={g.id} value={g.id}>{g.name} — {g.type}</option>)}
            </select>
          </label>

          {state === "done" ? (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
              ✓ Payment successful — your promotion is now live and your ad will be shown first.
              <button onClick={() => setState("idle")} className="mt-2 block text-xs font-semibold underline">Promote another ad</button>
            </div>
          ) : (
            <button onClick={pay} disabled={state === "paying" || !enabledGateways.length}
              className="mt-4 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
              {state === "paying" ? "Processing payment…" : `Pay ${formatUGX(pkg.price)}`}
            </button>
          )}
          {state === "error" && <p className="mt-2 text-sm text-red-600">Payment failed. Please try again.</p>}
        </div>
      </div>
    </div>
  );
}
