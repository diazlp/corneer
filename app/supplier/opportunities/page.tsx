import { BadgeCheck, Eye, Send, Sparkles, TrendingUp } from "lucide-react";
import { rfqs } from "@/lib/data";
import { RFQCard } from "@/components/ui";

export default function SupplierOpportunitiesPage() {
  return (
    <main className="workspace-page supplier-workspace">
      <div className="container workspace-header">
        <div>
          <span className="workspace-label">
            Supplier workspace · Pearl River Performance Wear
          </span>
          <h1>Opportunities worth opening.</h1>
          <p>
            Buyer businesses are checked privately before an RFQ reaches your
            team.
          </p>
        </div>
        <button className="button button-secondary">
          <Eye size={16} />
          Preview company profile
        </button>
      </div>
      <div className="container supplier-stats-row">
        <div>
          <span>
            <Sparkles />
          </span>
          <strong>12</strong>
          <p>
            New matched opportunities<small>+4 this week</small>
          </p>
        </div>
        <div>
          <span>
            <Send />
          </span>
          <strong>4</strong>
          <p>
            Responses in progress<small>2 awaiting buyer review</small>
          </p>
        </div>
        <div>
          <span>
            <BadgeCheck />
          </span>
          <strong>2</strong>
          <p>
            Buyer shortlists<small>1 identity revealed</small>
          </p>
        </div>
        <div>
          <span>
            <TrendingUp />
          </span>
          <strong>96%</strong>
          <p>
            Profile completeness<small>Strong buyer confidence</small>
          </p>
        </div>
      </div>

      <section className="container opportunity-workspace-layout">
        <aside className="opportunity-filters">
          <h3>Opportunity feed</h3>
          <nav>
            <button className="active">
              Recommended <span>12</span>
            </button>
            <button>
              Invited directly <span>2</span>
            </button>
            <button>
              Responded <span>4</span>
            </button>
            <button>
              Saved <span>3</span>
            </button>
          </nav>
          <div className="filter-group">
            <strong>Product category</strong>
            {[
              "Running apparel",
              "Activewear sets",
              "Teamwear",
              "Outerwear",
            ].map((item, index) => (
              <label className="check-control" key={item}>
                <input type="checkbox" defaultChecked={index < 2} />
                <span />
                {item}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <strong>Order quantity</strong>
            <label className="radio-control">
              <input type="radio" name="supplier-qty" defaultChecked />
              <span />
              Any quantity
            </label>
            <label className="radio-control">
              <input type="radio" name="supplier-qty" />
              <span />
              1,000+ units
            </label>
            <label className="radio-control">
              <input type="radio" name="supplier-qty" />
              <span />
              5,000+ units
            </label>
          </div>
          <div className="supplier-quality-note">
            <BadgeCheck />
            <p>
              <strong>Keep your response quality high</strong>Relevant, timely
              responses improve your opportunity access.
            </p>
          </div>
        </aside>
        <div className="opportunity-feed">
          <div className="feed-header">
            <div>
              <h2>Recommended for your company</h2>
              <p>Based on categories, MOQ, materials, and export experience.</p>
            </div>
            <select>
              <option>Best match</option>
              <option>Newest first</option>
              <option>Deadline soon</option>
            </select>
          </div>
          {rfqs.map((rfq) => (
            <RFQCard
              key={rfq.id}
              rfq={rfq}
              href={`/supplier/opportunities/${rfq.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
