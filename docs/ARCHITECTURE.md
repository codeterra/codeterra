# POEHelper Architecture Notes

## Current Decisions

### Renderer Framework

Keep the current Electron renderer as plain JavaScript for now. The loot-filter workbench model is still evolving quickly, so a React and TypeScript migration should wait until the category/rule model settles. In the meantime, new renderer logic should move into small CommonJS/browser-compatible modules under `src/shared` whenever it can be tested without the DOM.

### Domain Typing

Domain constants and public rule shapes live in typed JavaScript modules with `// @ts-check` and JSDoc typedefs. This gives us editor/type feedback without forcing a repo-wide TypeScript conversion during active feature work.

### Storage

JSON settings are still acceptable for the current data volume. A local database should be introduced only when one of these becomes painful:

- price cache size or query patterns outgrow in-memory/runtime cache
- economy snapshots need historical querying instead of latest-plus-summary storage
- filter write history needs search, retention policies, or diff indexing
- profile versions need rollback beyond exported JSON/history files
- diagnostics events become too noisy for a single JSON payload

### Test Strategy

Use Vitest for isolated domain/shared-module tests. Keep the existing Node smoke scripts for Electron wiring and generated-filter regression checks until a full Electron/Playwright suite is worth the setup cost.

## Module Boundaries

- `src/domain`: clipboard item parsing, trade query construction, loot-filter profile normalization, typed schema constants.
- `src/services`: IO, provider adapters, filter generation, settings/profile persistence.
- `src/shared`: browser/CommonJS helpers that can be used by renderer code and tested directly.
- `scripts`: smoke tests, release checks, catalog/audit utilities.

New code should prefer domain/shared modules over adding more stateful helpers directly to `settings-renderer.js`.
