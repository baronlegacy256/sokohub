"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Tag, PlusCircle, MessageSquare, Heart, BarChart3,
  Sparkles, CreditCard, Bell, User, Settings, HelpCircle, LogOut, Menu, X,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ads } from "@/lib/catalog";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/ads", label: "My Ads", icon: Tag, badgeKey: "pending" as const },
  { href: "/sell", label: "Post an Ad", icon: PlusCircle },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, badgeKey: "messages" as const },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/promotions", label: "Promotions", icon: Sparkles },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badgeKey: "notifications" as const },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function Nav({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const { userAdsPending, unreadMessages, unreadNotifications } = useDashboardCounts();
  const badge = (k?: "pending" | "messages" | "notifications") =>
    k === "pending" ? userAdsPending : k === "messages" ? unreadMessages : k === "notifications" ? unreadNotifications : 0;
  return (
    <nav className="space-y-0.5 p-3">
      {links.map(({ href, label, icon: Icon, badgeKey }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        const b = badge(badgeKey);
        return (
          <Link key={href} href={href} onClick={onNav}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${active ? "bg-green-50 font-semibold text-green-800" : "text-slate-600 hover:bg-slate-50"}`}>
            <Icon size={17} />
            <span className="flex-1">{label}</span>
            {b > 0 && <span className="rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">{b}</span>}
          </Link>
        );
      })}
      <div className="my-3 border-t border-slate-100" />
      <Link href="/dashboard/help" onClick={onNav} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
        <HelpCircle size={17} /> Help & Support
      </Link>
      <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
        <LogOut size={17} /> Logout
      </Link>
    </nav>
  );
}

function useDashboardCounts() {
  const { notifications, conversations } = useApp();
  const myAds = ads.slice(0, 30);
  return {
    userAdsPending: myAds.filter((a, i) => i % 10 === 3).length,
    unreadMessages: conversations.reduce((n, c) => n + c.unread, 0),
    unreadNotifications: notifications.filter((n) => !n.read).length,
  };
}

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:hidden">
        <Menu size={16} /> Dashboard menu
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setOpen(false)}>
          <aside className="h-full w-64 bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 p-3">
              <p className="font-bold text-green-700">My Workspace</p>
              <button onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <Nav onNav={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <aside className="hidden w-56 shrink-0 rounded-xl border border-slate-200 bg-white md:block">
        <Nav />
      </aside>
    </>
  );
}
