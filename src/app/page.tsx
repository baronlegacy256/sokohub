import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { ads, categories, categoryAds, locations } from "@/lib/catalog";
import { getMarketplace } from "@/lib/config";

export default function Home() {
  const featured = ads.filter((a) => a.featured && a.status === "active").slice(0, 10);
  const recent = [...ads]
    .filter((a) => a.status === "active")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 12);
  return (
    <div className="mx-auto max-w-6xl px-3">
      <section className="rounded-2xl bg-white p-5 shadow-sm mt-4">
        <h1 className="text-2xl font-extrabold md:text-3xl">Buy & sell anything in {getMarketplace().country}</h1>
        <form action="/ads" className="mt-4 flex flex-col gap-2 md:flex-row">
          <input name="q" placeholder="What are you looking for?" className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500" />
          <select name="location" className="rounded-lg border border-slate-300 px-4 py-3 text-sm">
            <option value="">All {getMarketplace().country}</option>
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
          <button className="rounded-lg bg-green-600 px-8 py-3 font-bold text-white">Search</button>
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold">Popular:</span>
          {["Toyota Harrier", "iPhone", "Apartments", "Laptops", "Land", "Jobs"].map((s) => (
            <Link key={s} href={`/ads?q=${encodeURIComponent(s)}`} className="rounded-full border border-slate-200 px-3 py-1 hover:border-green-500">{s}</Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold">Categories</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.id} href={`/ads/${c.slug}`} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm hover:border-green-500">
              <span className="text-xl">{c.icon}</span>
              <span>
                <span className="block font-semibold">{c.name}</span>
                <span className="block text-xs text-slate-400">{categoryAds(c.id).length} ads</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-bold">Featured Listings</h2>
          <Link href="/ads?sort=relevant" className="text-sm text-green-700">View all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-5">
          {featured.map((a) => (
            <div key={a.id} className="min-w-[200px] flex-1"><ListingCard ad={a} /></div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-bold">Recently Posted</h2>
          <Link href="/ads" className="text-sm text-green-700">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {recent.map((a) => <ListingCard key={a.id} ad={a} />)}
        </div>
      </section>
    </div>
  );
}
