import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { suppliers } from "@/lib/data";
import { SectionHeading, SupplierCard } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, shareImage, siteUrl } from "@/lib/seo";

export const metadata = pageMetadata(
  "Apparel sourcing for buyers",
  "Describe your apparel order, compare manufacturers and trading companies, and choose who to contact. Explore the fictional Corneer sourcing demo.",
  "/",
);

export default function HomePage() {
  const featuredSuppliers = suppliers.filter((supplier) => supplier.featured);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Corneer",
          url: siteUrl,
          description:
            "A frontend demonstration of a B2B apparel sourcing network using fictional companies and opportunities.",
          inLanguage: "en",
          image: shareImage.url,
        }}
      />
      <section className="hero">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker">Apparel sourcing for buyers</span>
            <h1>
              Find a supplier for your next <em>apparel order.</em>
            </h1>
            <p>
              Describe your order, compare what companies can offer, and choose
              who to contact.
            </p>
            <div className="buyer-hero-actions">
              <Link className="button button-lime" href="/buyer/rfqs/new">
                Describe your order <ArrowRight size={17} />
              </Link>
              <Link className="button button-ghost-light" href="/suppliers">
                Browse suppliers
              </Link>
            </div>
            <p className="buyer-hero-note">
              <ShieldCheck size={16} /> Your company stays private until you
              choose to share it.
            </p>
          </div>

          <div className="hero-market-card">
            <div className="market-card-header">
              <div>Worked example</div>
              <span>Fictional demo</span>
            </div>
            <div className="market-card-body">
              <h2>A recycled running collection</h2>
              <p>5,000 units · 4 styles · Three different sourcing options</p>
              <div className="example-options">
                <div className="example-option">
                  <span>Manufacturer</span>
                  <strong>Pearl River Performance Wear</strong>
                  <p>
                    Reports comparable running tops. Confirm whether it can
                    produce all four styles.
                  </p>
                </div>
                <div className="example-option">
                  <span>Manufacturer</span>
                  <strong>Summit Technical Outerwear</strong>
                  <p>
                    Reports outerwear capability. Suggests another factory for
                    the base layers.
                  </p>
                </div>
                <div className="example-option">
                  <span>Trading company</span>
                  <strong>Harbor Stitch Sourcing</strong>
                  <p>
                    Offers to coordinate two factories. Confirm who will produce
                    each style.
                  </p>
                </div>
              </div>
              <Link
                className="text-link large"
                href="/buyer/rfqs/rfq-recycled-running"
              >
                Walk through an example <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="trust-strip buyer-how">
        <div className="container trust-strip-inner">
          <div>
            <span className="number-mark">01</span>
            <p>
              <strong>Describe your order</strong>Share the apparel, quantity
              and timing you need. Your company name stays private.
            </p>
          </div>
          <div>
            <span className="number-mark">02</span>
            <p>
              <strong>Review companies</strong>Compare supplier responses,
              evidence and questions still to resolve.
            </p>
          </div>
          <div>
            <span className="number-mark">03</span>
            <p>
              <strong>Choose who to contact</strong>Save a shortlist, then
              decide who can see your identity and start a conversation.
            </p>
          </div>
        </div>
      </section>

      <section className="section marketplace-section">
        <div className="container">
          <SectionHeading
            eyebrow="Explore the demo directory"
            title="Meet the companies behind the apparel"
            description="Browse fictional manufacturers and trading companies. Each profile shows company type, capabilities and supporting evidence."
            action={
              <Link className="button button-secondary" href="/suppliers">
                Browse suppliers <ArrowRight size={16} />
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

      <section className="section trust-strip">
        <div className="container">
          <SectionHeading
            eyebrow="Understand the evidence"
            title="What the checks tell you"
            description="Each label explains where the information comes from."
          />
          <div className="trust-strip-inner">
            <div>
              <p>
                <strong>Checked</strong>Business registration and representative
                identity matched against submitted records.
              </p>
            </div>
            <div>
              <p>
                <strong>Reviewed</strong>Factory or certification evidence
                inspected. This does not establish future performance.
              </p>
            </div>
            <div>
              <p>
                <strong>Company-reported</strong>Capabilities, quantities,
                prices and timelines supplied by the company. Confirm them
                before ordering.
              </p>
            </div>
          </div>
          <p>
            Corneer does not guarantee quality, delivery, payment or transaction
            outcomes.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link href="/" className="brand footer-brand">
              <span className="brand-mark">
                <i />
                <i />
              </span>
              <span>CORNEER</span>
            </Link>
            <p>
              A frontend proof of concept for apparel sourcing. All companies
              and opportunities are fictional. Requests and messages are not
              sent to real companies.
            </p>
          </div>
          <div>
            <strong>For buyers</strong>
            <Link href="/buyer/rfqs/new">Describe your order</Link>
            <Link href="/suppliers">Browse suppliers</Link>
            <Link href="/buyer/rfqs">My requests</Link>
          </div>
          <div>
            <strong>More to explore</strong>
            <Link href="/products">Product examples</Link>
            <Link href="/supplier/opportunities">Supplier workspace</Link>
            <Link href="/admin/verification">Admin workspace</Link>
          </div>
          <div>
            <strong>Try the journey</strong>
            <Link href="/buyer/rfqs/rfq-recycled-running">
              Walk through an example
            </Link>
            <p>
              Review responses, choose companies and control identity sharing.
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
