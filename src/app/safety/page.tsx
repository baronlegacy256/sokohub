import type { Metadata } from "next";
import { Breadcrumbs, PageHero, SectionHeading, CTABand, RelatedLinks } from "@/components/info";

export const metadata: Metadata = {
  title: "Safety Tips | SokoHub Uganda",
  description: "Stay safe on SokoHub — practical marketplace safety tips for buyers and sellers in Uganda.",
  alternates: { canonical: "/safety" },
};

const SECTIONS: { title: string; items: string[] }[] = [
  { title: "Before Buying", items: ["Research the item and its typical price in your area.", "Ask the seller questions about condition, history and reason for selling.", "Compare prices of similar listings before deciding.", "Check the seller's profile, rating and how long they have been on SokoHub."] },
  { title: "Meeting a Seller", items: ["Meet in a busy, public place such as a mall, fuel station or police post.", "Tell a friend or family member where you are going and when.", "Avoid isolated locations, especially after dark.", "Inspect the item carefully before handing over money."] },
  { title: "Payments", items: ["Avoid sending money before verifying the item.", "Be cautious with urgent payment requests.", "Ignore fake payment confirmations — confirm funds in your own mobile money app.", "Never share your password, PIN or verification codes.", "Avoid clicking suspicious links sent by strangers."] },
];

export default function SafetyPage() {
  return (
    <>
      <PageHero badge="Trust & Safety" title="Stay Safe on SokoHub" intro="Practical safety principles for every transaction on the marketplace." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Safety Tips" }]} />

        <p className="text-sm leading-6 text-slate-600">
          Most transactions on SokoHub go smoothly. A few simple habits will help keep it that way for both buyers
          and sellers.
        </p>

        {SECTIONS.map((s) => (
          <section key={s.title} className="mt-8">
            <SectionHeading>{s.title}</SectionHeading>
            <ul className="mt-3 space-y-2">
              {s.items.map((it) => (
                <li key={it} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  <span className="text-green-600">✓</span>{it}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-10">
          <SectionHeading>Avoid Scams</SectionHeading>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Common marketplace scams include deals that are too good to be true, sellers who insist on sending you an
            item before payment, fake job offers asking for registration fees, and requests to move the conversation to
            unknown links or apps. If something feels off, walk away and report it — there is always another deal.
          </p>
        </section>

        <section className="mt-10">
          <SectionHeading>Report Suspicious Activity</SectionHeading>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            If a listing, seller or message looks suspicious, report it right away. Our moderation team reviews every
            report and takes action on accounts that break our rules.
          </p>
        </section>

        <CTABand title="Spot something wrong?" text="Report the listing or seller and help keep SokoHub safe for everyone." primary={{ label: "Report an Ad", href: "/report" }} secondary={{ label: "Posting Rules", href: "/ad-rules" }} />
        <RelatedLinks links={[{ label: "Report a Problem", href: "/report" }, { label: "Help Center", href: "/help" }, { label: "Contact Support", href: "/contact" }]} />
      </div>
    </>
  );
}
