Goal: Set up a project in ~/Src/Projects/AgenticTesting for building an agentic AI QE (agentic Playwright tester), and write a plan for it. I'm a Platform Engineer/SDET and also teach Secure Software Development, so the plan should cover functional and security testing.

Target app: RealWorld "Conduit" (Medium clone with a shared API spec).
- Spec and docs: https://github.com/realworld-apps/realworld and https://docs.realworld.show
- Implementations: https://codebase.show/projects/realworld
- Run everything locally. Do not run tests against the public demo (demo.realworld.show) or api.realworld.show.

Defaults (ask me before changing them):
- Tests: Playwright with TypeScript
- Backend: a spec-compliant TypeScript/Node backend (the realworld repo lists Nitro + Prisma + Zod as passing the full API spec)
- Frontend: the official Angular frontend (realworld-apps/angular-realworld-example-app) or a well-maintained React one
- Agents: Playwright's built-in test agents (planner, generator, healer) plus Playwright MCP, driven by Claude Code. Check the current Playwright docs for the exact setup commands and versions instead of assuming.

Steps:
1. Check what's installed (git, node, npm, docker) and tell me what's missing before installing anything.
2. Create this layout:
   - app/       cloned RealWorld frontend and backend (or a docker-compose that runs both)
   - spec/      the RealWorld spec repo, for reference
   - tests/     the Playwright project (UI tests and API tests kept separate)
   - agents/    agent configs, prompts and specs
   - docs/      PLAN.md and notes
3. Get the app running locally and confirm I can sign up, log in and post an article.
4. Set up Playwright with one hand-written smoke test (sign up, log in) and one API test (POST /api/users/login), so we have a human baseline.
5. Write docs/PLAN.md with these phases:
   - Phase 0: environment and baseline tests (above)
   - Phase 1: use the planner agent to explore the app and produce a test plan, then the generator to write tests, then the healer to fix failures. Record what it got right and wrong.
   - Phase 2: API testing against the RealWorld spec, including contract checks.
   - Phase 3: security tests: broken access control (editing another user's article), JWT tampering and expiry, input validation and XSS in articles and comments, and auth on every endpoint. Map findings to CWE IDs.
   - Phase 4: CI with GitHub Actions running the suite on each push.
   - Phase 5 (optional): build a custom agent with the Claude Agent SDK and compare it to the built-in agents.
   - For each phase: goal, tasks, done criteria, and what to measure (coverage, flaky rate, tests needing human edits, bugs found).
6. Keep an AI usage log in docs/ai-log.md: prompts, what the agent produced, and what I changed by hand.

Rules: don't use em-dashes in any docs you write. Ask before deleting anything or installing global packages. When done, summarize what's running, how to start it, and the first three tasks for me.
