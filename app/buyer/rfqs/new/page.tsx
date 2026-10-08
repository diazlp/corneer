import { RFQForm } from "@/components/rfq-form";
import { getSupplier } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ supplier?: string | string[] }>;
}) {
  const { supplier } = await searchParams;
  const company =
    typeof supplier === "string" ? getSupplier(supplier) : undefined;
  return pageMetadata(
    company ? `Order for ${company.name}` : "Describe your apparel order",
    "Describe the apparel, quantity, materials, and timing you need. Create a private demo preview before choosing a company to contact.",
    "/buyer/rfqs/new",
    false,
  );
}

export default async function NewRFQPage({
  searchParams,
}: {
  searchParams: Promise<{ supplier?: string | string[] }>;
}) {
  const { supplier } = await searchParams;
  return (
    <main className="builder-page">
      <RFQForm
        invitedSupplier={
          typeof supplier === "string" ? getSupplier(supplier) : undefined
        }
      />
    </main>
  );
}
