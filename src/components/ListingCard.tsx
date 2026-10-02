"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Ad } from "@/lib/types";
import { getSeller, categoryById } from "@/lib/catalog";
import { formatUGX, timeAgo } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function ListingCard({ ad }: { ad: Ad }) {
  const { favorites, toggleFavorite } = useApp();
  const fav = favorites.includes(ad.id);
  const seller = getSeller(ad.sellerId);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/ad/${ad.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
        <Image src={ad.images[0]} alt={ad.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition group-hover:scale-105" />
        {ad.featured && <span className="absolute left-2 top-2 rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-950">Featured</span>}
        {ad.urgent && <span className="absolute left-2 top-2 ml-0 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Urgent</span>}
      </Link>
      <button
        aria-label="Save to favorites"
        onClick={() => toggleFavorite(ad.id)}
        className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 shadow"
      >
        <Heart size={16} className={fav ? "fill-red-500 text-red-500" : "text-slate-500"} />
      </button>
      <div className="flex flex-1 flex-col p-3">
        <Link href={`/ad/${ad.slug}`} className="line-clamp-2 text-sm font-medium text-slate-800">{ad.title}</Link>
        <p className="mt-1 text-base font-bold text-green-700">{formatUGX(ad.price)}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500">
          <span>📍 {ad.location}</span>
          <span>{timeAgo(ad.createdAt)}</span>
        </div>
        <p className="mt-1 truncate text-xs text-slate-500">
          {seller?.verified !== "none" && "✓ "}{seller?.name} · {categoryById(ad.categoryId)?.name}
        </p>
      </div>
    </div>
  );
}
