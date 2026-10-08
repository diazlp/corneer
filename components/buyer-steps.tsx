export function BuyerSteps({ step }: { step: number }) {
  return (
    <ol className="buyer-steps" aria-label="Sourcing steps">
      {["Describe your order", "Review companies", "Choose who to contact"].map(
        (label, index) => (
          <li
            key={label}
            aria-current={step === index + 1 ? "step" : undefined}
            className={
              step === index + 1
                ? "current"
                : step > index + 1
                  ? "complete"
                  : ""
            }
          >
            <span>{index + 1}</span>
            {label}
          </li>
        ),
      )}
    </ol>
  );
}
