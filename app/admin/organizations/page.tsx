import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

// Section 10 — organization management: name, tier, status, MRR
// contribution, signup date, branding status.
export default async function AdminOrganizationsPage() {
  const supabase = createClient();
  const { data: organizations } = await supabase
    .from("organizations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white">Organizations</h1>
      <Card className="mt-6">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Branding</th>
                <th className="px-4 py-3">Signed up</th>
              </tr>
            </thead>
            <tbody>
              {(organizations ?? []).map((org) => (
                <tr key={org.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 font-medium">{org.org_name}</td>
                  <td className="px-4 py-3 capitalize">{org.org_type.replace(/_/g, " ")}</td>
                  <td className="px-4 py-3 capitalize">{org.tier}</td>
                  <td className="px-4 py-3">
                    <Badge variant={org.subscription_status === "active" ? "success" : "secondary"} className="capitalize">
                      {org.subscription_status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{org.logo_url ? "Configured" : "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(org.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {(!organizations || organizations.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No organizations yet.
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
