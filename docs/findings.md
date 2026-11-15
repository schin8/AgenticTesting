# Findings

Real bugs found in the app as it ships upstream (not seeded). Seeded bugs are listed in `seeded-bugs/`.

| ID | Found by | Area | Summary | CWE | Status |
|---|---|---|---|---|---|
| F-001 | Human baseline (Phase 0) | Frontend login | Wrong password shows a generic "Something went wrong / 401" page instead of an error message | n/a (functional) | Open, test marked `test.fail()` |

## F-001: wrong password shows a generic error page

- **Where:** `apps/web/src/lib/api.js`, `send()`.
- **What happens:** the client only reads the response body when `res.ok` or the status is 422, and otherwise throws `error(res.status)`. The current RealWorld spec and this API return **401** for bad credentials, so the login form action throws and SvelteKit renders the error page.
- **Expected:** the login page shows an error such as "credentials invalid" and stays on `/login`.
- **Cause:** the frontend expects login failures as 422, while the spec (`spec/openapi.yml`, operation Login) and this API use 401. A front end and back end that each work on their own fail together. (Not yet checked: whether older spec versions used 422.)
- **Test:** `e2e/tests/ui/auth.smoke.spec.ts`, "login with a wrong password shows an error and stays signed out", marked `test.fail()` so CI stays green and turns red once the bug is fixed.
- **Fix (not applied):** treat 401 like 422 in `send()`, or return `fail(401, body)` from the action.
