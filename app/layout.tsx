import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/demo-provider";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "Apparel sourcing for buyers",
    "Explore Corneer's apparel sourcing demo. Describe an order, compare fictional manufacturers and trading companies, and choose who to contact.",
    "/",
  ),
  // Canonicals belong to individual public pages, not their workspace children.
  alternates: undefined,
  metadataBase: new URL(siteUrl),
  applicationName: "Corneer",
  category: "Apparel sourcing",
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>
          <SiteHeader />
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
