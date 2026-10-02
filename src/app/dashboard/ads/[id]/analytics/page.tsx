import { ads } from "@/lib/catalog";
import AnalyticsView from "@/components/dashboard/AnalyticsView";

export default async function AdAnalyticsPage({ params }: PageProps<"/dashboard/ads/[id]/analytics">) {
  const { id } = await params;
  const ad = ads.find((a) => a.id === id) ?? ads[0];
  return <AnalyticsView ad={ad} />;
}
