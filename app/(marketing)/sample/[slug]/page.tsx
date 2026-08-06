import { notFound } from "next/navigation";

import { ContentLayer } from "@/components/peptide/ContentLayer";
import { getPeptideBySlug } from "@/lib/content/mdx";

// Section 7.2 — public sample pages, unbranded, no login required. Sales lead
// magnet for a prospective practice buyer, not a per-view consumer paywall.
export default function SamplePeptidePage({ params }: { params: { slug: string } }) {
  const peptide = getPeptideBySlug(params.slug);

  if (!peptide || !peptide.frontmatter.is_sample) {
    notFound();
  }

  return (
    <ContentLayer
      title={peptide.frontmatter.name}
      attorneyReviewed={peptide.frontmatter.attorney_reviewed}
      tier="basic"
      mdxSource={peptide.body}
    />
  );
}
