"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const actions = [
  { label: "Review Pending Ads", href: "/admin/ads?status=pending" },
  { label: "View Reports", href: "/admin/reports" },
  { label: "Add Category", href: "/admin/categories" },
  { label: "Create Promotion", href: "/admin/promotions/packages" },
  { label: "Open Settings", href: "/admin/settings" },
  { label: "Support Tickets", href: "/admin/support" },
];

export default function AdminHeader() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(true); }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <form onSubmit={(e) => { e.preventDefault(); if (q) router.push(`/admin/ads?q=${encodeURIComponent(q)}`); }} className="flex-1">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users, listings, transactions… (Ctrl+K for commands)" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
      </form>
      <Link href="/admin/notifications" aria-label="Notifications" className="relative text-slate-600">🔔<span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-[10px] text-white">6</span></Link>
      <Link href="/dashboard/messages" aria-label="Messages" className="text-slate-600">✉️</Link>
      <Link href="/admin/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">A</Link>

      {paletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-24" onClick={() => setPaletteOpen(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-3 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <input autoFocus value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Type a command…" className="w-full rounded-lg border border-slate-200 p-2.5 text-sm" />
            <ul className="mt-2">
              {actions.filter((a) => a.label.toLowerCase().includes(filter.toLowerCase())).map((a) => (
                <li key={a.href}>
                  <button onClick={() => { setPaletteOpen(false); router.push(a.href); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">{a.label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
