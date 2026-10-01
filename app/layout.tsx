import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/demo-provider";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Corneer — Verified apparel sourcing",
  description:
    "A clearer way for serious buyers and capable apparel manufacturers to meet.",
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
