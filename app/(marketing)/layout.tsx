import Image from "next/image";
import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4">
          <Link href="/" className="flex shrink-0 items-center">
            <Image src="/logo-header.png" alt="PeptideReady" width={1405} height={480} className="h-8 w-auto sm:h-9" priority />
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-6">
            <Link href="/pricing">Pricing</Link>
            <Link href="/vendors">For Vendors</Link>
            <Link href="/login">Practice Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} PeptideReady. Proprietary and Confidential.
      </footer>
    </div>
  );
}
