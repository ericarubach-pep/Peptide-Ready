import { redirect } from "next/navigation";

// No dashboard-style overview exists at the bare /admin URL yet — send staff
// to the organizations list, the natural landing point (Section 10).
export default function AdminIndexPage() {
  redirect("/admin/organizations");
}
