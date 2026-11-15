# AI usage log

One entry per agent session: what I asked, what the agent produced, and what I changed by hand. Keep entries short; link to files and commits rather than pasting code.

Template:

```
## YYYY-MM-DD: <short title>
- Agent / model:
- Prompt (summary or link):
- Produced:
- I changed by hand:
- Right:
- Wrong:
- Metrics (if any):
```

At the end of each phase, add a reflection entry:

```
## YYYY-MM-DD: Phase N reflection
- What I learned:
- What surprised me:
- What I'd do differently:
- Continue? (after the minimum path: are Phases 3 to 5 worth it?)
```

---

## 2026-11-15: Phase 0 setup
- Agent / model: Claude Code (Opus 5.5); plan review by a Fable 5.2 subagent.
- Prompt: `docs/archive/2026-11-15-original-task.md`, then the rewrite in `docs/archive/2026-11-15-kickoff-brief.md`.
- Produced: pnpm monorepo, local patches to the upstream apps (`docs/UPSTREAM.md`), Playwright config, baseline UI and API tests, GitHub Actions workflow, `docs/PLAN.md`, `docs/findings.md`.
- I changed by hand: nothing yet. Review the baseline tests and decide if they count as "human baseline" or need rewriting by me.
- Right: found that the Svelte frontend points at the public API by default and made local the default; the API runs on Node without Bun; the baseline found a real integration bug (F-001).
- Wrong: first tried an Angular frontend in separate repos before the stack was settled; named a script `setup`, which clashes with a pnpm built-in.
- Metrics: none yet.

## 2026-11-15: Proposal review and doc reorganization
- Agent / model: Claude Code (Opus 5.5); proposal review by a Fable 5.2 subagent.
- Prompt: review `docs/proposal.md`, check how the brief aligns, then reorganize the markdown files.
- Produced: hypotheses H1 to H6 and Phase 5 (pull-request agent) in `docs/PLAN.md`; prompt-injection tests in Phase 3; `CLAUDE.md` with standing rules; Task.md archived; Proposal.md moved to `docs/`.
- I changed by hand: nothing yet. The X targets in the hypotheses table are still blank.
- Right: the proposal's benefits are now testable claims tied to phases.
- Wrong: n/a.

## 2026-11-15: AI setup review and enforcement
- Agent / model: Claude Code (Opus 5.5); setup review by a Fable 5.2 subagent (high effort).
- Prompt: review the AI setup (CLAUDE.md, settings, docs, memory) for fit and usefulness; then apply the "do now" fixes.
- Produced: `.claude/settings.json` permission rules, `scripts/check-guards.sh` (`pnpm check`) run first in CI, `e2e/baseline.sha256`, the `[::1]` fix in the localhost check, CLAUDE.md and PLAN.md corrections and dedupe; removed the unused shared-account fixture and redundant user memory.
- I decided: keep the two Phase 0 tests as the baseline, labeled AI-written. No timed human baseline, so H1 is now an absolute bar on my review time.
- Right: the deny rule was verified (a read of `seeded-bugs/` was blocked); both guards were verified to fail on a planted violation.
- Wrong: the baseline had been labeled "written by hand" when Claude Code wrote it; the `::1` host entry never matched.

## 2026-11-15: Hypothesis targets set
- Agent / model: Claude Code (Opus 5.5).
- Prompt: explain the X targets; I accepted the suggested values.
- Produced: H1 10 min, H2 60%, H3 90%, H4 70%, H5 2%, H6 10% in `docs/PLAN.md`, with the reasoning.
- I decided: use the suggested values as-is, before any agent results exist.

## 2026-11-15: Plan review as an exploratory exercise
- Agent / model: Claude Code (Opus 5.5).
- Prompt: review again; does this make a good exploratory exercise? Then update PLAN.md.
- Produced: early seeded bugs moved into Phase 1; Phase 1 marked as study, isolation starts in Phase 2 with the scoring copy as its first task; exploratory charters C1 to C3 with a human session on C1; small-numbers and H6 caveats; a minimum path with a decision point; a reflection entry at the end of every phase.
- I decided: apply all five fixes.
