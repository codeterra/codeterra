# POEHelper Project Plan

## Product Direction

POEHelper should start as a Windows-first Path of Exile companion app that combines fast in-game price lookup with a personal loot-filter workbench. The north star is not to clone every community tool at once, but to make the most repeated play-session decisions easier: "Is this worth picking up?", "How should this item be priced?", and "Do I want my filter to show this for my build right now?"

The first target should be PoE 1, with PoE 2 support treated as a later compatibility track unless you decide the app should be PoE 2-first.

## References

- Awakened PoE Trade: https://github.com/SnosMe/awakened-poe-trade
- Awakened PoE Trade download/requirements: https://snosme.github.io/awakened-poe-trade/download
- Official item filter syntax: https://www.pathofexile.com/item-filter/about
- Official Path of Exile developer docs and API policy: https://www.pathofexile.com/developer/docs
- Official Path of Exile API reference: https://www.pathofexile.com/developer/docs/reference
- Sample filter in this repo: `example-filter.filter`

## Initial Findings

- The sample filter is a full NeverSink-style generated filter with 10,836 lines, 722 `Show` blocks, 30 `Hide` blocks, 107 section headers, and many `# !! Waypoint` comments.
- Path of Exile filters are ordered rule programs. A `Show`, `Hide`, or `Minimal` block has conditions and actions; multiple conditions in a block must all match. `Continue` allows later rules to keep applying.
- Useful filter conditions include `Class`, `BaseType`, `Rarity`, `AreaLevel`, `ItemLevel`, `MapTier`, `Sockets`, `SocketGroup`, `StackSize`, influence flags, gem conditions, and explicit/enchantment mod checks.
- Useful filter actions include text/background/border colors, font size, alert sounds, minimap icons, and beam effects.
- Awakened PoE Trade is an Electron/Vue/TypeScript app with an overlay, global hotkeys, price checking, map/item checking, stash search, timers, image references, and supporting data sources such as poe.ninja, poeprices.info, and RePoE.
- GGG allows independent executable apps, but API use must follow their policy, OAuth model, identifiable User-Agent rules, rate-limit headers, and macro restrictions.

## Recommended Stack

### App Shell

Use **Electron + Node.js**, with the option to add TypeScript once the app surface stabilizes.

Reasons:

- Electron has already proven the important Windows overlay features for this project: transparent windows, always-on-top behavior, click-through toggling, global shortcuts, tray controls, and preload-guarded IPC.
- Node keeps early development dependency-light and avoids the Rust/Tauri toolchain requirements for now.
- The main process can own file IO, shortcuts, overlay/window management, process/window detection, secure-ish local settings boundaries, and future native integrations.
- Renderer code can own the UI-heavy workbench: price panels, filter editor, previews, settings, diagnostics, and workflow screens.

Revisit Tauri only if Electron becomes a clear packaging or runtime liability. Awakened PoE Trade proves Electron is viable for this class of tool.

### Frontend

- Plain HTML/CSS/JavaScript for the prototype; migrate to React + TypeScript when Phase 3/4 UI complexity justifies it.
- Vite or another bundler after the migration.
- Zustand or Jotai for app state
- TanStack Query for cached API data and request state
- TanStack Router if multiple screens become complex
- Monaco Editor for raw filter editing
- React Hook Form + Zod for settings/forms/validation
- Tailwind CSS or CSS Modules, with a restrained desktop-tool UI

### Backend/Core

- Electron main process plus Node services for file watching, global shortcuts, settings, atomic filter writes, and local cache.
- SQLite via `sqlx` or `rusqlite` for local snapshots, price cache, filter versions, presets, and user rules.
- A typed TypeScript domain layer for item parsing and query construction can be added once the plain JavaScript prototype starts to strain.

### Testing

- Vitest for parser/query/unit tests.
- Playwright for core UI flows.
- Node unit tests for file operations and filter export safety.
- Snapshot/golden-file tests for parsing and re-emitting `.filter` files without corrupting comments or ordering.

## Architecture

### Modules

- `desktop-host`: Electron main process, windows, shortcuts, file IO, local OS integration.
- `overlay`: transparent price-check and quick action surfaces.
- `item-parser`: parses copied PoE item text into normalized item models.
- `pricing`: builds trade queries, handles poe.ninja-style summary pricing, caching, rate-limit backoff, and result normalization.
- `filter-parser`: parses `.filter` files into a loss-preserving AST.
- `filter-workbench`: visual filter management, presets, rule groups, previews, diff/export.
- `game-profile`: league, realm, language, account-independent paths, client log path if needed.
- `settings`: hotkeys, overlay position, privacy, cache, filter folder, API behavior.

### Data Principles

