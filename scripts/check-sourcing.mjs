import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Compile the two pure TS modules in memory; no test runner or output files needed.
function load(path) {
  const output = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const exports = {};
  new Function("exports", output)(exports);
  return exports;
}
const { rfqs, suppliers } = load("../lib/data.ts");
const { supplierFit, candidateSuppliers, canReveal, threadKey } =
  load("../lib/sourcing.ts");
const running = rfqs.find((item) => item.id === "rfq-recycled-running");
const pearl = suppliers.find((item) => item.id === "pearl-river");
const lowOrder = { ...running, order: { units: 800, styles: 4, colors: 2 } };
assert.equal(
  supplierFit(lowOrder, pearl).belowMinimum,
  true,
  "Order split must expose a minimum-order conflict",
);
assert.equal(supplierFit(running, pearl).belowMinimum, false);
const missingCapability = supplierFit(
  { ...running, capabilities: ["Flatlock stitching", "Seamless knitting"] },
  pearl,
);
assert.deepEqual(missingCapability.listed, ["Flatlock stitching"]);
assert.deepEqual(
  missingCapability.unconfirmed,
  ["Seamless knitting"],
  "Unlisted capability must remain unconfirmed",
);
const teamwear = { ...running, category: "Teamwear" };
assert.ok(
  candidateSuppliers(teamwear, suppliers).some(
    (item) => item.id === "apex-teamwear",
  ),
);
assert.ok(
  !candidateSuppliers(teamwear, suppliers).some(
    (item) => item.id === "pearl-river",
  ),
  "Changing category must change company candidates",
);
assert.deepEqual(
  candidateSuppliers(
    { ...teamwear, invitedSupplierId: "pearl-river" },
    suppliers,
  ).map((item) => item.id),
  ["pearl-river"],
);
assert.deepEqual(
  candidateSuppliers({ ...running, category: "Unlisted category" }, suppliers),
  [],
);
assert.equal(
  canReveal([], "pearl-river"),
  false,
  "Identity cannot be revealed without an explicit shortlist",
);
assert.equal(
  canReveal(["pearl-river"], "harbor-stitch"),
  false,
  "Saving one company cannot reveal identity to another",
);
assert.equal(canReveal(["pearl-river"], "pearl-river"), true);
assert.notEqual(
  threadKey("request-a", "pearl-river"),
  threadKey("request-b", "pearl-river"),
);
console.log(
  "Sourcing checks passed: order split, capabilities, category, invitations, recipient isolation.",
);
