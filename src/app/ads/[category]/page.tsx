import { redirect } from "next/navigation";
import { getCategory, categoryAds } from "@/lib/catalog";
import ListingCard from "@/components/ListingCard";

export default async function CategoryPage({ params }: PageProps<"/ads/[category]">) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) redirect("/ads");
  const results = categoryAds(cat.id);
  return (
    <div className="mx-auto max-w-6xl px-3 py-4">
      <h1 className="mb-1 text-xl font-bold">{cat.icon} {cat.name}</h1>
      <p className="mb-4 text-sm text-slate-500">{results.length} active ads · <a className="text-green-700" href={`/ads?category=${cat.slug}`}>Advanced filters</a></p>
      {results.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">No ads in this category yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {results.map((a) => <ListingCard key={a.id} ad={a} />)}
        </div>
      )}
    </div>
  );
}
