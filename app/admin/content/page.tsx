import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllGuides, getAllPeptides } from "@/lib/content/mdx";
import { lintContent } from "@/lib/content/lint";

// Section 10 — all peptide + guide pages, attorney_reviewed status, last
// updated, flagged-content queue from the linter (Section 9.3).
export default function AdminContentPage() {
  const peptides = getAllPeptides();
  const guides = getAllGuides();

  const flaggedPeptides = peptides
    .map((p) => ({ peptide: p, flags: lintContent(p.body) }))
    .filter((p) => p.flags.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Content</h1>
        <p className="mt-1 text-sm text-slate-400">
          {peptides.length} peptides · {guides.length} guides ·{" "}
          {peptides.filter((p) => p.frontmatter.attorney_reviewed).length} attorney-reviewed
        </p>
      </div>

      {flaggedPeptides.length > 0 && (
        <Card className="border-amber-300">
          <CardHeader>
            <CardTitle className="text-base text-amber-700">
              Flagged content queue ({flaggedPeptides.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {flaggedPeptides.map(({ peptide, flags }) => (
              <div key={peptide.frontmatter.slug} className="border-b border-amber-100 pb-3 last:border-0">
                <p className="text-sm font-medium">{peptide.frontmatter.name}</p>
                <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
                  {flags.map((flag, i) => (
                    <li key={i}>
                      Line {flag.line}: {flag.label} — &quot;{flag.match}&quot;
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Peptide</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Attorney-reviewed</th>
                <th className="px-4 py-3">Last reviewed</th>
                <th className="px-4 py-3">Sample</th>
              </tr>
            </thead>
            <tbody>
              {peptides.map(({ frontmatter }) => (
                <tr key={frontmatter.slug} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium">{frontmatter.name}</td>
                  <td className="px-4 py-3">{frontmatter.category}</td>
                  <td className="px-4 py-3">
                    <Badge variant={frontmatter.attorney_reviewed ? "success" : "warning"}>
                      {frontmatter.attorney_reviewed ? "Reviewed" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{frontmatter.last_reviewed ?? "—"}</td>
                  <td className="px-4 py-3">{frontmatter.is_sample ? "Yes" : ""}</td>
                </tr>
              ))}
              {peptides.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No peptide content migrated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
