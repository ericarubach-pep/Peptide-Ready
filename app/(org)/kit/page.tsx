import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPeptides } from "@/lib/content/mdx";
import { getCurrentOrg } from "@/lib/org/current";

// Section 8.2 — downloadable content kit: on-demand branded PDF export of the
// full library or a selected subset, for practices that want static handouts
// rather than a hosted page. Generation itself is /api/kit/generate/route.ts.
export default async function OrgKitPage() {
  const org = await getCurrentOrg();
  const peptides = getAllPeptides();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Branded content kit</h1>
      <p className="mt-1 text-sm text-slate-500">
        Export a branded PDF handout for {org.display_name ?? org.org_name} patients.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Full library kit</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-slate-600">{peptides.length} peptides, branded and disclaimer-included.</p>
          <form action="/api/kit/generate" method="post">
            <input type="hidden" name="org_id" value={org.id} />
            <input type="hidden" name="scope" value="full" />
            <Button type="submit">Generate PDF</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
