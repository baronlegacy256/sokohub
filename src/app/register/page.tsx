"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const { login } = useApp();
  const router = useRouter();
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-xl font-bold">Create account</h1>
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          login(String(fd.get("email")), String(fd.get("name")));
          router.push("/dashboard");
        }}
      >
        <input name="name" required placeholder="Full name" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <input type="password" required minLength={6} placeholder="Password (min 6 chars)" className="w-full rounded-lg border border-slate-300 p-3 text-sm" />
        <button className="w-full rounded-lg bg-green-600 py-3 font-bold text-white">Register</button>
      </form>
      <p className="mt-3 text-center text-sm text-slate-500">Already registered? <Link href="/login" className="text-green-700">Log in</Link></p>
    </div>
  );
}
