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
  logoUrl,
}: {
  title: string;
  attorneyReviewed: boolean;
  tier: OrgTier;
  mdxSource: string;
  logoUrl?: string | null;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      {logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="Practice logo" className="mb-6 h-12 max-w-[220px] object-contain" />
      )}
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
