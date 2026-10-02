import { ads } from "./seed/ads";
import { sellers } from "./seed/sellers";
import { categories, subcategories, locations, districts } from "./data";
import type { Ad, Seller } from "./types";

export { ads, sellers, categories, subcategories, locations, districts };

export const getSeller = (id: string): Seller | undefined => sellers.find((s) => s.id === id);
export const getSellerByUsername = (u: string) => sellers.find((s) => s.username === u);
export const getAd = (slug: string): Ad | undefined => ads.find((a) => a.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug || c.id === slug);
export const getSubcategory = (id: string) => subcategories.find((s) => s.id === id);
export const categoryAds = (catSlug: string) => ads.filter((a) => a.categoryId === catSlug && a.status === "active");
export const categoryById = (id: string) => categories.find((c) => c.id === id);

// Runtime promotion overlay: when a seller pays to promote an ad, flip its flags on the catalog object.
export function setPromotionFlag(adId: string, flag: "featured" | "top" | "urgent" | "homepage") {
  const ad = ads.find((a) => a.id === adId);
  if (!ad) return;
  if (flag === "featured") ad.featured = true;
  if (flag === "top") ad.top = true;
  if (flag === "urgent") ad.urgent = true;
  if (flag === "homepage") ad.featured = true;
}
export const sellerAds = (sellerId: string) => ads.filter((a) => a.sellerId === sellerId && a.status === "active");

export interface SearchParams {
  q?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  seller?: string;
  negotiable?: boolean;
  verified?: boolean;
  sort?: string;
  attrs?: Record<string, string>;
}

export function searchAds(p: SearchParams): Ad[] {
  let out = ads.filter((a) => a.status === "active");
  if (p.q) {
    const q = p.q.toLowerCase();
    out = out.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        (categoryById(a.categoryId)?.name.toLowerCase().includes(q) ?? false) ||
        Object.values(a.attrs).some((v) => v.toLowerCase().includes(q))
    );
  }
  if (p.category) out = out.filter((a) => a.categoryId === p.category || categoryById(a.categoryId)?.slug === p.category);
  if (p.subcategory) out = out.filter((a) => a.subcategoryId === p.subcategory);
  if (p.location) out = out.filter((a) => a.location.toLowerCase() === p.location!.toLowerCase());
  if (p.minPrice) out = out.filter((a) => a.price >= p.minPrice!);
  if (p.maxPrice) out = out.filter((a) => a.price <= p.maxPrice!);
  if (p.condition) out = out.filter((a) => a.condition === p.condition);
  if (p.negotiable) out = out.filter((a) => a.negotiable);
  if (p.verified) out = out.filter((a) => getSeller(a.sellerId)?.verified !== "none");
  if (p.attrs) {
    for (const [k, v] of Object.entries(p.attrs)) {
      if (v) out = out.filter((a) => a.attrs[k] === v);
    }
  }
  switch (p.sort) {
    case "price-asc": out = [...out].sort((a, b) => a.price - b.price); break;
    case "price-desc": out = [...out].sort((a, b) => b.price - a.price); break;
    case "oldest": out = [...out].sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break;
    default:
      out = [...out].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }
  return out;
}
