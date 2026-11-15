# AgenticTesting

My project to learn how to build an agentic AI tester by building one: study Playwright's built-in test agents, build my own with the Claude Agent SDK, and score both on seeded bugs in the RealWorld "Conduit" app. Personal learning project, not course material.

## Where things are

| Read this | For |
|---|---|
| `docs/PLAN.md` | Source of truth: phases, hypotheses H1 to H6, metrics, done criteria. Check it before starting work. |
| `docs/proposal.md` | The position paper this project tests. Don't edit unless asked. |
| `docs/ai-log.md` | Log of every agent session. Add an entry after each one. |
| `docs/findings.md` | Real bugs found in the upstream apps (F-001, ...). |
| `docs/UPSTREAM.md` | Upstream commits and every local patch to `apps/`. |

Layout: `apps/web` (SvelteKit, :5173), `apps/api` (Nitro + Prisma + Zod, SQLite, :3000), `spec/openapi.yml`, `e2e/` (Playwright: `tests/ui`, `tests/api`), `agent/` (my tester, Phase 2), `seeded-bugs/` (Phase 4).

## Commands

- `pnpm bootstrap`: install, generate the Prisma client, create `apps/api/dev.db`.
- `pnpm dev`: API and web together. `pnpm dev:api` / `pnpm dev:web` for one.
- `pnpm test` (or `test:ui`, `test:api`): Playwright. Starts the apps if they aren't running.
- `pnpm check`: guards (no em-dashes in docs, protected baseline unchanged). Also runs first in CI.
- In this desktop app, `.claude/launch.json` defines `api` and `web` preview servers.
- `apps/api/.env` holds `JWT_SECRET` (gitignored). Template: `.env.example`.

## Rules

- **Local only.** Never send requests to demo.realworld.show or api.realworld.show. `e2e/playwright.config.ts` rejects a non-local `WEB_URL` or `API_URL`; keep that check, but note it does not stop navigation to absolute URLs.
- **Ask before** changing the stack (pnpm monorepo, sveltejs/realworld, Nitro API, Playwright TypeScript, Claude Agent SDK), deleting anything, or installing global packages.
- **Agents propose, I approve.** No agent merges tests, files issues, or changes the baseline on its own.
- **Protected baseline:** `e2e/tests/ui/auth.smoke.spec.ts` and `e2e/tests/api/users-login.spec.ts` (Phase 0, AI-written by Claude Code and kept as the baseline; not a human baseline). Don't edit them unless I ask; after an approved change, refresh `e2e/baseline.sha256`.
- **Keep the scoring fair:** follow the fair-measurement rules in `docs/PLAN.md`. Never read `seeded-bugs/` or the hold-out suites unless I'm authoring them with you.
- **Upstream code:** any change under `apps/` gets a line in `docs/UPSTREAM.md` and a refreshed patch in `docs/upstream-patches/`.
- **Known bugs stay visible:** mark a test for a known bug with `test.fail()` and an F-number from `docs/findings.md`; don't fix the app quietly.
- **Writing:** no em-dashes in any docs. When a phase is done, summarize what's running, how to start it, and the next three tasks.

## Enforcement

Prose rules above are backed where possible:
- `.claude/settings.json`: asks before editing the baseline tests or `docs/proposal.md`; denies reading `apps/api/.env`, `seeded-bugs/` and the hold-out folder, and fetching the public RealWorld hosts. These bind Claude Code's tools and recognized shell commands only, not the Playwright browser tools, scripts, or other agents. While authoring seeded bugs with Claude, I remove the `seeded-bugs` deny temporarily.
- `pnpm check` and the CI `Guards` step bind everyone.

## Test conventions

- The `api` project's `baseURL` ends in `/api/`, so request paths have no leading slash (`request.post('users/login')`).
- Create a fresh user per test with `newUser()` from `e2e/tests/support/users.ts`; don't depend on test order or shared accounts.
- Prefer role and placeholder locators. Use a CSS class only where the app gives no accessible name (for example `.error-messages`).

## Gotchas

- `pnpm setup` is a pnpm built-in, so scripts are named `bootstrap` and `db:setup`.
- The API's unit tests use `bun:test` and need Bun, which isn't installed. The server runs on Node.
- `apps/api/Makefile` is upstream and Bun-based; use the pnpm scripts.
- SvelteKit warns about eager `fetch` during server rendering because `apps/web/src/lib/api.js` uses the global `fetch`; harmless for now.
