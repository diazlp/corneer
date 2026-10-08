import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProfileActions({ supplierId }: { supplierId: string }) {
  return (
    <div className="profile-actions">
      <Link
        className="button button-dark"
        href={{ pathname: "/buyer/rfqs/new", query: { supplier: supplierId } }}
      >
        Discuss an order
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
