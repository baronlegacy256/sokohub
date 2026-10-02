import { formatUGX } from "@/lib/utils";

const packages = [
  { name: "Featured — 7 days", desc: "Premium placement in listings", price: 10000, placement: "Listing feeds", status: "active" },
  { name: "Top Listing — 3 days", desc: "Top of category results", price: 5000, placement: "Category", status: "active" },
  { name: "Homepage — 7 days", desc: "Homepage spotlight", price: 20000, placement: "Homepage", status: "active" },
  { name: "Urgent — 3 days", desc: "Urgent badge on listing", price: 3000, placement: "All", status: "active" },
  { name: "Category Boost — 7 days", desc: "Boost within a category", price: 7000, placement: "Category", status: "disabled" },
];

export default function PackagesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Promotion Packages</h1>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ Create package</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {packages.map((p) => (
          <div key={p.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">{p.name}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{p.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
            <p className="mt-2 text-lg font-extrabold text-green-700">{formatUGX(p.price)}</p>
            <p className="text-xs text-slate-400">Placement: {p.placement}</p>
            <div className="mt-3 space-x-3 text-xs"><button className="text-green-700">Edit</button><button className="text-slate-500">{p.status === "active" ? "Disable" : "Enable"}</button></div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400">Prices are configurable — nothing is hardcoded in the sellers&apos; promotion flow.</p>
    </div>
  );
}
