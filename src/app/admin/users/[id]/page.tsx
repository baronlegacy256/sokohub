import Link from "next/link";
import { sellers } from "@/lib/catalog";
import { sellerAds } from "@/lib/catalog";
import { timeAgo } from "@/lib/utils";

export default async function AdminUserDetailPage({ params }: PageProps<"/admin/users/[id]">) {
  const { id } = await params;
  const user = sellers.find((s) => s.id === id);
  if (!user) return <p className="p-6">User not found.</p>;
  const listings = sellerAds(user.id);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-slate-500">@{user.username} · {user.verified} · joined {timeAgo(user.memberSince)}</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-amber-300 px-4 py-2 text-sm text-amber-700">Suspend</button>
          <button className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600">Ban</button>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">Verify</button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
          <h2 className="font-bold">Profile</h2>
          <dl className="mt-2 space-y-1">
            <div className="flex justify-between"><dt>Location</dt><dd>{user.location}</dd></div>
            <div className="flex justify-between"><dt>Business</dt><dd>{user.business ? "Yes" : "No"}</dd></div>
            <div className="flex justify-between"><dt>Response rate</dt><dd>{user.responseRate}%</dd></div>
            <div className="flex justify-between"><dt>Rating</dt><dd>★ {user.rating} ({user.reviews})</dd></div>
            <div className="flex justify-between"><dt>Phone</dt><dd>{user.phone}</dd></div>
          </dl>
          <Link href={`/seller/${user.username}`} className="mt-2 block text-xs text-green-700">Public profile →</Link>
        </div>
        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Listings ({listings.length})</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {listings.slice(0, 8).map((a) => (
              <li key={a.id} className="flex justify-between border-b border-slate-50 py-1">
                <Link href={`/admin/ads/${a.id}`} className="hover:underline">{a.title}</Link>
                <span className="text-slate-400">{a.views} views</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-4 font-bold">Activity timeline</h2>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            <li>• Created account — {timeAgo(user.memberSince)}</li>
            <li>• Last active — recently</li>
            <li>• {user.activeAds} ads published</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
