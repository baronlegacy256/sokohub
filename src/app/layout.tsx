import type { Metadata } from "next";
import "./globals.css";

import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { getMarketplace } from "@/lib/config";

export const metadata: Metadata = {
  title: getMarketplace().seo.title,
  description: getMarketplace().seo.description,
  keywords: getMarketplace().seo.keywords,
  openGraph: { title: getMarketplace().seo.ogTitle, description: getMarketplace().seo.ogDescription },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AppProvider>
          <Header />
          <main className="flex-1 pb-14 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </AppProvider>
      </body>
    </html>
  );
}
