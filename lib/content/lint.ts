// TS port of scripts/lint-content.sh's patterns, used by the admin
// flagged-content queue (Section 10) to surface violations per-file instead
// of just failing a shell pipeline.

const FLAG_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "imperative instruction", pattern: /you should/i },
  { label: "self-administration imperative", pattern: /\binject yourself\b|\bdose yourself\b/i },
  { label: "imperative instruction", pattern: /\binject\b/i },
  { label: "instructional dosage", pattern: /\d+\s*(mg|mcg|iu)\s*(per day|daily|per week|weekly)/i },
  { label: "instructional dosage", pattern: /(intro|beginner|starting)[\s/-]*dose/i },
];

export interface LintFlag {
  label: string;
  match: string;
  line: number;
}

export function lintContent(body: string): LintFlag[] {
  const flags: LintFlag[] = [];
  const lines = body.split("\n");

  lines.forEach((line, index) => {
    for (const { label, pattern } of FLAG_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        flags.push({ label, match: match[0], line: index + 1 });
      }
    }
  });

  return flags;
}
