import { notFound } from "next/navigation";

import { PoweredByFooter } from "@/components/branding/PoweredByFooter";
import { ContentLayer } from "@/components/peptide/ContentLayer";
import { getPeptideBySlug } from "@/lib/content/mdx";
import { getCurrentOrg } from "@/lib/org/current";

const TIER_RANK = { basic: 0, pro: 1, enterprise: 2 } as const;

export default async function OrgLibraryPeptidePage({ params }: { params: { slug: string } }) {
  const org = await getCurrentOrg();
  const peptide = getPeptideBySlug(params.slug);

  if (!peptide || TIER_RANK[peptide.frontmatter.min_tier] > TIER_RANK[org.tier]) {
    notFound();
  }

  return (
    <div>
      <ContentLayer
        title={peptide.frontmatter.name}
        attorneyReviewed={peptide.frontmatter.attorney_reviewed}
        tier={org.tier}
        mdxSource={peptide.body}
      />
      <PoweredByFooter />
    </div>
  );
}
