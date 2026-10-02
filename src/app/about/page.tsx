import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PageHero, SectionHeading, CTABand, RelatedLinks } from "@/components/info";

export const metadata: Metadata = {
  title: "About SokoHub | Uganda Classifieds Marketplace",
  description: "SokoHub is Uganda's classifieds marketplace — buy and sell cars, homes, phones, jobs, electronics, services and more.",
  alternates: { canonical: "/about" },
};

const CATEGORIES = [
  ["🚗", "Vehicles"], ["🏠", "Property"], ["📱", "Phones"], ["📺", "Electronics"],
  ["💼", "Jobs"], ["🛠️", "Services"], ["🌾", "Agriculture"], ["👗", "Fashion"], ["🛋️", "Home & Garden"],
];

const STEPS = [
  "Find what you need", "Compare listings", "Contact the seller", "Meet safely", "Complete your transaction",
];

const WHY = [
  ["Easy discovery", "Browse categories or search across thousands of listings in seconds."],
  ["Local listings", "Everything is listed by people near you, so pickup and meetups are easy."],
  ["Direct seller communication", "Message, call or WhatsApp sellers directly — no middlemen."],
  ["Powerful search", "Filter by price, location, condition and category to find the right deal."],
  ["Mobile-friendly marketplace", "Browse, post and chat from any phone, anywhere in Uganda."],
  ["Seller tools", "Manage your ads, track views and respond to buyers from your dashboard."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero badge="About" title="About SokoHub" intro="Buy and sell with confidence." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About SokoHub" }]} />

        <section>
          <SectionHeading>What is SokoHub?</SectionHeading>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            SokoHub is a classifieds marketplace designed to help people discover and sell products, properties,
            vehicles, jobs and services across Uganda. Whether you are upgrading your phone, finding a rental,
            hiring a driver or selling farm produce, SokoHub connects buyers and sellers directly.
          </p>
        </section>

        <section className="mt-10">
          <SectionHeading>What You Can Find</SectionHeading>
          <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-5">
            {CATEGORIES.map(([icon, name]) => (
              <div key={name} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                <p className="text-2xl">{icon}</p>
                <p className="mt-1 text-xs font-semibold text-slate-700">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading>How SokoHub Works</SectionHeading>
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">{i + 1}</span>
                <span className="text-sm font-semibold text-slate-800">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <SectionHeading>Why SokoHub</SectionHeading>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {WHY.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">{t}</h3>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <SectionHeading>Safety First</SectionHeading>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            SokoHub provides tools for buyers and sellers — messaging, notifications and reporting — but users should
            exercise caution when completing transactions. Meet in public places, inspect items before paying and never
            share passwords or verification codes. See our{" "}
            <Link href="/safety" className="font-semibold text-green-700">Safety Tips</Link>.
          </p>
        </section>

        <CTABand title="Ready to buy or sell?" text="Join thousands of Ugandans trading on SokoHub today." primary={{ label: "Browse Listings", href: "/ads" }} secondary={{ label: "Post an Ad", href: "/sell" }} />
        <RelatedLinks links={[{ label: "Help Center", href: "/help" }, { label: "Safety Tips", href: "/safety" }, { label: "Contact Us", href: "/contact" }]} />
      </div>
    </>
  );
}
