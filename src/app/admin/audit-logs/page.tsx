import { auditTrail } from "@/lib/admin";
import { timeAgo } from "@/lib/utils";

export default function AuditLogsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Audit Logs</h1>
      <p className="text-sm text-slate-500">Administrative actions are recorded here and cannot be edited from the UI.</p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Admin</th><th>Action</th><th>Resource</th><th>When</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditTrail.map((a) => (
              <tr key={a.id}>
                <td className="p-3 font-medium">{a.admin}</td>
                <td>{a.action}</td>
                <td className="text-slate-500">{a.resource}</td>
                <td className="text-slate-400">{timeAgo(a.at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
