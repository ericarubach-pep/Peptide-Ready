import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllFaqEntries } from "@/lib/content/faq";
import { getCurrentOrg } from "@/lib/org/current";

// Section 8.4 v1 — org-facing config for the patient Q&A tool: preview of
// the structured FAQ source and the embed snippet for the practice's site.
export default async function PatientFaqConfigPage() {
  const org = await getCurrentOrg();
  const entries = getAllFaqEntries();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Patient FAQ tool</h1>
      <p className="mt-1 text-sm text-slate-500">
        A searchable FAQ your patients can use directly — embed it or link to the hosted version.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Embed snippet</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">
            {`<iframe src="https://${org.subdomain ?? "yourpractice"}.peptideready.com/faq-widget" width="100%" height="600" frameborder="0"></iframe>`}
          </pre>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Source questions ({entries.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <p className="text-sm font-medium text-slate-900">{entry.question}</p>
              <p className="text-sm text-slate-600">{entry.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
