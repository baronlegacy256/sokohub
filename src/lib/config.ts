// Centralized marketplace configuration.
// Demo values = SokoHub/Uganda, but nothing in application logic should assume them.
// Admins edit these via Admin → Settings (stored in localStorage override).

export interface MarketplaceConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  country: string;
  countryFlag: string;
  language: string;
  currency: string;
  currencySymbol: string;
  currencyPosition: "before" | "after";
  timezone: string;
  phoneCountryCode: string;
  supportEmail: string;
  contactEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  businessAddress: string;
  socials: Record<string, string>;
  locations: string[];
  locationHierarchy: string[];
  seo: { title: string; description: string; keywords: string; ogTitle: string; ogDescription: string };
}

export const defaultConfig: MarketplaceConfig = {
  name: "SokoHub",
  legalName: "SokoHub Uganda Ltd.",
  tagline: "Uganda's trusted classifieds marketplace.",
  description: "Uganda's classifieds marketplace. Cars, property, phones, jobs, electronics and more.",
  country: "Uganda",
  countryFlag: "🇺🇬",
  language: "en",
  currency: "UGX",
  currencySymbol: "UGX",
  currencyPosition: "before",
  timezone: "Africa/Kampala",
  phoneCountryCode: "+256",
  supportEmail: "support@sokohub.co.ug",
  contactEmail: "business@sokohub.co.ug",
  supportPhone: "+256 700 000 000",
  whatsappNumber: "+256700000000",
  businessAddress: "Kampala, Uganda",
  socials: {
    facebook: "https://facebook.com/sokohubug",
    instagram: "https://instagram.com/sokohubug",
    x: "https://x.com/sokohubug",
    youtube: "https://youtube.com/@sokohubug",
    tiktok: "https://tiktok.com/@sokohubug",
  },
  locations: ["Kampala", "Wakiso", "Mukono", "Entebbe", "Jinja", "Mbarara", "Mbale", "Gulu", "Fort Portal", "Masaka", "Arua", "Lira", "Hoima", "Soroti"],
  locationHierarchy: ["Country", "Region", "District", "City", "Area"],
  seo: {
    title: "SokoHub — Buy & Sell Anything in Uganda",
    description: "Uganda's classifieds marketplace. Cars, property, phones, jobs, electronics and more.",
    keywords: "Uganda classifieds, buy sell Uganda, Kampala marketplace",
    ogTitle: "SokoHub — Buy & Sell Anything in Uganda",
    ogDescription: "Uganda's classifieds marketplace.",
  },
};

let runtime: MarketplaceConfig | null = null;

export function getMarketplace(): MarketplaceConfig {
  if (runtime) return runtime;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("sokohub_marketplace");
      if (raw) {
        runtime = { ...defaultConfig, ...JSON.parse(raw) };
        return runtime!;
      }
    } catch {}
  }
  return defaultConfig;
}

export function updateMarketplace(patch: Partial<MarketplaceConfig>) {
  const current = getMarketplace();
  runtime = { ...current, ...patch };
  if (typeof window !== "undefined") {
    try { localStorage.setItem("sokohub_marketplace", JSON.stringify(runtime)); } catch {}
  }
}

export function formatPrice(n: number): string {
  const c = getMarketplace();
  const formatted = Math.round(n).toLocaleString("en-US");
  return c.currencyPosition === "before" ? `${c.currencySymbol} ${formatted}` : `${formatted} ${c.currencySymbol}`;
}

export function phoneLink(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

export function whatsappLink(phone: string, text?: string): string {
  let clean = phone.replace(/[^\d]/g, "");
  const cc = getMarketplace().phoneCountryCode.replace(/[^\d]/g, "");
  if (clean.startsWith("0")) clean = cc + clean.slice(1);
  else if (!clean.startsWith(cc) && clean.length <= 10) clean = cc + clean;
  return `https://wa.me/${clean}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
