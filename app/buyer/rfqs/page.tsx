import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
} from "lucide-react";
import { rfqs } from "@/lib/data";

export default function BuyerRFQsPage() {
  return (
    <main className="workspace-page">
      <div className="container workspace-header">
        <div>
          <span className="workspace-label">Buyer workspace</span>
          <h1>Good morning, Nadia.</h1>
          <p>Here is what is moving across your sourcing requests.</p>
        </div>
        <Link className="button button-dark" href="/buyer/rfqs/new">
          <Plus size={17} />
          Create RFQ
        </Link>
      </div>
      <div className="container stats-grid">
        <div className="stat-card">
          <span className="stat-icon green">
            <TrendingUp />
          </span>
          <div>
            <small>Active RFQs</small>
            <strong>2</strong>
            <p>1 in shortlisting</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon blue">
            <BadgeCheck />
          </span>
          <div>
            <small>Supplier responses</small>
            <strong>8</strong>
            <p>3 new this week</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon amber">
            <Eye />
          </span>
          <div>
            <small>Shortlisted</small>
            <strong>3</strong>
            <p>Across 2 requests</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon purple">
            <CalendarCheck />
          </span>
          <div>
            <small>Meetings</small>
            <strong>1</strong>
            <p>Tomorrow, 09:30</p>
          </div>
        </div>
      </div>

      <section className="container workspace-section">
        <div className="workspace-section-heading">
          <div>
            <h2>Your sourcing requests</h2>
            <p>
              Manage responses, reveal your identity, and move promising
              suppliers forward.
            </p>
          </div>
          <div className="segmented">
            <button className="active">
              Active <span>2</span>
            </button>
            <button>
              Drafts <span>1</span>
            </button>
            <button>
              Closed <span>0</span>
            </button>
          </div>
        </div>
        <div className="buyer-rfq-list">
          {rfqs.slice(0, 2).map((rfq, index) => (
            <article className="buyer-rfq-row" key={rfq.id}>
              <div className="rfq-row-status">
                <span
                  className={`status status-${rfq.status.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {rfq.status}
                </span>
                <small>Published {rfq.posted}</small>
              </div>
              <div className="rfq-row-main">
                <Link href={`/buyer/rfqs/${rfq.id}`}>
                  <h3>{rfq.title}</h3>
                </Link>
                <p>
                  {rfq.quantity} · {rfq.delivery}
                </p>
                <div className="rfq-row-progress">
                  <span style={{ width: index === 0 ? "70%" : "38%" }} />
                  <i className="one" />
                  <i className="two" />
                  <i className="three" />
                </div>
                <div className="progress-labels">
                  <span>Published</span>
                  <span>Responses</span>
                  <span>Shortlist</span>
                  <span>Meeting</span>
                </div>
              </div>
              <div className="rfq-row-responses">
                <strong>{rfq.responses}</strong>
                <span>responses</span>
                <small>{index === 0 ? "2 new" : "1 new"}</small>
              </div>
              <div className="rfq-row-actions">
                <Link
                  className="button button-secondary button-small"
                  href={`/buyer/rfqs/${rfq.id}`}
                >
                  Review responses <ArrowRight size={14} />
                </Link>
                <button className="dots-button">•••</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container workspace-bottom-grid">
        <div className="activity-card">
          <div className="workspace-section-heading">
            <div>
              <h2>Recent activity</h2>
            </div>
            <button>View all</button>
          </div>
          <div className="activity-list">
            <div>
              <span className="activity-icon">
                <MessageSquare />
              </span>
              <p>
                <strong>New response from Harbor Stitch Sourcing</strong>
                <small>Recycled running collection · 18 minutes ago</small>
              </p>
            </div>
            <div>
              <span className="activity-icon">
                <BadgeCheck />
              </span>
              <p>
                <strong>Pearl River was added to your shortlist</strong>
                <small>Recycled running collection · Yesterday</small>
              </p>
            </div>
            <div>
              <span className="activity-icon">
                <CalendarCheck />
              </span>
              <p>
                <strong>Meeting accepted by Apex Teamwear</strong>
                <small>Tomorrow at 09:30 CET</small>
              </p>
            </div>
          </div>
        </div>
        <div className="profile-completeness">
          <span className="eyebrow light">Buyer trust profile</span>
          <h3>Give serious suppliers a reason to respond.</h3>
          <div className="completion-ring">
            <span>
              82<small>%</small>
            </span>
          </div>
          <p>
            Add your typical order range and sourcing categories to improve
            supplier confidence.
          </p>
          <button className="button button-lime button-small">
            Complete profile
          </button>
        </div>
      </section>
    </main>
  );
}
