import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Section 2.4 pricing table.
const TIERS = [
  {
    name: "Basic",
    price: "$299/mo",
    features: [
      "Full digital content library",
      "Monthly content updates",
      "EMME/PeptideReady-branded materials with practice logo overlay",
    ],
  },
  {
    name: "Pro",
    price: "$599/mo",
    features: [
      "Fully custom-branded materials (PeptideReady branding removed)",
      "One new explainer per month",
      "Regulatory update alerts",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$1,500+/mo",
    features: [
      "Fully custom-branded suite",
      "Staff training deck",
      "New-patient onboarding sequence",
      "Email drip campaign templates",
      "Dedicated regulatory tracker",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pricing for your practice</h1>
        <p className="mt-3 text-slate-600">
          Self-serve signup for Basic. Sales-assisted onboarding for Pro and Enterprise.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {TIERS.map((tier) => (
          <Card key={tier.name} className={tier.highlighted ? "border-slate-900 shadow-md" : undefined}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <p className="text-2xl font-bold">{tier.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={tier.highlighted ? "default" : "outline"}>
                {tier.name === "Basic" ? "Start free trial" : "Talk to sales"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-slate-500">
        Distributing to multiple clinics under one contract?{" "}
        <a href="/vendors" className="underline">
          See B2B vendor volume licensing
        </a>
        .
      </p>
    </div>
  );
}
