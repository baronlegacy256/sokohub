import Link from "next/link";
import { categories, categoryAds } from "@/lib/catalog";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="mb-4 text-xl font-bold">All Categories</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.id} href={`/ads/${c.slug}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-green-500">
            <span className="text-2xl">{c.icon}</span>
            <span>
              <span className="block font-semibold">{c.name}</span>
              <span className="block text-xs text-slate-400">{categoryAds(c.id).length} ads</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
