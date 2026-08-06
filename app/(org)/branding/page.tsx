import { LogoUpload } from "@/components/branding/LogoUpload";
import { ThemeConfig } from "@/components/branding/ThemeConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentOrg } from "@/lib/org/current";

export default async function OrgBrandingPage() {
  const org = await getCurrentOrg();

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Branding</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <LogoUpload orgId={org.id} currentLogoUrl={org.logo_url} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeConfig
            orgId={org.id}
            tier={org.tier}
            currentDisplayName={org.display_name}
            currentPrimaryColor={org.primary_color}
          />
        </CardContent>
      </Card>
    </div>
  );
}
