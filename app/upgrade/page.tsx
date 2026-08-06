import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Middleware (Section 7.1) redirects here on a failed tier gate:
// /upgrade?from={tier}&required={required}
export default function UpgradePage({
  searchParams,
}: {
  searchParams: { from?: string; required?: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>This feature needs a higher tier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Your current plan is <span className="font-medium capitalize">{searchParams.from ?? "Basic"}</span>.
            This page requires{" "}
            <span className="font-medium capitalize">{searchParams.required ?? "Pro"}</span> or above.
          </p>
          <Button asChild>
            <Link href="/dashboard">Manage billing</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
