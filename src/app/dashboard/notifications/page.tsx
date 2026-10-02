"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

const CATS = ["All", "Listings", "Messages", "Payments", "Promotions", "Account"];

export default function NotificationsPage() {
  const { notifications, markAllRead } = useApp();
  const [cat, setCat] = useState("All");
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        <button onClick={markAllRead} className="text-sm text-green-700">Mark all as read</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1 text-xs font-semibold ${cat === c ? "bg-slate-800 text-white" : "border border-slate-200 bg-white"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {notifications.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">You&apos;re all caught up.</p>
        )}
        {notifications.map((n) => (
          <div key={n.id} className={`rounded-xl border p-4 ${n.read ? "border-slate-200 bg-white" : "border-green-200 bg-green-50"}`}>
            <p className="text-sm">{n.text}</p>
            <p className="mt-1 text-xs text-slate-400">{new Date(n.at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
