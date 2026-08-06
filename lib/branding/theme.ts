import type { Organization } from "@/types/database";

export interface ResolvedBranding {
  displayName: string;
  logoUrl: string | null;
  primaryColor: string;
  attributionVisible: boolean;
  poweredByRemovable: boolean;
}

const DEFAULT_PRIMARY_COLOR = "#0f172a";

// Section 8.1: what branding controls are actually available differs by tier.
// Basic gets a logo overlay on PeptideReady-branded templates with attribution
// always on; Pro/Enterprise get full custom branding, and only Enterprise can
// disable attribution (Section 8.5).
export function resolveBranding(org: Organization): ResolvedBranding {
  const poweredByRemovable = org.tier === "enterprise";

  return {
    displayName: org.display_name ?? org.org_name,
    logoUrl: org.logo_url,
    primaryColor: org.tier === "basic" ? DEFAULT_PRIMARY_COLOR : org.primary_color ?? DEFAULT_PRIMARY_COLOR,
    attributionVisible: poweredByRemovable ? org.attribution_visible : true,
    poweredByRemovable,
  };
}
