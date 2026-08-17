import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Section 2.1 — sales homepage, practice-facing. Tagline is the mandated
// positioning language: "use everywhere on the sales site and in outreach."
export default function MarketingHomePage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center sm:pt-20">
        <Image
          src="/logo-header.png"
          alt="PeptideReady"
          width={1405}
          height={480}
          priority
          className="mx-auto h-16 w-auto sm:h-20"
        />

        <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-5xl">
          Everything your patients need to understand peptides.
          <br />
          <span className="text-slate-500">Already written. Ready to brand.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          A licensed, white-label patient-education library for med spas, dermatology and plastic
          surgery offices, functional medicine clinics, and compounding pharmacies.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/pricing">See pricing</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sample/bpc-157">View sample content</Link>
          </Button>
        </div>

        <div className="mx-auto mt-16 flex max-w-md items-center justify-center gap-5 sm:gap-8">
          <Image
            src="/logo-header.png"
            alt="PeptideReady"
            width={1405}
            height={480}
            className="h-7 w-auto opacity-70 sm:h-8"
          />
          <span className="text-xl font-light text-slate-300">→</span>
          <div className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-slate-400 sm:h-16">
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium">Your practice logo</span>
          </div>
        </div>
        <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
          White-labeled for every practice on the platform
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Full library, from day one</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              38 peptide explainers, category guides, and a patient FAQ tool — no content
              production wait.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your brand, not ours</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Logo overlay on every tier; full custom branding and a subdomain on Pro and
              Enterprise.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compliance built in</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Attorney-reviewed content, research-framed language, and disclaimers on every page.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
