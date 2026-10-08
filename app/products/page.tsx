"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, suppliers } from "@/lib/data";
import { ProductCard } from "@/components/ui";
import { translate } from "@/lib/i18n";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const categories = [
    "All products",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];
  const visible = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "All products" || product.category === category) &&
          [
            product.name,
            product.category,
            product.material,
            ...product.tags,
            ...[
              product.name,
              product.category,
              product.material,
              ...product.tags,
            ].map((term) => translate("id", term)),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, category],
  );

  return (
    <main className="products-page page-shell">
      <div className="container">
        <div className="page-title-row">
          <div>
            <span className="eyebrow">Product discovery</span>
            <h1>
              Browse the work.
              <br />
              Meet the maker.
            </h1>
            <p>
              These are representative capabilities—not marketplace inventory.
              Every product leads back to the company behind it.
            </p>
          </div>
          <div className="title-stat">
            <strong>{products.length}</strong>
            <span>product showcases</span>
          </div>
        </div>
        <div className="product-toolbar">
          <label>
            <Search size={18} />
            <input
              aria-label="Search products or materials"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products or materials"
            />
          </label>
          <div className="product-tabs">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? "active" : ""}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid product-directory-grid">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              supplier={suppliers.find(
                (supplier) => supplier.id === product.supplierId,
              )}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
