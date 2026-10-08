import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Apparel product examples",
  "Explore representative activewear, teamwear, and technical apparel examples. Each fictional showcase leads to its company, with no checkout inventory.",
  "/products",
);

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
