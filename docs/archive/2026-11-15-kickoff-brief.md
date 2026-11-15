> Archived 2026-11-15. This was the kickoff prompt. Phases and hypotheses now live in `docs/PLAN.md`; standing rules live in `CLAUDE.md`. Kept as the record of the original prompt for `docs/ai-log.md`.

Goal: Learn how to build an agentic AI tester by building one. Study Playwright's built-in test agents to see how a working one is put together, then build my own with the Claude Agent SDK and measure both on the same seeded bugs. Cover functional and security testing. I'm a Platform Engineer/SDET.

This project is the hands-on test of Proposal.md: each phase confirms or refutes one of the proposal's claims, written below as hypotheses H1 to H6. Working definition: an agentic tester delegates bounded testing tasks to LLM agents that plan and act through tools, but keeps ownership of the oracle (what counts as correct). Agents propose; I approve anything that changes the test suite or the defect backlog.

An agentic tester has five parts, and the phases should teach each one:
- Perception: how the agent sees the app (accessibility snapshots via Playwright MCP, the Playwright CLI, screenshots, the OpenAPI spec).
- Planning: deciding what to test (from exploration, a spec, or a seed test).
- Action: driving the browser or calling the API through tools.
- Oracle: deciding whether something is a bug. The hardest part.
- Healing and memory: fixing broken tests without hiding real failures, and carrying knowledge between runs.

Target app: RealWorld "Conduit" (Medium clone with a shared API spec).
- Spec and docs: https://github.com/realworld-apps/realworld and https://docs.realworld.show
- Run everything locally. Never run tests against demo.realworld.show or api.realworld.show.

Stack (ask me before changing):
- One git repo, pnpm workspaces.
- Frontend: sveltejs/realworld (SvelteKit 2, Svelte 5, JavaScript). Change its hard-coded API base to an env var that defaults to the local API.
- Backend: realworld-apps/nitro-prisma-zod-realworld-example-app, run on Node (no Bun needed). SQLite.
- Upstream code is copied in (no submodules). docs/UPSTREAM.md records the source commit and every local patch.
- Tests: Playwright with TypeScript, pinned version.
- Built-in agents: `npx playwright init-agents --loop=claude` (planner, generator, healer) driven by Claude Code. Check the current Playwright docs for exact commands.
- My agent: Claude Agent SDK (TypeScript), with Playwright MCP or the Playwright CLI as its tools.

Layout:
- apps/web/       SvelteKit frontend
- apps/api/       Nitro backend
- spec/           openapi.yml only (agents may read it)
- e2e/            Playwright project: tests/ui, tests/api, seed test, planner output
- agent/          my agentic tester (Agent SDK code, prompts, tools)
- seeded-bugs/    one git patch per bug, applied one at a time
- docs/           PLAN.md, ai-log.md, UPSTREAM.md, results
- Hold-out: the upstream RealWorld e2e, Hurl and Bruno suites live outside this repo (sibling folder) so agents can't read them. Used only as a reference score.

Phases (each needs goal, tasks, done criteria and metrics in docs/PLAN.md):
- Phase 0: Baseline. App runs locally; I can sign up, log in and post an article. One hand-written UI smoke test (sign up, log in) and one API test (POST /api/users/login). Basic GitHub Actions CI that starts both apps and runs the baseline, with traces uploaded.
- Phase 1: Study the built-in agents. Run init-agents, read the generated agent prompts and MCP tools, and trace how planner, generator and healer hand off. Use them to plan, generate and heal tests. Record what they got right and wrong, and classify every healer change (locator fix, weakened assertion, skip).
- Phase 2: Build my own minimal tester. One loop first: explore a page, propose a test, run it, read the result. Then add planning from the OpenAPI spec, an oracle, and healing, one piece at a time. Build the action layer twice (MCP and CLI) and compare.
- Phase 3: Security abilities. Can my agent find, from the OpenAPI spec and a threat-model prompt: broken access control (editing another user's article), JWT tampering, alg none and expiry, missing auth on endpoints, XSS in articles and comments, CSRF on SvelteKit form actions, cookie flags and forged cookies (hooks.server.js trusts the jwt cookie without verifying it), mass assignment. Write the same checks by hand as the oracle. Map findings to CWE IDs. Also test the agents themselves for prompt injection: articles and comments are user-written text the agent reads, so seed some with instructions aimed at the agent and check it ignores them.
- Phase 4: Evaluate. Seed 15 to 20 bugs (about 10 functional, 8 security), applied one at a time. Score four arms on them: my hand-written tests, the built-in agents, my agent, and the hold-out upstream suite. Add a CI job that runs the suite against each seeded bug, and a flake job (--repeat-each=10).
- Phase 5: Pull-request agent (the proposal's example workflow, risk-based testing and root cause analysis). Treat each seeded-bug patch as a pull request. On each one the agent: rates the risk of the change, picks which tests to run, runs them, and when one fails names the likely cause (file and change). It drafts a GitHub Issue that I approve before it is filed. Score it on the seeded bugs: did it pick a test that catches the bug, and did it name the right cause.

Hypotheses (from Proposal.md's benefits; fill in the X values before Phase 1 so they can't drift):
- H1 Faster creation: agent-generated tests reach a state I'd merge in under X minutes of my time per test, versus my hand-written baseline.
- H2 Defect detection: the generated suite catches at least X% of the seeded bugs, versus the baseline and hold-out suites.
- H3 Self-healing: the healer repairs locator-only changes and flags (not hides) at least X% of seeded behavior changes.
- H4 Exploratory testing: at least X% of bugs the agent reports are real (precision), with recall measured on seeded bugs.
- H5 Cost and stability: flaky rate over 10 to 20 runs, and cost per run and per pull request in tokens and minutes.
- H6 Risk-based selection: the tests the Phase 5 agent picks miss no more than X% of the failures the full suite catches.

Metrics that feed the hypotheses:
- Seeded-bug detection rate per arm, functional and security separately (H2).
- False failures on the clean app (H4).
- Human edits to generated tests (git diff --numstat), share merged untouched, and my review time (H1).
- Healer outcomes, including how many seeded bugs it hid (H3).
- Flaky rate over repeated runs (H5).
- OpenAPI coverage: operation and status-code pairs exercised out of those documented.
- Overlap with the hold-out suite.
- Cost: tokens and wall-clock per kept test and per pull request (H5).
- Pull-request agent: test-selection miss rate and correct-cause rate (H6).

Keep an AI usage log in docs/ai-log.md: prompts, what the agent produced, and what I changed by hand.

Rules: agents propose, I approve: no agent merges tests, files issues or changes the baseline on its own. No em-dashes in any docs. Ask before deleting anything or installing global packages. When done with a phase, summarize what's running, how to start it, and the next three tasks.
