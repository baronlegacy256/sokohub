import { getMarketplace } from "./config";

// Convenience view over the centralized marketplace configuration.
// Callers get live values; admin edits flow through getMarketplace().
export const site = {
  get name() { return getMarketplace().name; },
  get legalName() { return getMarketplace().legalName; },
  get tagline() { return getMarketplace().tagline; },
  get description() { return getMarketplace().description; },
  get country() { return getMarketplace().country; },
  get currency() { return getMarketplace().currency; },
  get url() { return "https://sokohub.co.ug"; },
  get email() { return { support: getMarketplace().supportEmail, business: getMarketplace().contactEmail }; },
  get phone() { return getMarketplace().supportPhone; },
  get socials() { return getMarketplace().socials; },
};

export const footerMarketplace = [
  { label: "Browse All Ads", href: "/ads" },
  { label: "Vehicles", href: "/ads/vehicles" },
  { label: "Property", href: "/ads/property" },
  { label: "Phones & Tablets", href: "/ads/phones" },
  { label: "Electronics", href: "/ads/electronics" },
  { label: "Jobs", href: "/ads/jobs" },
  { label: "Services", href: "/ads/services" },
  { label: "Post an Ad", href: "/sell" },
  { label: "Saved Ads", href: "/favorites" },
];

export const footerCompany = [
  { label: "About SokoHub", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const footerSupport = [
  { label: "Help Center", href: "/help" },
  { label: "Safety Tips", href: "/safety" },
  { label: "Report a Problem", href: "/report" },
  { label: "Posting Rules", href: "/ad-rules" },
];

export const footerLegal = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Ad Rules", href: "/ad-rules" },
];
