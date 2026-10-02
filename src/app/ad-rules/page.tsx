import type { Metadata } from "next";
import { Breadcrumbs, PageHero, CTABand, RelatedLinks, LegalToc, LegalSection } from "@/components/info";

export const metadata: Metadata = {
  title: "Ad Rules | SokoHub",
  description: "What you can and cannot post on SokoHub — allowed listings, prohibited items, images and consequences of violations.",
  alternates: { canonical: "/ad-rules" },
};

const SECTIONS = [
  { id: "allowed", label: "Allowed listings" },
  { id: "prohibited", label: "Prohibited listings" },
  { id: "quality", label: "Listing quality" },
  { id: "consequences", label: "What happens if my ad violates the rules?" },
];

export default function AdRulesPage() {
  return (
    <>
      <PageHero badge="Legal" title="Posting Rules" intro="Clear rules that keep SokoHub useful and trustworthy for buyers and sellers." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ad Rules" }]} />
        <LegalToc mobile sections={SECTIONS} />
        <div className="grid gap-10 md:grid-cols-[1fr_220px]">
          <div className="space-y-8">
            <LegalSection id="allowed" title="Allowed listings">
              <p>You may list items you own or are authorised to sell, including vehicles, property, phones, electronics, jobs, services, agriculture produce, fashion, home & garden and general items — provided they are legal in Uganda.</p>
            </LegalSection>
            <LegalSection id="prohibited" title="Prohibited listings">
              <ul className="list-disc space-y-1 pl-5">
                <li>Fraud or misleading offers</li>
                <li>Counterfeit goods or trademark violations</li>
                <li>Illegal goods or stolen property</li>
                <li>Weapons, drugs and restricted items</li>
                <li>Spam or duplicate listings</li>
              </ul>
            </LegalSection>
            <LegalSection id="quality" title="Listing quality">
              <p><strong>Accurate descriptions:</strong> describe the item honestly, including condition and defects.</p>
              <p><strong>Correct pricing:</strong> state the real price and whether it is negotiable.</p>
              <p><strong>Images:</strong> use clear, original photos of the actual item.</p>
              <p><strong>No duplicate listings:</strong> post each item once.</p>
              <p><strong>No spam:</strong> do not flood categories with unrelated or mass-posted ads.</p>
            </LegalSection>
            <LegalSection id="consequences" title="What happens if my ad violates the rules?">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Warning</strong> — first-time minor issues get a notice explaining the problem.</li>
                <li><strong>Rejection</strong> — ads that break the rules are not published.</li>
                <li><strong>Removal</strong> — published ads that violate rules are taken down.</li>
                <li><strong>Account restrictions</strong> — repeated or serious violations can limit or suspend your account.</li>
              </ul>
            </LegalSection>
          </div>
          <LegalToc sections={SECTIONS} />
        </div>
        <CTABand title="Ready to sell?" text="Post your first ad for free and reach buyers across Uganda." primary={{ label: "Post an Ad", href: "/sell" }} secondary={{ label: "Help Center", href: "/help" }} />
        <RelatedLinks links={[{ label: "Safety Tips", href: "/safety" }, { label: "Help Center", href: "/help" }, { label: "Report a Problem", href: "/report" }]} />
      </div>
    </>
  );
}
