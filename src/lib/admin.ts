import { ads, sellers, categories, locations } from "./catalog";
import { mulberry32 } from "./utils";

const r = mulberry32(11);
const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];

export const adminReports = Array.from({ length: 14 }, (_, i) => ({
  id: `RPT-${1000 + i}`,
  ad: ads[i % ads.length],
  reporter: pick(["Grace N.", "Peter M.", "Sarah K.", "John D.", "Aisha R."]),
  reason: pick(["Scam", "Fraud", "Duplicate listing", "Wrong information", "Prohibited item", "Offensive content", "Already sold", "Other"]),
  priority: pick(["Low", "Medium", "High", "Critical"]),
  status: pick(["pending", "investigating", "resolved", "dismissed"] as const),
  at: new Date(Date.now() - i * 86400000 * 0.4).toISOString(),
}));

export const verificationQueue = Array.from({ length: 8 }, (_, i) => ({
  id: `V-${200 + i}`,
  seller: sellers[i % sellers.length],
  type: pick(["Phone", "Identity", "Business"] as const),
  submitted: new Date(Date.now() - i * 86400000).toISOString(),
  status: pick(["pending", "approved", "rejected"] as const),
}));

export const supportTickets = Array.from({ length: 10 }, (_, i) => ({
  id: `TKT-${3000 + i}`,
  user: pick(sellers.map((s) => s.name)),
  subject: pick(["Ad not approved", "Payment failed", "Account locked", "Report abuse", "Can't upload photos", "WhatsApp link broken", "Feature request"]),
  category: pick(["Listing issue", "Payment", "Account", "Safety", "Other"]),
  priority: pick(["Low", "Medium", "High"] as const),
  status: pick(["Open", "In Progress", "Waiting for User", "Resolved", "Closed"] as const),
  at: new Date(Date.now() - i * 3600000 * 5).toISOString(),
}));

export const reviews = Array.from({ length: 12 }, (_, i) => ({
  id: `RV-${i + 1}`,
  reviewer: pick(sellers.map((s) => s.name)),
  seller: pick(sellers),
  rating: 1 + Math.floor(r() * 5),
  comment: pick([
    "Great communication and item exactly as described.",
    "Responsive seller, smooth deal.",
    "Item was not as described.",
    "Slow to respond.",
    "Very professional, would buy again.",
  ]),
  status: pick(["visible", "hidden", "flagged"] as const),
  at: new Date(Date.now() - i * 86400000).toISOString(),
}));

export const auditTrail = Array.from({ length: 20 }, (_, i) => ({
  id: `AL-${i + 1}`,
  admin: pick(["Admin John", "Moderator Aisha", "Super Admin"]),
  action: pick(["approved listing", "rejected listing", "suspended user", "created promotion", "edited category", "refunded payment", "changed settings", "banned user", "dismissed report"]),
  resource: pick([`listing #${1000 + i}`, `user #${200 + i}`, `promotion #${i + 1}`, "category: Vehicles", "settings"]),
  at: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const searchTerms = [
  { term: "Toyota Harrier", searches: 1842, results: 96, noResult: 2 },
  { term: "iPhone 15", searches: 1520, results: 120, noResult: 4 },
  { term: "apartment Kololo", searches: 980, results: 34, noResult: 12 },
  { term: "land for sale", searches: 875, results: 210, noResult: 1 },
  { term: "MacBook Pro", searches: 640, results: 58, noResult: 6 },
  { term: "tractor", searches: 420, results: 18, noResult: 22 },
  { term: "boda boda", searches: 398, results: 74, noResult: 3 },
];

export const systemStatus = [
  { name: "Database", status: "Healthy" },
  { name: "Storage", status: "Healthy" },
  { name: "Authentication", status: "Healthy" },
  { name: "Email", status: "Warning" },
  { name: "Payments", status: "Healthy" },
  { name: "Background jobs", status: "Healthy" },
];

export const revenueBreakdown = [
  { label: "Featured Ads", amount: 4200000 },
  { label: "Boosts", amount: 1850000 },
  { label: "Subscriptions", amount: 5100000 },
  { label: "Other", amount: 640000 },
];

export function totals() {
  const active = ads.filter((a) => a.status === "active");
  return {
    users: sellers.length * 37,
    activeUsers: sellers.length * 11,
    listings: ads.length,
    active: active.length,
    pending: Math.round(ads.length * 0.08),
    revenue: revenueBreakdown.reduce((n, x) => n + x.amount, 0),
    views: ads.reduce((n, a) => n + a.views, 0),
  };
}

export function categoryStats() {
  return categories.map((c) => ({
    ...c,
    n: ads.filter((a) => a.categoryId === c.id).length,
    views: ads.filter((a) => a.categoryId === c.id).reduce((n, a) => n + a.views, 0),
  }));
}

export function locationStats() {
  return locations.map((l) => ({
    location: l,
    n: ads.filter((a) => a.location === l).length,
    views: ads.filter((a) => a.location === l).reduce((n, a) => n + a.views, 0),
  })).sort((a, b) => b.n - a.n);
}
