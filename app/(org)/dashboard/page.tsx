import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentOrg } from "@/lib/org/current";

const STATUS_VARIANT = {
  active: "success",
  trialing: "secondary",
  past_due: "warning",
  canceled: "secondary",
} as const;

export default async function OrgDashboardPage() {
  const org = await getCurrentOrg();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{org.org_name}</h1>
      <p className="mt-1 text-sm text-slate-500">Org home — billing, seats, and account status.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Plan</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold capitalize">{org.tier}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={STATUS_VARIANT[org.subscription_status]} className="capitalize">
              {org.subscription_status.replace("_", " ")}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Branding</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{org.logo_url ? "Configured" : "Not set"}</CardContent>
        </Card>
      </div>
    </div>
  );
}
