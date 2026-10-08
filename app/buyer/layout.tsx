import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "My sourcing requests",
  "Review your temporary order previews, supplier responses, shortlisted companies, and identity recipients in the Corneer buyer demo.",
  "/buyer/rfqs",
  false,
);

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
