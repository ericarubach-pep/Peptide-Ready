import type { OrgTier } from "@/types/database";

// Section 9.1 — renders at the top of every peptide page, guide, handout, and
// any AI-generated output (post-launch). Copy is tier-specific, not editable
// per-org: this is a compliance surface, not a branding one.
const DISCLAIMER_COPY: Record<OrgTier, string> = {
  basic:
    "Educational purposes only. Not medical advice. Consult a licensed provider before starting any peptide protocol.",
  pro: "Educational purposes only. Not medical advice. Consult a licensed provider before starting any peptide protocol.",
  enterprise:
    "Regulatory status may change. Verify at FDA.gov. This does not constitute legal or compliance advice.",
};

export function DisclaimerBlock({ tier }: { tier: OrgTier }) {
  return (
    <div
      role="note"
      className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      {DISCLAIMER_COPY[tier]}
    </div>
  );
}
