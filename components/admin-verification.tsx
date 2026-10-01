"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  MessageSquare,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { verificationQueue } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";

export function AdminVerification() {
  const { toast } = useDemo();
  const [selectedId, setSelectedId] = useState(verificationQueue[0].id);
  const [showQueue, setShowQueue] = useState(false);
  const [decision, setDecision] = useState<
    "pending" | "approved" | "requested"
  >("pending");
  const selected = verificationQueue.find((item) => item.id === selectedId)!;

  const selectItem = (id: string) => {
    setSelectedId(id);
    setDecision("pending");
    setShowQueue(false);
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">
            <i />
            <i />
          </span>
          <span>
            CORNEER<small>Operations</small>
          </span>
        </div>
        <nav>
          <span>Workspace</span>
          <button>
            <ShieldCheck />
            Overview
          </button>
          <button className="active">
            <BadgeCheck />
            Verification <i>4</i>
          </button>
          <button>
            <FileText />
            RFQ review <i>3</i>
          </button>
          <button>
            <Building2 />
            Companies
          </button>
          <span>Trust & safety</span>
          <button>
            <AlertTriangle />
            Reports <i>1</i>
          </button>
          <button>
            <MessageSquare />
            Support
          </button>
        </nav>
        <div className="admin-user">
          <span>MD</span>
          <div>
            <strong>Maya Diaz</strong>
            <small>Administrator</small>
          </div>
          <button>•••</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>Verification review</h1>
            <p>Review evidence and record exactly what Corneer checked.</p>
          </div>
          <label>
            <Search />
            <input placeholder="Search cases" />
          </label>
        </header>
        <div className="admin-metrics">
          <div>
            <span className="metric-icon amber">
              <Clock3 />
            </span>
            <p>
              <small>Awaiting review</small>
              <strong>4</strong>
            </p>
            <em>2 due today</em>
          </div>
          <div>
            <span className="metric-icon blue">
              <FileCheck2 />
            </span>
            <p>
              <small>Information requested</small>
              <strong>2</strong>
            </p>
            <em>Waiting on company</em>
          </div>
          <div>
            <span className="metric-icon green">
              <BadgeCheck />
            </span>
            <p>
              <small>Approved this month</small>
              <strong>18</strong>
            </p>
            <em>Median: 1.4 days</em>
          </div>
          <div>
            <span className="metric-icon red">
              <AlertTriangle />
            </span>
            <p>
              <small>Escalated</small>
              <strong>1</strong>
            </p>
            <em>Requires second review</em>
          </div>
        </div>

        <section
          className={`verification-workbench${showQueue ? " show-queue" : ""}`}
        >
          <div className="case-list">
            <div className="case-list-head">
              <div>
                <h2>Review queue</h2>
                <span>4 open cases</span>
              </div>
              <select>
                <option>Priority</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            {verificationQueue.map((item) => (
              <button
                key={item.id}
                className={selectedId === item.id ? "active" : ""}
                onClick={() => selectItem(item.id)}
              >
                <span className={`case-type ${item.type.toLowerCase()}`}>
                  {item.type === "Supplier" ? <Building2 /> : <UserRound />}
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.type} · {item.country}
                  </p>
                  <small>{item.submitted}</small>
                </div>
                <span className="case-checks">
                  {item.checks}
                  <small>{item.status}</small>
                </span>
                <ChevronRight />
              </button>
            ))}
          </div>

          <div className="case-detail">
            <div className="case-detail-head">
              <button
                className="mobile-back"
                aria-label="Back to review queue"
                onClick={() => setShowQueue(true)}
              >
                <ArrowLeft />
              </button>
              <span className={`case-type ${selected.type.toLowerCase()}`}>
                {selected.type === "Supplier" ? <Building2 /> : <UserRound />}
              </span>
              <div>
                <span>Verification case · CRN-V-0942</span>
                <h2>{selected.name}</h2>
                <p>
                  {selected.type} · {selected.country} · Submitted{" "}
                  {selected.submitted}
                </p>
              </div>
              <span className="risk-pill">
                <ShieldCheck />
                {selected.risk} risk
              </span>
            </div>

            {decision !== "pending" && (
              <div className={`decision-banner ${decision}`}>
                <span>
                  {decision === "approved" ? <Check /> : <MessageSquare />}
                </span>
                <div>
                  <strong>
                    {decision === "approved"
                      ? "Business identity approved"
                      : "Additional information requested"}
                  </strong>
                  <p>
                    {decision === "approved"
                      ? "The decision and reviewer were recorded in the audit history."
                      : "The company will receive a structured request without seeing internal notes."}
                  </p>
                </div>
                <button onClick={() => setDecision("pending")}>
                  <X />
                </button>
              </div>
            )}

            <div className="review-checklist">
              <div className="review-check-row complete">
                <span>
                  <Check />
                </span>
                <div>
                  <strong>Legal business registration</strong>
                  <p>
                    Registry name, number, and company address match the
                    submitted record.
                  </p>
                  <small>Reviewed against uploaded registration document</small>
                </div>
                <button>View evidence</button>
              </div>
              <div className="review-check-row complete">
                <span>
                  <Check />
                </span>
                <div>
                  <strong>Representative identity</strong>
                  <p>
                    Representative name and company relationship were confirmed
                    on a video call.
                  </p>
                  <small>Call completed 18 Sep 2026 · 14:30 HKT</small>
                </div>
                <button>View notes</button>
              </div>
              <div className="review-check-row complete">
                <span>
                  <Check />
                </span>
                <div>
                  <strong>Company contact and domain</strong>
                  <p>
                    Business email domain matches the public company website.
                  </p>
                  <small>finance@form-athletics.example · Domain checked</small>
                </div>
                <button>View details</button>
              </div>
              <div className="review-check-row pending">
                <span>4</span>
                <div>
                  <strong>Factory existence evidence</strong>
                  <p>
                    Review the timestamped production-floor media and declared
                    operating address.
                  </p>
                  <div className="evidence-files">
                    <button>
                      <FileText />
                      <span>
                        <b>factory_walkthrough.mp4</b>
                        <small>84 MB · Uploaded yesterday</small>
                      </span>
                    </button>
                    <button>
                      <FileText />
                      <span>
                        <b>operating_address.pdf</b>
                        <small>1.1 MB · Uploaded yesterday</small>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="review-check-row locked">
                <span>5</span>
                <div>
                  <strong>Capability evidence</strong>
                  <p>
                    Record which capability evidence was reviewed and which
                    claims remain self-reported.
                  </p>
                </div>
              </div>
            </div>

            <div className="reviewer-note">
              <label>
                <span>Internal reviewer note</span>
                <textarea
                  rows={3}
                  defaultValue="Registration and representative checks are consistent. Factory walkthrough appears current; confirm exterior address evidence before approval."
                />
              </label>
              <small>Never visible to the applicant</small>
            </div>
            <div className="review-actions">
              <button
                className="button button-danger"
                onClick={() => {
                  setDecision("requested");
                  toast("Information request recorded");
                }}
              >
                <MessageSquare />
                Request information
              </button>
              <button
                className="button button-dark"
                onClick={() => {
                  setDecision("approved");
                  toast("Verification decision recorded");
                }}
              >
                <BadgeCheck />
                Approve checked items
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
