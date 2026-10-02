const pages = [
  { name: "About", type: "Page", updated: "Sep 2026" },
  { name: "Terms of Service", type: "Page", updated: "Sep 2026" },
  { name: "Privacy Policy", type: "Page", updated: "Sep 2026" },
  { name: "Safety Tips", type: "Help article", updated: "Oct 2026" },
  { name: "Posting Guidelines", type: "Help article", updated: "Oct 2026" },
  { name: "Relaunch sale", type: "Announcement", updated: "Oct 2026" },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Pages, FAQ & Announcements</h1>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ New content</button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Title</th><th>Type</th><th>Updated</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pages.map((p) => (
              <tr key={p.name}><td className="p-3 font-medium">{p.name}</td><td>{p.type}</td><td>{p.updated}</td><td className="space-x-3 text-xs"><button className="text-green-700">Edit</button><button className="text-slate-500">Hide</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
