const sections = [
  { name: "Featured Listings", enabled: true },
  { name: "Popular Categories", enabled: true },
  { name: "Popular Locations", enabled: true },
  { name: "Promotional Banners", enabled: true },
  { name: "Announcements", enabled: false },
];

export default function HomepageAdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Homepage Management</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">Enable/disable and reorder homepage sections.</p>
        <ul className="mt-3 divide-y divide-slate-100 text-sm">
          {sections.map((s) => (
            <li key={s.name} className="flex items-center gap-3 py-2.5">
              <span className="cursor-move text-slate-300">⠿</span>
              <span className="flex-1">{s.name}</span>
              <label className="flex items-center gap-2 text-xs text-slate-500">
                <input type="checkbox" defaultChecked={s.enabled} /> Enabled
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
