import Link from "next/link";

import { AttorneyReviewedBadge } from "@/components/peptide/AttorneyReviewedBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrgTier } from "@/types/database";

export interface PeptideCardData {
  name: string;
  category: string;
  min_tier: OrgTier;
  attorney_reviewed: boolean;
}

export function PeptideCard({ peptide, href }: { peptide: PeptideCardData; href: string }) {
  return (
    <Link href={href}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle>{peptide.name}</CardTitle>
            <AttorneyReviewedBadge attorneyReviewed={peptide.attorney_reviewed} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{peptide.category}</Badge>
          {peptide.min_tier !== "basic" && (
            <Badge variant="outline" className="capitalize">
              {peptide.min_tier}+
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
