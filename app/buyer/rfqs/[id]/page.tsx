import { notFound } from "next/navigation";
import { BuyerRequestDetail } from "@/components/buyer-request-detail";
import { getRFQ, rfqs } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = getRFQ(id);
  return {
    ...pageMetadata(
      request ? `${request.title} — Buyer request` : "Order preview",
      "Compare fictional supplier responses and reported capabilities. Save a shortlist and choose which company may receive your identity.",
      `/buyer/rfqs/${id}`,
      false,
    ),
    // The rendered brief owns the title, including session-only previews.
    title: null,
  };
}

export function generateStaticParams() {
  return rfqs.map((request) => ({ id: request.id }));
}

export default async function BuyerRFQDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getRFQ(id) && !/^demo-[\da-f-]{36}$/.test(id)) notFound();
  return <BuyerRequestDetail id={id} />;
}
