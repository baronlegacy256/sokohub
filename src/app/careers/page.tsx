import type { Metadata } from "next";
import { Breadcrumbs, PageHero, SectionHeading, CTABand, RelatedLinks } from "@/components/info";

export const metadata: Metadata = {
  title: "Careers | Work with SokoHub",
  description: "Help build the marketplace people use every day. See open positions at SokoHub Uganda.",
  alternates: { canonical: "/careers" },
};

// Database-ready structure: populate from your CMS / admin content when positions open.
const openPositions: { title: string; location: string; type: string; description: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <PageHero badge="Careers" title="Work with SokoHub" intro="Help build the marketplace people use every day." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />

        <section>
          <SectionHeading>Our Mission</SectionHeading>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            SokoHub exists to make buying and selling in Uganda simple, local and direct. We connect people to the
            cars they drive, the homes they live in, the phones they love, the jobs they need and the services they use
            every day.
          </p>
        </section>

        <section className="mt-10">
          <SectionHeading>Why Work With Us</SectionHeading>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["Local impact", "Your work helps real people trade in their own communities."],
              ["Growth", "We are building fast across Uganda's major towns and cities."],
              ["Ownership", "Small team, real responsibility, visible results."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">{t}</h3>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeading>Open Positions</SectionHeading>
          {openPositions.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="font-semibold text-slate-800">No open positions right now</p>
              <p className="mt-1 text-sm text-slate-500">Check back later for new opportunities.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {openPositions.map((p) => (
                <li key={p.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-sm text-slate-500">{p.location} · {p.type}</p>
                  <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <CTABand title="Want to buy or sell instead?" text="SokoHub is for everyone — explore thousands of listings across Uganda." primary={{ label: "Browse Listings", href: "/ads" }} secondary={{ label: "Post an Ad", href: "/sell" }} />
        <RelatedLinks links={[{ label: "About SokoHub", href: "/about" }, { label: "Contact Us", href: "/contact" }, { label: "Help Center", href: "/help" }]} />
      </div>
    </>
  );
}
