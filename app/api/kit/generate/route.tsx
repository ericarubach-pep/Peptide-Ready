import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import { ContentKitDocument } from "@/lib/pdf/kit";
import { getAllPeptides } from "@/lib/content/mdx";
import { createClient } from "@/lib/supabase/server";

// @react-pdf/renderer needs Node APIs (fontkit, streams) — not edge-compatible.
export const runtime = "nodejs";

// Section 8.2 — on-demand branded PDF export of the full library (or a
// selected subset, once org-level content_scope selection is added) for
// practices that want static handouts rather than a hosted page.
export async function POST(request: Request) {
  const formData = await request.formData();
  const orgId = formData.get("org_id");

  if (typeof orgId !== "string") {
    return NextResponse.json({ error: "org_id is required" }, { status: 400 });
  }

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: orgUser } = await supabase.from("org_users").select("org_id").eq("id", user.id).maybeSingle();
  if (!orgUser || orgUser.org_id !== orgId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: org, error } = await supabase.from("organizations").select("*").eq("id", orgId).single();
  if (error || !org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  const peptides = getAllPeptides();
  const buffer = await renderToBuffer(<ContentKitDocument org={org} peptides={peptides} />);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${(org.display_name ?? org.org_name).replace(/[^a-z0-9]+/gi, "-")}-peptide-kit.pdf"`,
    },
  });
}
