import { MDXRemote } from "next-mdx-remote/rsc";

import { AttorneyReviewedBadge } from "@/components/peptide/AttorneyReviewedBadge";
import { DisclaimerBlock } from "@/components/peptide/DisclaimerBlock";
import type { OrgTier } from "@/types/database";

// Shared render path for peptide pages, guides, and handouts (Section 9.1:
// "renders at the top of every peptide page, guide, handout"). This is the
// one place the DisclaimerBlock gets injected so no content route can ship
// without it.
export function ContentLayer({
  title,
  attorneyReviewed,
  tier,
  mdxSource,
}: {
  title: string;
  attorneyReviewed: boolean;
  tier: OrgTier;
  mdxSource: string;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <AttorneyReviewedBadge attorneyReviewed={attorneyReviewed} />
      </div>
      <DisclaimerBlock tier={tier} />
      <div className="prose prose-slate max-w-none">
        <MDXRemote source={mdxSource} />
      </div>
    </article>
  );
}
