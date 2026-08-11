# POEHelper

Windows desktop companion prototype for Path of Exile.

## Phase 3 Prototype

Phase 3 extends the price lookup loop with the first fresh-slate loot-filter workflow:

- Electron desktop shell.
- Price check hotkey: `Ctrl+D`.
- Related outcomes hotkey: `Ctrl+Alt+B`.
- Add loot-filter rule hotkey: `Ctrl+Alt+F`.
- Settings hotkey: `Shift+Space`.
- Click-through toggle hotkey: `Ctrl+Alt+T`.
- Sends one copy command to the active window, then reads the copied item text.
- Parses common copied item text into item name, base type, rarity, class, level, map tier, and category.
- Shows an always-on-top lookup overlay near the cursor.
- The lookup overlay can be moved by dragging its header.
- The lookup overlay remembers its last position.
- Performs a lightweight Windows check for a likely Path of Exile process/window.
- Stores a user-selected league, defaulting to `Standard`.
- Fetches summary prices from poe.ninja for supported commodities, uniques, gems, and maps.
- Shows poe.ninja sparkline trend data when the matched price overview includes it.
- Caches poe.ninja overview responses for 15 minutes.
- Opens generated official trade searches in the browser.
- Copies generated trade query JSON for debugging.
- Fetches a configurable number of top official trade listings, defaulting to 20.
- Shows only priced instant-buyout listings in the overlay listing table.
- Extracts candidate item modifiers from copied item text.
- Matches modifiers to official trade stat IDs when possible.
- Lets you toggle which matched modifiers are included in the trade query.
- Shows simple pseudo totals for obvious stats like life, resistances, attributes, movement speed, and suppression.
- Flags dangerous map mods such as reflect, no regeneration, no leech, and reduced recovery.
- Shows confidence hints for rares, low sample sizes, unidentified items, and special bases.
- Saves local search presets for repeated query option setups.
- Supports hiding the overlay with `Esc`.
- Supports click-through overlay mode from the overlay button or tray menu.
- If click-through is enabled, use `Ctrl+Alt+T` or the tray menu to turn it off.
- Adds GGG OAuth settings for public-client authorization code with PKCE.
- Provides a Currency Exchange endpoint test using GGG's public exchange history API.
- Shows related outcomes for normal, magic, or rare bases and common boss fragments/invitations.
- Normal base outcomes use the shared chance-base catalog to separate definite, unknown, and known blocked chance targets.
- Boss-fragment outcomes show required fragments and notable mapped drops with poe.ninja prices.
- Settings includes a diagnostics panel with the last copied text, parsed item summary, recent events, and last API error.
- Settings are schema-versioned for future migrations.
- Curated chance-base overrides are tagged with data and release-review metadata.
- Starts a fresh POEHelper loot-filter profile instead of using NeverSink as the internal model.
- Generates a default show-all filter with shared visual styles by item family.
- Currency defaults to green text on a black label box.
- Rare defaults to a yellow label box with black text, with border color available for tiering.
- Settings can write `POEHelper.filter` to the Path of Exile filters folder.
- A hovered item can be captured into a Show/Hide loot-filter rule based on class, base type, rarity, item level, and map tier.

This prototype only sends a single copy command when you press `Ctrl+D`; it does not automate gameplay input, modify game memory, or inject into the game process.

## Run

```powershell
npm.cmd install
npm.cmd run phase2
```

Hover an item in Path of Exile and press `Ctrl+D`.

Press `Shift+Space` to open settings. Use settings to switch from `Standard` to the current trade league and to choose how many instant-buyout listings are shown. These values are saved locally in Electron's app data folder.

Hover a normal, magic, or rare base item, or a supported boss fragment, and press `Ctrl+Alt+B` to show related outcomes. For bases, the app uses the chance-base catalog to list definite and unknown same-base unique outcomes while hiding known blocked targets. Magic and rare items are looked up by their underlying base as if scoured to normal. For boss fragments, it shows the fragment set and notable boss drops. Exact drop rates and chance odds are not shown because they are not public.

Press `Ctrl+Alt+F` while hovering an item to add a loot-filter rule for that item and write the generated `POEHelper.filter`. The Settings window controls whether captured rules default to `Show` or `Hide` and where the generated filter is written.

The settings page also has a GGG OAuth section. Register a public client with GGG, enter the client ID, use a local redirect URI such as `http://127.0.0.1:8585/callback`, then connect with account scopes such as `account:profile account:item_filter`. Public desktop clients cannot request `service:*` scopes; Currency Exchange history is tested through GGG's public exchange endpoint.

To review chance-base curation after a game release:

```powershell
npm.cmd run report:chance -- Standard 100
```

The report lists high-value unknown same-base unique targets that need manual curation before loot filters should treat them as definite chance bases. See `docs/CURATION.md`.

## Package and Release

Build the Windows installer plus portable exe:

```powershell
npm.cmd run dist:win
```

The installer is written to `dist\POEHelper-0.0.1-x64-setup.exe`, and the portable file is written to `dist\POEHelper-0.0.1-x64-portable.exe`.

Build only the portable exe:

```powershell
npm.cmd run dist:win:portable
```

Build only the installer:

```powershell
npm.cmd run dist:win:installer
```

Auto-update uses GitHub releases through `electron-updater` and should be tested with the installer build. Portable builds are still useful for manual sharing, but installed builds are the supported update path.

To publish a release, bump `version` in `package.json`, make sure `GH_TOKEN` can publish to `codeterra/codeterra`, then run:

```powershell
npm.cmd run release:win
```

Unsigned builds may show a Windows SmartScreen warning when shared.

## Current Pricing Coverage

Summary pricing currently supports:

- Currency and fragments through poe.ninja's PoE 1 economy overview.
- Divination cards and some stackable economy categories where poe.ninja exposes exchange overview data.
- Skill gems.
- Normal and unique maps.
- Unique weapons, armours, accessories, flasks, jewels, and maps.

Rare item pricing currently uses selectable official trade stat filters. Full Awakened-style pseudo-stat query generation, modifier weighting, and exact roll/variant handling remain future work.

## Notes

- PowerShell blocks `npm.ps1` on this machine, so use `npm.cmd`.
- The process/window check is intentionally dependency-light for Phase 0. A later native helper can improve foreground-window detection if needed.
- poe.ninja's legacy `/api/data/...` endpoints now return 404, so this prototype uses the current `/poe1/api/economy/...` endpoints.
- Modifier matching uses the official trade site's stats data endpoint and falls back gracefully when that catalog cannot be fetched.
- The overlay listing table filters fetched trade rows to fixed-price/buyout listings and ignores unpriced listings.
- Chance-base data is generated from poe.ninja unique overviews plus curated chanceability overrides. Unknown targets need curation before loot filters should treat them as definite.
- Curated chance-base data has version metadata and should be reviewed after each game release before economy-aware filter tiers are generated.
- GGG OAuth tokens, if connected, are stored locally in Electron's app data settings file and are not sent to renderer windows.
- This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
- Loot filter editing is currently a fresh-slate generator and captured-item rule workflow; the richer visual workbench comes next.
