"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({ total, pageSize, page }: { total: number; pageSize: number; page: number }) {
  const sp = useSearchParams();
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  const href = (p: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(p));
    return `/ads?${params.toString()}`;
  };
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={href(p)} className={`rounded-lg border px-3 py-1.5 text-sm ${p === page ? "border-green-600 bg-green-600 text-white" : "border-slate-200 bg-white"}`}>
          {p}
        </Link>
      ))}
    </div>
  );
}
