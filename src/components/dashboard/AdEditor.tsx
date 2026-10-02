"use client";

import { useEffect, useState } from "react";
import type { Ad } from "@/lib/types";
import { categories, locations } from "@/lib/catalog";
import { categoryFields, conditions } from "@/lib/categoryFields";
import { getMarketplace } from "@/lib/config";
import { dummyAdImage } from "@/lib/seed/images";

const DRAFT_KEY = "sokohub_draft";

export default function AdEditor({ ad }: { ad?: Ad }) {
  const [title, setTitle] = useState(ad?.title ?? "");
  const [description, setDescription] = useState(ad?.description ?? "");
  const [price, setPrice] = useState(ad ? String(ad.price) : "");
  const [location, setLocation] = useState(ad?.location ?? getMarketplace().locations[0] ?? "");
  const [condition, setCondition] = useState(ad?.condition ?? "Used - Good");
  const [negotiable, setNegotiable] = useState(ad?.negotiable ?? true);
  const [categoryId, setCategoryId] = useState(ad?.categoryId ?? "vehicles");
  const [attrs, setAttrs] = useState<Record<string, string>>(ad?.attrs ?? {});
  const [photos, setPhotos] = useState<string[]>(ad?.images ?? [dummyAdImage(ad?.categoryId ?? "vehicles", undefined, 0, ad?.title)]);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (dirty) {
      const t = setTimeout(() => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, description, price, location, condition, negotiable, categoryId, attrs, photos }));
        setSavedAt(new Date().toLocaleTimeString());
      }, 800);
      return () => clearTimeout(t);
    }
  }, [title, description, price, location, condition, negotiable, categoryId, attrs, photos, dirty]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const fields = categoryFields[categoryId] ?? [];
  const movePhoto = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= photos.length) return;
    const next = [...photos];
    [next[i], next[j]] = [next[j], next[i]];
    setPhotos(next);
    setDirty(true);
  };

  if (published) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-bold text-green-800">✓ Listing submitted for review</p>
        <p className="mt-1 text-sm text-green-700">You will be notified once it is approved or rejected.</p>
        <a href="/dashboard/ads" className="mt-3 inline-block rounded-lg bg-green-600 px-5 py-2 text-sm font-bold text-white">Back to My Ads</a>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{ad ? "Edit Ad" : "New Ad"}</h1>
        <span className="text-xs text-slate-400">{savedAt ? `Draft saved ${savedAt}` : dirty ? "Unsaved changes…" : "All changes saved"}</span>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Basic Information</h2>
        <div className="mt-3 space-y-3">
          <div>
            <input value={title} onChange={(e) => { setTitle(e.target.value); setDirty(true); }} maxLength={80} placeholder="Title" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
            <p className="text-right text-[11px] text-slate-400">{title.length}/80</p>
          </div>
          <div>
            <textarea value={description} onChange={(e) => { setDescription(e.target.value); setDirty(true); }} maxLength={2000} rows={5} placeholder="Description" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
            <p className="text-right text-[11px] text-slate-400">{description.length}/2000</p>
          </div>
          <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setDirty(true); }} className="w-full rounded-lg border border-slate-300 p-3 text-sm">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Details</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <select value={condition} onChange={(e) => { setCondition(e.target.value); setDirty(true); }} className="rounded-lg border border-slate-300 p-3 text-sm">
            {conditions.map((c) => <option key={c}>{c}</option>)}
          </select>
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs font-semibold text-slate-500">{f.label}</label>
              {f.options ? (
                <select value={attrs[f.key] ?? ""} onChange={(e) => { setAttrs({ ...attrs, [f.key]: e.target.value }); setDirty(true); }} className="w-full rounded-lg border border-slate-300 p-3 text-sm">
                  <option value="">Select</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input value={attrs[f.key] ?? ""} onChange={(e) => { setAttrs({ ...attrs, [f.key]: e.target.value }); setDirty(true); }} className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Photos</h2>
        <p className="text-xs text-slate-500">First image is the cover. Reorder with arrows, remove with ✕.</p>
        <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-5">
          {photos.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} alt="" className="aspect-square w-full rounded-lg object-cover" />
              <div className="absolute bottom-1 left-1 flex gap-0.5">
                <button onClick={() => movePhoto(i, -1)} className="rounded bg-white/80 px-1 text-[10px]">↑</button>
                <button onClick={() => movePhoto(i, 1)} className="rounded bg-white/80 px-1 text-[10px]">↓</button>
                <button onClick={() => { setPhotos(photos.filter((_, j) => j !== i)); setDirty(true); }} className="rounded bg-white/80 px-1 text-[10px] text-red-600">✕</button>
              </div>
              {i === 0 && <span className="absolute left-1 top-1 rounded bg-green-600 px-1 text-[9px] font-bold text-white">COVER</span>}
            </div>
          ))}
          <button onClick={() => { setPhotos([...photos, dummyAdImage(categoryId, undefined, photos.length, title || undefined)]); setDirty(true); }} className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-xl text-slate-400">+</button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Pricing & Location</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input value={price} onChange={(e) => { setPrice(e.target.value); setDirty(true); }} type="number" placeholder={`Price (${getMarketplace().currencySymbol})`} className="rounded-lg border border-slate-300 p-3 text-sm" />
          <select value={location} onChange={(e) => { setLocation(e.target.value); setDirty(true); }} className="rounded-lg border border-slate-300 p-3 text-sm">
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={negotiable} onChange={(e) => { setNegotiable(e.target.checked); setDirty(true); }} /> Negotiable</label>
      </section>

      <div className="flex gap-2">
        <button onClick={() => { localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, description, price, location, condition, negotiable, categoryId, attrs, photos })); setDirty(false); setSavedAt(new Date().toLocaleTimeString()); }} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm">Save draft</button>
        <button disabled={!title || !price} onClick={() => setPublished(true)} className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50">Publish for review</button>
      </div>
    </div>
  );
}
