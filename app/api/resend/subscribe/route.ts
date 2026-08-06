import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceRoleClient } from "@/lib/supabase/server";

// Section 6.7 — pre-signup captures on the practice sales funnel
// (sample_page | vendor_page | waitlist).
const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.enum(["sample_page", "vendor_page", "waitlist"]),
});

export async function POST(request: Request) {
  const parsed = subscribeSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("email_subscribers").upsert(parsed.data, { onConflict: "email,source" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ subscribed: true });
}
