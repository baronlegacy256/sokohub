import type { Metadata } from "next";
import { Breadcrumbs, PageHero, CTABand, RelatedLinks, LegalToc, LegalSection } from "@/components/info";

export const metadata: Metadata = {
  title: "Privacy Policy | SokoHub",
  description: "How SokoHub collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  { id: "collect", label: "Information We Collect" },
  { id: "use", label: "How We Use Information" },
  { id: "account", label: "Account Information" },
  { id: "listings", label: "Listing Information" },
  { id: "messages", label: "Messages" },
  { id: "location", label: "Location Information" },
  { id: "cookies", label: "Cookies" },
  { id: "analytics", label: "Analytics" },
  { id: "payments", label: "Payments" },
  { id: "sharing", label: "Data Sharing" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your Rights" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero badge="Legal" title="Privacy Policy" intro="How we collect, use and protect your information. Last updated: October 2026." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Privacy Policy" }]} />
        <LegalToc mobile sections={SECTIONS} />
        <div className="grid gap-10 md:grid-cols-[1fr_220px]">
          <div className="space-y-8">
            <LegalSection id="collect" title="Information We Collect"><p>We collect information you provide directly (account details, listings, messages), information generated as you use the platform (views, favourites, searches), and limited technical data (device, browser, IP address).</p></LegalSection>
            <LegalSection id="use" title="How We Use Information"><p>We use your information to operate the marketplace, deliver listings, prevent fraud, improve search, and communicate with you about your account and ads.</p></LegalSection>
            <LegalSection id="account" title="Account Information"><p>Your name, email, phone number and location help other users identify you and help us keep accounts secure.</p></LegalSection>
            <LegalSection id="listings" title="Listing Information"><p>Listing details, photos, prices and attributes you publish are visible to other users.</p></LegalSection>
            <LegalSection id="messages" title="Messages"><p>Messages between buyers and sellers are stored so both parties can access the conversation and so we can review reports of abuse.</p></LegalSection>
            <LegalSection id="location" title="Location Information"><p>Listing locations and approximate area data help buyers find items near them. We do not track precise movement.</p></LegalSection>
            <LegalSection id="cookies" title="Cookies"><p>We use essential cookies for sign-in and preferences, and analytics cookies to understand how the site is used. See our <a href="/cookies" className="text-green-700">Cookie Policy</a>.</p></LegalSection>
            <LegalSection id="analytics" title="Analytics"><p>We measure page views, searches and feature usage to improve the product. Analytics data is aggregated.</p></LegalSection>
            <LegalSection id="payments" title="Payments"><p>Paid promotions are processed through our payment partners. We store transaction references, not full payment credentials.</p></LegalSection>
            <LegalSection id="sharing" title="Data Sharing"><p>We do not sell personal data. We share data only with service providers that help us operate the platform, and when required by law.</p></LegalSection>
            <LegalSection id="retention" title="Data Retention"><p>We keep account data while your account is active and for a reasonable period afterwards to resolve disputes and comply with the law.</p></LegalSection>
            <LegalSection id="security" title="Security"><p>We apply reasonable technical and organisational measures to protect your data, but no online service can guarantee absolute security.</p></LegalSection>
            <LegalSection id="rights" title="Your Rights"><p>You can request a copy of your data, correct inaccurate information, or ask us to delete your account by contacting support.</p></LegalSection>
            <LegalSection id="children" title="Children"><p>SokoHub is not intended for users under 18. If you believe a child has created an account, contact us so we can remove it.</p></LegalSection>
            <LegalSection id="changes" title="Changes to This Policy"><p>We may update this policy and will post the new version on this page with an updated date.</p></LegalSection>
            <LegalSection id="contact" title="Contact"><p>Privacy questions? Email <a href="mailto:support@sokohub.co.ug" className="text-green-700">support@sokohub.co.ug</a>.</p></LegalSection>
          </div>
          <LegalToc sections={SECTIONS} />
        </div>
        <CTABand title="Questions about your data?" text="We are happy to explain how SokoHub handles your information." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Help Center", href: "/help" }} />
        <RelatedLinks links={[{ label: "Terms of Service", href: "/terms" }, { label: "Cookie Policy", href: "/cookies" }, { label: "Ad Rules", href: "/ad-rules" }]} />
      </div>
    </>
  );
}
