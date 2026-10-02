"use client";

import { useState } from "react";

const FAQS = [
  ["How do I post an ad?", "Go to Post an Ad, choose a category, fill in the details, add photos and publish. Ads go live after review."],
  ["How long does review take?", "Most ads are reviewed within a few hours. You will be notified once approved or rejected."],
  ["How do I promote my listing?", "Open Promotions in your dashboard and choose Featured, Top, Urgent or Homepage placement."],
  ["Why was my ad rejected?", "Check the rejection reason in your notifications. Common reasons are unclear photos, prohibited items, or incomplete details."],
  ["How do buyers contact me?", "Buyers can chat with you, call, or message you on WhatsApp — whichever you allow on your listing."],
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Help & Support</h1>
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Frequently Asked Questions</h2>
        <div className="mt-3 divide-y divide-slate-100">
          {FAQS.map(([q, a], i) => (
            <button key={i} onClick={() => setOpen(open === i ? null : i)} className="block w-full py-2.5 text-left text-sm">
              <span className="font-semibold">{q}</span>
              {open === i && <p className="mt-1 text-slate-500">{a}</p>}
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">Contact Support</h2>
        {sent ? (
          <p className="mt-3 text-sm text-green-700">✓ Ticket submitted. Our team will respond within 24 hours.</p>
        ) : (
          <form className="mt-3 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required placeholder="Subject" className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
            <select className="w-full rounded-lg border border-slate-300 p-2.5 text-sm">
              {["Listing issue", "Payment", "Account", "Safety", "Other"].map((c) => <option key={c}>{c}</option>)}
            </select>
            <textarea required rows={4} placeholder="Describe your issue…" className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
            <button className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white">Submit ticket</button>
          </form>
        )}
      </section>
      <div className="flex gap-2 text-sm">
        <a href="/dashboard/help" className="rounded-full border border-slate-200 bg-white px-4 py-1.5">Safety Tips</a>
        <a href="/dashboard/help" className="rounded-full border border-slate-200 bg-white px-4 py-1.5">Posting Guidelines</a>
        <a href="/dashboard/help" className="rounded-full border border-slate-200 bg-white px-4 py-1.5">Report a Problem</a>
      </div>
    </div>
  );
}
