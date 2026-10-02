import type { Seller } from "../types";
import { mulberry32 } from "../utils";

const r = mulberry32(7);
const pick = <T,>(arr: T[]) => arr[Math.floor(r() * arr.length)];

const names = [
  ["Kato Audubwa", "katomotors", true, "business"],
  ["Nakato Grace", "graceventory", false, "phone"],
  ["Ssemakula John", "smakulatrade", true, "business"],
  ["Aujo Beatrice", "beatrice_home", false, "phone"],
  ["Mugisha Peter", "petertechug", false, "identity"],
  ["Nalubega Faiza", "faizamode", false, "none"],
  ["Okello Denis", "deniswheels", true, "business"],
  ["Twine Ronald", "rtwineautos", true, "business"],
  ["Auma Prossy", "prossyfarms", false, "phone"],
  ["Zam Oz Track", "zmautolink", true, "business"],
  ["Kiggundu Samuel", "samtechhub", false, "identity"],
  ["Achieng Mercy", "mercyhomes", true, "business"],
  ["Lubega David", "lubegaelectronics", false, "phone"],
  ["Nansubuga Joy", "joyjobs_ug", false, "none"],
  ["Wasswa Brian", "brianmachines", true, "business"],
] as const;

export const sellers: Seller[] = names.map(([name, username, business, verified], i) => ({
  id: `s${i + 1}`,
  username,
  name,
  avatar: `https://i.pravatar.cc/120?img=${(i % 70) + 1}`,
  business: business as boolean,
  verified: verified as Seller["verified"],
  memberSince: `20${20 + (i % 5)}`.slice(0, 4) + "-0" + ((i % 9) + 1),
  location: pick(["Kampala", "Wakiso", "Mukono", "Entebbe", "Jinja", "Mbarara"]),
  responseRate: 70 + Math.floor(r() * 30),
  responseTime: pick(["Within an hour", "Within a few hours", "Within a day"]),
  rating: Math.round((3.5 + r() * 1.5) * 10) / 10,
  reviews: Math.floor(r() * 120),
  phone: `+256 7${Math.floor(r() * 9)}${Math.floor(r() * 10)} ${Math.floor(100 + r() * 899)} ${Math.floor(100 + r() * 899)}`,
  whatsapp: r() > 0.2 ? `2567${Math.floor(r() * 1000000)}`.slice(0, 12) : undefined,
  activeAds: 2 + Math.floor(r() * 20),
}));
