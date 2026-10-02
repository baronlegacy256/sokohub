import { reviews } from "@/lib/admin";
import { timeAgo } from "@/lib/utils";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Reviews</h1>
      <div className="space-y-2">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{r.reviewer} → {r.seller.name}</p>
              <span className="text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{r.comment}</p>
            <div className="mt-2 flex items-center gap-4 text-xs">
              <span className="text-slate-400">{timeAgo(r.at)} · {r.status}</span>
              <button className="text-green-700">Approve</button>
              <button className="text-amber-600">Hide</button>
              <button className="text-red-600">Delete</button>
              <button className="text-slate-500">Investigate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
