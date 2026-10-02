"use client";

import { useState } from "react";
import { Breadcrumbs, PageHero, CTABand, RelatedLinks } from "@/components/info";
import { useApp } from "@/context/AppContext";
import { site } from "@/lib/site";

export default function ContactPage() {
  const { addContactMessage } = useApp();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      setTimeout(() => {
        addContactMessage(form);
        setState("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 700);
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <PageHero badge="Contact" title="Contact SokoHub" intro="Have a question or need help? We're here to help." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Contact information</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
              <p className="font-bold">Customer Support</p>
              <a href={`mailto:${site.email.support}`} className="text-green-700">{site.email.support}</a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
              <p className="font-bold">Business inquiries</p>
              <a href={`mailto:${site.email.business}`} className="text-green-700">{site.email.business}</a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
              <p className="font-bold">Phone</p>
              <p className="text-slate-600">{site.phone}</p>
              <p className="mt-1 text-xs text-slate-400">Mon–Sat, 8:00–18:00 EAT</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Send us a message</h2>
            {state === "success" ? (
              <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                ✓ Thanks — your message has been received. Our team will get back to you within 24 hours.
                <button onClick={() => setState("idle")} className="mt-3 block text-xs font-semibold underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-3">
                <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
                <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
                <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
                <textarea required rows={5} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
                {state === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
                <button disabled={state === "loading"} className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                  {state === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
        <CTABand title="Looking for answers first?" text="Browse our help articles before contacting support." primary={{ label: "Visit Help Center", href: "/help" }} secondary={{ label: "Safety Tips", href: "/safety" }} />
        <RelatedLinks links={[{ label: "About SokoHub", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Report a Problem", href: "/report" }]} />
      </div>
    </>
  );
}
