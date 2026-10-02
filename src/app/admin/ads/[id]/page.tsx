import { ads, sellers, categories } from "@/lib/catalog";
import { formatUGX, timeAgo } from "@/lib/utils";
import Link from "next/link";

export default async function AdminAdDetailPage({ params }: PageProps<"/admin/ads/[id]">) {
  const { id } = await params;
  const ad = ads.find((a) => a.id === id);
  if (!ad) return <p className="p-6">Ad not found.</p>;
  const seller = sellers.find((s) => s.id === ad.sellerId);
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">{ad.title}</h1>
          <p className="text-sm text-slate-500">#{ad.id} · {ad.status} · posted {timeAgo(ad.createdAt)}</p>
        </div>
        <div className="flex gap-2 text-sm">
          <button className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white">Approve</button>
          <button className="rounded-lg border border-red-300 px-4 py-2 text-red-600">Reject</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2">Suspend</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2">Feature</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {ad.images.map((img, i) => <img key={i} src={img} alt="" className="aspect-square w-full rounded-lg object-cover" />)}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold">Description</h2>
            <p className="mt-1 text-sm text-slate-600">{ad.description}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold">Attributes</h2>
            <dl className="mt-2 text-sm">
              {Object.entries(ad.attrs).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-50 py-1"><dt className="capitalize text-slate-500">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold">Moderation Notes</h2>
            <textarea rows={3} placeholder="Record why an action was taken…" className="mt-2 w-full rounded-lg border border-slate-300 p-2.5 text-sm" />
            <ul className="mt-3 space-y-1 text-xs text-slate-500">
              <li>• Submitted {timeAgo(ad.createdAt)}</li>
              <li>• No moderation actions yet.</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <h2 className="font-bold">Summary</h2>
            <dl className="mt-2 space-y-1">
              <div className="flex justify-between"><dt>Price</dt><dd className="font-semibold text-green-700">{formatUGX(ad.price)}</dd></div>
              <div className="flex justify-between"><dt>Category</dt><dd>{categories.find((c) => c.id === ad.categoryId)?.name}</dd></div>
              <div className="flex justify-between"><dt>Location</dt><dd>{ad.location}</dd></div>
              <div className="flex justify-between"><dt>Condition</dt><dd>{ad.condition}</dd></div>
              <div className="flex justify-between"><dt>Views</dt><dd>{ad.views}</dd></div>
              <div className="flex justify-between"><dt>Favorites</dt><dd>{ad.favorites}</dd></div>
              <div className="flex justify-between"><dt>Negotiable</dt><dd>{ad.negotiable ? "Yes" : "No"}</dd></div>
            </dl>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <h2 className="font-bold">Seller</h2>
            <p className="mt-1">{seller?.name}</p>
            <p className="text-xs text-slate-500">{seller?.location} · {seller?.verified} · joined {seller?.memberSince.slice(0, 4)}</p>
            <Link href={`/admin/users/${seller?.id}`} className="mt-2 block text-xs text-green-700">View user →</Link>
          </div>
          <Link href={`/ad/${ad.slug}`} className="block rounded-lg border border-slate-300 p-3 text-center text-sm">View public listing</Link>
        </aside>
      </div>
    </div>
  );
}
