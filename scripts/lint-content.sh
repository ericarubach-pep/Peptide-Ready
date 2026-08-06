#!/usr/bin/env bash
# Section 9.3 compliance linter — run as a pre-commit hook and again over the
# migrated library. Flags instructional (not research-framed) language before
# a doc is eligible for the Attorney-Reviewed badge (Section 9.4).
#
# The scope doc's literal pattern ("take X mg") is a placeholder, not a real
# regex — it wouldn't match an actual dosage like "250 mcg". This extends it
# with the patterns needed to actually catch Section 9.2's flagged example
# ("Intro/beginner dose: 250 mcg per day").
set -euo pipefail

CONTENT_DIR="${1:-content/}"
FAILED=0

PATTERNS=(
  'you should'
  'inject yourself'
  'dose yourself'
  '\binject\b'
  '[0-9]+[[:space:]]*(mg|mcg|iu)[[:space:]]*(per day|daily|per week|weekly)'
  '(intro|beginner|starting)[/[:space:]-]*dose'
)

for pattern in "${PATTERNS[@]}"; do
  if grep -rniE "$pattern" "$CONTENT_DIR" --include="*.mdx"; then
    echo "lint-content: flagged instructional language matching /$pattern/ (see Section 9.2)" >&2
    FAILED=1
  fi
done

if [ "$FAILED" -ne 0 ]; then
  echo "lint-content: FAILED — rewrite flagged sections against Section 9.2 before attorney review." >&2
  exit 1
fi

echo "lint-content: OK — no instructional-language violations found in $CONTENT_DIR"
