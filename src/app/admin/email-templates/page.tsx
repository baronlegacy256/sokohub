const templates = [
  { name: "Welcome email", enabled: true, vars: "{{user_name}}, {{listing_url}}" },
  { name: "Listing approved", enabled: true, vars: "{{user_name}}, {{listing_title}}, {{listing_url}}" },
  { name: "Listing rejected", enabled: true, vars: "{{user_name}}, {{listing_title}}" },
  { name: "New message", enabled: true, vars: "{{user_name}}, {{listing_title}}" },
  { name: "Ad expiring", enabled: true, vars: "{{user_name}}, {{listing_title}}, {{amount}}" },
  { name: "Payment successful", enabled: true, vars: "{{user_name}}, {{amount}}" },
  { name: "Promotion activated", enabled: true, vars: "{{listing_title}}" },
  { name: "Password reset", enabled: true, vars: "{{user_name}}" },
];

export default function EmailTemplatesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Email Templates</h1>
      <div className="space-y-2">
        {templates.map((t) => (
          <div key={t.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{t.name}</p>
              <label className="flex items-center gap-2 text-xs text-slate-500"><input type="checkbox" defaultChecked={t.enabled} /> Enabled</label>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-400">Variables: {t.vars}</p>
            <div className="mt-2 space-x-3 text-xs"><button className="text-green-700">Edit</button><button className="text-slate-500">Preview</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
