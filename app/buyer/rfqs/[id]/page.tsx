import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Settings2 } from "lucide-react";
import { getRFQ, rfqs } from "@/lib/data";
import { RFQComparison } from "@/components/rfq-comparison";

export function generateStaticParams() {
  return rfqs.map((rfq) => ({ id: rfq.id }));
}

export default async function BuyerRFQDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rfq = getRFQ(id);
  if (!rfq) notFound();
  return (
    <main className="rfq-detail-page">
      <div className="container breadcrumb workspace-breadcrumb">
        <Link href="/buyer/rfqs">
          <ArrowLeft size={14} />
          All RFQs
        </Link>
        <span>/</span>
        <span>{rfq.title}</span>
      </div>
      <section className="rfq-detail-hero">
        <div className="container rfq-detail-hero-inner">
          <div>
            <div className="rfq-title-meta">
              <span
                className={`status status-${rfq.status.toLowerCase().replaceAll(" ", "-")}`}
              >
                {rfq.status}
              </span>
              <span>RFQ-260914-04</span>
            </div>
            <h1>{rfq.title}</h1>
            <p>
              Private request · Published {rfq.posted} · {rfq.visibility}
            </p>
          </div>
          <div>
            <button className="button button-secondary">
              <Settings2 size={15} />
              Manage RFQ
            </button>
            <button className="button button-dark">
              <CalendarDays size={15} />
              Schedule meeting
            </button>
          </div>
        </div>
      </section>
      <div className="container rfq-detail-content">
        <RFQComparison rfq={rfq} />
      </div>
    </main>
  );
}
