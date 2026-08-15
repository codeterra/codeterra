# POEHelper Release Checklist

Use this checklist before publishing an app release, and always after a new Path of Exile league or patch changes item data.

## Catalog Refresh

1. Refresh equipment base requirements from Path of Building Community Fork data.

   ```powershell
   npm.cmd run catalog:refresh-equipment -- --source C:\Dev\PathOfBuilding\src\Data\Bases --source-revision <pob-commit-or-date> --game-version <poe-version>
   ```

   If you do not have a local Path of Building checkout, omit `--source` to fetch from the public `dev` branch.

2. Validate curated equipment groups against GGG trade item names.

   ```powershell
   npm.cmd run validate:equipment
   ```

3. Audit chance-base curation for high-value unknowns.

   ```powershell
   npm.cmd run audit:chance -- <league> 100
   ```

4. Audit economy normalization for invalid filter output.

   ```powershell
   npm.cmd run audit:economy -- <league>
   ```

5. Run the offline catalog metadata audit.

   ```powershell
   npm.cmd run catalog:audit
   ```

## Release

1. Run the full local check.

   ```powershell
   npm.cmd run check
   ```

2. Review the Settings > Diagnostics > Catalog Versions panel in the app.

3. Publish with the release flow.

   ```powershell
   npm.cmd run release:patch
   ```

## Ambiguous Base Names

- `Two-Toned Boots` has multiple defensive variants that share the same item-filter `BaseType`.
- POEHelper may use variant labels internally for UI sorting, but generated filters must emit `BaseType "Two-Toned Boots"` unless GGG adds filter syntax that can distinguish the variant.
