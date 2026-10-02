"use client";

import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";

export default function FavoritesPage() {
  const { favorites } = useApp();
  const saved = ads.filter((a) => favorites.includes(a.id));
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="mb-4 text-xl font-bold">Saved listings</h1>
      {saved.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-lg">❤️</p>
          <p className="font-bold">No favorites yet</p>
          <p className="text-sm text-slate-500">Save listings you like and find them here.</p>
          <Link href="/ads" className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white">Browse ads</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {saved.map((a) => <ListingCard key={a.id} ad={a} />)}
        </div>
      )}
    </div>
  );
}
