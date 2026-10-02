"use client";

import { formatUGX } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const demoPayments = [
  { id: "p1", type: "Featured Ad — 7 days", amount: 10000, at: "2026-10-01", status: "paid" },
  { id: "p2", type: "Urgent Ad — 3 days", amount: 5000, at: "2026-10-01", status: "paid" },
  { id: "p3", type: "Seller Subscription — monthly", amount: 50000, at: "2026-09-28", status: "paid" },
  { id: "p4", type: "Top Listing — 24h", amount: 3000, at: "2026-09-27", status: "pending" },
];

export default function AdminPaymentsPage() {
  const { payments, gateways } = useApp();
  const enabled = gateways.filter((g) => g.enabled);
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="text-xl font-bold">Payments</h1>
      <p className="mt-1 text-sm text-slate-500">
        {enabled.length} gateway{enabled.length === 1 ? "" : "s"} enabled: {enabled.map((g) => g.name).join(", ") || "none"}. Manage them in Settings → Payments.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Transaction</th><th>Amount</th><th>Gateway</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="p-3">Promotion · {p.adId}</td>
                <td>{formatUGX(p.amount)}</td>
                <td>{p.gateway}</td>
                <td>{new Date(p.at).toLocaleDateString()}</td>
                <td className="text-green-700">{p.status}</td>
              </tr>
            ))}
            {payments.length === 0 && demoPayments.map((p) => (
              <tr key={p.id}><td className="p-3">{p.type}</td><td>{formatUGX(p.amount)}</td><td>—</td><td>{p.at}</td><td>{p.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
