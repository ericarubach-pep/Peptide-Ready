import faqData from "@/content/faq/faq.json";

// Section 8.4 v1 — structured, searchable FAQ built from the Most Searched
// Questions document. NOTE: that source doc hasn't been provided yet; the
// two entries below are placeholders proving the pipeline, not real content.
// Replace content/faq/faq.json wholesale once the actual document arrives.

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: "basics" | "safety_and_legality" | "practical_use" | "goal_specific";
  related_slug: string | null;
}

export function getAllFaqEntries(): FaqEntry[] {
  return faqData as FaqEntry[];
}

export function searchFaq(query: string): FaqEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllFaqEntries();

  return getAllFaqEntries().filter(
    (entry) => entry.question.toLowerCase().includes(q) || entry.answer.toLowerCase().includes(q)
  );
}
