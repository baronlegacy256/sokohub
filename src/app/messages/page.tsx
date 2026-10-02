"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";
import { formatUGX } from "@/lib/utils";

function MessagesInner() {
  const { conversations, sendMessage, startConversation } = useApp();
  const sp = useSearchParams();
  const adParam = sp.get("ad");
  const [input, setInput] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  // If arriving via /messages?ad=..., ensure a conversation exists.
  let convos = conversations;
  if (adParam) {
    const ad = ads.find((a) => a.id === adParam);
    const sellerName = ad ? "Seller" : "";
    if (ad && !convos.some((c) => c.adId === adParam)) {
      convos = [{ id: "pending", adId: ad.id, buyerName: "You", sellerId: ad.sellerId, sellerName, lastMessage: "", unread: 0, updatedAt: new Date().toISOString(), messages: [] }, ...convos];
    }
  }
  const active = convos.find((c) => c.id === (activeId ?? convos[0]?.id));
  const activeAd = active ? ads.find((a) => a.id === active.adId) : undefined;

  return (
    <div className="mx-auto flex max-w-6xl gap-4 px-3 py-4">
      <aside className="w-full max-w-xs">
        <h1 className="mb-3 text-lg font-bold">Messages</h1>
        {convos.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            You don&apos;t have any conversations yet.<br />Chat with a seller from any listing.
          </p>
        )}
        {convos.map((c) => (
          <button key={c.id} onClick={() => setActiveId(c.id)} className={`mb-2 block w-full rounded-xl border p-3 text-left ${active?.id === c.id ? "border-green-500 bg-white" : "border-slate-200 bg-white"}`}>
            <p className="font-semibold text-sm">{c.sellerName}</p>
            <p className="truncate text-xs text-slate-500">{c.lastMessage}</p>
          </button>
        ))}
      </aside>
      <section className="flex-1">
        {!active ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Select a conversation</p>
        ) : (
          <div className="flex h-[70vh] flex-col rounded-xl border border-slate-200 bg-white">
            {activeAd && (
              <div className="border-b border-slate-100 p-3">
                <a href={`/ad/${activeAd.slug}`} className="text-sm font-semibold text-green-700">{activeAd.title}</a>
                <p className="text-xs text-slate-500">{formatUGX(activeAd.price)} · {activeAd.location}</p>
              </div>
            )}
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {active.messages.map((m) => (
                <p key={m.id} className={`w-fit max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "buyer" ? "ml-auto bg-green-100" : "bg-slate-100"}`}>{m.text}</p>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-slate-100 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.trim()) return;
                if (active.id === "pending" && activeAd) {
                  const seller = { id: activeAd.sellerId, name: "Seller" };
                  const id = startConversation(activeAd.id, seller.id, seller.name, activeAd.title);
                  sendMessage(id, input.trim());
                  setActiveId(id);
                } else {
                  sendMessage(active.id, input.trim());
                }
                setInput("");
              }}
            >
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none" />
              <button className="rounded-full bg-green-600 px-5 py-2 text-sm font-bold text-white">Send</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default function MessagesPage() {
  return <Suspense><MessagesInner /></Suspense>;
}
