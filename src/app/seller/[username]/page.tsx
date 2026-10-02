import Image from "next/image";
import { getSellerByUsername, sellerAds } from "@/lib/catalog";
import ListingCard from "@/components/ListingCard";

export default async function SellerPage({ params }: PageProps<"/seller/[username]">) {
  const { username } = await params;
  const seller = getSellerByUsername(username);
  if (!seller) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-center"><h1 className="text-xl font-bold">Seller not found</h1></div>;
  }
  const listings = sellerAds(seller.id);
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <Image src={seller.avatar} alt={seller.name} width={72} height={72} className="rounded-full" />
        <div>
          <h1 className="text-xl font-bold">{seller.name} {seller.verified !== "none" && <span className="text-sm font-medium text-green-700">✓ {seller.verified} verified</span>}</h1>
          <p className="text-sm text-slate-500">📍 {seller.location} · Member since {seller.memberSince.slice(0, 4)} · {seller.responseRate}% response rate · responds {seller.responseTime.toLowerCase()}</p>
          <p className="text-sm text-amber-600">★ {seller.rating} ({seller.reviews} reviews)</p>
        </div>
      </div>
      <h2 className="mb-3 mt-6 font-bold">Active ads ({listings.length})</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {listings.map((a) => <ListingCard key={a.id} ad={a} />)}
      </div>
    </div>
  );
}
