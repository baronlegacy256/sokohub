import { sellers } from "@/lib/catalog";

export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <h1 className="text-xl font-bold">Users</h1>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Name</th><th>Username</th><th>Location</th><th>Verified</th><th>Response</th><th>Ads</th><th>Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sellers.map((s) => (
              <tr key={s.id}>
                <td className="p-3 font-medium">{s.name}</td>
                <td>@{s.username}</td>
                <td>{s.location}</td>
                <td>{s.verified}</td>
                <td>{s.responseRate}%</td>
                <td>{s.activeAds}</td>
                <td className="space-x-2 text-xs">
                  <button className="text-green-700">Verify</button>
                  <button className="text-amber-600">Warn</button>
                  <button className="text-red-600">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
