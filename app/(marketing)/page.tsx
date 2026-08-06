import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Section 2.1 — sales homepage, practice-facing. Tagline is the mandated
// positioning language: "use everywhere on the sales site and in outreach."
export default function MarketingHomePage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
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
