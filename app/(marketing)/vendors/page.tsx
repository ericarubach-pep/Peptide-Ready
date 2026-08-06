import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Section 2.5 / 8.3 — B2B volume-license pitch page for vendors like
// Olympia, Belmar, BioLongevity Labs who sell to med spas and physician
// offices and want to offer PeptideReady as a value-add.
export default function VendorsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight">Bring PeptideReady to your clinic network</h1>
      <p className="mt-4 text-slate-600">
        If you sell to med spas, dermatology offices, or physician practices, PeptideReady can be
        your retention benefit. One volume license covers your downstream clinics — they don&apos;t buy
        individual seats.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">One contract</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            A single volume license provisions content access across all of your covered clinics.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pass it on your terms</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Offer it to clinics at cost, or as a free retention benefit — your call.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Scoped content</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            License exactly the library sections your clinics need.
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Button size="lg">Talk to our partnerships team</Button>
      </div>
    </div>
  );
}
