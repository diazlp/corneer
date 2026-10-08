import { BadgeCheck, Globe2, ShieldCheck } from "lucide-react";
import { SuppliersExplorer } from "@/components/suppliers-explorer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Apparel manufacturers & sourcing companies",
  "Browse fictional apparel manufacturers and trading companies by category, minimum order, capabilities, and reviewed evidence in the Corneer demo.",
  "/suppliers",
);

export default async function SuppliersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="container directory-hero-inner">
          <div>
            <span className="eyebrow">Supplier directory</span>
            <h1>Browse apparel suppliers</h1>
            <p>
              Compare companies by what they make, their minimum orders, and the
              evidence reviewed. Choose a company to discuss your order.
            </p>
          </div>
          <div className="directory-hero-proof">
            <div>
              <BadgeCheck />
              <span>
                <strong>7</strong>Demo companies
              </span>
            </div>
            <div>
              <Globe2 />
              <span>
                <strong>2</strong>Supplier markets
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <strong>100%</strong>Business checked
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="container directory-content">
        <SuppliersExplorer initialQuery={typeof q === "string" ? q : ""} />
      </section>
    </main>
  );
}
