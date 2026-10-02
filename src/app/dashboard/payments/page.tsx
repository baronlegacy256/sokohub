import { formatUGX } from "@/lib/utils";

const rows = [
  { date: "Oct 1, 2026", desc: "Featured listing — 7 days", listing: "Toyota Harrier 2021", amount: 10000, method: "Mobile Money", status: "Successful" },
  { date: "Sep 28, 2026", desc: "Urgent ad — 3 days", listing: "iPhone 14 128GB", amount: 5000, method: "Mobile Money", status: "Successful" },
  { date: "Sep 20, 2026", desc: "Seller subscription — monthly", listing: "—", amount: 50000, method: "Card", status: "Successful" },
  { date: "Sep 12, 2026", desc: "Top listing — 24h", listing: "MacBook Pro M3", amount: 3000, method: "Mobile Money", status: "Failed" },
  { date: "Sep 1, 2026", desc: "Featured listing — 7 days", listing: "2 bedroom apartment", amount: 10000, method: "Mobile Money", status: "Refunded" },
];

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold">Payments</h1>
      <h2 className="mt-4 font-bold">Payment history</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Date</th><th>Description</th><th>Listing</th><th>Amount</th><th>Method</th><th>Status</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((p, i) => (
              <tr key={i}>
                <td className="p-3">{p.date}</td>
                <td>{p.desc}</td>
                <td>{p.listing}</td>
                <td className="font-semibold">{formatUGX(p.amount)}</td>
                <td>{p.method}</td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "Successful" ? "bg-green-100 text-green-700" : p.status === "Failed" ? "bg-red-100 text-red-700" : p.status === "Refunded" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-700"}`}>{p.status}</span>
                </td>
                <td><button className="text-xs text-green-700">Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
