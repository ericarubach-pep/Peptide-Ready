import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

// Section 8.3 / 10 — partner list, contract terms, seats/clinics covered,
// content scope, and (post-launch) API key issuance.
export default async function AdminVendorPartnersPage() {
  const supabase = createClient();
  const { data: partners } = await supabase
    .from("vendor_partners")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Vendor Partners</h1>
      <Card className="mt-6">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Seats</th>
                <th className="px-4 py-3">Content scope</th>
                <th className="px-4 py-3">Contract</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {(partners ?? []).map((partner) => (
                <tr key={partner.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium">{partner.org_name}</td>
                  <td className="px-4 py-3 capitalize">{partner.org_type.replace(/_/g, " ")}</td>
                  <td className="px-4 py-3">{partner.seat_count ?? "—"}</td>
                  <td className="px-4 py-3">{partner.content_scope.join(", ") || "Full library"}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {partner.contract_start ? new Date(partner.contract_start).toLocaleDateString() : "—"}
                    {" – "}
                    {partner.contract_end ? new Date(partner.contract_end).toLocaleDateString() : "open"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={partner.is_active ? "success" : "secondary"}>
                      {partner.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {(!partners || partners.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No vendor partners yet.
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
