"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categoryFields, conditions } from "@/lib/categoryFields";
import { categories, locations, subcategories } from "@/lib/catalog";
import { getMarketplace } from "@/lib/config";

export default function Filters({ categoryId }: { categoryId?: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  const set = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/ads?${params.toString()}`);
  };

  const fields = categoryId ? categoryFields[categoryId] ?? [] : [];
  const subs = categoryId ? subcategories.filter((s) => s.categoryId === categoryId) : [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
      <h2 className="mb-3 font-bold">Filters</h2>
      <label className="mb-1 block text-xs font-semibold text-slate-500">Category</label>
      <select value={sp.get("category") ?? ""} onChange={(e) => set("category", e.target.value)} className="mb-3 w-full rounded border border-slate-200 p-2">
        <option value="">All</option>
        {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
      </select>
      {subs.length > 0 && (
        <>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Subcategory</label>
          <select value={sp.get("subcategory") ?? ""} onChange={(e) => set("subcategory", e.target.value)} className="mb-3 w-full rounded border border-slate-200 p-2">
            <option value="">All</option>
            {subs.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </>
      )}
      <label className="mb-1 block text-xs font-semibold text-slate-500">Location</label>
      <select value={sp.get("location") ?? ""} onChange={(e) => set("location", e.target.value)} className="mb-3 w-full rounded border border-slate-200 p-2">
        <option value="">All {getMarketplace().country}</option>
        {locations.map((l) => <option key={l}>{l}</option>)}
      </select>
      <label className="mb-1 block text-xs font-semibold text-slate-500">Price range ({getMarketplace().currencySymbol})</label>
      <div className="mb-3 flex gap-2">
        <input placeholder="Min" type="number" defaultValue={sp.get("minPrice") ?? ""} onBlur={(e) => set("minPrice", e.target.value)} className="w-full rounded border border-slate-200 p-2" />
        <input placeholder="Max" type="number" defaultValue={sp.get("maxPrice") ?? ""} onBlur={(e) => set("maxPrice", e.target.value)} className="w-full rounded border border-slate-200 p-2" />
      </div>
      <label className="mb-1 block text-xs font-semibold text-slate-500">Condition</label>
      <select value={sp.get("condition") ?? ""} onChange={(e) => set("condition", e.target.value)} className="mb-3 w-full rounded border border-slate-200 p-2">
        <option value="">Any</option>
        {conditions.map((c) => <option key={c}>{c}</option>)}
      </select>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="mb-1 block text-xs font-semibold text-slate-500">{f.label}</label>
          {f.options ? (
            <select value={sp.get(`attr_${f.key}`) ?? ""} onChange={(e) => set(`attr_${f.key}`, e.target.value)} className="mb-3 w-full rounded border border-slate-200 p-2">
              <option value="">Any</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input defaultValue={sp.get(`attr_${f.key}`) ?? ""} onBlur={(e) => set(`attr_${f.key}`, e.target.value)} className="mb-3 w-full rounded border border-slate-200 p-2" />
          )}
        </div>
      ))}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={sp.get("negotiable") === "1"} onChange={(e) => set("negotiable", e.target.checked ? "1" : "")} /> Negotiable prices
      </label>
      <label className="mt-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={sp.get("verified") === "1"} onChange={(e) => set("verified", e.target.checked ? "1" : "")} /> Verified sellers only
      </label>
    </div>
  );
}
