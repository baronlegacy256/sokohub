const items = [
  { title: "New listing requires moderation", desc: "Toyota Fielder 2019 submitted by katomotors", at: "5 min ago" },
  { title: "New report", desc: "Scam reported on 'Land for sale in Kira'", at: "22 min ago" },
  { title: "Payment failure", desc: "UGX 3,000 top listing payment failed", at: "1 hr ago" },
  { title: "Verification request", desc: "Business verification — zmautolink", at: "3 hr ago" },
  { title: "Support ticket", desc: "TKT-3003: Account locked", at: "6 hr ago" },
  { title: "Suspicious activity", desc: "12 failed logins from one IP", at: "Yesterday" },
];

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        <button className="text-sm text-green-700">Mark all as read</button>
      </div>
      {items.map((n, i) => (
        <div key={i} className={`rounded-xl border p-4 ${i < 3 ? "border-green-200 bg-green-50" : "border-slate-200 bg-white"}`}>
          <p className="font-semibold text-sm">{n.title}</p>
          <p className="text-sm text-slate-500">{n.desc}</p>
          <p className="mt-1 text-xs text-slate-400">{n.at}</p>
        </div>
      ))}
    </div>
  );
}
