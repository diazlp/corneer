"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
import { Supplier } from "@/lib/data";

const steps = ["Your order", "Production details", "Review your order"];
const capabilities = [
  "Pattern development",
  "Flatlock stitching",
  "Bonded seams",
  "Full sublimation",
  "Private labeling",
  "Seamless knitting",
];

export function RFQForm({ invitedSupplier }: { invitedSupplier?: Supplier }) {
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState({
    title: "",
    category: "Running apparel",
    units: "",
    styles: "1",
    colors: "1",
    description: "",
    material: "",
    date: "",
    destination: "",
    techPack: "In progress",
    documentation: "",
  });
  const [required, setRequired] = useState<string[]>([]);
  const router = useRouter();
  const { createRequest, toast, locale } = useDemo();
  const update = (name: keyof typeof brief, value: string) =>
    setBrief((current) => ({ ...current, [name]: value }));
  const preview = () => {
    const id = `demo-${crypto.randomUUID()}`;
    createRequest({
      id,
      title: brief.title.trim(),
      category: brief.category,
      buyerLabel: "Verified performance-wear brand",
      buyerLocation: "Copenhagen, Denmark",
      buyerVerified: true,
      quantity: `${brief.units} units / ${brief.styles} styles / ${brief.colors} colors`,
      order: {
        units: Number(brief.units),
        styles: Number(brief.styles),
        colors: Number(brief.colors),
      },
      material: brief.material.trim() || "To be discussed",
      description: brief.description.trim(),
      delivery:
        [brief.destination.trim(), brief.date].filter(Boolean).join(" · ") ||
        "To be discussed",
      deadline: "Not published",
      requirements: required,
      capabilities: required,
      techPack: brief.techPack,
      documentation: brief.documentation.trim(),
      status: "Draft",
      posted: "Just now",
      responses: 0,
      fit: 0,
      visibility: invitedSupplier ? invitedSupplier.name : "Not shared yet",
      invitedSupplierId: invitedSupplier?.id,
      preview: true,
    });
    toast("Order preview created. No suppliers contacted.");
    router.push(`/buyer/rfqs/${id}`);
  };
  return (
    <div className="rfq-builder">
      <aside className="builder-sidebar">
        <div>
          <span className="eyebrow light">Describe your order</span>
          <h2>Start with what you need made.</h2>
          <p>Review companies before deciding who to contact.</p>
        </div>
        <div className="builder-steps">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              disabled={index + 1 > step}
              aria-current={step === index + 1 ? "step" : undefined}
              className={
                step === index + 1
                  ? "active"
                  : step > index + 1
                    ? "complete"
                    : ""
              }
              onClick={() => setStep(index + 1)}
            >
              <span>{step > index + 1 ? <Check size={14} /> : index + 1}</span>
              <div>
                <strong>{label}</strong>
              </div>
            </button>
          ))}
        </div>
        <div className="builder-privacy">
          <ShieldCheck />
          <p>
            <strong>Your company stays private.</strong> You choose the company
            that receives your identity when you open a conversation.
          </p>
        </div>
        <Link className="text-link" href="/buyer/rfqs/rfq-recycled-running">
          Walk through an example
        </Link>
      </aside>
      <form
        className="builder-main"
        onSubmit={(event) => {
          event.preventDefault();
          if (step < 3) setStep(step + 1);
          else preview();
        }}
      >
        <div className="builder-progress">
          <span style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <div className="form-step">
          <div className="form-step-title">
            <span>0{step}</span>
            <div>
              <h1>
                {step === 1
                  ? "What do you need made?"
                  : step === 2
                    ? "What should a supplier know?"
                    : "Check your order"}
              </h1>
              <p>
                {step === 1
                  ? "A few details help you narrow the company list."
                  : step === 2
                    ? "Add what you know. You can discuss the rest with a supplier."
                    : "This creates a demo preview. Your order and company identity are not sent to anyone."}
              </p>
            </div>
          </div>
          {invitedSupplier && (
            <p className="request-notice">
              {locale === "id" ? "Meninjau perusahaan:" : "Reviewing company:"}{" "}
              <strong>{invitedSupplier.name}</strong>
            </p>
          )}
          {step === 1 && (
            <div className="form-grid">
              <label className="field field-full">
                <span>Order title</span>
                <input
                  required
                  pattern=".*\S.*"
                  maxLength={120}
                  value={brief.title}
                  onChange={(event) => update("title", event.target.value)}
                  placeholder="For example: private-label pilates sets"
                />
                <small>
                  Keep your company name and contact details out of the brief.
                </small>
              </label>
              <label className="field">
                <span>Product category</span>
                <select
                  value={brief.category}
                  onChange={(event) => update("category", event.target.value)}
                >
                  {[
                    "Running apparel",
                    "Teamwear",
                    "Activewear sets",
                    "Seamless",
                    "Outerwear",
                    "Athleisure",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Total units</span>
                <input
                  type="number"
                  min="1"
                  max="10000000"
                  step="1"
                  required
                  value={brief.units}
                  onChange={(event) => update("units", event.target.value)}
                  placeholder="800"
                />
              </label>
              <label className="field">
                <span>Number of styles</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  step="1"
                  required
                  value={brief.styles}
                  onChange={(event) => update("styles", event.target.value)}
                />
                <small>Different garment designs.</small>
              </label>
              <label className="field">
                <span>Colors per style</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  step="1"
                  required
                  value={brief.colors}
                  onChange={(event) => update("colors", event.target.value)}
                />
                <small>Used to estimate units per style and color.</small>
              </label>
              <label className="field field-full">
                <span>Describe the order</span>
                <textarea
                  rows={3}
                  maxLength={2500}
                  value={brief.description}
                  onChange={(event) =>
                    update("description", event.target.value)
                  }
                  placeholder="What are you making, and what help do you need?"
                />
                <small>
                  Optional. Avoid names, email addresses, and identifying links.
                </small>
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="form-grid">
              <label className="field field-full">
                <span>Material or fabric requirement</span>
                <input
                  maxLength={300}
                  value={brief.material}
                  onChange={(event) => update("material", event.target.value)}
                  placeholder="For example: matte nylon / elastane"
                />
              </label>
              <label className="field">
                <span>Target delivery</span>
                <input
                  type="date"
                  value={brief.date}
                  onChange={(event) => update("date", event.target.value)}
                />
              </label>
              <label className="field">
                <span>Delivery location</span>
                <input
                  maxLength={150}
                  value={brief.destination}
                  onChange={(event) =>
                    update("destination", event.target.value)
                  }
                  placeholder="City and country"
                />
              </label>
              <label className="field field-full">
                <span>Design specifications</span>
                <select
                  value={brief.techPack}
                  onChange={(event) => update("techPack", event.target.value)}
                >
                  <option value="Complete">Complete</option>
                  <option value="In progress">In progress</option>
                  <option value="Need development support">
                    Need development support
                  </option>
                </select>
                <small>
                  Often called a tech pack: measurements, materials, and
                  construction details.
                </small>
              </label>
              <fieldset className="field field-full option-field">
                <legend>Capabilities you need</legend>
                <div className="option-grid">
                  {capabilities.map((item) => (
                    <label key={item}>
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
                      <span>
                        <Check size={13} />
                      </span>
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="field field-full">
                <span>Certification or documentation needs</span>
                <input
                  maxLength={500}
                  value={brief.documentation}
                  onChange={(event) =>
                    update("documentation", event.target.value)
                  }
                />
                <small>
                  Material documentation needs confirmation for this order.
                </small>
              </label>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="review-card">
                <div className="review-card-heading">
                  <div>
                    <span>Your order</span>
                    <h3>{brief.title}</h3>
                  </div>
                  <button type="button" onClick={() => setStep(1)}>
                    Edit order
                  </button>
                </div>
                <dl className="brief-review">
                  <div>
                    <dt>Product category</dt>
                    <dd>{brief.category}</dd>
                  </div>
                  <div>
                    <dt>Total units</dt>
                    <dd>{brief.units}</dd>
                  </div>
                  <div>
                    <dt>Number of styles</dt>
                    <dd>{brief.styles}</dd>
                  </div>
                  <div>
                    <dt>Colors per style</dt>
                    <dd>{brief.colors}</dd>
                  </div>
                  <div>
                    <dt>Units per style and color</dt>
                    <dd>
                      {Math.floor(
                        Number(brief.units) /
                          (Number(brief.styles) * Number(brief.colors)),
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>
                      {brief.destination || <span>To be discussed</span>}{" "}
                      {brief.date}
                    </dd>
                  </div>
                </dl>
                <details className="brief-details">
                  <summary>Production details</summary>
                  <p>{brief.material || <span>To be discussed</span>}</p>
                  <p>{brief.techPack}</p>
                  {required.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                  <p>{brief.documentation}</p>
                  <p>{brief.description}</p>
                  <button
                    type="button"
                    className="plain-button"
                    onClick={() => setStep(2)}
                  >
                    Edit details
                  </button>
                </details>
              </div>
              <div className="request-notice">
                <ShieldCheck size={20} />
                <div>
                  <strong>Your company stays private.</strong>
                  <p>
                    First you will see fictional companies whose listed
                    categories match your order. Prices, availability, and
                    production capability still need confirmation.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="builder-footer">
          {step > 1 ? (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <Link className="button button-secondary" href="/">
              Cancel
            </Link>
          )}
          <button type="submit" className="button button-dark">
            {step < 3 ? "Continue" : "Review companies"}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
