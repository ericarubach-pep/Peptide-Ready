import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { guideFrontmatterSchema, peptideFrontmatterSchema, type GuideFrontmatter, type PeptideFrontmatter } from "./schema";

const PEPTIDES_DIR = path.join(process.cwd(), "content", "peptides");
const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export interface ContentFile<Frontmatter> {
  frontmatter: Frontmatter;
  body: string;
}

function readMdxDir<Frontmatter>(
  dir: string,
  schema: { parse: (data: unknown) => Frontmatter }
): ContentFile<Frontmatter>[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return { frontmatter: schema.parse(data), body: content };
    });
}

export function getAllPeptides(): ContentFile<PeptideFrontmatter>[] {
  return readMdxDir(PEPTIDES_DIR, peptideFrontmatterSchema);
}

export function getPeptideBySlug(slug: string): ContentFile<PeptideFrontmatter> | null {
  return getAllPeptides().find((p) => p.frontmatter.slug === slug) ?? null;
}

export function getAllGuides(): ContentFile<GuideFrontmatter>[] {
  return readMdxDir(GUIDES_DIR, guideFrontmatterSchema);
}

export function getGuideBySlug(slug: string): ContentFile<GuideFrontmatter> | null {
  return getAllGuides().find((g) => g.frontmatter.slug === slug) ?? null;
}
