import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  Clock3,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import { Product, RFQ, Supplier } from "@/lib/data";

export function VerificationBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "verified-badge compact" : "verified-badge"}>
      <BadgeCheck size={compact ? 14 : 16} />
      Business checked
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="supplier-card">
      <Link href={`/suppliers/${supplier.id}`} className="supplier-image-wrap">
        <img src={supplier.heroImage} alt="" className="supplier-image" />
        <span className="company-type">
          <Building2 size={13} />
          {supplier.type}
        </span>
      </Link>
      <div className="supplier-card-body">
        <div className="supplier-title-row">
          <span
            className="supplier-logo"
            style={{ background: supplier.logoColor }}
          >
            {supplier.shortName}
          </span>
          <div>
            <Link href={`/suppliers/${supplier.id}`}>
              <h3>{supplier.name}</h3>
            </Link>
            <p>
              <MapPin size={13} />
              {supplier.location}
            </p>
          </div>
        </div>
        <div className="chip-row">
          {supplier.categories.slice(0, 3).map((category) => (
            <span className="chip" key={category}>
              {category}
            </span>
          ))}
        </div>
        <div className="supplier-stats">
          <div>
            <span>Operating</span>
            <strong>{supplier.years} years</strong>
          </div>
          <div>
            <span>Minimum order</span>
            <strong>{supplier.moq} units</strong>
          </div>
          <div>
            <span>Replies in</span>
            <strong>{supplier.responseTime}</strong>
          </div>
        </div>
        <div className="supplier-card-footer">
          <VerificationBadge compact />
          <Link href={`/suppliers/${supplier.id}`}>
            View company <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductCard({
  product,
  supplier,
}: {
  product: Product;
  supplier?: Supplier;
}) {
  return (
    <article className="product-card">
      <Link
        href={`/suppliers/${product.supplierId}`}
        className="product-image-wrap"
      >
        <img src={product.image} alt="" />
        <span className="product-moq">MOQ {product.moq}</span>
      </Link>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.material}</p>
        <div className="product-supplier">
          <span
            className="mini-logo"
            style={{ background: supplier?.logoColor }}
          >
            {supplier?.shortName}
          </span>
          <span>
            {supplier?.name}
            <small>
              <ShieldCheck size={12} /> Checked business
            </small>
          </span>
        </div>
      </div>
    </article>
  );
}

export function RFQCard({ rfq, href }: { rfq: RFQ; href: string }) {
  return (
    <article className="rfq-card">
      <div className="rfq-card-top">
        <span
          className={`status status-${rfq.status.toLowerCase().replaceAll(" ", "-")}`}
        >
          {rfq.status}
        </span>
        <span className="match-score">{rfq.category}</span>
      </div>
      <h3>
        <Link href={href}>{rfq.title}</Link>
      </h3>
      <p className="buyer-label">
        <BadgeCheck size={15} />
        {rfq.buyerLabel} · {rfq.buyerLocation}
      </p>
      <p className="rfq-description">{rfq.description}</p>
      <div className="rfq-facts">
        <span>
          <Package size={16} />
          <span>
            Quantity<strong>{rfq.quantity}</strong>
          </span>
        </span>
        <span>
          <Clock3 size={16} />
          <span>
            Respond by<strong>{rfq.deadline}</strong>
          </span>
        </span>
        <span>
          <MapPin size={16} />
          <span>
            Delivery<strong>{rfq.delivery}</strong>
          </span>
        </span>
      </div>
      <div className="rfq-card-footer">
        <span>
          Posted {rfq.posted} · {rfq.responses} responses
        </span>
        <Link className="text-link" href={href}>
          Review opportunity <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export function TrustNote() {
  return (
    <div className="trust-note">
      <ShieldCheck size={18} />
      <p>
        <strong>Transparent checks, not guarantees.</strong> Corneer shows what
        was reviewed, when it was reviewed, and which claims remain
        supplier-reported.
      </p>
    </div>
  );
}

export function EmptyCheck({ children }: { children: React.ReactNode }) {
  return (
    <span className="empty-check">
      <Check size={14} />
      {children}
    </span>
  );
}
