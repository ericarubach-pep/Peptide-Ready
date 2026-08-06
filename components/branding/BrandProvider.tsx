"use client";

import { createContext, useContext } from "react";

import type { ResolvedBranding } from "@/lib/branding/theme";

const BrandContext = createContext<ResolvedBranding | null>(null);

// Wraps every (org)-group page so patient- and staff-facing content renders
// under the org's branding_config (Section 8) instead of a hardcoded
// PeptideReady look. Server components resolve the branding via
// resolveBranding() and pass it down as a prop; this just makes it
// available to client components without prop-drilling.
export function BrandProvider({
  branding,
  children,
}: {
  branding: ResolvedBranding;
  children: React.ReactNode;
}) {
  return (
    <BrandContext.Provider value={branding}>
      <div style={{ ["--brand-primary" as string]: branding.primaryColor }}>{children}</div>
    </BrandContext.Provider>
  );
}

export function useBranding() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBranding must be used within a BrandProvider");
  }
  return ctx;
}
