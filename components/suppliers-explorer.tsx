"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { suppliers } from "@/lib/data";
import { SupplierCard } from "@/components/ui";
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

export function SuppliersExplorer({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [companyType, setCompanyType] = useState("All company types");
  const [location, setLocation] = useState("All locations");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minimum, setMinimum] = useState(0);
  const [required, setRequired] = useState<string[]>([]);
  const [sort, setSort] = useState("name");

  const filtered = useMemo(
    () =>
      suppliers
        .filter((supplier) => {
          const terms = [
            supplier.name,
            supplier.type,
            supplier.location,
            ...supplier.categories,
            ...supplier.capabilities,
            ...supplier.materials,
          ];
          const haystack = [
            ...terms,
            ...terms.map((term) => translate("id", term)),
          ]
            .join(" ")
            .toLowerCase();
          return (
            (!query ||
              query
                .toLowerCase()
                .trim()
                .split(/\s+/)
                .every((term) => haystack.includes(term))) &&
            (category === "All" || supplier.categories.includes(category)) &&
            (companyType === "All company types" ||
              supplier.type === companyType) &&
            (location === "All locations" ||
              supplier.countryCode === location) &&
            (!verifiedOnly ||
              supplier.verification.some(
                (check) =>
                  check.label === "Business registration" &&
                  check.state === "checked",
              )) &&
            (!minimum || supplier.moq <= minimum) &&
            required.every((item) => supplier.capabilities.includes(item))
          );
        })
        .sort((a, b) =>
          sort === "moq"
            ? a.moq - b.moq
            : sort === "years"
              ? b.years - a.years
              : a.name.localeCompare(b.name),
        ),
    [
      query,
      category,
      companyType,
      location,
      verifiedOnly,
      minimum,
      required,
      sort,
    ],
  );

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setCompanyType("All company types");
    setLocation("All locations");
    setMinimum(0);
    setRequired([]);
    setVerifiedOnly(false);
  };

  return (
    <>
      <div className="directory-search-panel">
        <label className="directory-search">
          <Search size={19} />
          <input
            aria-label="Search suppliers"
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
          aria-label="Supplier location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        >
          <option>All locations</option>
          <option value="CN">China</option>
          <option value="HK">Hong Kong</option>
        </select>
        <select
          aria-label="Company type"
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
            aria-pressed={item === category}
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
          </div>
          <div className="filter-group">
            <strong>Minimum order</strong>
            <label className="radio-control">
              <input
                type="radio"
                name="moq"
                checked={minimum === 0}
                onChange={() => setMinimum(0)}
              />
              <span />
              Any quantity
            </label>
            <label className="radio-control">
              <input
                type="radio"
                name="moq"
                checked={minimum === 300}
                onChange={() => setMinimum(300)}
              />
              <span />
              300 units or fewer
            </label>
            <label className="radio-control">
              <input
                type="radio"
                name="moq"
                checked={minimum === 500}
                onChange={() => setMinimum(500)}
              />
              <span />
              500 units or fewer
            </label>
          </div>
          <div className="filter-group">
            <strong>Capabilities</strong>
            {[
              "Pattern development",
              "Flatlock stitching",
              "Full sublimation",
              "Private labeling",
              "Seamless knitting",
            ].map((item) => (
              <label className="check-control" key={item}>
                <input
                  type="checkbox"
                  checked={required.includes(item)}
                  onChange={(event) =>
                    setRequired((current) =>
                      event.target.checked
                        ? [...current, item]
                        : current.filter((value) => value !== item),
                    )
                  }
                />
                <span />
                {item}
              </label>
            ))}
          </div>
          <div className="filter-help">
            <strong>Can’t find the right fit?</strong>
            <p>
              Describe your order to review companies against your requirements.
            </p>
            <Link href="/buyer/rfqs/new">Describe your order →</Link>
          </div>
        </aside>

        <div className="directory-results">
          <div className="results-header">
            <div>
              <strong>{filtered.length} companies</strong>
              <span> · Hong Kong & Mainland China</span>
            </div>
            <select
              aria-label="Sort results"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="name">Company name</option>
              <option value="moq">Lowest minimum order</option>
              <option value="years">Longest operating history</option>
            </select>
          </div>
          {verifiedOnly && (
            <div className="active-filter">
              <span>
                Business checked{" "}
                <button
                  aria-label="Remove business check filter"
                  onClick={() => setVerifiedOnly(false)}
                >
                  ×
                </button>
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
