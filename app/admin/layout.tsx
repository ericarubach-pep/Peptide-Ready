import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin/organizations", label: "Organizations" },
  { href: "/admin/vendor-partners", label: "Vendor Partners" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/regulatory", label: "Regulatory" },
];

// Auth (role = admin, i.e. a platform_admins row) is enforced in
// middleware.ts before any /admin/* route renders — this layout is just the
// shell, not the gate.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-slate-100 bg-slate-900 p-4 text-white">
        <p className="mb-6 px-2 text-sm font-semibold">PeptideReady Admin</p>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
