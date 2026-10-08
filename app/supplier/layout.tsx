import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Buyer opportunities — Supplier workspace",
  "Review fictional apparel sourcing briefs and submit a temporary demonstration response in the Corneer supplier workspace.",
  "/supplier/opportunities",
  false,
);

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
