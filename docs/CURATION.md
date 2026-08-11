# Curated Data Workflow

Curated data must be tagged before it is used for loot-filter generation. The chance-base overrides live in `src/data/chance-target-overrides.js` and include:

- `schemaVersion`: shape of the curated data file.
- `dataVersion`: app-owned curation batch identifier.
- `gameVersion`: release/review tag for the Path of Exile update it was checked against.
- `updatedAt`: date the curation was last reviewed.
- `updatePolicy`: reminder for when the data must be revalidated.

## Release Update Checklist

1. Update dependencies and run `npm.cmd run check`.
2. Run `npm.cmd run report:chance -- <LeagueName> 100` after the new league economy has useful data.
3. Review high-value unknown targets and decide whether each is `chanceable`, `not_chanceable`, or still `unknown`.
4. Add safe overrides only when the source is clear enough for loot-filter decisions.
5. Bump `dataVersion`, `gameVersion`, and `updatedAt`.
6. Keep unknown targets out of definite chance-base loot-filter rules until curated.
7. Re-run `npm.cmd run check`.

The report command uses live poe.ninja data, so it is not part of the normal local check script.
