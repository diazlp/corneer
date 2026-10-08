import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  EyeOff,
  FileCheck2,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import { getRFQ, rfqs } from "@/lib/data";
import { SupplierResponseForm } from "@/components/supplier-response-form";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = getRFQ(id);
  if (!request) notFound();
  return pageMetadata(
    `${request.title} — Supplier opportunity`,
    "Review this fictional apparel brief and submit a demonstration company response. Buyer identity remains private until an explicit share.",
    `/supplier/opportunities/${id}`,
    false,
  );
}

export function generateStaticParams() {
  return rfqs.map((rfq) => ({ id: rfq.id }));
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rfq = getRFQ(id);
  if (!rfq) notFound();

  return (
    <main className="opportunity-detail-page">
      <div className="container breadcrumb">
        <Link href="/supplier/opportunities">
          <ArrowLeft size={14} />
          All opportunities
        </Link>
        <span>/</span>
        <span>{rfq.title}</span>
      </div>
      <section className="opportunity-detail-hero">
        <div className="container">
          <div className="opportunity-detail-badges">
            <span className="match-score">{rfq.category}</span>
            <span
              className={`status status-${rfq.status.toLowerCase().replaceAll(" ", "-")}`}
            >
              {rfq.status}
            </span>
          </div>
          <h1>{rfq.title}</h1>
          <div className="protected-buyer">
            <span className="anonymous-buyer-mark">
              <EyeOff />
            </span>
            <div>
              <strong>{rfq.buyerLabel}</strong>
              <p>
                <BadgeCheck />
                Business checked privately by Corneer · {rfq.buyerLocation}
              </p>
            </div>
            <span className="privacy-label">
              <ShieldCheck />
              Identity protected
            </span>
          </div>
        </div>
      </section>

      <div className="container opportunity-detail-layout">
        <article className="opportunity-brief">
          <div className="brief-meta">
            <div>
              <Package />
              <span>
                Estimated quantity<strong>{rfq.quantity}</strong>
              </span>
            </div>
            <div>
              <CalendarDays />
              <span>
                Target delivery<strong>{rfq.delivery}</strong>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                Respond by<strong>{rfq.deadline}</strong>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                Buyer market<strong>{rfq.buyerLocation}</strong>
              </span>
            </div>
          </div>
          <section>
            <span className="eyebrow">Buyer requirement</span>
            <h2>Project brief</h2>
            <p>{rfq.description}</p>
          </section>
          <section>
            <h3>Material specification</h3>
            <p>{rfq.material}</p>
          </section>
          <section>
            <h3>Required capability</h3>
            <div className="requirements-list">
              {rfq.requirements.map((item) => (
                <span key={item}>
                  <Check />
                  {item}
                </span>
              ))}
            </div>
          </section>
          <section className="document-status">
            <FileCheck2 />
            <div>
              <strong>Technical pack available after mutual interest</strong>
              <p>
                The buyer has confirmed a complete specification pack. Corneer
                reviewed the attachment for obvious identity disclosures;
                technical content was not audited.
              </p>
            </div>
            <span>Available later</span>
          </section>
          <section className="buyer-confidence">
            <div>
              <BadgeCheck />
            </div>
            <div>
              <h3>Why Corneer accepted this RFQ</h3>
              <ul>
                <li>Buyer business registration checked</li>
                <li>Representative joined an onboarding call</li>
                <li>Business website and domain matched</li>
                <li>Quantity and delivery timeline provided</li>
              </ul>
            </div>
          </section>
        </article>
        <aside className="response-form-wrap">
          <SupplierResponseForm rfqId={rfq.id} />
        </aside>
      </div>
    </main>
  );
}
