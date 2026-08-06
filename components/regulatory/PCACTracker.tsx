import { Badge } from "@/components/ui/badge";
import { AlertBanner } from "@/components/regulatory/AlertBanner";
import type { RegulatoryEvent } from "@/types/database";

export function PCACTracker({ events }: { events: (RegulatoryEvent & { peptide_name?: string })[] }) {
  const activeEvents = events.filter((e) => e.is_active);

  return (
    <div>
      <AlertBanner>
        Tracking {activeEvents.length} active regulatory event{activeEvents.length === 1 ? "" : "s"}.
      </AlertBanner>
      <ul className="divide-y divide-slate-100">
        {events.map((event) => (
          <li key={event.id} className="flex items-start justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                {event.peptide_name ?? "Platform-wide"} — {event.event_type.replace(/_/g, " ")}
              </p>
              <p className="text-sm text-slate-600">{event.summary}</p>
              <p className="text-xs text-slate-400">{event.event_date}</p>
            </div>
            {!event.is_active && <Badge variant="secondary">Archived</Badge>}
          </li>
        ))}
      </ul>
    </div>
  );
}
