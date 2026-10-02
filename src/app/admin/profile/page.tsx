export default function AdminProfilePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Admin Profile</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">A</div>
          <div>
            <p className="font-bold">Admin</p>
            <p className="text-sm text-slate-500">admin@sokohub.ug · Super Admin</p>
            <p className="text-xs text-slate-400">Last login: today, 09:12 · IP 41.203.xxx.xx</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 text-sm">
          <button className="rounded-lg border border-slate-300 px-4 py-2">Edit profile</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2">Change password</button>
          <button className="rounded-lg border border-slate-300 px-4 py-2">Enable 2FA</button>
        </div>
      </div>
    </div>
  );
}
