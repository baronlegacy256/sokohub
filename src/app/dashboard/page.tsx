"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { myListings, statusStyles, formatCount } from "@/lib/dash";
import { formatUGX, timeAgo } from "@/lib/utils";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import { ads } from "@/lib/catalog";

export default function DashboardPage() {
  const { user, conversations, notifications, favorites, toggleFavorite, promotions } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const mine = myListings();
  const count = (s: string) => mine.filter((a) => a.status === s).length;
  const recent = [...mine].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  const unreadTotal = conversations.reduce((n, c) => n + c.unread, 0);
  const saved = favorites.length > 0 ? ads.filter((a) => favorites.includes(a.id)).slice(0, 4) : ads.slice(10, 14);

  const alerts: { text: string; action: string; href: string }[] = [];
  const pending = count("pending");
  if (pending > 0) alerts.push({ text: `${pending} listing${pending > 1 ? "s" : ""} waiting for approval.`, action: "View", href: "/dashboard/ads?status=pending" });
  const expiringSoon = mine.filter((a) => new Date(a.expiresAt).getTime() - new Date().getTime() < 3 * 86400000 && new Date(a.expiresAt).getTime() > new Date().getTime());
  if (expiringSoon.length) alerts.push({ text: `"${expiringSoon[0].title}" expires soon.`, action: "Renew", href: "/dashboard/ads" });
  if (unreadTotal) alerts.push({ text: `You have ${unreadTotal} unread message${unreadTotal > 1 ? "s" : ""}.`, action: "Open", href: "/dashboard/messages" });
  if (!user?.phone) alerts.push({ text: "Your profile is missing a phone number.", action: "Complete profile", href: "/dashboard/profile" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{greeting}{user ? `, ${user.name}` : ""}</h1>
            <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening with your listings.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/notifications" aria-label="Notifications" className="relative text-slate-600">🔔
              {notifications.filter((n) => !n.read).length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-[10px] text-white">{notifications.filter((n) => !n.read).length}</span>}
            </Link>
            <Link href="/dashboard/messages" aria-label="Messages" className="relative text-slate-600">✉️
              {unreadTotal > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-[10px] text-white">{unreadTotal}</span>}
            </Link>
            <Link href="/dashboard/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">{user?.name?.[0] ?? "U"}</Link>
            <Link href="/sell" className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ Post New Ad</Link>
          </div>
        </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Active Ads", value: count("active"), sub: "Live now", href: "/dashboard/ads?status=active" },
          { label: "Pending Review", value: count("pending"), sub: "Awaiting approval", href: "/dashboard/ads?status=pending" },
          { label: "Expired", value: count("expired"), sub: "Need renewal", href: "/dashboard/ads?status=expired" },
          { label: "Sold", value: count("sold"), sub: "Total sold", href: "/dashboard/ads?status=sold" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-green-500">
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </Link>
        ))}
      </div>

      {alerts.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="font-bold text-amber-900">Action required</h2>
          <ul className="mt-2 space-y-1.5">
            {alerts.map((a, i) => (
              <li key={i} className="flex items-center justify-between text-sm text-amber-800">
                <span>• {a.text}</span>
                <Link href={a.href} className="font-semibold text-amber-900 underline">{a.action}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PerformanceCard />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Your Listings</h2>
            <Link href="/dashboard/ads" className="text-sm text-green-700">Manage all</Link>
          </div>
          <div className="mt-3 hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-slate-400">
                <tr><th className="pb-2">Listing</th><th>Status</th><th>Price</th><th>Views</th><th>Favs</th><th>Msgs</th><th>Posted</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((a) => (
                  <tr key={a.id}>
                    <td className="max-w-[180px] truncate py-2 font-medium">{a.title}</td>
                    <td><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[a.status]}`}>{a.status}</span></td>
                    <td>{formatUGX(a.price)}</td>
                    <td>{formatCount(a.views)}</td>
                    <td>{a.favorites}</td>
                    <td>{conversations.filter((c) => c.adId === a.id).length}</td>
                    <td className="text-slate-400">{timeAgo(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 space-y-2 md:hidden">
            {recent.map((a) => (
              <div key={a.id} className="rounded-lg border border-slate-100 p-3">
                <p className="truncate font-medium">{a.title}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span className={`rounded-full px-2 py-0.5 font-semibold ${statusStyles[a.status]}`}>{a.status}</span>
                  <span className="font-semibold text-green-700">{formatUGX(a.price)}</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{formatCount(a.views)} views · {a.favorites} favs · {timeAgo(a.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold">Top performers</h2>
            <ol className="mt-2 space-y-1.5 text-sm">
              {[...mine].sort((a, b) => b.views - a.views).slice(0, 3).map((a, i) => (
                <li key={a.id}><Link href={`/dashboard/ads/${a.id}/analytics`} className="flex justify-between hover:underline"><span>{i + 1}. {a.title}</span><span className="text-slate-400">{formatCount(a.views)} views</span></Link></li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold">Promotions</h2>
            <p className="mt-1 text-sm text-slate-500">
              {promotions.length > 0 ? `${promotions.length} active promotion${promotions.length > 1 ? "s" : ""} — promoted ads appear first in search and on the homepage.` : "No active promotions. Boost a listing to show up first."}
            </p>
            <Link href="/dashboard/promotions" className="mt-2 inline-block rounded-lg bg-green-600 px-4 py-1.5 text-xs font-bold text-white">
              {promotions.length > 0 ? "Manage promotions" : "Promote an ad"}
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold">Insights</h2>
            <dl className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
              <dt className="text-slate-500">Total views</dt><dd className="text-right font-semibold">{formatCount(mine.reduce((n, a) => n + a.views, 0))}</dd>
              <dt className="text-slate-500">Avg / listing</dt><dd className="text-right font-semibold">{formatCount(Math.round(mine.reduce((n, a) => n + a.views, 0) / Math.max(1, mine.length)))}</dd>
              <dt className="text-slate-500">Favorites</dt><dd className="text-right font-semibold">{mine.reduce((n, a) => n + a.favorites, 0)}</dd>
              <dt className="text-slate-500">Response rate</dt><dd className="text-right font-semibold">87%</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Improve Your Listings</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {mine.some((a) => a.images.length < 3) && <li>• Add more photos to listings to increase engagement.</li>}
            {mine.some((a) => a.description.length < 120) && <li>• Some descriptions are very short — longer details build trust.</li>}
            {!user?.phone && <li>• Verify your phone number to earn a trust badge.</li>}
            {mine.some((a) => !a.featured && a.views > 400) && <li>• Your well-performing ads could earn more with promotion.</li>}
            {mine.every((a) => a.location) && <li>• Great — most listings have a location set.</li>}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Traffic snapshot</h2>
          <p className="mt-2 text-sm text-slate-600">Your listings received views from marketplace search, category pages and direct links. Promoted ads appear on the homepage.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Recent Conversations</h2>
            <Link href="/dashboard/messages" className="text-sm text-green-700">View all</Link>
          </div>
          {conversations.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">When buyers contact you, your conversations will appear here.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {conversations.slice(0, 4).map((c) => (
                <li key={c.id}><Link href="/dashboard/messages" className="block rounded-lg p-2 hover:bg-slate-50">
                  <p className="text-sm font-semibold">{c.sellerName}</p>
                  <p className="truncate text-xs text-slate-500">{c.lastMessage}</p>
                </Link></li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Recently Saved</h2>
          <ul className="mt-3 space-y-2">
            {saved.map((a) => (
              <li key={a.id} className="flex items-center gap-3">
                <Image src={a.images[0]} alt="" width={44} height={44} className="rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <Link href={`/ad/${a.slug}`} className="block truncate text-sm font-semibold">{a.title}</Link>
                  <p className="text-xs text-slate-500">{formatUGX(a.price)} · {a.location}</p>
                </div>
                <Link href={`/ad/${a.slug}`} className="text-xs text-green-700">View</Link>
                <button onClick={() => toggleFavorite(a.id)} aria-label="Remove favorite" className="text-xs text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">Quick Actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["Post New Ad", "/sell"], ["Manage Ads", "/dashboard/ads"], ["Messages", "/dashboard/messages"],
            ["Promote Listing", "/dashboard/promotions"], ["Analytics", "/dashboard/analytics"], ["Edit Profile", "/dashboard/profile"],
          ].map(([l, h]) => (
            <Link key={l} href={h} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm hover:border-green-500">{l}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
