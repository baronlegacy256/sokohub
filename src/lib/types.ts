export type AdStatus = "draft" | "pending" | "active" | "rejected" | "expired" | "sold" | "archived";

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  moderated: boolean;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
}

export interface Seller {
  id: string;
  username: string;
  name: string;
  avatar: string;
  business: boolean;
  verified: "none" | "phone" | "identity" | "business";
  memberSince: string;
  location: string;
  responseRate: number;
  responseTime: string;
  rating: number;
  reviews: number;
  phone: string;
  whatsapp?: string;
  activeAds: number;
}

export interface Ad {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  categoryId: string;
  subcategoryId: string;
  location: string;
  district: string;
  condition: string;
  images: string[];
  sellerId: string;
  status: AdStatus;
  featured: boolean;
  urgent: boolean;
  top: boolean;
  views: number;
  favorites: number;
  createdAt: string;
  expiresAt: string;
  attrs: Record<string, string>;
}

export interface Conversation {
  id: string;
  adId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  lastMessage: string;
  unread: number;
  updatedAt: string;
  messages: { id: string; from: "buyer" | "seller"; text: string; at: string }[];
}

export interface Notification {
  id: string;
  text: string;
  at: string;
  read: boolean;
  href?: string;
}

export interface Report {
  id: string;
  adId: string;
  reason: string;
  reporter: string;
  at: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
}

export interface Promotion {
  id: string;
  adId: string;
  type: "featured" | "top" | "urgent" | "homepage";
  start: string;
  end: string;
  price: number;
  status: "paid" | "pending";
  gateway?: string;
  packageName?: string;
}

export interface Payment {
  id: string;
  promotionId: string;
  adId: string;
  amount: number;
  gateway: string;
  status: "paid" | "pending" | "failed";
  at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "seller" | "moderator" | "admin";
  location: string;
  phone?: string;
  verified: Seller["verified"];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  at: string;
}

export interface ProblemReport {
  id: string;
  type: "listing" | "seller" | "message" | "technical";
  listingId?: string;
  seller?: string;
  reason: string;
  description: string;
  reporter: string;
  at: string;
  status: "pending" | "reviewed" | "resolved";
}
