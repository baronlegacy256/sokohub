"use client";

const KEY = "sokohub_events";

export type EventType = "view" | "favorite" | "message" | "whatsapp" | "phone" | "share" | "sold" | "promoted";

export interface MarketEvent { type: EventType; adId: string; at: string }

export function track(type: EventType, adId: string) {
  try {
    const raw = localStorage.getItem(KEY);
    const events: MarketEvent[] = raw ? JSON.parse(raw) : [];
    events.push({ type, adId, at: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(events.slice(-2000)));
  } catch {}
}

export function getEvents(): MarketEvent[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
