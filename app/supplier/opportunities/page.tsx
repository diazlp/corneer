"use client";

import Link from "next/link";
import { useState } from "react";
import { RFQCard } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";

export default function SupplierOpportunitiesPage() {
  const { requests, responses } = useDemo();
  const [category, setCategory] = useState("All");
  const opportunities = requests.filter(
    (request) =>
      !request.preview && (category === "All" || request.category === category),
  );
  return (
    <main className="workspace-page supplier-workspace">
      <div className="container workspace-header">
        <div>
          <span className="workspace-label">
            Supplier workspace · Pearl River Performance Wear
          </span>
          <h1>Review buyer requests</h1>
          <p>
            These are fictional opportunities. A demo response appears in the
            buyer comparison during this session.
          </p>
        </div>
        <Link className="button button-secondary" href="/suppliers/pearl-river">
          View company profile
        </Link>
      </div>
      <section className="container opportunity-feed">
        <div className="feed-header">
          <div>
            <h2>Example opportunities</h2>
            <p>
              Review the requirement before deciding whether your company can
              support it.
            </p>
          </div>
          <label className="field">
            <span>Product category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {["All", "Running apparel", "Teamwear", "Activewear sets"].map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
        {opportunities.map((request) => (
          <RFQCard
            key={request.id}
            rfq={{
              ...request,
              responses: responses.filter((item) => item.rfqId === request.id)
                .length,
            }}
            href={`/supplier/opportunities/${request.id}`}
          />
        ))}
      </section>
    </main>
  );
}
