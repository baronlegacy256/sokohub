import { formatUGX } from "@/lib/utils";

const plans = [
  { name: "Basic Seller", price: 20000, subscribers: 84, active: 79, cancelled: 5, features: ["20 active ads", "Basic analytics"] },
  { name: "Pro Seller", price: 50000, subscribers: 31, active: 29, cancelled: 2, features: ["100 active ads", "Advanced analytics", "Featured credits"] },
  { name: "Business", price: 120000, subscribers: 9, active: 8, cancelled: 1, features: ["Unlimited ads", "Priority review", "Dedicated support"] },
];

export default function SubscriptionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Subscriptions</h1>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ Create plan</button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-bold">{p.name}</p>
            <p className="text-xl font-extrabold text-green-700">{formatUGX(p.price)}<span className="text-xs font-normal text-slate-400">/mo</span></p>
            <dl className="mt-2 text-xs text-slate-500">
              <div className="flex justify-between"><dt>Subscribers</dt><dd>{p.subscribers}</dd></div>
              <div className="flex justify-between"><dt>Active</dt><dd>{p.active}</dd></div>
              <div className="flex justify-between"><dt>Cancelled</dt><dd>{p.cancelled}</dd></div>
            </dl>
            <ul className="mt-2 space-y-0.5 text-xs text-slate-600">{p.features.map((f) => <li key={f}>• {f}</li>)}</ul>
            <button className="mt-3 text-xs text-green-700">Edit plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
