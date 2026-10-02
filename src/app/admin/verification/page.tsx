import { verificationQueue } from "@/lib/admin";
import { timeAgo } from "@/lib/utils";

export default function VerificationPage() {
  const pending = verificationQueue.filter((v) => v.status === "pending");
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Seller Verification</h1>
      <h2 className="font-bold">Queue ({pending.length} pending)</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Applicant</th><th>Type</th><th>Submitted</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {verificationQueue.map((v) => (
              <tr key={v.id}>
                <td className="p-3 font-medium">{v.seller.name}</td>
                <td>{v.type}</td>
                <td>{timeAgo(v.submitted)}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-xs ${v.status === "approved" ? "bg-green-100 text-green-700" : v.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{v.status}</span></td>
                <td className="space-x-3 text-xs">
                  <button className="text-green-700">Approve</button>
                  <button className="text-red-600">Reject</button>
                  <button className="text-slate-500">Request info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400">Decisions record reviewer, date and notes. Sensitive documents are not exposed in the UI.</p>
    </div>
  );
}
