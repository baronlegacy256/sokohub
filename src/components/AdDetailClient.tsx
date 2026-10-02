"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, Heart, Flag } from "lucide-react";
import type { Ad, Seller } from "@/lib/types";
import { formatUGX, timeAgo } from "@/lib/utils";
import { getMarketplace, whatsappLink } from "@/lib/config";
import { useApp } from "@/context/AppContext";
import { track } from "@/lib/events";
import ListingCard from "./ListingCard";

export default function AdDetailClient({ ad, seller, similar }: { ad: Ad; seller: Seller; similar: Ad[] }) {
  useEffect(() => { track("view", ad.id); }, [ad.id]);
  const [active, setActive] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const [reason, setReason] = useState("Scam");
  const { favorites, toggleFavorite, startConversation, addReport } = useApp();
  const fav = favorites.includes(ad.id);

  const waUrl = whatsappLink(seller.whatsapp || seller.phone, `Hello, I'm interested in your ${ad.title} listed for ${formatUGX(ad.price)} on ${getMarketplace().name}. Is it still available?`);

  const submitReport = () => {
    addReport({ adId: ad.id, reason, reporter: "Guest" });
    setReported(true);
    setReporting(false);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image src={ad.images[active]} alt={ad.title} fill className="object-cover" />
          </div>
          <div className="mt-2 flex gap-2">
            {ad.images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`relative h-16 w-20 overflow-hidden rounded-lg border ${i === active ? "border-green-600" : "border-slate-200"}`}>
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-xl font-bold leading-snug">{ad.title}</h1>
          <p className="mt-1 text-2xl font-extrabold text-green-700">{formatUGX(ad.price)}</p>
          <p className="mt-1 text-xs text-slate-500">📍 {ad.location}, {ad.district} · {timeAgo(ad.createdAt)} · {ad.views} views · {ad.negotiable ? "Negotiable" : "Fixed price"}</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button onClick={() => { setShowPhone(true); track("phone", ad.id); }} className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold">
              <Phone size={16} /> {showPhone ? seller.phone : "Show Phone"}
            </button>
            <a href={waUrl} target="_blank" rel="noreferrer" onClick={() => track("whatsapp", ad.id)} className="flex items-center justify-center gap-1 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link href={`/messages?ad=${ad.id}`} onClick={() => { startConversation(ad.id, seller.id, seller.name, ad.title); track("message", ad.id); }} className="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2.5 text-sm font-semibold text-white">
              Chat with Seller
            </Link>
            <button onClick={() => setReporting(true)} className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 py-2.5 text-sm">
              <Flag size={16} /> Report
            </button>
            <button onClick={() => { toggleFavorite(ad.id); track("favorite", ad.id); }} className="col-span-2 flex items-center justify-center gap-1 rounded-lg border border-slate-300 py-2.5 text-sm">
              <Heart size={16} className={fav ? "fill-red-500 text-red-500" : ""} /> {fav ? "Saved" : "Save"} · {ad.condition}
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <Image src={seller.avatar} alt={seller.name} width={44} height={44} className="rounded-full" />
              <div>
                <Link href={`/seller/${seller.username}`} className="font-bold">{seller.name}</Link>
                <p className="text-xs text-slate-500">
                  {seller.verified !== "none" ? `✓ ${seller.verified} verified · ` : ""}Member since {seller.memberSince.slice(0, 4)} · {seller.responseRate}% response
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-bold">Description</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{ad.description}</p>
          <h2 className="mt-5 font-bold">Specifications</h2>
          <dl className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white text-sm">
            {Object.entries(ad.attrs).map(([k, v]) => (
              <div key={k} className="flex justify-between p-2.5">
                <dt className="capitalize text-slate-500">{k.replace(/([A-Z])/g, " $1")}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between p-2.5"><dt className="text-slate-500">Condition</dt><dd className="font-medium">{ad.condition}</dd></div>
          </dl>
          <h2 className="mt-5 font-bold">Safety tips</h2>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
            <li>Meet in a public place and inspect the item before paying.</li>
            <li>Avoid paying before you see the item.</li>
            <li>Report suspicious ads to SokoHub moderation.</li>
          </ul>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold">Similar listings</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {similar.map((a) => <ListingCard key={a.id} ad={a} />)}
          </div>
        </div>
      )}

      {reporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5">
            <h3 className="font-bold">Report this ad</h3>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-3 w-full rounded border border-slate-300 p-2">
              {["Scam", "Fraud", "Wrong information", "Duplicate listing", "Prohibited item", "Offensive content", "Already sold", "Other"].map((r) => <option key={r}>{r}</option>)}
            </select>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setReporting(false)} className="rounded-lg px-4 py-2 text-sm">Cancel</button>
              <button onClick={submitReport} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white">Submit</button>
            </div>
          </div>
        </div>
      )}
      {reported && <p className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800 px-5 py-2 text-sm text-white md:bottom-6">Thanks — our moderators will review this ad.</p>}

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-14 z-30 flex gap-2 border-t border-slate-200 bg-white p-2 md:hidden">
        <a href={waUrl} target="_blank" rel="noreferrer" className="flex-1 rounded-lg bg-green-600 py-2.5 text-center text-sm font-bold text-white">WhatsApp</a>
        <button onClick={() => setShowPhone(true)} className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-bold">Call</button>
        <Link href={`/messages?ad=${ad.id}`} onClick={() => startConversation(ad.id, seller.id, seller.name, ad.title)} className="flex-1 rounded-lg bg-slate-800 py-2.5 text-center text-sm font-bold text-white">Chat</Link>
      </div>
    </div>
  );
}
