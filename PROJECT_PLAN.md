# POEHelper Project Plan

Roadmap convention: completed items are ~~crossed out~~ and any unfinished remainder stays listed as normal work.

## Product Direction

POEHelper is a Windows-first Path of Exile companion app for the repeated in-game decisions that slow down play:

- "What is this item worth?"
- "What can this base or fragment turn into?"
- "Should my current filter show this item for this character right now?"

The app is no longer just a feasibility prototype. It now combines an Awakened PoE Trade-style price lookup flow with a fresh-slate loot-filter workbench, local filter profiles, economy-aware highlighting, and release/update tooling.

The current target remains Path of Exile 1. PoE 2 support should be treated as a later compatibility track unless the project direction changes.

## Current Stack

- Electron + Node.js desktop app.
- Plain HTML/CSS/JavaScript renderers.
- Electron main process services for settings, shortcuts, overlay/window management, OAuth, pricing, related outcomes, loot-filter generation, release/update support, and file IO.
- Local JSON settings and filter profiles.
- Electron Builder for Windows NSIS installer, portable builds, and GitHub release publishing.
- `electron-updater` for installed-build auto-update.

Keep the plain JS stack until the loot-filter workbench stabilizes. A React + TypeScript migration is still a good future move, but doing it before the product model settles would slow feature iteration.

## References

- Awakened PoE Trade: https://github.com/SnosMe/awakened-poe-trade
- Official item filter syntax: https://www.pathofexile.com/item-filter/about
- Official Path of Exile developer docs: https://www.pathofexile.com/developer/docs
- Official Path of Exile API reference: https://www.pathofexile.com/developer/docs/reference
- Path of Building Community Fork data: https://github.com/PathOfBuildingCommunity/PathOfBuilding/tree/dev/src/Data
- Sample filter in this repo: `example-filter.filter`

## What Is Already Built

### Desktop Shell

- Electron app shell with overlay and settings windows.
- Global shortcuts for price lookup, related outcomes, captured filter rules, settings, click-through toggle, and overlay hide.
- One-action copy flow for hovered in-game items.
- Tray menu.
- Click-through overlay support.
- Movable lookup overlay with persisted position.
- Lightweight PoE process/window detection.
- Diagnostics panel for copied text, parsed item state, recent events, and API errors.

### Price Lookup

- Copied-item parser for common PoE item text.
- Summary pricing through poe.ninja PoE 1 economy endpoints.
- Sparkline trend support when poe.ninja provides it.
- Official trade search generation.
- Official trade listing fetch with instant-buyout filtering.
- Configurable listing count in settings.
- Modifier extraction for rares.
- Trade stat matching against official trade stats data.
- Toggle UI for matched modifiers and item flags.
- Simple pseudo groups for obvious stats.
- Map danger warnings.
- Confidence hints for weak/low-confidence pricing cases.
- Local search presets.

### Related Outcomes

- Related Outcomes shortcut.
- Chance-base outcomes for normal bases and scoured magic/rare bases.
- Shared chance-base catalog from poe.ninja unique data plus curated overrides.
- Chance targets classified as `chanceable`, `not_chanceable`, or `unknown`.
- Corrupted items are blocked from chance-base flows.
- Boss fragment and invitation related-drop views with poe.ninja prices.
- No expected-value math yet because chance odds and many boss drop rates are not public.

### OAuth and API Foundation

- GGG OAuth settings for public desktop clients using authorization code with PKCE.
- Account profile and item-filter API wiring through `https://api.pathofexile.com`.
- Public Currency Exchange endpoint test.
- Service-token field exists as a future hook, but public desktop clients cannot request `service:*` scopes.

### Loot Filter Workbench

- Fresh-slate POEHelper profile model rather than NeverSink as the internal source of truth.
- Default generated filter ends with a show-all fallback.
- Local filter profiles with JSON import/export.
- Profile name becomes the generated filter name.
- Category pages for currency, maps, oils, fragments/invitations, blueprints, gems, div cards, scarabs, uniques, jewels, equipment, chance bases, economy, flasks, misc rules, and custom rules.
- Category-level styles and per-rule override styles.
- Style primitives: text/background/border color, font size, minimap icon, beam, built-in sound, custom MP3 sound, volume, and `DisableDropSoundIfAlertSound`.
- Sound preview in the settings UI.
- Captured custom rules always include the available criteria instead of relying on capture-default toggles.
- Special items and captured rules are merged into Custom Rules.
- Normal/magic equipment visibility toggles.
- Chance bases can ignore normal/magic equipment hiding and must be uncorrupted.
- Equipment visibility split by Armour, Shields, Weapons, and Jewelry.
- Armour/Shields UI selects defensive attributes, then applies per-slot base selection.
- Equipment tier sorting uses required level and defense data from Path of Building base data.
- Jewels are handled by the Jewels category, not Equipment.
- Economy-aware filter rules using cached poe.ninja economy snapshots.
- Economy cache tiers with per-tier caps.
- Validation and smoke scripts for parser/query and loot-filter output.

