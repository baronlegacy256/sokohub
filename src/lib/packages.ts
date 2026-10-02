export interface PromotionPackage {
  id: string;
  name: string;
  desc: string;
  price: number;
  days: number;
  placement: string;
  flag: "featured" | "top" | "urgent" | "homepage";
  active: boolean;
}

// Packages shown to users when promoting an ad (mirrors admin packages).
export const promotionPackages: PromotionPackage[] = [
  { id: "featured", name: "Featured Ad", desc: "Your listing appears in premium marketplace positions and the homepage featured row.", price: 10000, days: 7, placement: "Listing feeds + Homepage", flag: "featured", active: true },
  { id: "top", name: "Top Listing", desc: "Your ad is placed at the top of category search results.", price: 5000, days: 3, placement: "Category results", flag: "top", active: true },
  { id: "urgent", name: "Urgent Badge", desc: "Mark your ad as Urgent to attract faster responses from buyers.", price: 3000, days: 3, placement: "All listings", flag: "urgent", active: true },
  { id: "homepage", name: "Homepage Spotlight", desc: "Your listing gets prominent placement on the SokoHub homepage.", price: 20000, days: 7, placement: "Homepage", flag: "homepage", active: true },
];

export interface Gateway {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  note: string;
}

// Payment gateways admin can enable/configure. Credentials fields live in admin settings.
export const defaultGateways: Gateway[] = [
  { id: "mtn", name: "MTN Mobile Money", type: "Mobile Money", enabled: true, note: "Collect via MTN MoMo API" },
  { id: "airtel", name: "Airtel Money", type: "Mobile Money", enabled: true, note: "Collect via Airtel Money API" },
  { id: "mpesa", name: "M-Pesa", type: "Mobile Money", enabled: true, note: "Daraja STK push" },
  { id: "flutterwave", name: "Flutterwave", type: "Cards + Mobile Money", enabled: true, note: "Cards and mobile money across Africa" },
  { id: "paystack", name: "Paystack", type: "Cards + Bank", enabled: false, note: "Cards and bank transfers" },
  { id: "stripe", name: "Stripe", type: "Cards", enabled: false, note: "International cards" },
  { id: "chipper", name: "Chipper Cash", type: "Mobile Money + Wallet", enabled: false, note: "Mobile wallet payments" },
  { id: "dpo", name: "DPO Pay", type: "Cards + Mobile Money", enabled: false, note: "African payment aggregator" },
];
