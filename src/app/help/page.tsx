import type { Metadata } from "next";
import HelpPage from "@/components/pages/HelpPage";

export const metadata: Metadata = {
  title: "Help Center | SokoHub",
  description: "Search the SokoHub help center — answers about buying, selling, listings, payments, messaging, safety and verification.",
  alternates: { canonical: "/help" },
};

export default function Page() {
  return <HelpPage />;
}
