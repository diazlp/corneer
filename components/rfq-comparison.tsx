"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Eye,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";
import { RFQ, suppliers, getSupplier } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";
import { candidateSuppliers, supplierFit } from "@/lib/sourcing";

export function RFQComparison({ rfq }: { rfq: RFQ }) {
  const {
    responses: allResponses,
    shortlists,
    toggleShortlist,
    reveals,
    revealIdentity,
    locale,
  } = useDemo();
  const [selectedId, setSelectedId] = useState("");
  const responses = allResponses.filter((item) => item.rfqId === rfq.id);
  const shortlisted = shortlists[rfq.id] ?? [];
  const shared = reveals[rfq.id] ?? [];
  const companies = responses.length
    ? responses.map((item) => getSupplier(item.supplierId)!).filter(Boolean)
    : candidateSuppliers(rfq, suppliers);
  const selected = getSupplier(
    shortlisted.includes(selectedId) ? selectedId : (shortlisted[0] ?? ""),
  );
  const isShared = selected && shared.includes(selected.id);
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
          <span>Your company</span>
          <strong>Private until you choose to share</strong>
        </div>
      </div>
      <div className="responses-title">
        <div>
          <span className="eyebrow">
            {responses.length ? "Supplier responses" : "Company preview"}
          </span>
          <h2>Which company is worth a conversation?</h2>
          <p>
            {responses.length
              ? "Compare what each company offers and what you still need to confirm."
              : "Based on fictional profiles. No suppliers have received your order or sent a quote."}
          </p>
        </div>
      </div>
      <div className="response-comparison-list">
        <p className="request-notice">
          Listed capabilities are company-reported. Identity checks do not
          establish production quality or availability.
        </p>
        {companies.length === 0 && (
          <div className="empty-state">
            <h3>No companies list this category</h3>
            <p>
              Try a broader category or browse companies to discuss your needs.
            </p>
            <Link className="button button-secondary" href="/suppliers">
              Browse suppliers
            </Link>
          </div>
        )}
        {companies.map((supplier) => {
          const response = responses.find(
            (item) => item.supplierId === supplier.id,
          );
          const fit = supplierFit(rfq, supplier);
          const saved = shortlisted.includes(supplier.id);
          return (
            <article
              className={`response-card ${saved ? "shortlisted" : ""}`}
              key={supplier.id}
            >
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
                {saved && (
                  <span className="chip">
                    <Star size={12} />
                    Selected
                  </span>
                )}
              </div>
              <div className="response-commercials">
                <div>
                  <span>{response ? "Indicative range" : "Price"}</span>
                  <strong>{response?.priceRange ?? "Ask the supplier"}</strong>
                  <small>
                    {response
                      ? "Final quote after specifications"
                      : "No quote received"}
                  </small>
                </div>
                <div>
                  <span>Production lead time</span>
                  <strong>{response?.leadTime ?? "Ask the supplier"}</strong>
                  <small>
                    {response
                      ? "After sample approval"
                      : "Availability unconfirmed"}
                  </small>
                </div>
                <div>
                  <span>Minimum order</span>
                  <strong>{response?.moq ?? `${supplier.moq} units`}</strong>
                  <small>Company-reported; confirm order split</small>
                </div>
              </div>
              <div className="fit-details">
                <div>
                  <strong>Why consider this company</strong>
                  <p>
                    {response?.consideration ??
                      (fit.categoryListed
                        ? "This company lists your product category."
                        : "This company does not list your product category. Ask whether it can support your order.")}
                  </p>
                  {fit.listed.length > 0 && (
                    <>
                      <span className="eyebrow">Listed in its profile</span>
                      <div className="chip-row">
                        {fit.listed.map((item) => (
                          <span className="chip" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="fit-caution">
                  <strong>Confirm before proceeding</strong>
                  {fit.belowMinimum && (
                    <p>
                      {locale === "id"
                        ? `Perkiraan ${fit.perVariant} unit per model dan warna lebih rendah dari minimum profil ${supplier.moq} unit.`
                        : `Estimated ${fit.perVariant} units per style and color is below the profile minimum of ${supplier.moq} units.`}
                    </p>
                  )}
                  {fit.unconfirmed.length > 0 && (
                    <>
                      <p>
                        These capabilities are not listed in the profile. This
                        does not prove they are unavailable.
                      </p>
                      <div className="chip-row">
                        {fit.unconfirmed.map((item) => (
                          <span className="chip" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  <p>
                    {response?.question ??
                      "Ask about style and color minimums, material documentation, samples, and the delivery schedule."}
                  </p>
                </div>
              </div>
              {response && (
                <details className="response-note">
                  <summary>Read the supplier response</summary>
                  <p>{response.note}</p>
                  {response.samplingTime && <p>{response.samplingTime}</p>}
                </details>
              )}
              <div className="response-actions">
                <Link
                  className="button button-secondary button-small"
                  href={`/suppliers/${supplier.id}#verification`}
                >
                  View evidence
                </Link>
                <button
                  className={`button ${saved ? "button-secondary" : "button-dark"} button-small`}
                  aria-pressed={saved}
                  onClick={() => {
                    toggleShortlist(rfq.id, supplier.id);
                    if (!saved) setSelectedId(supplier.id);
                  }}
                >
                  <Star size={14} fill={saved ? "currentColor" : "none"} />
                  {saved ? "Remove from shortlist" : "Save to shortlist"}
                </button>
                {saved && (
                  <a
                    className="button button-lime button-small"
                    href="#contact-company"
                  >
                    Choose who to contact
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <aside className="identity-panel" id="contact-company" tabIndex={-1}>
        <div className="identity-panel-icon">
          <ShieldCheck />
        </div>
        <span className="eyebrow light">Your next step</span>
        <h3>{selected ? "Choose who to contact" : "Start with a shortlist"}</h3>
        <p>
          {selected
            ? "Select one company. Only that company will receive your identity when you share it."
            : "Save a company that interests you. Saving does not contact it or share your identity."}
        </p>
        {shortlisted.map((id) => {
          const company = getSupplier(id);
          return (
            company && (
              <label className="shortlist-choice" key={id}>
                <input
                  type="radio"
                  name="contact-company"
                  checked={selected?.id === id}
                  onChange={() => setSelectedId(id)}
                />
                <span>
                  {company.name}
                  <small>{company.type}</small>
                </span>
              </label>
            )
          );
        })}
        {selected && (
          <>
            <div className="identity-preview">
              <div>
                <span>
                  {isShared
                    ? "Shared with this company"
                    : "What you will share"}
                </span>
                <strong>Northline Athletics ApS</strong>
                <small>Copenhagen · northline.run</small>
              </div>
            </div>
            <p className="share-recipient">
              {locale === "id" ? "Penerima:" : "Recipient:"}{" "}
              <strong>{selected.name}</strong>
            </p>
            {isShared ? (
              <Link
                href={{
                  pathname: "/messages",
                  query: { request: rfq.id, supplier: selected.id },
                }}
                className="button button-lime"
              >
                <MessageSquare size={16} />
                Open conversation
              </Link>
            ) : (
              <button
                className="button button-lime"
                onClick={() => revealIdentity(rfq.id, selected.id)}
              >
                <Eye size={16} />
                Share identity with this company
              </button>
            )}
            <small>
              {isShared
                ? "You can now discuss the order in a demo conversation."
                : "Shares the demo company profile and website. Other companies keep seeing the anonymous summary."}
            </small>
          </>
        )}
        <small>
          Demo only. No company is contacted. This session resets on reload.
        </small>
      </aside>
    </>
  );
}
