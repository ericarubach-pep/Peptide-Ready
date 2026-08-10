import Link from "next/link";

import { BrandProvider } from "@/components/branding/BrandProvider";
import { resolveBranding } from "@/lib/branding/theme";
import { getCurrentOrg } from "@/lib/org/current";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library", label: "Library" },
  { href: "/branding", label: "Branding" },
  { href: "/kit", label: "Content Kit" },
  { href: "/patient-faq", label: "Patient FAQ" },
  { href: "/regulatory-tracker", label: "Regulatory Tracker" },
];

export default async function OrgLayout({ children }: { children: React.ReactNode }) {
  const org = await getCurrentOrg();
  const branding = resolveBranding(org);

  return (
    <BrandProvider branding={branding}>
      <div className="flex min-h-screen">
        <aside className="w-56 shrink-0 border-r border-slate-100 bg-slate-50 p-4">
          <div className="mb-6 flex items-center gap-2 px-2">
            {branding.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={branding.logoUrl} alt={`${branding.displayName} logo`} className="h-8 w-8 rounded object-contain" />
            )}
            <p className="text-sm font-semibold text-slate-900">{branding.displayName}</p>
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </BrandProvider>
  );
}
