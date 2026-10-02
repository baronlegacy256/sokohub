"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const groups: { title: string; items: { href: string; label: string; badge?: string }[] }[] = [
  { title: "Overview", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    title: "Marketplace",
    items: [
      { href: "/admin/ads", label: "Ads", badge: "pending" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/locations", label: "Locations" },
      { href: "/admin/reports", label: "Reports", badge: "reports" },
      { href: "/admin/reviews", label: "Reviews" },
    ],
  },
  {
    title: "Users",
    items: [
      { href: "/admin/users", label: "Users" },
      { href: "/admin/verification", label: "Verification", badge: "verification" },
      { href: "/admin/roles", label: "Roles & Permissions" },
    ],
  },
  {
    title: "Commerce",
    items: [
      { href: "/admin/payments", label: "Payments" },
      { href: "/admin/promotions", label: "Promotions" },
      { href: "/admin/promotions/packages", label: "Promotion Packages" },
      { href: "/admin/subscriptions", label: "Subscriptions" },
    ],
  },
  {
    title: "Communication",
    items: [
      { href: "/admin/notifications", label: "Notifications" },
      { href: "/admin/support", label: "Support", badge: "support" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { href: "/admin/analytics", label: "Marketplace Analytics" },
      { href: "/admin/analytics/search", label: "Search Analytics" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/homepage", label: "Homepage" },
      { href: "/admin/content", label: "Pages & FAQ" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings" },
      { href: "/admin/email-templates", label: "Email Templates" },
      { href: "/admin/security", label: "Security" },
      { href: "/admin/system", label: "System Health" },
      { href: "/admin/audit-logs", label: "Audit Logs" },
    ],
  },
];

const badgeCounts: Record<string, number> = { pending: 42, reports: 9, verification: 5, support: 7 };

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex-1 overflow-y-auto p-2 text-sm">
      {groups.map((g) => (
        <div key={g.title} className="mb-3">
          {!collapsed && <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{g.title}</p>}
          {g.items.map((it) => {
            const active = pathname === it.href || (it.href !== "/admin" && pathname.startsWith(it.href));
            return (
              <Link key={it.href} href={it.href} onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${active ? "bg-green-50 font-semibold text-green-800" : "text-slate-600 hover:bg-slate-50"}`}>
                <span className="flex-1 truncate">{collapsed ? it.label[0] : it.label}</span>
                {!collapsed && it.badge && <span className="rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">{badgeCounts[it.badge]}</span>}
              </Link>
            );
          })}
        </div>
      ))}
      <Link href="/admin/profile" className="block rounded-lg px-2.5 py-1.5 text-slate-600 hover:bg-slate-50">Admin Profile</Link>
      <Link href="/dashboard/help" className="block rounded-lg px-2.5 py-1.5 text-slate-600 hover:bg-slate-50">Help</Link>
      <button onClick={() => setCollapsed(!collapsed)} className="mt-2 hidden w-full rounded-lg border border-slate-200 py-1.5 text-xs text-slate-500 md:block">
        {collapsed ? "Expand »" : "« Collapse"}
      </button>
    </nav>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className="mb-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm md:hidden">☰ Admin menu</button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setOpen(false)}>
          <aside className="flex h-full w-64 flex-col bg-white" onClick={(e) => e.stopPropagation()}>{nav}</aside>
        </div>
      )}
      <aside className={`hidden shrink-0 rounded-xl border border-slate-200 bg-white md:flex md:flex-col ${collapsed ? "w-16" : "w-60"}`}>
        <div className="border-b border-slate-100 p-3">
          <p className={`font-extrabold text-green-700 ${collapsed ? "text-center" : ""}`}>{collapsed ? "SH" : "SokoHub Admin"}</p>
        </div>
        {nav}
      </aside>
    </>
  );
}
