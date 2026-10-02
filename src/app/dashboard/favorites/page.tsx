"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";
import { formatUGX } from "@/lib/utils";

const TABS = ["All", "Recently Added", "Price Changed", "Sold"];

export default function DashboardFavoritesPage() {
  const { favorites, toggleFavorite } = useApp();
  const [tab, setTab] = useState("All");
  const saved = ads.filter((a) => favorites.includes(a.id));
  const demo = favorites.length === 0 ? ads.slice(20, 24) : saved;

  return (
    <div>
      <h1 className="text-xl font-bold">Favorites</h1>
      <div className="mt-3 flex gap-1.5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-xs font-semibold ${tab === t ? "bg-slate-800 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{t}</button>
        ))}
      </div>
      {demo.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-bold">No saved listings</p>
          <p className="text-sm text-slate-500">Save listings you like and find them here.</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {demo.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-2">
              <Link href={`/ad/${a.slug}`}>
                <Image src={a.images[0]} alt={a.title} width={400} height={300} className="aspect-[4/3] w-full rounded-lg object-cover" />
              </Link>
              <Link href={`/ad/${a.slug}`} className="mt-2 block line-clamp-2 text-sm font-medium">{a.title}</Link>
              <p className="font-bold text-green-700">{formatUGX(a.price)}</p>
              <p className="text-xs text-slate-500">📍 {a.location} · saved</p>
              <button onClick={() => toggleFavorite(a.id)} className="mt-2 w-full rounded-lg border border-slate-200 py-1.5 text-xs">Remove</button>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-slate-400">Tip: we notify you when a saved listing changes price or is marked sold.</p>
    </div>
  );
}
