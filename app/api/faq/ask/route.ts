import { NextResponse } from "next/server";

import { searchFaq } from "@/lib/content/faq";
import { lintContent } from "@/lib/content/lint";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Section 8.4 v1 — structured/rules-based patient Q&A (no AI required to
// ship). v2 (post-launch) swaps searchFaq() for a Claude-powered lookup but
// keeps the same logging + linting contract below (Section 8.4, 12).
export async function POST(request: Request) {
  const { org_id, question } = await request.json();

  if (typeof org_id !== "string" || typeof question !== "string" || !question.trim()) {
    return NextResponse.json({ error: "org_id and question are required" }, { status: 400 });
  }

  const matches = searchFaq(question);
  const bestMatch = matches[0] ?? null;

  // Even canned answers get run through the compliance linter — a safety
  // net for whatever replaces content/faq/faq.json's placeholder entries.
  const flags = bestMatch ? lintContent(bestMatch.answer) : [];

  const supabase = createServiceRoleClient();
  await supabase.from("patient_faq_log").insert({
    org_id,
    question_text: question,
    matched_source: bestMatch?.id ?? null,
    answered_at: bestMatch ? new Date().toISOString() : null,
    flagged: flags.length > 0,
  });

  if (!bestMatch) {
    return NextResponse.json({
      answer: null,
      message: "We don't have a direct answer to that yet — a member of your care team will follow up.",
    });
  }

  return NextResponse.json({
    answer: flags.length > 0 ? null : bestMatch.answer,
    question: bestMatch.question,
    related_slug: bestMatch.related_slug,
    flagged: flags.length > 0,
  });
}
