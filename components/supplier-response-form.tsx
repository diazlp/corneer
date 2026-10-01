"use client";

import { useState } from "react";
import { Check, Send, ShieldCheck, Upload } from "lucide-react";
import { useDemo } from "@/components/demo-provider";

export function SupplierResponseForm() {
  const { toast } = useDemo();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="response-success">
        <span>
          <Check />
        </span>
        <h3>Response submitted</h3>
        <p>
          The buyer can now compare your company profile and response with other
          suitable suppliers. Their identity remains private until they choose
          to reveal it.
        </p>
        <button
          className="button button-secondary button-small"
          onClick={() => setSent(false)}
        >
          Edit demo response
        </button>
      </div>
    );
  }

  return (
    <form
      className="supplier-response-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
        toast("Response sent to the verified buyer");
      }}
    >
      <div className="response-form-heading">
        <span>
          <Send />
        </span>
        <div>
          <h2>Respond to this opportunity</h2>
          <p>
            Explain your fit clearly. The buyer compares capability and
            evidence—not price alone.
          </p>
        </div>
      </div>
      <label className="field">
        <span>Why is your company a good fit?</span>
        <textarea
          rows={5}
          defaultValue="We currently produce comparable bonded running tops for two Northern European brands and can source GRS-certified recycled fabrics from our existing mill partners."
        />
      </label>
      <div className="form-grid compact-grid">
        <label className="field">
          <span>Indicative price range</span>
          <input defaultValue="$8.40–$16.80 / unit" />
        </label>
        <label className="field">
          <span>Production lead time</span>
          <input defaultValue="75–90 days" />
        </label>
        <label className="field">
          <span>Minimum order</span>
          <input defaultValue="300 / style-color" />
        </label>
        <label className="field">
          <span>Sampling time</span>
          <input defaultValue="14–18 days" />
        </label>
      </div>
      <fieldset className="field option-field">
        <legend>Confirm matching capabilities</legend>
        <div className="option-grid response-options">
          {[
            "GRS material access",
            "Flatlock stitching",
            "Bonded hems",
            "EU export experience",
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" defaultChecked />
              <span>
                <Check />
              </span>
              {item}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="upload-field">
        <input type="file" />
        <Upload />
        <span>
          <strong>Attach non-confidential supporting material</strong>Capability
          deck or relevant product sheet · Demo only
        </span>
      </label>
      <div className="response-disclaimer">
        <ShieldCheck />
        <p>
          Your company profile and verification summary will be included
          automatically. Do not claim checks that Corneer has not completed.
        </p>
      </div>
      <button type="submit" className="button button-dark response-submit">
        <Send size={15} />
        Submit response
      </button>
    </form>
  );
}
