"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Breadcrumbs, PageHero, RelatedLinks } from "@/components/info";
import { faqs, helpCategories } from "@/lib/help";

export default function HelpPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const results = useMemo(() => {
    return faqs.filter((f) => {
      if (cat && f.category !== cat) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s) || f.category.toLowerCase().includes(s);
    });
  }, [q, cat]);

  return (
    <>
      <PageHero badge="Support" title="How can we help?" intro="Search our help center or browse by category." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Help Center" }]} />

        <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-3">
          <Search size={18} className="text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the Help Center..." className="w-full bg-transparent text-sm outline-none" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setCat(null)} className={`rounded-full px-4 py-1.5 text-sm ${!cat ? "bg-green-600 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>All</button>
          {helpCategories.map((c) => (
            <button key={c} onClick={() => setCat(cat === c ? null : c)} className={`rounded-full px-4 py-1.5 text-sm ${cat === c ? "bg-green-600 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {results.length === 0 && <p className="p-6 text-center text-sm text-slate-500">No articles match your search. Try a different keyword.</p>}
          {results.map((f, i) => (
            <button key={i} onClick={() => setOpen(open === i ? null : i)} className="block w-full p-4 text-left">
              <span className="text-xs font-semibold uppercase tracking-wide text-green-700">{f.category}</span>
              <p className="font-semibold text-slate-800">{f.q}</p>
              {open === i && <p className="mt-2 text-sm text-slate-600">{f.a}</p>}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center">
          <h2 className="font-bold">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="mt-1 text-sm text-slate-500">Our support team is happy to help.</p>
          <Link href="/contact" className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white">Contact Support</Link>
        </div>

        <RelatedLinks links={[{ label: "Safety Tips", href: "/safety" }, { label: "Posting Rules", href: "/ad-rules" }, { label: "Contact Support", href: "/contact" }]} />
      </div>
    </>
  );
}
