const roles = [
  { name: "Super Admin", desc: "Full access to everything." },
  { name: "Admin", desc: "Manage marketplace, users, commerce and content." },
  { name: "Moderator", desc: "Review ads, reports and reviews." },
  { name: "Support Agent", desc: "Handle support tickets and message oversight." },
  { name: "Finance Manager", desc: "View and refund payments, manage subscriptions." },
  { name: "Content Manager", desc: "Manage homepage, banners, pages and FAQ." },
];

const matrix = [
  ["ads.view", true, true, true, false, true, false],
  ["ads.create", true, true, true, false, false, false],
  ["ads.edit", true, true, true, false, false, false],
  ["ads.delete", true, true, false, false, false, false],
  ["ads.approve", true, true, true, false, false, false],
  ["users.view", true, true, true, true, true, false],
  ["users.edit", true, true, false, false, false, false],
  ["users.suspend", true, true, true, false, false, false],
  ["payments.view", true, true, false, false, true, false],
  ["payments.refund", true, true, false, false, true, false],
  ["reports.view", true, true, true, true, false, false],
  ["reports.resolve", true, true, true, false, false, false],
  ["settings.manage", true, false, false, false, false, false],
];

export default function RolesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Roles & Permissions</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {roles.map((r) => (
          <div key={r.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-bold">{r.name}</p>
            <p className="text-xs text-slate-500">{r.desc}</p>
            <button className="mt-2 text-xs text-green-700">Edit permissions</button>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-bold">Permission matrix</h2>
        <table className="mt-3 w-full text-xs">
          <thead><tr><th className="text-left">Permission</th>{roles.map((r) => <th key={r.name}>{r.name.split(" ")[0]}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-50">
            {matrix.map(([perm, ...cells]) => (
              <tr key={perm as string}>
                <td className="py-1.5 font-mono">{perm}</td>
                {(cells as boolean[]).map((c, i) => <td key={i} className="text-center">{c ? "✓" : "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
