import { ads } from "@/lib/catalog";
import AdEditor from "@/components/dashboard/AdEditor";

export default async function EditAdPage({ params }: PageProps<"/dashboard/ads/[id]/edit">) {
  const { id } = await params;
  const ad = ads.find((a) => a.id === id);
  return <AdEditor ad={ad} />;
}
