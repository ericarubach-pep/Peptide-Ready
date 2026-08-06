"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import type { OrgTier } from "@/types/database";

// Section 8.1 — Basic stays on PeptideReady-branded templates (this form is
// disabled for them); Pro/Enterprise get full color theme override.
export function ThemeConfig({
  orgId,
  tier,
  currentDisplayName,
  currentPrimaryColor,
}: {
  orgId: string;
  tier: OrgTier;
  currentDisplayName: string | null;
  currentPrimaryColor: string | null;
}) {
  const canCustomize = tier !== "basic";
  const [displayName, setDisplayName] = useState(currentDisplayName ?? "");
  const [primaryColor, setPrimaryColor] = useState(currentPrimaryColor ?? "#0f172a");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("organizations")
        .update({ display_name: displayName, primary_color: primaryColor })
        .eq("id", orgId);
      if (updateError) throw updateError;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (!canCustomize) {
    return (
      <p className="text-sm text-slate-500">
        Full custom branding is available on Pro and Enterprise. Basic tier ships with the logo
        overlay above on PeptideReady-branded templates.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="display-name">Patient-facing display name</Label>
        <Input id="display-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="primary-color">Primary color</Label>
        <div className="flex items-center gap-2">
          <input
            id="primary-color"
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="h-10 w-14 rounded-md border border-slate-300"
          />
          <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="max-w-[120px]" />
        </div>
      </div>
      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save branding"}
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
