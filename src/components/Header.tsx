"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MessageSquare, User, Heart, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { locations } from "@/lib/catalog";
import { getMarketplace } from "@/lib/config";

export default function Header() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const router = useRouter();
  const { user, conversations, notifications } = useApp();
  const unread = conversations.reduce((n, c) => n + c.unread, 0) + notifications.filter((n) => !n.read).length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (loc) params.set("location", loc);
    router.push(`/ads?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-green-700">
          Soko<span className="text-slate-800">Hub</span>
        </Link>
        <form onSubmit={submit} className="hidden flex-1 items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 p-1 md:flex">
          <Search size={16} className="ml-2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="What are you looking for?" className="w-full bg-transparent px-2 py-1.5 text-sm outline-none" />
          <select value={loc} onChange={(e) => setLoc(e.target.value)} className="border-l border-slate-200 bg-transparent px-2 py-1.5 text-sm outline-none">
            <option value="">{getMarketplace().country}</option>
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
          <button className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-semibold text-white">Search</button>
        </form>
        <nav className="ml-auto flex items-center gap-3 text-slate-700">
          <Link href="/ads" className="hidden text-sm md:block">Browse</Link>
          <Link href="/messages" className="relative" aria-label="Messages"><MessageSquare size={20} />{unread > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-[10px] text-white">{unread}</span>}</Link>
          <Link href="/favorites" aria-label="Favorites"><Heart size={20} /></Link>
          <Link href="/dashboard" aria-label="Notifications" className="hidden md:block"><Bell size={20} /></Link>
          <Link href="/sell" className="hidden rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white md:block">POST FREE AD</Link>
          {user ? (
            <button onClick={() => router.push("/dashboard/profile")} className="flex items-center gap-1 text-sm"><User size={18} />{user.name}</button>
          ) : (
            <Link href="/login" className="text-sm">Login</Link>
          )}
        </nav>
      </div>
      <form onSubmit={submit} className="flex items-center gap-1 border-t border-slate-100 p-2 md:hidden">
        <Search size={16} className="ml-2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search on SokoHub" className="w-full bg-transparent px-2 py-1 text-sm outline-none" />
        <button className="text-sm font-semibold text-green-700">Search</button>
      </form>
    </header>
  );
}
