"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-bold">Log in</h1>
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          login(String(fd.get("email")), String(fd.get("name")));
          router.push("/dashboard");
        }}
      >
        <input name="name" placeholder="Your name" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <input type="password" required placeholder="Password" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <button className="w-full rounded-lg bg-green-600 py-3 font-bold text-white">Log in</button>
      </form>
      <p className="mt-3 text-center text-sm text-slate-500">No account? <Link href="/register" className="text-green-700">Register</Link></p>
      <p className="mt-1 text-center text-xs text-slate-400">Tip: use an email starting with &quot;admin&quot; to preview the admin panel.</p>
    </div>
  );
}
