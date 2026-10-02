"use client";

import Link from "next/link";
import { Home, Search, PlusCircle, MessageSquare, User } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white text-[11px] text-slate-600 md:hidden">
      <Link href="/" className="flex flex-col items-center gap-0.5 py-2"><Home size={18} />Home</Link>
      <Link href="/ads" className="flex flex-col items-center gap-0.5 py-2"><Search size={18} />Search</Link>
      <Link href="/sell" className="flex flex-col items-center gap-0.5 py-2 text-green-700"><PlusCircle size={22} />Post Ad</Link>
      <Link href="/messages" className="flex flex-col items-center gap-0.5 py-2"><MessageSquare size={18} />Messages</Link>
      <Link href="/dashboard" className="flex flex-col items-center gap-0.5 py-2"><User size={18} />Account</Link>
    </nav>
  );
}
