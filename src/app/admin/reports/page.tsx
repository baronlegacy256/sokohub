"use client";

import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";

export default function AdminReportsPage() {
  const { reports, problemReports } = useApp();
  const demo = reports.length === 0 ? [
    { id: "d1", adId: ads[0].id, reason: "Scam", reporter: "Grace N.", at: new Date().toISOString(), status: "pending" as const },
    { id: "d2", adId: ads[5].id, reason: "Wrong information", reporter: "Peter M.", at: new Date().toISOString(), status: "reviewed" as const },
  ] : reports;
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="text-xl font-bold">Reports</h1>
      {problemReports.length > 0 && (
        <div className="mt-4 space-y-2">
          {problemReports.map((r) => (
            <div key={r.id} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold">{r.reason} · {r.type}</p>
              <p className="text-sm text-slate-600">{r.description}</p>
              <p className="text-xs text-slate-500">Reported by {r.reporter} · {r.status}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 space-y-2">
        {demo.map((r) => {
          const ad = ads.find((a) => a.id === r.adId);
          return (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-semibold">{r.reason}</p>
              <p className="text-sm text-slate-500">On &quot;{ad?.title}&quot; · reported by {r.reporter} · {r.status}</p>
              <div className="mt-2 space-x-3 text-xs">
                <button className="text-amber-600">Warn seller</button>
                <button className="text-red-600">Remove listing</button>
                <button className="text-red-800">Ban seller</button>
                <button className="text-slate-500">Dismiss</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
