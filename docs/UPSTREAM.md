# Upstream sources

Code is copied in, not linked as submodules. Local changes are listed here and kept as patches in `docs/upstream-patches/` (diff against the upstream commit).

| Folder | Upstream | Commit | Commit date |
|---|---|---|---|
| `apps/web` | https://github.com/sveltejs/realworld | `df796708040f5200ec572b28ab7f88ecee5794dd` | 2026-08-10 |
| `apps/api` | https://github.com/realworld-apps/nitro-prisma-zod-realworld-example-app | `428056b3bed0655c0c8bcd0d85739fe33a0748dd` | 2026-11-02 |
| `spec/openapi.yml` | https://github.com/realworld-apps/realworld (`specs/api/openapi.yml`) | `25588846c314b15a5e427ffe816e6b4af7be68c7` | 2026-11-02 |

## Local changes

### apps/web (`upstream-patches/web.patch`)
- `src/lib/api.js`: API base reads `API_BASE_URL` (private env) and defaults to `http://localhost:3000/api` instead of the hard-coded public API.
- `svelte.config.js` and `package.json`: `@sveltejs/adapter-vercel` replaced with `@sveltejs/adapter-node` 5.x (SvelteKit 2), so it builds and runs locally and in CI.
- `package.json`: renamed to `@conduit/web`; `dev` and `preview` pinned to port 5173; `packageManager` removed (set at the root).
- Removed: `pnpm-workspace.yaml`, `pnpm-lock.yaml` (root workspace owns these), `.nvmrc` (root `.nvmrc` is 22).

### apps/api (`upstream-patches/api.patch`)
- `nitro.config.ts`: preset `bun` changed to `node-server`; `compatibilityDate` added.
- `package.json`: renamed to `@conduit/api`; scripts run on Node (`nitro dev --port 3000`, `prisma generate`, `prisma db push`, `node .output/server/index.mjs`); added `db:setup`; unit tests kept as `test:unit` (needs Bun).
- Removed: `bun.lock`, `.gitmodules`, the empty `realworld` submodule folder, `.github/` (upstream CI).

## Updating from upstream

Clone the upstream repo at the new commit, copy it over the folder, re-apply the patch (`git apply docs/upstream-patches/<name>.patch`, fix conflicts by hand), then update the commit table above.
