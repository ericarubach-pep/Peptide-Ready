import { NextResponse, type NextRequest } from "next/server";

import { parseHost } from "@/lib/branding/domain";
import { updateSession } from "@/lib/supabase/middleware";
import type { OrgTier } from "@/types/database";

// Section 7.1 routing table. Route groups like (org)/(marketing) don't add a
// URL segment, so gating has to match on pathname directly rather than on
// the app/ folder structure.
const ORG_STAFF_PATHS = ["/dashboard", "/branding", "/kit", "/patient-faq"];
const TIER_GATED_PATHS: { prefix: string; minTier: OrgTier }[] = [
  { prefix: "/regulatory-tracker", minTier: "pro" }, // Section 5: "# Pro / Enterprise"
];
const ADMIN_PREFIX = "/admin";
const CONSUMER_PREFIX = "/consumer"; // Section 7.2a — Phase 2, EMME-owned tenant only
const PUBLIC_SAMPLE_PREFIX = "/sample";

const TIER_RANK: Record<OrgTier, number> = { basic: 0, pro: 1, enterprise: 2 };

function meetsTier(actual: OrgTier, required: OrgTier) {
  return TIER_RANK[actual] >= TIER_RANK[required];
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, supabase, user } = await updateSession(request);

  // Public, unauthenticated paths — sales lead magnet (Section 7.2), not a
  // per-view paywall.
  if (pathname.startsWith(PUBLIC_SAMPLE_PREFIX)) {
    return response;
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!user) {
      return redirectToLogin(request, pathname);
    }
    const { data: admin } = await supabase
      .from("platform_admins")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    if (!admin) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    return response;
  }

  if (pathname.startsWith(CONSUMER_PREFIX)) {
    // Section 7.2a's freemium gate (free-preview slugs, sessionStorage view
    // tracking, upgrade overlay) runs client-side against the b2c_consumer
    // org's is_sample peptides — middleware only needs to keep this prefix
    // separate from the org-staff and admin auth paths.
    return response;
  }

  const isOrgStaffPath = ORG_STAFF_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const tierGate = TIER_GATED_PATHS.find((g) => pathname === g.prefix || pathname.startsWith(`${g.prefix}/`));

  if (isOrgStaffPath || tierGate) {
    if (!user) {
      return redirectToLogin(request, pathname);
    }

    const { data: orgUser } = await supabase
      .from("org_users")
      .select("org_id")
      .eq("id", user.id)
      .maybeSingle();

    if (!orgUser) {
      return redirectToLogin(request, pathname);
    }

    if (tierGate) {
      const { data: org } = await supabase
        .from("organizations")
        .select("tier")
        .eq("id", orgUser.org_id)
        .maybeSingle();

      if (!org || !meetsTier(org.tier, tierGate.minTier)) {
        const url = request.nextUrl.clone();
        url.pathname = "/upgrade";
        url.search = `?from=${org?.tier ?? "basic"}&required=${tierGate.minTier}`;
        return NextResponse.redirect(url);
      }
    }

    return response;
  }

  // /library/[slug] is reachable both by authenticated org staff previewing
  // their own content and by patients on a practice's branded subdomain
  // (Section 8.2) — org context there comes from the host, not a session, so
  // it isn't gated here. Resolve and stamp it for downstream rendering.
  const host = parseHost(request.headers.get("host"));
  if (host.subdomain) {
    response.headers.set("x-org-subdomain", host.subdomain);
  } else if (host.isCustomDomain) {
    response.headers.set("x-org-custom-domain", request.headers.get("host") ?? "");
  }

  return response;
}

function redirectToLogin(request: NextRequest, redirectPath: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?redirect=${encodeURIComponent(redirectPath)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
