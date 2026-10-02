import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-slate-500">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={12} className="text-slate-300" />}
          {it.href ? (
            <Link href={it.href} className="hover:text-green-700">{it.label}</Link>
          ) : (
            <span className="font-medium text-slate-700">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({ title, intro, badge }: { title: string; intro: string; badge?: string }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {badge && <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-700">{badge}</p>}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{intro}</p>
      </div>
    </div>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="scroll-mt-24 text-xl font-bold text-slate-900">{children}</h2>;
}

export function RelatedLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-bold text-slate-900">Related</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-green-300 hover:text-green-700">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CTABand({ title, text, primary, secondary }: { title: string; text: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <div className="mt-10 rounded-xl bg-green-700 px-6 py-8 text-white md:flex md:items-center md:justify-between">
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-green-100">{text}</p>
      </div>
      <div className="mt-4 flex gap-3 md:mt-0">
        <Link href={primary.href} className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-green-800">{primary.label}</Link>
        {secondary && <Link href={secondary.href} className="rounded-lg border border-green-500 px-5 py-2.5 text-sm font-bold text-white">{secondary.label}</Link>}
      </div>
    </div>
  );
}

export function LegalToc({ sections, mobile = false }: { sections: { id: string; label: string }[]; mobile?: boolean }) {
  if (mobile) {
    return (
      <details className="mb-6 rounded-xl border border-slate-200 bg-white p-4 md:hidden">
        <summary className="cursor-pointer text-sm font-bold">On this page</summary>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          {sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} className="hover:text-green-700">{s.label}</a></li>
          ))}
        </ul>
      </details>
    );
  }
  return (
    <aside className="hidden md:block">
      <nav className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">On this page</p>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          {sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} className="hover:text-green-700">{s.label}</a></li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-6 text-slate-600">{children}</div>
    </section>
  );
}
