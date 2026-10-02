"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getMarketplace } from "@/lib/config";

export default function ProfilePage() {
  const { user } = useApp();
  const checks = [
    { label: "Name", done: !!user?.name },
    { label: "Email", done: !!user?.email },
    { label: "Phone", done: !!user?.phone },
    { label: "Location", done: !!user?.location },
    { label: "Profile photo", done: false },
  ];
  const pct = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Profile</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Profile completion — {pct}%</h2>
        <div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-green-500" style={{ width: `${pct}%` }} /></div>
        <ul className="mt-3 grid grid-cols-2 gap-1 text-sm">
          {checks.map((c) => <li key={c.label}>{c.done ? "✓" : "○"} {c.label}</li>)}
        </ul>
        {pct < 100 && <button className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">Complete Profile</button>}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Public information</h2>
        <form className="mt-3 grid gap-3 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {[
            ["Full name", user?.name ?? ""], ["Phone", user?.phone ?? ""], ["WhatsApp", ""],
            ["Email", user?.email ?? ""], ["Location", user?.location ?? getMarketplace().locations[0] ?? ""], ["Bio", ""],
          ].map(([l, v]) => (
            <label key={l} className="text-sm">
              <span className="text-xs font-semibold text-slate-500">{l}</span>
              <input defaultValue={v} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" />
            </label>
          ))}
          <button className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white md:col-span-2 md:w-fit">Save changes</button>
        </form>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Verification</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>✓ Phone verification</li>
          <li>○ Email verification</li>
          <li>○ Identity verification — <button className="text-green-700">start</button></li>
          <li>○ Business verification — <button className="text-green-700">start</button></li>
        </ul>
      </div>

      <Link href={user ? "/seller/katomotors" : "/login"} className="inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm">View Public Profile →</Link>
    </div>
  );
}
