import Link from "next/link";
import { footerCompany, footerLegal, footerMarketplace, footerSupport, site } from "@/lib/site";
import { getMarketplace } from "@/lib/config";
import { BrandIcon } from "./BrandIcon";

function ColLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-slate-300 transition-colors hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);
  return (
    <footer className="mt-14 border-t-2 border-green-600 bg-slate-900 pb-20 text-slate-300 md:pb-6">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
              Soko<span className="text-green-500">Hub</span>
            </Link>
            <p className="mt-2 text-sm leading-6 text-slate-400">{site.tagline} {site.description}</p>
            {socials.length > 0 && (
              <div className="mt-4 flex gap-2">
                {socials.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}
                    className="rounded-full border border-slate-700 p-2 text-slate-400 transition-colors hover:border-green-600 hover:text-green-400">
                    <BrandIcon name={name} />
                  </a>
                ))}
              </div>
            )}
            <p className="mt-4 text-xs text-slate-500">Made for {getMarketplace().country} {getMarketplace().countryFlag}</p>
          </div>

          {/* Desktop columns */}
          <div className="hidden md:block"><ColLinks title="Marketplace" links={footerMarketplace} /></div>
          <div className="hidden md:block"><ColLinks title="Company" links={footerCompany} /></div>
          <div className="hidden md:block"><ColLinks title="Support" links={footerSupport} /></div>
          <div className="hidden md:block"><ColLinks title="Legal" links={footerLegal} /></div>
        </div>

        {/* Mobile collapsibles */}
        <div className="mt-6 divide-y divide-slate-800 md:hidden">
          {[
            ["Marketplace", footerMarketplace],
            ["Company", footerCompany],
            ["Support", footerSupport],
            ["Legal", footerLegal],
          ].map(([title, links]) => (
            <details key={title as string} className="py-3">
              <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-slate-400">{title as string}</summary>
              <ul className="mt-3 space-y-2 text-sm">
                {(links as { label: string; href: string }[]).map((l) => (
                  <li key={l.href + l.label}><Link href={l.href} className="text-slate-300">{l.label}</Link></li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 md:flex-row">
          <p>© 2026 {site.legalName} All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/ad-rules" className="hover:text-white">Ad Rules</Link>
            <span className="text-slate-700 md:hidden">|</span>
            <span>{getMarketplace().countryFlag} {getMarketplace().country}</span>
            <span>{getMarketplace().currency}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
