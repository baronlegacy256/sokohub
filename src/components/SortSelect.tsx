"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const sp = useSearchParams();
  return (
    <select
      value={sp.get("sort") ?? "relevant"}
      onChange={(e) => {
        const params = new URLSearchParams(sp.toString());
        params.set("sort", e.target.value);
        router.push(`/ads?${params.toString()}`);
      }}
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
    >
      <option value="relevant">Most Relevant</option>
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
