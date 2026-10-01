"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  LockKeyhole,
  Package,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { useDemo } from "@/components/demo-provider";

const steps = [
  { number: 1, label: "The requirement", detail: "Product and quantity" },
  { number: 2, label: "Production details", detail: "Materials and timing" },
  { number: 3, label: "Privacy & review", detail: "Control visibility" },
];

export function RFQForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { toast } = useDemo();

  const next = () => setStep((current) => Math.min(3, current + 1));
  const back = () => setStep((current) => Math.max(1, current - 1));
  const publish = () => {
    toast("RFQ submitted for Corneer review");
    router.push("/buyer/rfqs");
  };

  return (
    <div className="rfq-builder">
      <aside className="builder-sidebar">
        <div>
          <span className="eyebrow light">Create an RFQ</span>
          <h2>Give the right supplier enough to say yes.</h2>
          <p>
            Your legal company identity remains hidden until you choose to
            reveal it.
          </p>
        </div>
        <div className="builder-steps">
          {steps.map((item) => (
            <button
              key={item.number}
              className={`${step === item.number ? "active" : ""} ${step > item.number ? "complete" : ""}`}
              onClick={() => setStep(item.number)}
            >
              <span>
                {step > item.number ? <Check size={14} /> : item.number}
              </span>
              <div>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </div>
            </button>
          ))}
        </div>
        <div className="builder-privacy">
          <ShieldCheck />
          <p>
            <strong>Buyer privacy by default</strong>Suppliers see your verified
            business summary, but not your company name or direct contact
            details.
          </p>
        </div>
      </aside>

      <section className="builder-main">
        <div className="builder-progress">
          <span style={{ width: `${step * 33.333}%` }} />
        </div>
        {step === 1 && (
          <div className="form-step">
            <div className="form-step-title">
              <span>01</span>
              <div>
                <h1>What do you need made?</h1>
                <p>
                  Start with enough commercial context for the right
                  manufacturer to recognize the fit.
                </p>
              </div>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>RFQ title</span>
                <input defaultValue="Recycled running collection — SS27" />
                <small>Be specific without naming your company or brand.</small>
              </label>
              <label className="field">
                <span>Product category</span>
                <select defaultValue="Running apparel">
                  <option>Running apparel</option>
                  <option>Teamwear</option>
                  <option>Activewear sets</option>
                  <option>Seamless</option>
                  <option>Outerwear</option>
                </select>
              </label>
              <label className="field">
                <span>Total estimated quantity</span>
                <input defaultValue="5,000 units across 4 styles" />
              </label>
              <label className="field field-full">
                <span>Describe the requirement</span>
                <textarea
                  rows={5}
                  defaultValue="We are developing a four-style performance running capsule for Spring/Summer 2027. We need an experienced cut-and-sew partner comfortable with recycled technical fabrics, flatlock construction, and bonded finishing."
                />
                <small>
                  Do not include your business name, email, phone number, or
                  identifying links.
                </small>
              </label>
              <label className="upload-field field-full">
                <input type="file" />
                <Upload />
                <span>
                  <strong>Drop a non-identifying brief here</strong>PDF, XLSX or
                  image · Demo only
                </span>
                <small>Optional</small>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <div className="form-step-title">
              <span>02</span>
              <div>
                <h1>Define the production fit</h1>
                <p>
                  These details prevent irrelevant suppliers from wasting your
                  time—or theirs.
                </p>
              </div>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Material or fabric requirement</span>
                <input defaultValue="GRS recycled polyester / elastane blends" />
              </label>
              <label className="field">
                <span>Target delivery</span>
                <input type="date" defaultValue="2027-02-15" />
              </label>
              <label className="field">
                <span>Delivery location</span>
                <input defaultValue="Copenhagen, Denmark" />
              </label>
              <label className="field">
                <span>Respond by</span>
                <input type="date" defaultValue="2026-09-23" />
              </label>
              <label className="field">
                <span>Tech pack status</span>
                <select defaultValue="Complete">
                  <option>Complete</option>
                  <option>In progress</option>
                  <option>Need development support</option>
                </select>
              </label>
              <fieldset className="field field-full option-field">
                <legend>Required capabilities</legend>
                <div className="option-grid">
                  {[
                    "Pattern development",
                    "Flatlock stitching",
                    "Bonded seams",
                    "Sublimation",
                    "Private labeling",
                    "GRS material access",
                  ].map((item, index) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        defaultChecked={[1, 2, 4, 5].includes(index)}
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
                <input defaultValue="GRS transaction certificates for production materials" />
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <div className="form-step-title">
              <span>03</span>
              <div>
                <h1>Review who sees what</h1>
                <p>
                  Corneer checks the request before it becomes visible to
                  eligible suppliers.
                </p>
              </div>
            </div>
            <div className="review-card">
              <div className="review-card-heading">
                <FileText />
                <div>
                  <span>Draft RFQ</span>
                  <h3>Recycled running collection — SS27</h3>
                </div>
                <button onClick={() => setStep(1)}>Edit</button>
              </div>
              <div className="review-specs">
                <div>
                  <span>Quantity</span>
                  <strong>5,000 units / 4 styles</strong>
                </div>
                <div>
                  <span>Category</span>
                  <strong>Running apparel</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>Copenhagen · Feb 2027</strong>
                </div>
                <div>
                  <span>Responses close</span>
                  <strong>23 Sep 2026</strong>
                </div>
              </div>
            </div>
            <div className="visibility-card">
              <div>
                <LockKeyhole />
              </div>
              <div>
                <h3>Your company name stays private</h3>
                <p>
                  Eligible suppliers will see the information below. Your
                  company profile becomes available only after you deliberately
                  reveal it.
                </p>
                <div className="anonymous-preview">
                  <span>NA</span>
                  <div>
                    <strong>Verified performance-wear brand</strong>
                    <small>Copenhagen, Denmark · 8 years operating</small>
                  </div>
                  <ShieldCheck />
                </div>
              </div>
            </div>
            <fieldset className="field option-field">
              <legend>Who should see this RFQ?</legend>
              <div className="visibility-options">
                <label>
                  <input type="radio" name="visibility" defaultChecked />
                  <span>
                    <strong>Matched verified suppliers</strong>
                    <small>Recommended · 12 suppliers currently match</small>
                  </span>
                </label>
                <label>
                  <input type="radio" name="visibility" />
                  <span>
                    <strong>Suppliers I invite only</strong>
                    <small>You choose companies after publishing</small>
                  </span>
                </label>
              </div>
            </fieldset>
            <label className="confirm-control">
              <input type="checkbox" defaultChecked />
              <span />I confirm this represents a genuine business requirement
              and contains no misleading information.
            </label>
          </div>
        )}

        <div className="builder-footer">
          <button
            className="button button-secondary"
            onClick={step === 1 ? () => router.push("/buyer/rfqs") : back}
          >
            <ArrowLeft size={16} />
            {step === 1 ? "Save and exit" : "Back"}
          </button>
          {step < 3 ? (
            <button className="button button-dark" onClick={next}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button className="button button-dark" onClick={publish}>
              <Package size={16} />
              Submit for review
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
