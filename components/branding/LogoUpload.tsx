"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

// Section 8.1 — logo upload is the one branding control every tier gets,
// including Basic (logo overlay on PeptideReady-branded templates).
export function LogoUpload({ orgId, currentLogoUrl }: { orgId: string; currentLogoUrl: string | null }) {
  const [preview, setPreview] = useState(currentLogoUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const path = `${orgId}/logo-${Date.now()}.${file.name.split(".").pop()}`;

      const { error: uploadError } = await supabase.storage
        .from("branding")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("branding").getPublicUrl(path);

      const { error: updateError } = await supabase
        .from("organizations")
        .update({ logo_url: data.publicUrl })
        .eq("id", orgId);
      if (updateError) throw updateError;

      setPreview(data.publicUrl);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Label htmlFor="logo-upload">Practice logo</Label>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Practice logo preview" className="h-16 w-16 rounded-md border border-slate-200 object-contain" />
      )}
      <div>
        <input id="logo-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        <Button asChild variant="outline" size="sm">
          <label htmlFor="logo-upload" className="cursor-pointer">
            {uploading ? "Uploading…" : "Upload logo"}
          </label>
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
