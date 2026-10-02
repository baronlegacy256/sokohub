"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";
import { formatUGX } from "@/lib/utils";

export default function DashMessagesPage() {
  const { conversations, sendMessage } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const active = conversations.find((c) => c.id === (activeId ?? conversations[0]?.id));
  const activeAd = active ? ads.find((a) => a.id === active.adId) : undefined;

  return (
    <div className="flex h-[75vh] gap-4">
      <aside className="w-72 shrink-0 overflow-y-auto rounded-xl border border-slate-200 bg-white">
        <h1 className="border-b border-slate-100 p-3 font-bold">Inbox</h1>
        {conversations.length === 0 && (
          <p className="p-4 text-sm text-slate-500">When buyers contact you, your conversations will appear here.</p>
        )}
        {conversations.map((c) => {
          const ad = ads.find((a) => a.id === c.adId);
          return (
            <button key={c.id} onClick={() => setActiveId(c.id)} className={`block w-full border-b border-slate-50 p-3 text-left hover:bg-slate-50 ${active?.id === c.id ? "bg-green-50" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-green-100 text-center leading-8 font-bold text-green-700">{c.sellerName[0]}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{c.sellerName}</p>
                  <p className="truncate text-xs text-slate-400">{ad?.title}</p>
                </div>
                {c.unread > 0 && <span className="ml-auto rounded-full bg-red-500 px-1.5 text-[10px] text-white">{c.unread}</span>}
              </div>
              <p className="mt-1 truncate text-xs text-slate-500">{c.lastMessage}</p>
            </button>
          );
        })}
      </aside>
      <section className="flex flex-1 flex-col rounded-xl border border-slate-200 bg-white">
        {!active ? (
          <p className="m-auto text-slate-500">Select a conversation</p>
        ) : (
          <>
            <div className="border-b border-slate-100 p-3">
              <p className="font-bold">{active.sellerName}</p>
              {activeAd && <a href={`/ad/${activeAd.slug}`} className="text-xs text-green-700">{activeAd.title} · {formatUGX(activeAd.price)} — view listing</a>}
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {active.messages.map((m) => (
                <p key={m.id} className={`w-fit max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.from === "buyer" ? "ml-auto bg-green-100" : "bg-slate-100"}`}>{m.text}</p>
              ))}
            </div>
            <p className="px-4 pb-1 text-[11px] text-slate-400">Safety tip: never share passwords or OTPs. Meet in public places.</p>
            <form className="flex gap-2 p-3" onSubmit={(e) => { e.preventDefault(); if (input.trim()) { sendMessage(active.id, input.trim()); setInput(""); } }}>
              <button type="button" aria-label="Attach image" className="rounded-full border border-slate-200 px-3 text-sm">📷</button>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none" />
              <button className="rounded-full bg-green-600 px-5 py-2 text-sm font-bold text-white">Send</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
