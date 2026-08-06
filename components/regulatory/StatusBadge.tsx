import { Badge } from "@/components/ui/badge";
import type { PcacStatus } from "@/types/database";

const STATUS_LABEL: Record<PcacStatus, string> = {
  unregulated: "Unregulated",
  category_1: "Category 1",
  category_2: "Category 2",
  fda_approved: "FDA Approved",
  under_review: "Under Review",
};

const STATUS_VARIANT: Record<PcacStatus, "secondary" | "success" | "warning"> = {
  unregulated: "secondary",
  category_1: "warning",
  category_2: "warning",
  fda_approved: "success",
  under_review: "warning",
};

// Section 9.2: "Category 1 reclassification != FDA drug approval — every
// PCAC outcome reference must include this distinction." This badge only
// ever shows the status label; the distinction itself belongs in body copy
// next to it, never implied by badge color alone.
export function StatusBadge({ status }: { status: PcacStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>;
}
