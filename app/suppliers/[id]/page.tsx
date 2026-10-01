import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  Factory,
  Globe2,
  Info,
  MapPin,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getProductsForSupplier, getSupplier, suppliers } from "@/lib/data";
import { ProductCard, TrustNote } from "@/components/ui";
import { ProfileActions } from "@/components/profile-actions";

export function generateStaticParams() {
  return suppliers.map((supplier) => ({ id: supplier.id }));
}

export default async function SupplierProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supplier = getSupplier(id);
  if (!supplier) notFound();
  const supplierProducts = getProductsForSupplier(id);

  return (
    <main className="profile-page">
      <div className="container breadcrumb">
        <Link href="/suppliers">
          <ArrowLeft size={14} />
          All suppliers
        </Link>
        <span>/</span>
        <span>{supplier.name}</span>
      </div>
      <section className="profile-hero">
        <img className="profile-hero-image" src={supplier.heroImage} alt="" />
        <div className="profile-hero-overlay" />
        <div className="container profile-hero-content">
          <div
            className="profile-logo"
            style={{ background: supplier.logoColor }}
          >
            {supplier.shortName}
          </div>
          <div className="profile-identity">
            <div className="profile-name-line">
              <h1>{supplier.name}</h1>
              <span className="profile-check">
                <BadgeCheck size={19} />
                Business checked
              </span>
            </div>
            <p>
              <MapPin size={15} />
              {supplier.location}
              <i /> <Building2 size={15} />
              {supplier.type}
              <i />
              Established {2026 - supplier.years}
            </p>
          </div>
          <ProfileActions supplierName={supplier.name} />
        </div>
      </section>

      <div className="profile-subnav">
        <div className="container">
          <a href="#overview" className="active">
            Overview
          </a>
          <a href="#capabilities">Capabilities</a>
          <a href="#products">Products</a>
          <a href="#verification">Verification</a>
        </div>
      </div>

      <div className="container profile-layout">
        <div className="profile-main">
          <section id="overview" className="profile-section">
            <span className="eyebrow">Company overview</span>
            <h2>Production built around performance.</h2>
            <p className="profile-lead">{supplier.about}</p>
            <div className="company-facts">
              <div>
                <CalendarDays />
                <span>
                  Operating history<strong>{supplier.years} years</strong>
                </span>
              </div>
              <div>
                <Users />
                <span>
                  Company size<strong>{supplier.employees} people</strong>
                </span>
              </div>
              <div>
                <Package />
                <span>
                  Typical minimum<strong>{supplier.moq} units</strong>
                </span>
              </div>
              <div>
                <Clock3 />
                <span>
                  Typical response<strong>{supplier.responseTime}</strong>
                </span>
              </div>
            </div>
          </section>

          <section id="capabilities" className="profile-section">
            <span className="eyebrow">Capabilities</span>
            <h2>What this company says it can do</h2>
            <div className="capability-columns">
              <div>
                <h3>
                  <Factory size={17} />
                  Production capabilities
                </h3>
                {supplier.capabilities.map((item) => (
                  <span className="capability-item" key={item}>
                    <Check size={14} />
                    {item}
                  </span>
                ))}
              </div>
              <div>
                <h3>
                  <Package size={17} />
                  Materials
                </h3>
                {supplier.materials.map((item) => (
                  <span className="capability-item" key={item}>
                    <Check size={14} />
                    {item}
                  </span>
                ))}
              </div>
              <div>
                <h3>
                  <Globe2 size={17} />
                  Export experience
                </h3>
                {supplier.markets.map((item) => (
                  <span className="capability-item" key={item}>
                    <Check size={14} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="reported-note">
              <Info size={15} />
              Capabilities are supplier-reported unless a verification check
              below states otherwise.
            </div>
          </section>

          <section id="products" className="profile-section">
            <span className="eyebrow">Representative work</span>
            <h2>Product showcases</h2>
            <p>
              Examples demonstrate category fit and production experience. They
              are not ready-to-checkout inventory.
            </p>
            <div className="product-grid profile-product-grid">
              {supplierProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  supplier={supplier}
                />
              ))}
            </div>
          </section>

          <section
            id="verification"
            className="profile-section verification-section"
          >
            <span className="eyebrow">Transparent verification</span>
            <h2>What Corneer reviewed</h2>
            <TrustNote />
            <div className="verification-list">
              {supplier.verification.map((check) => (
                <div className="verification-row" key={check.label}>
                  <span className={`verification-icon state-${check.state}`}>
                    {check.state === "checked" ? (
                      <BadgeCheck />
                    ) : check.state === "reviewed" ? (
                      <ShieldCheck />
                    ) : (
                      <Info />
                    )}
                  </span>
                  <div>
                    <strong>{check.label}</strong>
                    <p>{check.detail}</p>
                  </div>
                  <div className={`verification-state state-${check.state}`}>
                    {check.state}
                    {check.checkedAt && <small>{check.checkedAt}</small>}
                  </div>
                </div>
              ))}
            </div>
            <div className="verification-boundary">
              <strong>No guarantee of future performance</strong>
              <p>
                These checks reduce basic identity uncertainty. They do not
                guarantee product quality, delivery, pricing, or commercial
                outcomes. Request samples and conduct your own due diligence
                before ordering.
              </p>
            </div>
          </section>
        </div>

        <aside className="profile-sidebar">
          <div className="sidebar-card contact-card">
            <span className="response-indicator">
              <i />
              Usually responds {supplier.responseTime}
            </span>
            <h3>Start a serious conversation</h3>
            <p>
              Tell {supplier.name} what you need. Your company identity stays
              under your control.
            </p>
            <button className="button button-dark">Contact supplier</button>
            <Link className="button button-secondary" href="/buyer/rfqs/new">
              Invite to an RFQ
            </Link>
            <small>
              No public email scraping. Messages start inside Corneer.
            </small>
          </div>
          <div className="sidebar-card">
            <h3>Company at a glance</h3>
            <dl>
              <div>
                <dt>Company type</dt>
                <dd>{supplier.type}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{supplier.location}</dd>
              </div>
              <div>
                <dt>Minimum order</dt>
                <dd>From {supplier.moq} units</dd>
              </div>
              <div>
                <dt>Response rate</dt>
                <dd>{supplier.responseRate}%</dd>
              </div>
            </dl>
          </div>
          <div className="sidebar-card">
            <h3>Need more evidence?</h3>
            <p>
              Ask a question about a check or request additional documentation
              after starting an inquiry.
            </p>
            <button className="plain-button">Ask about verification →</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
