import { BadgeCheck, Globe2, ShieldCheck } from "lucide-react";
import { SuppliersExplorer } from "@/components/suppliers-explorer";

export default function SuppliersPage() {
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="container directory-hero-inner">
          <div>
            <span className="eyebrow">Supplier directory</span>
            <h1>
              Find the company
              <br />
              behind the capability.
            </h1>
            <p>
              Explore sportswear production partners with transparent company
              types, capabilities, and evidence checks.
            </p>
          </div>
          <div className="directory-hero-proof">
            <div>
              <BadgeCheck />
              <span>
                <strong>7</strong>Demo companies
              </span>
            </div>
            <div>
              <Globe2 />
              <span>
                <strong>2</strong>Supplier markets
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <strong>100%</strong>Business checked
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="container directory-content">
        <SuppliersExplorer />
      </section>
    </main>
  );
}
