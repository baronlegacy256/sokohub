"use client";

import { useState } from "react";
import { getMarketplace } from "@/lib/config";

const PREF_GROUPS = [
  { title: "Listing updates", desc: "Approvals, rejections, expirations" },
  { title: "Messages", desc: "New messages from buyers" },
  { title: "Payments", desc: "Receipts and failed payments" },
  { title: "Promotions", desc: "Promotion expiry and results" },
  { title: "Account", desc: "Security alerts and sign-ins" },
];

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<Record<string, Record<string, boolean>>>(() =>
    Object.fromEntries(PREF_GROUPS.map((g) => [g.title, { Email: true, SMS: false, Push: true }]))
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Settings</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Account</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm"><span className="text-xs font-semibold text-slate-500">Email</span><input defaultValue="seller@sokohub.ug" className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
          <label className="text-sm"><span className="text-xs font-semibold text-slate-500">Phone</span><input placeholder={`${getMarketplace().phoneCountryCode}…`} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Security</h2>
        <div className="mt-3 space-y-2 text-sm">
          <button className="block text-green-700">Change password</button>
          <button className="block text-slate-600">View active sessions</button>
          <button className="block text-red-600">Log out from all devices</button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Notification preferences</h2>
        <table className="mt-3 w-full text-sm">
          <thead><tr><th className="pb-2 text-left text-xs text-slate-400">Type</th>{["Email", "SMS", "Push"].map((c) => <th key={c} className="text-xs text-slate-400">{c}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-50">
            {PREF_GROUPS.map((g) => (
              <tr key={g.title}>
                <td className="py-2">{g.title}<br /><span className="text-xs text-slate-400">{g.desc}</span></td>
                {["Email", "SMS", "Push"].map((c) => (
                  <td key={c} className="text-center">
                    <input type="checkbox" checked={prefs[g.title][c]} onChange={(e) => setPrefs({ ...prefs, [g.title]: { ...prefs[g.title], [c]: e.target.checked } })} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="font-bold text-red-800">Danger zone</h2>
        <p className="mt-1 text-sm text-red-700">Deleting your account removes your listings, messages and history. This cannot be undone.</p>
        <button onClick={() => setConfirmDelete(true)} className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700">Delete Account</button>
      </section>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5">
            <h3 className="font-bold">Delete your account?</h3>
            <p className="mt-1 text-sm text-slate-500">Your ads, conversations and data will be permanently removed.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setConfirmDelete(false)} className="rounded-lg px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => setConfirmDelete(false)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white">Delete forever</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
