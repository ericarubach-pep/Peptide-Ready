import { PCACTracker } from "@/components/regulatory/PCACTracker";
import { createClient } from "@/lib/supabase/server";
import { getCurrentOrg } from "@/lib/org/current";

// Pro / Enterprise — tier-gated by middleware.ts before this ever renders.
export default async function RegulatoryTrackerPage() {
  await getCurrentOrg();
  const supabase = createClient();

  const [{ data: events }, { data: peptides }] = await Promise.all([
    supabase.from("regulatory_events").select("*").order("event_date", { ascending: false }),
    supabase.from("peptides").select("id, name"),
  ]);

  const peptideNameById = new Map((peptides ?? []).map((p) => [p.id, p.name]));
  const mapped = (events ?? []).map((event) => ({
    ...event,
    peptide_name: event.peptide_id ? peptideNameById.get(event.peptide_id) : undefined,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Regulatory Tracker</h1>
      <p className="mt-1 text-sm text-slate-500">PCAC and FDA status changes affecting your library.</p>
      <div className="mt-6">
        <PCACTracker events={mapped} />
      </div>
    </div>
  );
}
