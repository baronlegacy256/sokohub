"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { ContactMessage, Conversation, Notification, Payment, ProblemReport, Promotion, Report, User } from "@/lib/types";
import { promotionPackages, defaultGateways, type Gateway } from "@/lib/packages";
import { setPromotionFlag } from "@/lib/catalog";
import { getMarketplace } from "@/lib/config";

interface AppState {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (adId: string) => void;
  conversations: Conversation[];
  sendMessage: (convoId: string, text: string) => void;
  startConversation: (adId: string, sellerId: string, sellerName: string, adTitle: string) => string;
  notifications: Notification[];
  markAllRead: () => void;
  reports: Report[];
  addReport: (r: Omit<Report, "id" | "at" | "status">) => void;
  problemReports: ProblemReport[];
  addProblemReport: (r: Omit<ProblemReport, "id" | "at" | "status">) => void;
  contactMessages: ContactMessage[];
  addContactMessage: (m: Omit<ContactMessage, "id" | "at">) => void;
  userAds: string[]; // ad ids posted by user (demos that user posted)
  promotions: Promotion[];
  promoteAd: (adId: string, pkgId: string, gatewayId: string) => Promotion;
  payments: Payment[];
  gateways: Gateway[];
  setGatewayEnabled: (id: string, enabled: boolean) => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "n1", text: "Welcome to SokoHub! Post your first ad for free.", at: new Date().toISOString(), read: false, href: "/sell" },
  ]);
  const [reports, setReports] = useState<Report[]>([]);
  const [problemReports, setProblemReports] = useState<ProblemReport[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [gateways, setGateways] = useState<Gateway[]>(defaultGateways);
  const [userAds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem("sokohub_user");
      if (u) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(u));
      }
      const f = localStorage.getItem("sokohub_favs");
      if (f) {
        setFavorites(JSON.parse(f));
      }
      const c = localStorage.getItem("sokohub_convos");
      if (c) {
        setConversations(JSON.parse(c));
      }
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem("sokohub_favs", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("sokohub_convos", JSON.stringify(conversations)); }, [conversations]);

  const login = (email: string, name?: string) => {
    const role = email.startsWith("admin") ? "admin" : email.startsWith("mod") ? "moderator" : "user";
    const u: User = {
      id: "u1", name: name || email.split("@")[0], email, role,
      location: getMarketplace().locations[0] ?? "", verified: "phone",
    };
    setUser(u);
    localStorage.setItem("sokohub_user", JSON.stringify(u));
    setNotifications((n) => [{ id: Date.now().toString(), text: `Welcome back, ${u.name}!`, at: new Date().toISOString(), read: false }, ...n]);
  };

  const logout = () => { setUser(null); localStorage.removeItem("sokohub_user"); };

  const toggleFavorite = (adId: string) =>
    setFavorites((f) => (f.includes(adId) ? f.filter((x) => x !== adId) : [...f, adId]));

  const startConversation = (adId: string, sellerId: string, sellerName: string, adTitle: string) => {
    const existing = conversations.find((c) => c.adId === adId);
    if (existing) return existing.id;
    const id = "c" + Date.now();
    const convo: Conversation = {
      id, adId, buyerName: user?.name || "Guest", sellerId, sellerName,
      lastMessage: `Hi, is your "${adTitle}" still available?`, unread: 0,
      updatedAt: new Date().toISOString(),
      messages: [{ id: "m1", from: "buyer", text: `Hi, is your "${adTitle}" still available?`, at: new Date().toISOString() }],
    };
    setConversations((c) => [convo, ...c]);
    return id;
  };

  const sendMessage = (convoId: string, text: string) =>
    setConversations((cs) =>
      cs.map((c) =>
        c.id === convoId
          ? { ...c, lastMessage: text, updatedAt: new Date().toISOString(), messages: [...c.messages, { id: "m" + Date.now(), from: "buyer", text, at: new Date().toISOString() }] }
          : c
      )
    );

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));

  const addReport = (r: Omit<Report, "id" | "at" | "status">) =>
    setReports((rs) => [{ ...r, id: "r" + Date.now(), at: new Date().toISOString(), status: "pending" }, ...rs]);

  const addProblemReport = (r: Omit<ProblemReport, "id" | "at" | "status">) =>
    setProblemReports((rs) => [{ ...r, id: "pr" + Date.now(), at: new Date().toISOString(), status: "pending" }, ...rs]);

  const addContactMessage = (m: Omit<ContactMessage, "id" | "at">) =>
    setContactMessages((ms) => [{ ...m, id: "cm" + Date.now(), at: new Date().toISOString() }, ...ms]);

  const promoteAd = (adId: string, pkgId: string, gatewayId: string): Promotion => {
    const pkg = promotionPackages.find((p) => p.id === pkgId) ?? promotionPackages[0];
    const start = new Date();
    const end = new Date(Date.now() + pkg.days * 86400000);
    const promo: Promotion = {
      id: "promo" + Date.now(),
      adId,
      type: pkg.flag,
      start: start.toISOString(),
      end: end.toISOString(),
      price: pkg.price,
      status: "paid",
      gateway: gatewayId,
      packageName: pkg.name,
    };
    setPromotions((ps) => [promo, ...ps]);
    setPayments((ps) => [{ id: "pay" + Date.now(), promotionId: promo.id, adId, amount: pkg.price, gateway: gatewayId, status: "paid", at: new Date().toISOString() }, ...ps]);
    setPromotionFlag(adId, pkg.flag);
    return promo;
  };

  const setGatewayEnabled = (id: string, enabled: boolean) =>
    setGateways((gs) => gs.map((g) => (g.id === id ? { ...g, enabled } : g)));

  return (
    <AppCtx.Provider value={{ user, login, logout, favorites, toggleFavorite, conversations, sendMessage, startConversation, notifications, markAllRead, reports, addReport, problemReports, addProblemReport, contactMessages, addContactMessage, userAds, promotions, promoteAd, payments, gateways, setGatewayEnabled }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
