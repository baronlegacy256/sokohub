import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact SokoHub",
  description: "Have a question or need help? Contact the SokoHub team — customer support, business inquiries and phone.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
