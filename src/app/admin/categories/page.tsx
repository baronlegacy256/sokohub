import { categories, subcategories } from "@/lib/catalog";

export default function AdminCategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Categories</h1>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ Add category</button>
      </div>
      <div className="mt-4 space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">{c.icon} {c.name}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs ${c.moderated ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                {c.moderated ? "Requires moderation" : "Auto-approve"}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{subcategories.filter((s) => s.categoryId === c.id).map((s) => s.name).join(" · ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
