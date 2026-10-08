"use client";

import Link from "next/link";
import { ArrowRight, Plus, ShieldCheck } from "lucide-react";
import { useDemo } from "@/components/demo-provider";

export default function BuyerRFQsPage() {
  const { requests, responses, shortlists, reveals } = useDemo();
  return (
    <main className="workspace-page">
      <div className="container workspace-header">
        <div>
          <span className="workspace-label">Buyer workspace</span>
          <h1>My sourcing requests</h1>
          <p>
            Review companies, choose a shortlist, and decide who to contact.
          </p>
        </div>
        <Link className="button button-dark" href="/buyer/rfqs/new">
          <Plus size={17} />
          Describe your order
        </Link>
      </div>
      <section className="container workspace-section">
        <div className="workspace-section-heading">
          <div>
            <h2>Your orders and examples</h2>
            <p>
              New order previews stay in this demo session. The examples below
              are fictional.
            </p>
          </div>
        </div>
        <div className="request-list">
          {requests.map((request) => {
            const count = responses.filter(
              (item) => item.rfqId === request.id,
            ).length;
            const saved = shortlists[request.id]?.length ?? 0;
            const shared = reveals[request.id]?.length ?? 0;
            return (
              <article className="request-row" key={request.id}>
                <div>
                  <span className="eyebrow">
                    {request.preview
                      ? "Your order preview"
                      : "Example sourcing request"}
                  </span>
                  <Link href={`/buyer/rfqs/${request.id}`}>
                    <h3>{request.title}</h3>
                  </Link>
                  <p>
                    {request.quantity} · {request.delivery}
                  </p>
                  <div className="chip-row">
                    {count > 0 && (
                      <span className="chip">
                        {count} <span>supplier responses</span>
                      </span>
                    )}
                    {saved > 0 && (
                      <span className="chip">
                        {saved} <span>in your shortlist</span>
                      </span>
                    )}
                    {shared > 0 && (
                      <span className="chip">
                        {shared} <span>identity shares</span>
                      </span>
                    )}
                    {count === 0 && (
                      <span className="chip">No quotes received</span>
                    )}
                  </div>
                </div>
                <Link
                  className="button button-secondary"
                  href={`/buyer/rfqs/${request.id}`}
                >
                  {saved ? "Choose who to contact" : "Review companies"}
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <div className="container request-notice">
        <ShieldCheck size={20} />
        <p>
          Saving a supplier does not share your company identity. You choose a
          specific recipient before opening a conversation.
        </p>
      </div>
    </main>
  );
}
