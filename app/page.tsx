import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { products, rfqs, suppliers } from "@/lib/data";
import {
  ProductCard,
  SectionHeading,
  SupplierCard,
  VerificationBadge,
} from "@/components/ui";

export default function HomePage() {
  const featuredSuppliers = suppliers.filter((supplier) => supplier.featured);
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      <section className="hero">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker">
              <Sparkles size={15} />
              Curated apparel sourcing, without the noise
            </span>
            <h1>
              Source the maker.
              <br />
              <em>Not the mystery.</em>
            </h1>
            <p>
              Discover evidence-checked sportswear manufacturers or publish a
              private sourcing request to the right production partners.
            </p>
            <form className="hero-search" action="/suppliers">
              <Search size={20} />
              <input
                name="q"
                aria-label="Search suppliers"
                placeholder="Try “recycled running wear”"
              />
              <button type="submit">
                Find suppliers <ArrowRight size={17} />
              </button>
            </form>
            <div className="hero-proof">
              <span>
                <CheckCircle2 size={15} />
                Company identity checked
              </span>
              <span>
                <CheckCircle2 size={15} />
                Manufacturer type disclosed
              </span>
              <span>
                <CheckCircle2 size={15} />
                Buyer privacy controlled
              </span>
            </div>
          </div>

          <div className="hero-market-card">
            <div className="market-card-header">
              <div>
                <span className="live-dot" />
                Live opportunity
              </div>
              <span>96% match</span>
            </div>
            <div className="market-card-body">
              <span className="private-pill">
                <ShieldCheck size={14} />
                Buyer identity protected
              </span>
              <h2>Recycled running collection — SS27</h2>
              <p>Verified performance-wear brand · Copenhagen</p>
              <div className="market-specs">
                <div>
                  <span>Order</span>
                  <strong>5,000 units</strong>
                </div>
                <div>
                  <span>Styles</span>
                  <strong>4 styles</strong>
                </div>
                <div>
                  <span>Material</span>
                  <strong>GRS recycled</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>Feb 2027</strong>
                </div>
              </div>
              <div className="market-suppliers">
                <div className="avatar-stack">
                  <span>PR</span>
                  <span>ST</span>
                  <span>HS</span>
                </div>
                <p>
                  <strong>3 relevant suppliers</strong>
                  <br />
                  have responded
                </p>
                <Link href="/buyer/rfqs/rfq-recycled-running">
                  View match <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>Built for focused sourcing teams</span>
          <div>
            <strong>Hong Kong</strong>
            <i /> <strong>China</strong>
            <i /> <strong>Global buyers</strong>
          </div>
          <span>Demo vertical: sportswear</span>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <div>
            <span className="number-mark">01</span>
            <p>
              <strong>Know who you’re dealing with</strong>Legal identity and
              company type shown clearly.
            </p>
          </div>
          <div>
            <span className="number-mark">02</span>
            <p>
              <strong>Share demand selectively</strong>Private RFQs reach
              relevant, eligible suppliers.
            </p>
          </div>
          <div>
            <span className="number-mark">03</span>
            <p>
              <strong>Move when there’s mutual fit</strong>Reveal identity,
              talk, and meet on your terms.
            </p>
          </div>
        </div>
      </section>

      <section className="section marketplace-section">
        <div className="container">
          <SectionHeading
            eyebrow="Curated directory"
            title="Meet companies built for the work"
            description="Compare real capabilities and transparent evidence—not paid placement and vague badges."
            action={
              <Link className="button button-secondary" href="/suppliers">
                Explore all suppliers <ArrowRight size={16} />
              </Link>
            }
          />
          <div className="supplier-grid">
            {featuredSuppliers.map((supplier) => (
              <SupplierCard supplier={supplier} key={supplier.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section product-section">
        <div className="container">
          <SectionHeading
            eyebrow="Product inspiration"
            title="Start with a product. Find the company behind it."
            description="Representative products help buyers discover relevant makers. Every product leads back to a company profile."
            action={
              <Link className="text-link large" href="/products">
                Browse product showcases <ArrowRight size={17} />
              </Link>
            }
          />
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                supplier={suppliers.find((s) => s.id === product.supplierId)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section process-section">
        <div className="container process-grid">
          <div className="process-copy">
            <span className="eyebrow light">For buyers</span>
            <h2>
              One request.
              <br />A smaller, better shortlist.
            </h2>
            <p>
              Your company is checked by Corneer, but its identity stays private
              until you decide a supplier is worth meeting.
            </p>
            <div className="process-steps">
              <div>
                <span>
                  <Send size={18} />
                </span>
                <p>
                  <strong>Publish a structured request</strong>Tell suppliers
                  enough to judge fit without revealing your company.
                </p>
              </div>
              <div>
                <span>
                  <Building2 size={18} />
                </span>
                <p>
                  <strong>Compare companies, not bids alone</strong>Review
                  capabilities, evidence, response quality, and commercial fit.
                </p>
              </div>
              <div>
                <span>
                  <BadgeCheck size={18} />
                </span>
                <p>
                  <strong>Reveal when you are ready</strong>Shortlist, share
                  your identity, and continue directly.
                </p>
              </div>
            </div>
            <Link href="/buyer/rfqs/new" className="button button-lime">
              Create a sourcing request <ArrowRight size={17} />
            </Link>
          </div>
          <div className="response-preview">
            <div className="preview-toolbar">
              <span>Supplier responses</span>
              <span>3 responses</span>
            </div>
            {[
              [
                "PR",
                "Pearl River Performance Wear",
                "96",
                "$8.40–$16.80",
                "75–90 days",
                "#193c35",
              ],
              [
                "ST",
                "Summit Technical Outerwear",
                "89",
                "$10.20–$19.40",
                "85–100 days",
                "#3c4a2b",
              ],
              [
                "HS",
                "Harbor Stitch Sourcing",
                "86",
                "$9.10–$18.20",
                "70–95 days",
                "#294066",
              ],
            ].map(([initials, name, fit, price, lead, color], index) => (
              <div
                className={`mini-response ${index === 0 ? "active" : ""}`}
                key={name}
              >
                <span
                  className="mini-response-logo"
                  style={{ background: color }}
                >
                  {initials}
                </span>
                <div className="mini-response-name">
                  <strong>{name}</strong>
                  <VerificationBadge compact />
                </div>
                <div>
                  <span>Indicative</span>
                  <strong>{price}</strong>
                </div>
                <div>
                  <span>Lead time</span>
                  <strong>{lead}</strong>
                </div>
                <span className="fit-ring">
                  {fit}
                  <small>%</small>
                </span>
              </div>
            ))}
            <div className="preview-note">
              <ShieldCheck size={17} />
              <span>
                Buyer identity remains hidden until you choose to reveal it.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section opportunities-section">
        <div className="container opportunity-layout">
          <div>
            <span className="eyebrow">For manufacturers</span>
            <h2>
              Less prospecting.
              <br />
              More relevant demand.
            </h2>
            <p>
              See structured opportunities from businesses that Corneer has
              already checked.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle2 />
                Only relevant categories
              </li>
              <li>
                <CheckCircle2 />
                Clear quantity and timeline
              </li>
              <li>
                <CheckCircle2 />
                Buyer business checked privately
              </li>
              <li>
                <CheckCircle2 />
                No public email scraping
              </li>
            </ul>
            <Link href="/supplier/opportunities" className="button button-dark">
              Preview supplier workspace <ArrowRight size={17} />
            </Link>
          </div>
          <div className="opportunity-stack">
            {rfqs.slice(0, 3).map((rfq, index) => (
              <div
                className="opportunity-mini-card"
                key={rfq.id}
                style={{ transform: `translateX(${index * 12}px)` }}
              >
                <div>
                  <span className="live-dot" />
                  {rfq.posted}
                  <strong>{rfq.fit}% fit</strong>
                </div>
                <h3>{rfq.title}</h3>
                <p>
                  <BadgeCheck size={14} />
                  {rfq.buyerLabel} · {rfq.buyerLocation}
                </p>
                <div>
                  <span>{rfq.quantity}</span>
                  <span>{rfq.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <Globe2 size={52} />
          <div>
            <span className="eyebrow light">A clearer first conversation</span>
            <h2>Good business starts before the first message.</h2>
            <p>
              Discover who a company is, what it can do, and what Corneer
              actually checked.
            </p>
          </div>
          <div>
            <Link className="button button-lime" href="/suppliers">
              Find a supplier <ArrowRight size={17} />
            </Link>
            <Link className="button button-ghost-light" href="/buyer/rfqs/new">
              Post a request
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">
                <i />
                <i />
              </span>
              <span>CORNEER</span>
            </div>
            <p>
              A focused B2B sourcing network for serious apparel buyers and
              capable production partners.
            </p>
          </div>
          <div>
            <strong>Discover</strong>
            <Link href="/suppliers">Suppliers</Link>
            <Link href="/products">Products</Link>
            <Link href="/buyer/rfqs/new">Post an RFQ</Link>
          </div>
          <div>
            <strong>Demo views</strong>
            <Link href="/buyer/rfqs">Buyer workspace</Link>
            <Link href="/supplier/opportunities">Supplier workspace</Link>
            <Link href="/admin/verification">Admin workspace</Link>
          </div>
          <div>
            <strong>Principle</strong>
            <p>
              We explain what was checked. We never guarantee a company’s future
              performance.
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Corneer concept</span>
          <span>Fictional demo data · Not a live marketplace</span>
        </div>
      </footer>
    </main>
  );
}
