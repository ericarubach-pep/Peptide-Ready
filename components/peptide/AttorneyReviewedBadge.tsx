import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

// Section 9.4 — only ever rendered when attorney_reviewed is true on the
// underlying peptide/guide record. Never render this unconditionally: it's a
// compliance claim ("reviewed by a licensed pharmaceutical attorney"), not
// decoration.
export function AttorneyReviewedBadge({ attorneyReviewed }: { attorneyReviewed: boolean }) {
  if (!attorneyReviewed) return null;

  return (
    <Badge variant="success" className="gap-1">
      <ShieldCheck className="h-3.5 w-3.5" />
      Attorney-Reviewed
    </Badge>
  );
}
