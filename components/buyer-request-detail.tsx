"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
import { RFQComparison } from "@/components/rfq-comparison";
import { BuyerSteps } from "@/components/buyer-steps";

export function BuyerRequestDetail({ id }: { id: string }) {
  const { requests, shortlists } = useDemo();
  const request = requests.find((item) => item.id === id);
  const title = request
    ? `${request.title} — ${request.preview ? "Order preview" : "Buyer request"} | Corneer`
    : "Preview expired | Corneer";
  if (!request)
    return (
      <main className="container empty-state">
        <title>{title}</title>
        <h1>This demo preview has expired</h1>
        <p>Demo orders stay in memory and reset when the page reloads.</p>
        <Link className="button button-dark" href="/buyer/rfqs/new">
          Describe your order
        </Link>
        <Link className="text-link" href="/buyer/rfqs">
          My requests
        </Link>
      </main>
    );
  return (
    <main className="rfq-detail-page">
      <title>{title}</title>
      <div className="container breadcrumb workspace-breadcrumb">
        <Link href="/buyer/rfqs">
          <ArrowLeft size={14} />
          My requests
        </Link>
        <span>/</span>
        <span>{request.title}</span>
      </div>
      <section className="rfq-detail-hero">
        <div className="container">
          <BuyerSteps step={shortlists[id]?.length ? 3 : 2} />
          <div className="rfq-detail-hero-inner">
            <div>
              <span className="eyebrow">
                {request.preview
                  ? "Your order preview"
                  : "Example sourcing request"}
              </span>
              <h1>{request.title}</h1>
              <p>
                {request.preview
                  ? "Not published. Review companies before choosing who to contact."
                  : "Fictional order and responses. Try choosing a supplier and opening a conversation."}
              </p>
            </div>
            <Link className="button button-secondary" href="/buyer/rfqs/new">
              Describe another order
            </Link>
          </div>
        </div>
      </section>
      <div className="container rfq-detail-content">
        <details className="order-brief">
          <summary>View your full brief</summary>
          <dl className="brief-review">
            <div>
              <dt>Product category</dt>
              <dd>{request.category}</dd>
            </div>
            <div>
              <dt>Design specifications</dt>
              <dd>{request.techPack ?? <span>To be discussed</span>}</dd>
            </div>
            <div>
              <dt>Describe the order</dt>
              <dd>
                {request.description || <span>No description added</span>}
              </dd>
            </div>
            <div>
              <dt>Certification or documentation needs</dt>
              <dd>
                {request.documentation || (
                  <span>Confirm requirements with the supplier</span>
                )}
              </dd>
            </div>
          </dl>
          <div className="chip-row">
            {request.requirements.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </details>
        <RFQComparison rfq={request} />
      </div>
    </main>
  );
}
