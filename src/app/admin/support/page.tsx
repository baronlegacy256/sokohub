"use client";

import { supportTickets } from "@/lib/admin";
import { useApp } from "@/context/AppContext";
import { timeAgo } from "@/lib/utils";

export default function AdminSupportPage() {
  const { contactMessages } = useApp();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Support Tickets</h1>
      {contactMessages.length > 0 && (
        <div className="space-y-2">
          {contactMessages.map((m) => (
            <div key={m.id} className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="font-semibold">{m.subject}</p>
              <p className="text-sm text-slate-600">{m.message}</p>
              <p className="text-xs text-slate-500">From {m.name} · {m.email} · {timeAgo(m.at)}</p>
            </div>
          ))}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Ticket</th><th>User</th><th>Category</th><th>Priority</th><th>Status</th><th>Created</th><th>Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {supportTickets.map((t) => (
              <tr key={t.id}>
                <td className="p-3 font-mono text-xs">{t.id}</td>
                <td>{t.user}</td>
                <td>{t.category}</td>
                <td>{t.priority}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-xs ${t.status === "Open" ? "bg-amber-100 text-amber-700" : t.status === "Resolved" || t.status === "Closed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{t.status}</span></td>
                <td className="text-slate-400">{timeAgo(t.at)}</td>
                <td className="space-x-2 text-xs"><button className="text-green-700">Reply</button><button className="text-slate-500">Assign</button><button className="text-slate-500">Close</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
