"use client";

import { useState } from "react";
import { Breadcrumbs, PageHero, RelatedLinks } from "@/components/info";
import { useApp } from "@/context/AppContext";

const TYPES = [
  ["listing", "A listing"],
  ["seller", "A seller"],
  ["message", "A message"],
  ["technical", "A technical problem"],
] as const;

const REASONS = ["Scam", "Fraud", "Prohibited item", "Fake listing", "Duplicate listing", "Offensive content", "Incorrect information", "Already sold", "Other"];

export default function ReportPage() {
  const { addProblemReport, user } = useApp();
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [type, setType] = useState<(typeof TYPES)[number][0]>("listing");
  const [listingId, setListingId] = useState("");
  const [seller, setSeller] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [description, setDescription] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      setTimeout(() => {
        addProblemReport({ type, listingId: listingId || undefined, seller: seller || undefined, reason, description, reporter: user?.name || "Guest" });
        setState("sent");
      }, 600);
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <PageHero badge="Support" title="Report a Problem" intro="Tell us what is wrong and our moderation team will review it." />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Report a Problem" }]} />

        {state === "sent" ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <p className="text-lg font-bold text-green-800">✓ Report submitted</p>
            <p className="mt-1 text-sm text-green-700">Thank you. Our team will review your report and take action where needed.</p>
            <button onClick={() => setState("idle")} className="mt-4 text-sm font-semibold text-green-800 underline">Submit another report</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
            <label className="block text-sm">
              <span className="font-semibold">Report Type</span>
              <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5">
                {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            {type === "listing" && (
              <label className="block text-sm">
                <span className="font-semibold">Listing ID (if applicable)</span>
                <input value={listingId} onChange={(e) => setListingId(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" placeholder="e.g. ad_1234 or listing URL" />
              </label>
            )}
            {type === "seller" && (
              <label className="block text-sm">
                <span className="font-semibold">Seller</span>
                <input value={seller} onChange={(e) => setSeller(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" placeholder="Seller name or username" />
              </label>
            )}
            <label className="block text-sm">
              <span className="font-semibold">Reason</span>
              <select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5">
                {REASONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Description</span>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5" placeholder="Describe what happened…" />
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Attachments (optional)</span>
              <input type="file" className="mt-1 block w-full text-sm text-slate-500" />
            </label>
            {state === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
            <button disabled={state === "loading"} className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
              {state === "loading" ? "Submitting…" : "Submit Report"}
            </button>
          </form>
        )}

        <RelatedLinks links={[{ label: "Safety Tips", href: "/safety" }, { label: "Help Center", href: "/help" }, { label: "Contact Support", href: "/contact" }]} />
      </div>
    </>
  );
}
