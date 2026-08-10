"use client";

import { useBranding } from "@/components/branding/BrandProvider";

// Section 8.5: Basic and Pro show a "Content by PeptideReady" footer line;
// Enterprise can disable it. resolveBranding() already collapses this down
// to a single boolean, so this component just has to render or not.
export function PoweredByFooter() {
  const branding = useBranding();
  if (!branding.attributionVisible) return null;

  return (
    <p className="mt-8 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
      Content by PeptideReady
    </p>
  );
}