- Store user intent as structured presets/patches, not only as edited generated text.
- Preserve original filter comments, section order, spacing, and unknown directives when importing.
- Export through a deterministic formatter so changes are reviewable.
- Keep a full version history of generated filters so users can roll back after a bad league-start tweak.

## Feature Progression

### Phase 0: Feasibility Spike

Goal: prove the app shell can support the gameplay loop.

- Create minimal Electron app.
- Register configurable global hotkey.
- Read clipboard item text after user keypress.
- Show a small always-on-top overlay near cursor or fixed screen corner.
- Detect PoE window state enough to avoid showing the overlay over unrelated apps.
- Confirm transparent/click-through overlay behavior on Windows.
- Confirm package/signing path.

Exit criteria:

- Hotkey plus clipboard flow works while PoE runs in Windowed Fullscreen.
- Overlay appears reliably and closes/focuses predictably.
- Decision made: continue Electron unless a later packaging/performance issue justifies revisiting the shell.

### Phase 1: Price Lookup MVP

Goal: useful price checks before filter editing.

- Parse common copied item text: currency, uniques, gems, maps, divination cards, rares.
- League selector and settings.
- Price check panel with item summary, normalized modifiers, and query controls.
- Query official trade-compatible searches where allowed and/or open the official trade page with generated query.
- Add poe.ninja-style cached summary pricing for commodities.
- Add rate-limit-aware request queue and response cache.
- Add "copy trade search URL" and "open in browser" actions.

Exit criteria:

- Currency, unique, gem, map, div card, and basic rare checks are useful in real play.
- Every external request path has caching, retry, rate-limit handling, and clear failure UI.

### Phase 2: Better Item Intelligence

Goal: make price lookup feel better than manual searching.

- Modifier toggle UI for rares.
- Pseudo-stat grouping where practical.
- Socket/link/corruption/influence/fracture/synth filters.
- Map mod analysis with user-defined dangerous/wanted mods.
- Bulk exchange helper.
- Price confidence indicators: stale data, low sample size, wide price spread, likely price-fixing.
- Saved search presets.

Exit criteria:

- Rare item checks can be narrowed/widened without editing JSON.
- Maps and commodity items are faster than browser workflows.

### Phase 3: Fresh-Slate Loot Filter Foundation

Goal: create POEHelper's own filter model instead of treating NeverSink as the source of truth.

- Build a versioned filter profile with shared visual styles by item family and tier.
- Default posture is show all items, then intelligently add stronger show/hide rules above the default.
- Configure visual primitives: text color, background color, border color, font size, alert sound, minimap icon, and beam.
- Establish family defaults such as black/green currency labels and yellow/black rare labels with tiered borders.
- Generate a valid standalone `.filter` file from the profile.
- Add a hotkey workflow that captures the hovered in-game item and creates a rule from metrics such as `Class`, `BaseType`, `Rarity`, `ItemLevel`, `MapTier`, `Quality`, and corruption state.
- Store captured item rules as structured profile data so they can be edited later.

Exit criteria:

- A fresh POEHelper filter can be generated and selected in game.
- Capturing a hovered item can add a Show/Hide rule and write the filter.
- The generated filter ends with an explicit show-all fallback.

### Phase 4: Personal Filter Workbench

Goal: FilterBlade-like usefulness, but focused on your preferences.

- Visual rule cards for high-value categories: currency, maps, scarabs/fragments, div cards, gems, uniques, crafting bases, leveling gear.
- Controls for visibility, strictness, font size, label colors, border/background, alert sound, minimap icon, and beam.
- Build profile presets: league start, early maps, farming strategy, bossing, SSF, trade, leveling.
- Rule editor for captured rules and family/tier defaults.
- Preview samples: "what would this item look/sound like?"
- Optional import tools can come later, but they should translate into POEHelper profile concepts rather than making NeverSink the design baseline.
- One-click export to the PoE filter folder.

Exit criteria:

- You can make personal changes through UI, preview them, export a valid `.filter`, and roll back.

### Phase 5: Economy-Aware Filters

Goal: connect price knowledge to pick-up rules.

- Cached price tiers for currency, fragments, scarabs, div cards, uniques, gems, and common crafting bases.
- Rules such as "show div cards above X chaos", "highlight scarabs above Y", "hide low-value currency below stack size Z".
- League-update workflow that refreshes economy tiers without overwriting personal style.
- Warnings for volatile/low-confidence prices.

Exit criteria:

- The app can regenerate selected tier lists from market data while preserving user choices.

### Phase 6: Companion Suite

Goal: expand beyond Awakened-style parity.

- Stash search presets and hotkeys.
- Timers/reminders.
- Strategy notes or image reference widgets.
- Build-specific checklist panels.
- Session summary: valuable drops checked, filter changes made, recent searches.
- Optional account-auth features only after OAuth registration is understood and approved.

## Compliance and Safety Requirements

