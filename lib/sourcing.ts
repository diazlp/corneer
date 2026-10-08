import { RFQ, Supplier } from "./data";

const categoryNames: Record<string, string> = {
  "Running apparel": "Running",
  "Activewear sets": "Activewear",
};

/** A transparent demo comparison of reported profile fields, never a capability audit. */
export function supplierFit(request: RFQ, supplier: Supplier) {
  const category = categoryNames[request.category] ?? request.category;
  const required = request.capabilities ?? [];
  const listed = required.filter((item) =>
    supplier.capabilities.includes(item),
  );
  const unconfirmed = required.filter(
    (item) => !supplier.capabilities.includes(item),
  );
  const perVariant = request.order
    ? Math.floor(
        request.order.units / (request.order.styles * request.order.colors),
      )
    : undefined;
  return {
    categoryListed: supplier.categories.includes(category),
    listed,
    unconfirmed,
    perVariant,
    belowMinimum: perVariant !== undefined && perVariant < supplier.moq,
  };
}

export function candidateSuppliers(request: RFQ, companies: Supplier[]) {
  return companies.filter((supplier) =>
    request.invitedSupplierId
      ? supplier.id === request.invitedSupplierId
      : supplierFit(request, supplier).categoryListed,
  );
}

export function canReveal(shortlist: string[], supplierId: string) {
  return shortlist.includes(supplierId);
}

export function threadKey(requestId: string, supplierId: string) {
  return `${requestId}:${supplierId}`;
}
