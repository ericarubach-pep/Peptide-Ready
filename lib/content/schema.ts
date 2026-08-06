import { z } from "zod";

// Frontmatter schema referenced throughout Section 6.3 / 14 ("apply the
// frontmatter schema from Section 6.3 to all peptide files"). Mirrors the
// peptides table so a migration script can write these fields straight into
// Supabase after the MDX body is parsed out.

export const administrationSummarySchema = z.object({
  route: z.string().optional(),
  dose_range: z.string().optional(),
  timing: z.string().optional(),
  cycling: z.string().optional(),
});

export const peptideFrontmatterSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  pcac_status: z
    .enum(["unregulated", "category_1", "category_2", "fda_approved", "under_review"])
    .default("unregulated"),
  administration_summary: administrationSummarySchema.default({}),
  is_sample: z.boolean().default(false),
  min_tier: z.enum(["basic", "pro", "enterprise"]).default("basic"),
  attorney_reviewed: z.boolean().default(false),
  last_reviewed: z.string().nullable().default(null),
});

export type PeptideFrontmatter = z.infer<typeof peptideFrontmatterSchema>;

export const guideFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  attorney_reviewed: z.boolean().default(false),
  last_reviewed: z.string().nullable().default(null),
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;
