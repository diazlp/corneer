import { AdminVerification } from "@/components/admin-verification";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Verification review — Admin workspace",
  "Review fictional business verification cases in Corneer's frontend administration demo. No real verification operations are performed.",
  "/admin/verification",
  false,
);

export default function AdminVerificationPage() {
  return <AdminVerification />;
}
