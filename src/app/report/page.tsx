import type { Metadata } from "next";
import ReportPage from "@/components/pages/ReportPage";

export const metadata: Metadata = {
  title: "Report a Problem | SokoHub",
  description: "Report a listing, seller, message or technical problem on SokoHub.",
  alternates: { canonical: "/report" },
};

export default function Page() {
  return <ReportPage />;
}
