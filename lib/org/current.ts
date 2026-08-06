import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { Organization } from "@/types/database";

// Resolves the organization for the currently authenticated org_user.
// middleware.ts already enforced that a session + org_users row exist for
// every (org)-group route, so redirect() here is a defensive fallback, not
// the primary auth gate.
export async function getCurrentOrg(): Promise<Organization> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orgUser } = await supabase.from("org_users").select("org_id").eq("id", user.id).maybeSingle();

  if (!orgUser) {
    redirect("/login");
  }

  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", orgUser.org_id)
    .single();

  if (!org) {
    redirect("/login");
  }

  return org;
}