- Do not read or modify game memory.
- Do not inject into the game process.
- Do not automate gameplay inputs.
- Keep all game-affecting macro behavior to one user action causing at most one permitted action.
- Use clear privacy settings for clipboard, logs, account data, and external requests.
- Include GGG's third-party notice in settings/about.
- Use identifiable User-Agent headers for official API calls.
- Respect dynamic rate-limit headers and `Retry-After`.
- Prefer opening official trade URLs over reverse-engineering undocumented endpoints if the policy risk is unclear.

## Main Risks

- Overlay reliability: Windows overlay behavior over games can be fiddly. Mitigate with Electron smoke checks and a later native helper only if needed.
- Trade API policy: official public docs limit what is explicitly supported. Mitigate with conservative API use, browser handoff, caching, and clear User-Agent/rate-limit handling.
- Filter parser correctness: filters are ordered and large. Mitigate with loss-preserving AST, golden-file tests, and patch layers.
- Economy data quality: market listings can be noisy. Mitigate with confidence indicators and user override tiers.
- Scope creep: this idea can become ten apps at once. Mitigate by shipping price lookup first, then filter import/export, then visual customization.

## Recommended First Backlog

1. Create Electron app skeleton.
2. Implement app settings storage and Windows packaging baseline.
3. Implement global hotkey and clipboard item capture.
4. Implement overlay proof of concept.
5. Build copied-item parser fixtures for common item types.
6. Build price check UI with mocked data.
7. Add real pricing adapters and request cache.
8. Build filter lexer/parser for block structure.
9. Add golden test for `example-filter.filter`.
10. Build filter section navigator and raw editor.

## Opinionated MVP Definition

The first releasable version should do three things very well:

1. Press a hotkey over an item and get a useful price panel.
2. Import an existing `.filter`, browse/search its sections, and export it unchanged.
3. Add personal override rules through a simple UI and write a valid filter to the PoE filter folder.

That combination is small enough to finish, but strong enough to become the foundation for the larger companion app.

## Implementation Notes

### Phase 0 Complete

- Electron shell, global hotkey, clipboard capture, always-on-top overlay, tray menu, click-through mode, and lightweight PoE process/window detection are implemented.

### Phase 1 Complete

- Copied item parsing was moved into a fixture-tested domain module.
- Summary pricing is implemented through poe.ninja's current PoE 1 economy endpoints with a 15-minute cache.
- Official trade search generation is implemented for browser handoff.
- The overlay now supports league selection, summary price display, trade opening, and query JSON copying.
- Rare item pricing at this point was still broad and modifier-light.

### Phase 2 Complete

- Copied item parsing now extracts candidate modifiers and simple pseudo groups.
- Official trade stat matching is implemented with a daily in-memory cache.
- The overlay now lets users toggle matched modifiers and item flags before opening/copying a trade query.
- Map warning detection flags dangerous mods such as reflect, no regeneration, no leech, and reduced recovery.
- Confidence hints are displayed for rares, special bases, unidentified items, low sample sizes, and unavailable stat matching.
- Local saved search presets are available for repeated query option setups.
- Full pseudo-stat query generation and deeper rare valuation remain future work.

### Pre-Phase 3 Polish Complete

- Price lookup now uses `Ctrl+D` and sends a single copy command before reading the hovered item text.
- `Shift+Space` opens a dedicated settings window.
- The old clipboard-first flow remains available from the overlay/tray as a fallback and debugging path.
- The lookup overlay can be dragged by its header.
- The overlay was condensed around the main price answer and top instant-buyout listings.
- League and listing-count controls moved to settings.

### Pre-Phase 3 Economy/OAuth Foundation Complete

- poe.ninja overview matches now carry sparkline trend data into the overlay when the source response includes it.
- The settings window has GGG OAuth configuration for public desktop clients using authorization code with PKCE.
- Authenticated API calls are wired for account resources such as profile and item filters through `https://api.pathofexile.com`.
- Currency Exchange history is wired through GGG's public `https://web.poecdn.com/api/currency-exchange` endpoint.
- Optional service-token storage exists as a future hook, but public desktop OAuth cannot request `service:*` scopes.

### Pre-Phase 3 Related Outcomes Complete

- Added a configurable Related Outcomes shortcut, defaulting to `Ctrl+Alt+B`.
- Normal base items can show same-base unique candidates from poe.ninja, useful for chance-orb decisions.
- Supported boss fragments and invitations can show required fragment sets and notable mapped drops with poe.ninja prices.
- The first pass intentionally avoids exact expected-value math because chance odds and many boss drop rates are not public.
- Added a shared chance-base catalog module that combines poe.ninja unique overviews with curated chanceability overrides.
- Chance targets are classified as `chanceable`, `not_chanceable`, or `unknown`, giving the future loot-filter workbench a safe source for chance-base tiers.
