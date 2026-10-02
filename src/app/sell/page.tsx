"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories, subcategories, locations } from "@/lib/catalog";
import { categoryFields, conditions } from "@/lib/categoryFields";
import { formatUGX } from "@/lib/utils";
import { getMarketplace } from "@/lib/config";
import { dummyAdImage } from "@/lib/seed/images";

interface Photo { url: string; }

export default function SellPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [catId, setCatId] = useState("");
  const [subId, setSubId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [location, setLocation] = useState(getMarketplace().locations[0] ?? "");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [condition, setCondition] = useState("Used - Good");
  const [attrs, setAttrs] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Photo[]>([
    { url: dummyAdImage("vehicles", undefined, 0, "New Listing") },
    { url: dummyAdImage("vehicles", undefined, 1, "New Listing") },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const subs = subcategories.filter((s) => s.categoryId === catId);
  const fields = categoryFields[catId] ?? [];

  const move = (i: number, dir: -1 | 1) => {
    const next = [...photos];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setPhotos(next);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-4xl">✅</p>
        <h1 className="mt-3 text-xl font-bold">Ad submitted for review</h1>
        <p className="mt-2 text-slate-500">Your ad will go live once our team approves it. You can track its status in your dashboard.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/dashboard/ads" className="rounded-lg bg-green-600 px-6 py-2 font-bold text-white">View My Ads</a>
          <button onClick={() => router.refresh()} className="rounded-lg border border-slate-300 px-6 py-2">Post another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-3 py-6">
      <h1 className="text-xl font-bold">Post a Free Ad</h1>
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-green-600" : "bg-slate-200"}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="mt-5">
          <h2 className="font-bold">Step 1 · Choose a category</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((c) => (
              <button key={c.id} onClick={() => { setCatId(c.id); setStep(2); }} className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-green-500">
                <span className="text-2xl">{c.icon}</span>
                <p className="mt-1 font-semibold">{c.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-5">
          <h2 className="font-bold">Step 2 · Subcategory</h2>
          <div className="mt-3 space-y-2">
            {subs.map((s) => (
              <button key={s.id} onClick={() => { setSubId(s.id); setStep(3); }} className="block w-full rounded-lg border border-slate-200 bg-white p-3 text-left hover:border-green-500">{s.name}</button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-3 text-sm text-slate-500">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-5 space-y-3">
          <h2 className="font-bold">Step 3 · Listing details</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. Toyota Harrier 2021)" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe your item…" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
          <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full rounded-lg border border-slate-300 p-3 text-sm">
            {conditions.map((c) => <option key={c}>{c}</option>)}
          </select>
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-xs font-semibold text-slate-500">{f.label}</label>
              {f.options ? (
                <select value={attrs[f.key] ?? ""} onChange={(e) => setAttrs({ ...attrs, [f.key]: e.target.value })} className="w-full rounded-lg border border-slate-300 p-3 text-sm">
                  <option value="">Select</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input value={attrs[f.key] ?? ""} onChange={(e) => setAttrs({ ...attrs, [f.key]: e.target.value })} className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="flex-1 rounded-lg border border-slate-300 py-2.5">Back</button>
            <button disabled={!title} onClick={() => setStep(4)} className="flex-1 rounded-lg bg-green-600 py-2.5 font-bold text-white disabled:opacity-50">Continue</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="mt-5">
          <h2 className="font-bold">Step 4 · Photos</h2>
          <p className="text-xs text-slate-500">The first photo is the cover image. Use arrows to reorder.</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {photos.map((p, i) => (
              <div key={i} className="relative">
                <img src={p.url} alt="" className="aspect-square w-full rounded-lg object-cover" />
                <div className="absolute bottom-1 left-1 flex gap-1">
                  <button onClick={() => move(i, -1)} className="rounded bg-white/80 px-1 text-xs">↑</button>
                  <button onClick={() => move(i, 1)} className="rounded bg-white/80 px-1 text-xs">↓</button>
                  <button onClick={() => setPhotos(photos.filter((_, j) => j !== i))} className="rounded bg-white/80 px-1 text-xs text-red-600">✕</button>
                </div>
                {i === 0 && <span className="absolute left-1 top-1 rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white">Cover</span>}
              </div>
            ))}
            <button onClick={() => setPhotos([...photos, { url: dummyAdImage(catId || "vehicles", subId || undefined, photos.length, title || undefined) }])} className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-2xl text-slate-400">+</button>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setStep(3)} className="flex-1 rounded-lg border border-slate-300 py-2.5">Back</button>
            <button onClick={() => setStep(5)} className="flex-1 rounded-lg bg-green-600 py-2.5 font-bold text-white">Continue</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="mt-5 space-y-3">
          <h2 className="font-bold">Step 5 · Price & location</h2>
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder={`Price (${getMarketplace().currencySymbol})`} className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} /> Negotiable</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg border border-slate-300 p-3 text-sm">
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number (optional)" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
          <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number (optional)" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
          <div className="flex gap-2">
            <button onClick={() => setStep(4)} className="flex-1 rounded-lg border border-slate-300 py-2.5">Back</button>
            <button onClick={() => setStep(6)} className="flex-1 rounded-lg bg-green-600 py-2.5 font-bold text-white">Preview</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="mt-5">
          <h2 className="font-bold">Step 6 · Preview</h2>
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            {photos[0] && <img src={photos[0].url} alt="" className="aspect-video w-full rounded-lg object-cover" />}
            <h3 className="mt-3 text-lg font-bold">{title || "Untitled"}</h3>
            <p className="text-xl font-extrabold text-green-700">{price ? formatUGX(Number(price)) : `${getMarketplace().currencySymbol} —`}</p>
            <p className="text-sm text-slate-500">📍 {location} · {condition}</p>
            <p className="mt-2 text-sm text-slate-700">{description}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setStep(5)} className="flex-1 rounded-lg border border-slate-300 py-2.5">Edit</button>
            <button onClick={() => setStep(7)} className="flex-1 rounded-lg bg-green-600 py-2.5 font-bold text-white">Submit for review</button>
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="mt-5 text-center">
          <p className="text-4xl">🚀</p>
          <h2 className="mt-2 font-bold">Ready to publish?</h2>
          <p className="text-sm text-slate-500">Your ad will be reviewed by our moderation team before going live.</p>
          <button onClick={() => setSubmitted(true)} className="mt-4 rounded-lg bg-green-600 px-8 py-3 font-bold text-white">Publish Ad</button>
        </div>
      )}
    </div>
  );
}
