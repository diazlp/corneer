"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { suppliers } from "@/lib/data";
import { SupplierCard } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { translate } from "@/lib/i18n";

const categories = [
  "All",
  "Activewear",
  "Teamwear",
  "Running",
  "Seamless",
  "Outerwear",
  "Athleisure",
];

export function SuppliersExplorer() {
  const { locale } = useDemo();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [companyType, setCompanyType] = useState("All company types");
  const [location, setLocation] = useState("All locations");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      suppliers.filter((supplier) => {
        const terms = [
          supplier.name,
          supplier.location,
          ...supplier.categories,
          ...supplier.capabilities,
          ...supplier.materials,
        ];
        const haystack = [
          ...terms,
          ...terms.map((term) => translate(locale, term)),
        ]
          .join(" ")
          .toLowerCase();
        return (
          (!query || haystack.includes(query.toLowerCase())) &&
          (category === "All" || supplier.categories.includes(category)) &&
          (companyType === "All company types" ||
            supplier.type === companyType) &&
          (location === "All locations" || supplier.countryCode === location)
        );
      }),
    [query, category, companyType, location, locale],
  );

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setCompanyType("All company types");
    setLocation("All locations");
  };

  return (
    <>
      <div className="directory-search-panel">
        <label className="directory-search">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search capabilities, materials, or companies"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear">
              <X size={15} />
            </button>
          )}
        </label>
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        >
          <option>All locations</option>
          <option value="CN">China</option>
          <option value="HK">Hong Kong</option>
        </select>
        <select
          value={companyType}
          onChange={(event) => setCompanyType(event.target.value)}
        >
          <option>All company types</option>
          <option>Manufacturer</option>
          <option>Trading company</option>
        </select>
        <button
          className="button button-dark"
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="supplier-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="category-tabs">
        {categories.map((item) => (
          <button
            key={item}
            className={item === category ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={`directory-layout${filtersOpen ? " filters-open" : ""}`}>
        <aside className="filter-sidebar" id="supplier-filters">
          <div className="filter-title">
            <strong>
              <Filter size={15} />
              Refine results
            </strong>
            <button onClick={clearFilters}>Reset</button>
          </div>
          <div className="filter-group">
            <strong>Verification</strong>
            <label className="check-control">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(event) => setVerifiedOnly(event.target.checked)}
              />
              <span />
              Business checked
            </label>
            <label className="check-control muted">
              <input type="checkbox" disabled />
              <span />
              On-site audited <small>Soon</small>
            </label>
          </div>
          <div className="filter-group">
            <strong>Minimum order</strong>
            <label className="radio-control">
              <input type="radio" name="moq" defaultChecked />
              <span />
              Any quantity
            </label>
            <label className="radio-control">
              <input type="radio" name="moq" />
              <span />
              Under 300 units
            </label>
            <label className="radio-control">
              <input type="radio" name="moq" />
              <span />
              Under 500 units
            </label>
          </div>
          <div className="filter-group">
            <strong>Capabilities</strong>
            {[
              "Pattern development",
              "Flatlock stitching",
              "Sublimation",
              "Private labeling",
              "Seamless knitting",
            ].map((item) => (
              <label className="check-control" key={item}>
                <input type="checkbox" />
                <span />
                {item}
              </label>
            ))}
          </div>
          <div className="filter-help">
            <strong>Can’t find the right fit?</strong>
            <p>
              Publish a private sourcing request and let relevant suppliers
              respond.
            </p>
            <Link href="/buyer/rfqs/new">Create RFQ →</Link>
          </div>
        </aside>

        <div className="directory-results">
          <div className="results-header">
            <div>
              <strong>{filtered.length} companies</strong>
              <span> · Hong Kong & Mainland China</span>
            </div>
            <select aria-label="Sort results">
              <option>Best match</option>
              <option>Fastest response</option>
              <option>Lowest MOQ</option>
              <option>Most established</option>
            </select>
          </div>
          {verifiedOnly && (
            <div className="active-filter">
              <span>
                Business checked{" "}
                <button onClick={() => setVerifiedOnly(false)}>×</button>
              </span>
              <p>
                Checks indicate reviewed evidence, not guaranteed performance.
              </p>
            </div>
          )}
          <div className="supplier-grid directory-grid">
            {filtered.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No exact matches</h3>
              <p>Try a broader capability or clear your filters.</p>
              <button
                className="button button-secondary"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
