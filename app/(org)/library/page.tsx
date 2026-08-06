import { PeptideCard } from "@/components/peptide/PeptideCard";
import { getAllPeptides } from "@/lib/content/mdx";
import { getCurrentOrg } from "@/lib/org/current";

const TIER_RANK = { basic: 0, pro: 1, enterprise: 2 } as const;

export default async function OrgLibraryPage() {
  const org = await getCurrentOrg();
  const peptides = getAllPeptides().filter((p) => TIER_RANK[p.frontmatter.min_tier] <= TIER_RANK[org.tier]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Content Library</h1>
      <p className="mt-1 text-sm text-slate-500">
        {peptides.length} peptide{peptides.length === 1 ? "" : "s"} available on your {org.tier} plan.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {peptides.map(({ frontmatter }) => (
          <PeptideCard key={frontmatter.slug} peptide={frontmatter} href={`/library/${frontmatter.slug}`} />
        ))}
      </div>
    </div>
  );
}
