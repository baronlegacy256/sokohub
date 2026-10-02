import Link from "next/link";
import { Suspense } from "react";
import { searchAds, categories } from "@/lib/catalog";
import ListingCard from "@/components/ListingCard";
import Filters from "@/components/Filters";
import SortSelect from "@/components/SortSelect";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 12;

export default async function AdsPage({ searchParams }: PageProps<"/ads">) {
  const sp = await searchParams;
  const get = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const attrs: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    if (k.startsWith("attr_") && typeof v === "string") attrs[k.slice(5)] = v;
  }
  const categorySlug = get("category");
  const cat = categorySlug ? categories.find((c) => c.slug === categorySlug || c.id === categorySlug) : undefined;
  const results = searchAds({
    q: get("q"),
    category: cat?.id ?? categorySlug,
    subcategory: get("subcategory"),
    location: get("location"),
    minPrice: get("minPrice") ? Number(get("minPrice")) : undefined,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : undefined,
    condition: get("condition"),
    negotiable: sp.negotiable === "1",
    verified: sp.verified === "1",
    sort: get("sort"),
    attrs,
  });
  const page = Math.max(1, Number(get("page") ?? 1));
  const slice = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-3 py-4 md:flex md:gap-6">
      <aside className="mb-4 w-full shrink-0 md:mb-0 md:w-60">
        <Suspense><Filters categoryId={cat?.id} /></Suspense>
      </aside>
      <section className="flex-1">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">{results.length.toLocaleString()} ads found</h1>
          <Suspense><SortSelect /></Suspense>
        </div>
        {slice.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-lg font-bold">No listings found</p>
            <p className="text-sm text-slate-500">Try changing your search or filters.</p>
            <Link href="/ads" className="mt-3 inline-block rounded-lg bg-green-600 px-5 py-2 text-sm font-bold text-white">Clear Filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {slice.map((a) => <ListingCard key={a.id} ad={a} />)}
          </div>
        )}
        <Suspense><Pagination total={results.length} pageSize={PAGE_SIZE} page={page} /></Suspense>
      </section>
    </div>
  );
}
