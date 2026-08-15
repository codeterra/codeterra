# POEHelper UI Strategy

## Diagnosis

The loot-filter workbench is mostly usable now, but the layout spends too much width on navigation and chrome:

- The app sidebar consumes 232px on every settings page.
- The loot-filter workbench sidebar consumes another 152px.
- On a 1080p monitor, the editor starts with roughly 384px of horizontal space already gone.
- The brand block, topbar copy, and nested sidebars make the interface feel bigger than the work it supports.
- The current CSS has useful pieces, but lacks a clear shell/content/action pattern, so new features tend to add more panels and scroll pressure.

## Direction

Move to a top-nav application shell with full-width work areas.

The app should feel like a compact desktop tool, closer to a trading terminal or editor than a website. The first viewport should prioritize controls and editable content, not branding.

## Recommended UI Framework

Stay with plain Electron HTML/CSS/JS for now, but introduce a small internal design system instead of adopting a heavy component framework immediately.

Recommended stack:

- Plain HTML/CSS/JS, no React migration yet.
- CSS design tokens in `settings.css` or a future `src/styles/tokens.css`.
- Shared renderer helpers in `src/shared`.
- Optional future migration target: React + TypeScript only after settings renderer modules are split and the filter workbench model stabilizes.
- Optional component library later: Radix-style primitives if/when React lands, not before.

Why this path:

- The current app has no build step for renderer assets.
- Electron static HTML is working well.
- Most pain is layout/chrome/component consistency, not framework capability.
- A framework migration would slow feature work before the UI model is settled.

## New Shell Layout

### Top App Nav

Replace the left app sidebar with a compact top bar:

- Left: app icon/name or just icon.
- Center: top-level tabs: General, Loot Filter, Account, Diagnostics.
- Right: version/update state, save state, maybe league.

Target height: 44-52px.

The GGG disclaimer should move to About/Diagnostics or a small footer/help area, not occupy permanent navigation space.

### Loot Filter Subnav

Replace the vertical loot-filter sidebar with a horizontal segmented nav at the top of the workbench.

Because there are many categories, use grouped top nav:

- Basics: Currency, Equipment, Maps, Gems
- League: Fragments, Blueprints, Scarabs, Oils, Div Cards
- Advanced: Chancing, Economy, Misc, Custom, Preview

Implementation options:

- Short term: horizontal scrollable tab strip with compact buttons.
- Better: two-level nav with group chips first, then category tabs below.
- Best later: command palette/search for jumping to a rule section.

### Sticky Workbench Header

The loot-filter profile/action bar should become a sticky header above the category content:

- Row 1: profile selector, filter name, dirty state.
- Row 2: output path, quick action, primary actions.
- Collapse secondary actions into a menu: Duplicate, Delete, Import, Export, Clear Captured.

Primary actions should stay visible:

- Save Profile
- Write Filter
- Capture Hovered Item

### Main Content

Use the full width for the active editor. Category pages should follow one pattern:

- Category baseline style at top.
- Rule list below.
- Per-rule override folded by default.
- Dense metadata chips instead of full-width explanatory paragraphs.

## Visual System

### Palette

Keep the dark tool aesthetic, but reduce the current muddy slate/gold dominance.

Proposed tokens:

- Background: `#0f1317`
- Surface 1: `#171c22`
- Surface 2: `#20262e`
- Border: `#303945`
- Text: `#edf2f7`
- Muted text: `#99a6b5`
- Accent: `#d9b95f`
- Success: `#77d18b`
- Warning: `#f0b35a`
- Danger: `#ef7777`
- Focus: `#8cc8ff`

Use accent sparingly for active navigation, primary buttons, and high-value states.

### Density

The app should use a dense desktop scale:

- Base font: 12px
- Section titles: 13-14px
- Inputs/buttons: 28-30px high
- Cards/rules: 8-10px internal padding
- Gaps: 6/8/12px scale
- Border radius: 6px max for tools and rows

### Components

Standardize these:

- `.app-topbar`
- `.top-tabs`
- `.workspace-header`
- `.action-bar`
- `.segmented-tabs`
- `.rule-panel`
- `.rule-row`
- `.field-grid`
- `.style-editor`
- `.metric-chip`
- `.status-chip`

Avoid page-level floating cards. Use cards only for individual rules, modals/review panels, and grouped controls.

## Implementation Plan

### Pass 1: Shell And Navigation

- Replace `.app-shell` grid/sidebar with topbar shell.
- Move top-level settings nav into `.app-topbar`.
- Remove persistent brand/disclaimer block from the main shell.
- Convert `.loot-workbench` from sidebar + stage to full-width vertical layout.
- Convert `.loot-workbench-tabs` to horizontal segmented tabs.
- Keep existing `data-settings-tab` and `data-loot-tab` behavior so JS changes stay small.

### Pass 2: Workbench Header

- Restyle `.loot-command-bar` into a compact sticky header.
- Promote primary actions.
- Move secondary actions into a compact grouped row or dropdown-style section.
- Make filter summary chips and dirty state less tall.

### Pass 3: Rule Pages

- Standardize rule card layout across Currency, Economy, Equipment, Misc, Custom.
- Make style editors consistently collapsed unless "Override category" is enabled.
- Reduce explanatory paragraphs to muted one-line hints or tooltips.

### Pass 4: CSS Cleanup

- Split CSS into sections:
  - tokens/base
  - app shell
  - controls
  - workbench
  - rule editor
  - responsive
- Keep a single stylesheet initially to avoid build tooling, but organize it for later extraction.

### Pass 5: UI Smoke Guardrails

- Update `settings-workbench-ui-smoke.js` to assert:
  - no `.settings-sidebar`
  - top nav exists
  - loot workbench tabs are horizontal
  - shared helper modules load before renderer

## Recommendation

Implement the top-nav overhaul before Milestone 8. It is a better foundation for stash/session/account features because those will add more tabs and tools. Keeping the sidebar would keep stealing the exact width the loot-filter and stash workflows need most.
