import { getAd, getSeller, ads } from "@/lib/catalog";
import { formatUGX } from "@/lib/utils";
import { getMarketplace } from "@/lib/config";
import type { Metadata } from "next";
import AdDetailClient from "@/components/AdDetailClient";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps<"/ad/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ad = getAd(slug);
  if (!ad) return { title: "Listing not found — SokoHub" };
  return {
    title: `${ad.title} — ${formatUGX(ad.price)} | ${getMarketplace().name}`,
    description: ad.description.slice(0, 160),
    openGraph: { images: [ad.images[0]] },
  };
}

export default async function AdPage({ params }: PageProps<"/ad/[slug]">) {
  const { slug } = await params;
  const ad = getAd(slug);
  if (!ad) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold">Listing not found</h1>
        <p className="mt-2 text-slate-500">This ad may have been removed or expired.</p>
        <Link href="/ads" className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 font-bold text-white">Browse ads</Link>
      </div>
    );
  }
  const seller = getSeller(ad.sellerId)!;
  const similar = ads.filter((a) => a.categoryId === ad.categoryId && a.id !== ad.id && a.status === "active").slice(0, 4);
  return (
    <div className="mx-auto max-w-6xl px-3 py-4">
      <AdDetailClient ad={ad} seller={seller} similar={similar} />
    </div>
  );
}
