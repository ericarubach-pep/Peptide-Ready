import faqData from "@/content/faq/faq.json";

// Section 8.4 v1 — structured, searchable FAQ built from the Most Searched
// Questions About Peptides document (48 questions across 7 categories).
// content/faq/faq.json holds the full set of real, compliance-reviewed
// entries — grounded in content/peptides/*.mdx and content/guides/*.mdx —
// not placeholders.

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category:
    | "basics"
    | "safety_and_legality"
    | "practical_use"
    | "goal_specific"
    | "compound_specific"
    | "access_and_sourcing"
    | "context_and_skepticism";
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
