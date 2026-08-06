const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "peptideready.com";

export interface HostLookup {
  subdomain: string | null;
  isCustomDomain: boolean;
  isRootDomain: boolean;
}

// Used by middleware.ts to route practicename.peptideready.com (Section 8.2)
// or an Enterprise custom domain (Section 6.1 organizations.custom_domain) to
// the correct org's branded portal, distinguishing both from the root
// marketing site.
export function parseHost(hostHeader: string | null): HostLookup {
  if (!hostHeader) {
    return { subdomain: null, isCustomDomain: false, isRootDomain: true };
  }

  const host = hostHeader.split(":")[0].toLowerCase();

  if (host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`) {
    return { subdomain: null, isCustomDomain: false, isRootDomain: true };
  }

  if (host.endsWith(`.${ROOT_DOMAIN}`)) {
    const subdomain = host.slice(0, -(ROOT_DOMAIN.length + 1));
    return { subdomain, isCustomDomain: false, isRootDomain: false };
  }

  // Anything else is a candidate Enterprise custom domain — resolved against
  // organizations.custom_domain by the caller.
  return { subdomain: null, isCustomDomain: true, isRootDomain: false };
}
