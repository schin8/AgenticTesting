#!/usr/bin/env bash
# Guards that bind every agent, not just Claude Code. Run from the repo root:
#   pnpm check
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0

# 1. No em-dashes in the docs we write (upstream code under apps/ is excluded).
docs=$(find . -name '*.md' \
  -not -path '*/node_modules/*' -not -path './apps/*' \
  -not -path './e2e/playwright-report/*' -not -path './e2e/test-results/*')
if grep -n $'\xe2\x80\x94' $docs; then
  echo "FAIL: em-dash found in the docs above"; fail=1
else
  echo "ok: no em-dashes in docs"
fi

# 2. The protected baseline tests are unchanged.
#    After an approved change, refresh with:
#    shasum -a 256 e2e/tests/ui/auth.smoke.spec.ts e2e/tests/api/users-login.spec.ts > e2e/baseline.sha256
if command -v sha256sum >/dev/null; then sum=(sha256sum -c); else sum=(shasum -a 256 -c); fi
if "${sum[@]}" --quiet e2e/baseline.sha256; then
  echo "ok: baseline tests unchanged"
else
  echo "FAIL: protected baseline tests changed (see e2e/baseline.sha256)"; fail=1
fi

exit $fail
