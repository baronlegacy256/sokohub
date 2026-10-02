import { systemStatus } from "@/lib/admin";

export default function SystemPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">System Health</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <ul className="divide-y divide-slate-100">
          {systemStatus.map((s) => (
            <li key={s.name} className="flex items-center justify-between py-3 text-sm">
              <span>{s.name}</span>
              <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${s.status === "Healthy" ? "bg-green-100 text-green-700" : s.status === "Warning" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{s.status}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-400">Application version 1.0.0 · Checks run automatically every minute.</p>
      </div>
    </div>
  );
}
