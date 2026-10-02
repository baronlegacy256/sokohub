import type { Metadata } from "next";
import { Breadcrumbs, PageHero, CTABand, RelatedLinks, LegalToc, LegalSection } from "@/components/info";

export const metadata: Metadata = {
  title: "Cookie Policy | SokoHub",
  description: "How SokoHub uses cookies and how you can control them.",
  alternates: { canonical: "/cookies" },
};

const SECTIONS = [
  { id: "what", label: "What are cookies?" },
  { id: "essential", label: "Essential cookies" },
  { id: "auth", label: "Authentication cookies" },
  { id: "preferences", label: "Preferences" },
  { id: "analytics", label: "Analytics" },
  { id: "advertising", label: "Advertising & promotions" },
  { id: "control", label: "How to control cookies" },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero badge="Legal" title="Cookie Policy" intro="A short guide to the cookies SokoHub uses. Last updated: October 2026." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Cookie Policy" }]} />
        <LegalToc mobile sections={SECTIONS} />
        <div className="grid gap-10 md:grid-cols-[1fr_220px]">
          <div className="space-y-8">
            <LegalSection id="what" title="What are cookies?"><p>Cookies are small text files stored on your device that help websites remember you and work properly.</p></LegalSection>
            <LegalSection id="essential" title="Essential cookies"><p>These are required for the site to function — security, load balancing and basic navigation. They cannot be switched off.</p></LegalSection>
            <LegalSection id="auth" title="Authentication cookies"><p>These keep you signed in as you move between pages. Signing out clears them.</p></LegalSection>
            <LegalSection id="preferences" title="Preferences"><p>These remember choices such as your location filter, currency and display preferences.</p></LegalSection>
            <LegalSection id="analytics" title="Analytics"><p>These help us understand which pages and features are popular so we can improve SokoHub. Data is aggregated and not used to identify you personally.</p></LegalSection>
            <LegalSection id="advertising" title="Advertising & promotional cookies"><p>If you engage with promoted listings, these cookies may be used to measure campaign performance. We do not sell cookie data to third parties.</p></LegalSection>
            <LegalSection id="control" title="How to control cookies"><p>You can block or delete cookies in your browser settings. Note that essential cookies are required for sign-in and some features to work. You can also clear site data at any time from your browser.</p></LegalSection>
          </div>
          <LegalToc sections={SECTIONS} />
        </div>
        <CTABand title="Need help?" text="If a cookie setting is causing trouble, contact our support team." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Privacy Policy", href: "/privacy" }} />
        <RelatedLinks links={[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Ad Rules", href: "/ad-rules" }]} />
      </div>
    </>
  );
}
