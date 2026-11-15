# AgenticTesting

Learning to build an agentic AI tester, using the RealWorld "Conduit" app as the target. See `docs/PLAN.md` for the phases and hypotheses, `docs/proposal.md` for the ideas being tested, and `CLAUDE.md` for the rules Claude Code follows here.

## Layout

| Path | What |
|---|---|
| `apps/web` | SvelteKit frontend (port 5173) |
| `apps/api` | Nitro + Prisma + Zod API on SQLite (port 3000) |
| `spec/openapi.yml` | RealWorld API spec (agents may read it) |
| `e2e/` | Playwright project: `tests/ui`, `tests/api` |
| `agent/` | My agentic tester (Phase 2) |
| `seeded-bugs/` | Bug patches for scoring (Phase 4) |
| `docs/` | Plan, AI log, findings, upstream notes |

## Run it

Needs Node 22.12+ and pnpm 10.

```bash
pnpm bootstrap          # install, generate Prisma client, create dev.db
cp .env.example apps/api/.env   # then set JWT_SECRET (openssl rand -base64 32)
pnpm dev                # API on :3000, web on :5173
pnpm test               # Playwright; starts the apps itself if they aren't running
```

Local only: the Playwright config refuses to run against any non-local host.
