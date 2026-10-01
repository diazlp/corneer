"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";
import { getSupplier, RFQ, rfqResponses } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";

export function RFQComparison({ rfq }: { rfq: RFQ }) {
  const {
    shortlisted,
    toggleShortlist,
    identityRevealed,
    revealIdentity,
    toast,
  } = useDemo();
  const responses = rfqResponses.filter(
    (response) => response.rfqId === rfq.id,
  );

  return (
    <>
      <div className="rfq-detail-summary">
        <div>
          <span>Quantity</span>
          <strong>{rfq.quantity}</strong>
        </div>
        <div>
          <span>Material</span>
          <strong>{rfq.material}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>{rfq.delivery}</strong>
        </div>
        <div>
          <span>Supplier access</span>
          <strong>{rfq.visibility}</strong>
        </div>
      </div>

      <div className="responses-title">
        <div>
          <span className="eyebrow">Supplier responses</span>
          <h2>Compare fit before price alone</h2>
          <p>{responses.length} responses · Updated 18 minutes ago</p>
        </div>
        <button className="button button-secondary">
          Sort: Best fit <ChevronDown size={14} />
        </button>
      </div>

      <div className="response-comparison-list">
        {responses.map((response) => {
          const supplier = getSupplier(response.supplierId)!;
          const isShortlisted = shortlisted.includes(supplier.id);
          return (
            <article
              className={`response-card ${isShortlisted ? "shortlisted" : ""}`}
              key={response.id}
            >
              {isShortlisted && (
                <div className="shortlist-ribbon">
                  <Star size={12} fill="currentColor" />
                  Shortlisted
                </div>
              )}
              <div className="response-company">
                <span
                  className="response-logo"
                  style={{ background: supplier.logoColor }}
                >
                  {supplier.shortName}
                </span>
                <div>
                  <Link href={`/suppliers/${supplier.id}`}>
                    <h3>{supplier.name}</h3>
                  </Link>
                  <p>
                    <MapPin size={12} />
                    {supplier.location} · {supplier.type}
                  </p>
                  <span className="inline-verified">
                    <BadgeCheck size={13} />
                    Business checked
                  </span>
                </div>
                <div className="response-fit">
                  <strong>{response.fit}%</strong>
                  <span>requirement fit</span>
                </div>
              </div>
              <div className="response-commercials">
                <div>
                  <span>Indicative range</span>
                  <strong>{response.priceRange}</strong>
                  <small>Final quote after tech pack</small>
                </div>
                <div>
                  <span>Production lead time</span>
                  <strong>{response.leadTime}</strong>
                  <small>After sample approval</small>
                </div>
                <div>
                  <span>Minimum order</span>
                  <strong>{response.moq}</strong>
                  <small>Negotiable by program</small>
                </div>
              </div>
              <div className="response-note">
                <span>Supplier note</span>
                <p>“{response.note}”</p>
              </div>
              <div className="response-strengths">
                <span>
                  <Check />
                  {supplier.capabilities[0]}
                </span>
                <span>
                  <Check />
                  {supplier.capabilities[1]}
                </span>
                <span>
                  <ShieldCheck />
                  {
                    supplier.verification.filter(
                      (item) => item.state !== "reported",
                    ).length
                  }{" "}
                  evidence checks
                </span>
              </div>
              <div className="response-actions">
                <Link
                  href={`/suppliers/${supplier.id}`}
                  className="button button-secondary button-small"
                >
                  View full profile
                </Link>
                <button
                  onClick={() => {
                    toggleShortlist(supplier.id);
                    toast(
                      isShortlisted
                        ? `${supplier.name} removed from shortlist`
                        : `${supplier.name} shortlisted`,
                    );
                  }}
                  className={
                    isShortlisted
                      ? "button button-secondary button-small"
                      : "button button-dark button-small"
                  }
                >
                  <Star
                    size={14}
                    fill={isShortlisted ? "currentColor" : "none"}
                  />
                  {isShortlisted ? "Shortlisted" : "Add to shortlist"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="identity-panel">
        <div className="identity-panel-icon">
          {identityRevealed ? <Eye /> : <EyeOff />}
        </div>
        <div>
          <span className="eyebrow">Identity control</span>
          <h3>
            {identityRevealed
              ? "Northline Athletics is now visible"
              : "Your company is still private"}
          </h3>
          <p>
            {identityRevealed
              ? "Pearl River Performance Wear can now view your company profile and direct business contact details."
              : "Shortlisted suppliers currently see only your verified buyer summary. Reveal your company when you are ready to move forward."}
          </p>
        </div>
        <div className="identity-preview">
          <span className="buyer-logo">NA</span>
          <div>
            <strong>
              {identityRevealed
                ? "Northline Athletics ApS"
                : "Verified performance-wear brand"}
            </strong>
            <small>
              {identityRevealed
                ? "Copenhagen · northline.run"
                : "Copenhagen · 8 years operating"}
            </small>
          </div>
          {!identityRevealed && <LockKeyhole size={16} />}
        </div>
        {identityRevealed ? (
          <Link href="/messages" className="button button-lime">
            <MessageSquare size={16} />
            Open conversation
          </Link>
        ) : (
          <button className="button button-lime" onClick={revealIdentity}>
            <Eye size={16} />
            Reveal to shortlisted supplier
          </button>
        )}
        <small>
          {identityRevealed
            ? "Identity reveal recorded in the opportunity history."
            : "Only Pearl River Performance Wear will receive access."}
        </small>
      </aside>
    </>
  );
}