### Release and Distribution

- Windows installer and portable build scripts.
- One-click NSIS installer.
- GitHub release publishing flow.
- Release preflight checks.
- Auto-update support for installed builds.
- `release:patch` flow for check, version bump, tag push, and installer publication.
- Watch-dev script for local iterative development.

## Current Reality Check

The project has advanced past the original Phase 3 plan and has started parts of the original Phase 4 and Phase 5. The weak points are no longer feasibility or basic features. The weak points are now:

- UI complexity in the settings workbench.
- Data quality and update paths for curated/game-data-driven catalogs.
- Test coverage for UI state and generated filter correctness.
- Confidence and correctness for economy-derived rules.
- Lack of a loss-preserving filter import/parser.
- No durable local database/cache layer.
- Plain JavaScript is beginning to strain under the settings UI complexity.

## Updated Roadmap

### Milestone 1: Stabilize The Current App

Goal: make the existing features reliable before adding another large category of functionality.

Work:

- ~~Add focused UI tests for the settings workbench.~~
- ~~Add golden output tests for generated filters by profile scenario.~~
- ~~Add tests for equipment visibility interactions, especially per-attribute Top 2/Top 5 behavior.~~
- ~~Add tests for normal/magic equipment hiding exceptions.~~
- ~~Add tests for economy rule generation against known low-value unique/gem edge cases.~~
- ~~Improve diagnostics around filter generation: last written path, rule counts, hidden equipment counts, economy cache counts, and skipped invalid entries.~~
- ~~Add a visible dirty-state or unsaved-work indication in settings.~~
- ~~Add generated-filter summary chips before writing.~~
- ~~Add generated-filter diff preview before writing.~~
- ~~Review and clean naming in the settings UI so "rules", "visibility", "economy", and "custom rules" have consistent meanings.~~

Exit criteria:

- Existing Phase 3/4/5-ish features can be used without frequent UI confusion or silent filter mistakes.
- A user can tell what changed before writing a filter.
- Key workbench interactions are covered by automated tests.

### Milestone 2: Data Catalog And League Update System

Goal: make game-data-driven features safe to maintain each league.

Work:

- Move generated game data into clearly versioned local catalogs.
- Add a script to refresh equipment base requirements from Path of Building data.
- Add a script to audit chance-base curation after a new league.
- Add a script to audit economy item normalization across poe.ninja categories.
- Store catalog metadata: source, source revision/date, PoE release, generated date, and manual overrides.
- Add a settings diagnostics panel for catalog versions.
- Add a release checklist that includes catalog refresh/audit.
- Define rules for ambiguous display names such as `Two-Toned Boots`.

Exit criteria:

- After a PoE update, there is a repeatable command/checklist to refresh catalogs and identify manual curation gaps.
- The app can explain what data version it used when writing a filter.

### Milestone 3: Price Lookup Quality Pass

Goal: make price checking dependable enough to trust during real play.

Work:

- Improve rare modifier grouping and pseudo-stat matching.
- Add better handling for variant-sensitive items: gem level/quality, alternate/transfigured gems, corrupted uniques, foil/foulborn variants, item level, sockets/links, influences, fractures, synthesis, and enchantments.
- Add listing outlier warnings and spread/volume confidence.
- Add clearer commodity-vs-trade-search behavior so irrelevant controls are hidden.
- Add smarter pricing for boss drops and related outcomes where reliable data exists.
- Persist useful price/cache diagnostics.

Exit criteria:

- The overlay makes it clear when a result is commodity-based, trade-listing-based, or low-confidence.
- Common false-positive economy and unique pricing cases are reduced.

### Milestone 4: Loot Filter Workbench V1

Goal: turn the current powerful-but-growing settings workbench into a coherent product surface.

Work:

- Finish the equipment UI rework across armour, shields, weapons, jewelry, flasks, and chance bases.
- Add sample item previews for every category and rule.
- Add visual/sound preview rows for generated rules.
- Add rule ordering controls where order matters.
- Add enable/disable and show/hide behavior consistently across every category.
- Add filter write preview: count of Show/Hide blocks, top hidden classes, economy entries, and chance bases.
- Add rollback/version history for written filters.
- Add a raw generated filter viewer with search.

Exit criteria:

- A user can build and maintain a personal filter without needing to inspect raw `.filter` text.
- The workbench fits comfortably on a 1080p monitor.
- Category pages feel consistent and predictable.

### Milestone 5: Economy-Aware Filters V1

Goal: make economy rules useful without causing misleading loot highlights.

Work:

