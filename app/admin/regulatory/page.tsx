import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

// Section 10 — regulatory tracker admin: add/edit/delete regulatory events.
// Add/edit/delete forms wire up to this table once the admin write API is
// built; this is the read view that powers it.
export default async function AdminRegulatoryPage() {
  const supabase = createClient();
  const [{ data: events }, { data: peptides }] = await Promise.all([
    supabase.from("regulatory_events").select("*").order("event_date", { ascending: false }),
    supabase.from("peptides").select("id, name"),
  ]);

  const peptideNameById = new Map((peptides ?? []).map((p) => [p.id, p.name]));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Regulatory Events</h1>
      <Card className="mt-6">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Peptide</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {(events ?? []).map((event) => (
                <tr key={event.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {(event.peptide_id && peptideNameById.get(event.peptide_id)) ?? "Platform-wide"}
                  </td>
                  <td className="px-4 py-3 capitalize">{event.event_type.replace(/_/g, " ")}</td>
                  <td className="px-4 py-3 text-slate-500">{event.event_date}</td>
                  <td className="px-4 py-3">{event.summary}</td>
                  <td className="px-4 py-3">
                    <Badge variant={event.is_active ? "success" : "secondary"}>
                      {event.is_active ? "Active" : "Archived"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {(!events || events.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No regulatory events logged yet.
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
