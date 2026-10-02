"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getMarketplace, updateMarketplace } from "@/lib/config";

const TABS = ["General", "Marketplace", "Listings", "Payments", "Security", "Moderation"] as const;

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("General");
  const { gateways, setGatewayEnabled } = useApp();
  const [config, setConfig] = useState(getMarketplace());
  const setC = (patch: Partial<typeof config>) => setConfig({ ...config, ...patch });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Settings</h1>
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-xs font-semibold ${tab === t ? "bg-slate-800 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{t}</button>
        ))}
      </div>
      <form className="rounded-xl border border-slate-200 bg-white p-5" onSubmit={(e) => { e.preventDefault(); updateMarketplace(config); }}>
        {tab === "General" && (
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">Marketplace name<input value={config.name} onChange={(e) => setC({ name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Country<input value={config.country} onChange={(e) => setC({ country: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Default currency<input value={config.currency} onChange={(e) => setC({ currency: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Currency symbol<input value={config.currencySymbol} onChange={(e) => setC({ currencySymbol: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Currency position<select value={config.currencyPosition} onChange={(e) => setC({ currencyPosition: e.target.value as "before" | "after" })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"><option value="before">Before amount (UGX 1,000)</option><option value="after">After amount (1,000 UGX)</option></select></label>
            <label className="text-sm">Timezone<input value={config.timezone} onChange={(e) => setC({ timezone: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Phone country code<input value={config.phoneCountryCode} onChange={(e) => setC({ phoneCountryCode: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Support email<input value={config.supportEmail} onChange={(e) => setC({ supportEmail: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Support phone<input value={config.supportPhone} onChange={(e) => setC({ supportPhone: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label className="text-sm">Business address<input value={config.businessAddress} onChange={(e) => setC({ businessAddress: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
          </div>
        )}
        {tab === "Marketplace" && (
          <div className="space-y-2 text-sm">
            <label className="flex justify-between">Allow guest browsing <input type="checkbox" defaultChecked /></label>
            <label className="flex justify-between">Enable messaging <input type="checkbox" defaultChecked /></label>
            <label className="flex justify-between">Enable WhatsApp contact <input type="checkbox" defaultChecked /></label>
            <label className="flex justify-between">Enable phone contact <input type="checkbox" defaultChecked /></label>
            <label className="flex justify-between">Allow user reviews <input type="checkbox" defaultChecked /></label>
          </div>
        )}
        {tab === "Listings" && (
          <div className="grid gap-3 md:grid-cols-2 text-sm">
            <label>Ad expiration (days)<input type="number" defaultValue={30} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label>Max images per ad<input type="number" defaultValue={8} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
            <label>Max image size (MB)<input type="number" defaultValue={5} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
          </div>
        )}
        {tab === "Payments" && (
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Payment gateways</p>
            {gateways.map((g) => (
              <label key={g.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-2.5">
                <span>
                  <span className="font-semibold">{g.name}</span>
                  <span className="block text-xs text-slate-400">{g.type} · {g.note}</span>
                </span>
                <input type="checkbox" checked={g.enabled} onChange={(e) => setGatewayEnabled(g.id, e.target.checked)} />
              </label>
            ))}
            <p className="text-xs text-slate-400">Enabled gateways appear at checkout when sellers promote their ads.</p>
          </div>
        )}
        {tab === "Security" && (
          <div className="space-y-2 text-sm">
            <label className="flex justify-between">Require 2FA for admins <input type="checkbox" /></label>
            <label className="flex justify-between">Force HTTPS <input type="checkbox" defaultChecked /></label>
            <label>Session timeout (minutes)<input type="number" defaultValue={60} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" /></label>
          </div>
        )}
        {tab === "Moderation" && (
          <div className="space-y-2 text-sm">
            <label className="flex justify-between">Require review before publishing <input type="checkbox" defaultChecked /></label>
            <label className="flex justify-between">Auto-reject prohibited items <input type="checkbox" /></label>
            <label className="flex justify-between">Notify moderators of new reports <input type="checkbox" defaultChecked /></label>
          </div>
        )}
        <button className="mt-4 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white">Save</button>
      </form>
    </div>
  );
}
