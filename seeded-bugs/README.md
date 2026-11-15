# seeded-bugs

Deliberate bugs used to score each testing approach (Phase 4). One `git` patch per bug, applied one at a time to a clean tree.

Naming: `NN-area-short-name.patch`, for example `01-api-article-update-no-author-check.patch`.

Each patch gets a row here:

| ID | Type | Area | Description | CWE |
|---|---|---|---|---|

Keep this folder out of the agents' view while they are being scored (deny it in the agent's permissions), or the answers leak.
