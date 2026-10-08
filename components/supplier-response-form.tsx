"use client";

import { useState } from "react";
import { Check, Send, ShieldCheck } from "lucide-react";
import { useDemo } from "@/components/demo-provider";

export function SupplierResponseForm({ rfqId }: { rfqId: string }) {
  const { toast, addResponse, responses } = useDemo();
  const existing = responses.find(
    (item) => item.rfqId === rfqId && item.supplierId === "pearl-river",
  );
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
        const values = new FormData(event.currentTarget);
        addResponse({
          id: `response-${rfqId}-pearl-river`,
          rfqId,
          supplierId: "pearl-river",
          fit: 0,
          note: String(values.get("note")).trim(),
          priceRange: String(values.get("price")).trim(),
          leadTime: String(values.get("lead")).trim(),
          moq: String(values.get("moq")).trim(),
          samplingTime: String(values.get("sampling")).trim(),
          status: "New",
        });
        setSent(true);
        toast("Demo response added to the buyer comparison");
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
          name="note"
          required
          defaultValue={existing?.note ?? ""}
        />
      </label>
      <div className="form-grid compact-grid">
        <label className="field">
          <span>Indicative price range</span>
          <input
            name="price"
            required
            defaultValue={existing?.priceRange ?? ""}
          />
        </label>
        <label className="field">
          <span>Production lead time</span>
          <input name="lead" required defaultValue={existing?.leadTime ?? ""} />
        </label>
        <label className="field">
          <span>Minimum order</span>
          <input
            name="moq"
            required
            defaultValue={existing?.moq ?? "300 / style-color"}
          />
        </label>
        <label className="field">
          <span>Sampling time</span>
          <input name="sampling" defaultValue={existing?.samplingTime ?? ""} />
        </label>
      </div>
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