- Split economy normalization by category: stackables, uniques, gems, maps/fragments, jewels, and special bases.
- Store economy snapshots with league and timestamp.
- Add cache age warnings and refresh prompts.
- Add per-category matching precision: exact item, base-only, variant-sensitive, skipped.
- Do not generate economy rules for variant-sensitive items unless the filter conditions can represent the valuable variant.
- Add user-facing economy audit output.
- Preserve user styles and rule thresholds when refreshing market data.

Exit criteria:

- Economy highlights are explainable and conservative.
- Low-value variants do not trigger high-value rules merely because a different variant is expensive.

### Milestone 6: Import, Migration, And Interop

Goal: let users bring in existing filters or share filters without making POEHelper depend on another tool's model.

Work:

- Build a loss-preserving filter parser/AST.
- Import an existing `.filter` into either raw-reference mode or translated POEHelper profile mode.
- Preserve comments and unknown directives when exporting imported filters.
- Add JSON profile import/export version migration.
- Add profile diffing.
- Add a friend-import review screen that shows what will change before accepting it.

Exit criteria:

- A user can import/share profiles safely.
- Imported filter text is not corrupted by a no-op import/export cycle.

### Milestone 7: Architecture Upgrade

Goal: reduce complexity and make future features cheaper.

Work:

- Decide whether to migrate renderer code to React + TypeScript.
- Move domain logic to typed modules.
- Introduce a local database if JSON settings become too heavy:
  - price cache
  - economy snapshots
  - filter write history
  - profile versions
  - diagnostics events
- Add Vitest for domain tests.
- Add Playwright or Electron-oriented UI smoke tests.
- Split `settings-renderer.js` into modules even before a full framework migration.

Exit criteria:

- The workbench is no longer bottlenecked by one large renderer file.
- Domain behavior is easier to test than UI behavior.

### Milestone 8: Companion Suite

Goal: expand only after price lookup and filter workbench feel dependable.

Candidates:

- Stash search presets and hotkeys.
- Farming strategy notes.
- Build-specific filter/profile recommendations.
- Bossing helper panels.
- Session summary: checked drops, valuable drops, filter edits, recent searches.
- Optional account-auth features after OAuth scope/policy implications are clear.

## Near-Term Backlog

1. ~~Add UI tests or smoke coverage for equipment Top 2/Top 5 per selected attribute group.~~
2. Add a catalog refresh script for `equipment-base-requirements.js`.
3. Add catalog metadata to settings diagnostics.
4. Finish equipment visibility UX for weapons and jewelry with the same clarity as armour/shields.
5. ~~Add filter write summary before writing.~~
6. Add generated filter history/rollback.
7. Add economy audit output in the UI.
8. Harden economy matching for variant-sensitive gems and uniques.
9. Add raw generated filter viewer/search.
10. Split `settings-renderer.js` into feature modules.

## Release Checklist

Before publishing a release:

1. Run `npm.cmd run check`.
2. Run `npm.cmd run validate:equipment`.
3. Run `npm.cmd run report:chance -- <league> 100`.
4. Run `npm.cmd run audit:economy` for the target league once economy data is current.
5. Confirm catalog metadata is current.
6. Manually open settings and verify the main workbench tabs fit at 1080p.
7. Price check at least one currency, unique, rare, map, gem, and boss fragment.
8. Write a test filter and load it in Path of Exile.
9. Commit changes.
10. Run `npm.cmd run release:patch`.

## Compliance And Safety Requirements

- Do not read or modify game memory.
- Do not inject into the game process.
- Do not automate gameplay inputs.
- Keep macro behavior to one user action causing at most one permitted action.
- Use identifiable User-Agent headers for official API calls.
- Respect rate-limit headers and `Retry-After`.
- Keep OAuth tokens in the main process/local settings and out of renderer windows.
- Make clipboard/API/privacy behavior clear in settings.
- Include clear third-party/disclaimer language.
- Prefer conservative browser handoff or documented APIs when policy risk is unclear.

## Main Risks

- Settings UI complexity can keep regressing without componentization and tests.
- Economy data can create misleading filter highlights if variant-sensitive items are matched too broadly.
- Game data changes each league and needs a repeatable refresh/audit flow.
- Loot filters are ordered programs; incorrect rule ordering can silently hide important items.
- The current plain JS renderer is workable but increasingly expensive to maintain.
- Scope creep remains real; stabilize the current app before adding the broader companion suite.

## Recommended Product Definition For The Next Releasable Version

The next meaningful release should focus on reliability, not breadth:

1. Price lookup is fast, obvious, and honest about confidence.
2. The loot-filter workbench can generate a personal filter without layout friction.
3. Equipment/chance/economy rules are conservative and explainable.
4. Profiles can be exported/imported as JSON.
5. Installed builds auto-update cleanly from GitHub releases.
