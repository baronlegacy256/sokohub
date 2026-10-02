import type { Metadata } from "next";
import { Breadcrumbs, PageHero, CTABand, RelatedLinks, LegalToc, LegalSection } from "@/components/info";

export const metadata: Metadata = {
  title: "Terms of Service | SokoHub",
  description: "The terms that govern use of the SokoHub marketplace.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "using", label: "Using SokoHub" },
  { id: "accounts", label: "User Accounts" },
  { id: "listings", label: "Posting Listings" },
  { id: "responsibilities", label: "Buyer and Seller Responsibilities" },
  { id: "prohibited", label: "Prohibited Activities" },
  { id: "payments", label: "Payments and Promotions" },
  { id: "messaging", label: "Messaging Content" },
  { id: "suspension", label: "Account Suspension" },
  { id: "ip", label: "Intellectual Property" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "changes", label: "Changes to the Service" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      <PageHero badge="Legal" title="Terms of Service" intro="The rules for using SokoHub. Last updated: October 2026. This document is provided for clarity and does not constitute legal advice." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Terms of Service" }]} />
        <LegalToc mobile sections={SECTIONS} />
        <div className="grid gap-10 md:grid-cols-[1fr_220px]">
          <div className="space-y-8">
            <LegalSection id="acceptance" title="Acceptance of Terms"><p>By accessing or using SokoHub, you agree to these Terms of Service. If you do not agree, do not use the marketplace.</p></LegalSection>
            <LegalSection id="using" title="Using SokoHub"><p>You may browse listings, post ads, message other users and use related features, subject to these terms and our <a href="/ad-rules" className="text-green-700">Ad Rules</a>.</p></LegalSection>
            <LegalSection id="accounts" title="User Accounts"><p>You are responsible for keeping your account credentials secure and for all activity under your account. Provide accurate registration information.</p></LegalSection>
            <LegalSection id="listings" title="Posting Listings"><p>Listings must be honest, legal and yours to sell. Prohibited items, duplicate listings and spam are not allowed and may be removed.</p></LegalSection>
            <LegalSection id="responsibilities" title="Buyer and Seller Responsibilities"><p>Buyers and sellers are responsible for their own transactions, meetings and payments. SokoHub facilitates introductions but is not a party to the transaction.</p></LegalSection>
            <LegalSection id="prohibited" title="Prohibited Activities"><p>You may not post fraudulent, counterfeit, illegal or offensive content, harass other users, scrape the platform, or attempt to bypass safety or payment features.</p></LegalSection>
            <LegalSection id="payments" title="Payments and Promotions"><p>Paid features such as featured or urgent placement are billed as shown at checkout. Promotion fees are non-refundable once the promotion is live.</p></LegalSection>
            <LegalSection id="messaging" title="Messaging Content"><p>Do not share abusive, fraudulent or misleading messages. Contact details may be shared at your own discretion and risk.</p></LegalSection>
            <LegalSection id="suspension" title="Account Suspension"><p>We may warn, restrict or suspend accounts that violate these terms, receive repeated reports, or engage in fraudulent activity.</p></LegalSection>
            <LegalSection id="ip" title="Intellectual Property"><p>The SokoHub name, logo and platform content are owned by SokoHub Uganda Ltd. Your listings remain yours; you grant us a licence to display them on the platform.</p></LegalSection>
            <LegalSection id="disclaimers" title="Disclaimers"><p>Listings are provided by users. We do not guarantee the accuracy, quality or legality of items, or the identity of users.</p></LegalSection>
            <LegalSection id="liability" title="Limitation of Liability"><p>To the fullest extent permitted by law, SokoHub is not liable for any loss arising from your use of the marketplace or transactions with other users.</p></LegalSection>
            <LegalSection id="changes" title="Changes to the Service"><p>We may update features and these terms from time to time. Material changes will be announced on the platform.</p></LegalSection>
            <LegalSection id="contact" title="Contact"><p>Questions about these terms? Email <a href="mailto:support@sokohub.co.ug" className="text-green-700">support@sokohub.co.ug</a>.</p></LegalSection>
          </div>
          <LegalToc sections={SECTIONS} />
        </div>
        <CTABand title="Have questions?" text="Our support team is here to help you understand how SokoHub works." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Help Center", href: "/help" }} />
        <RelatedLinks links={[{ label: "Privacy Policy", href: "/privacy" }, { label: "Cookie Policy", href: "/cookies" }, { label: "Ad Rules", href: "/ad-rules" }]} />
      </div>
    </>
  );
}
