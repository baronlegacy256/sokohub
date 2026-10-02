const events = [
  { ip: "41.203.xxx.xx", event: "12 failed logins", at: "Today, 10:14", level: "High" },
  { ip: "197.157.xxx.xx", event: "New admin device", at: "Today, 08:02", level: "Medium" },
  { ip: "41.xxx.xxx.xx", event: "Password reset requested", at: "Yesterday", level: "Low" },
];

const sessions = [
  { device: "Chrome on Windows", location: "Kampala, UG", active: true },
  { device: "Safari on iPhone", location: "Kampala, UG", active: false },
];

export default function SecurityPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Security Center</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Suspicious activity</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {events.map((e, i) => (
              <li key={i} className="border-b border-slate-50 pb-2">
                <p className="font-semibold">{e.event} <span className="text-xs text-slate-400">· {e.level}</span></p>
                <p className="text-xs text-slate-500">{e.ip} · {e.at}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="font-bold">Admin sessions</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {sessions.map((s, i) => (
              <li key={i} className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span>{s.device} · {s.location}</span>
                <button className="text-xs text-red-600">Revoke</button>
              </li>
            ))}
          </ul>
          <button className="mt-3 text-xs text-red-600">Force logout all sessions</button>
        </div>
      </div>
    </div>
  );
}
