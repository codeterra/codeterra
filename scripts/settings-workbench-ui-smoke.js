const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'src', 'settings.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src', 'settings.css'), 'utf8');
const renderer = fs.readFileSync(path.join(root, 'src', 'settings-renderer.js'), 'utf8');

function assertContains(source, text, label = text) {
  assert.notEqual(source.indexOf(text), -1, `Missing ${label}`);
}

function assertNotContains(source, text, label = text) {
  assert.equal(source.indexOf(text), -1, `Unexpected ${label}`);
}

assertContains(html, 'class="app-topbar"', 'top app nav');
assertNotContains(html, 'class="settings-sidebar"', 'settings sidebar');
assertNotContains(html, 'class="settings-topbar"', 'legacy settings topbar');
assertContains(html, 'id="filter-summary-panel"', 'filter summary panel');
assertContains(html, 'id="filter-dirty-indicator"', 'filter dirty indicator');
assertContains(html, 'id="catalog-metadata-output"', 'catalog metadata output');
assertContains(html, 'id="refresh-catalog-metadata-button"', 'catalog metadata refresh button');
assertContains(html, 'id="filter-preview-search-input"', 'filter preview search');
assertContains(html, 'id="filter-history-list"', 'filter history list');
assertContains(html, 'id="economy-audit-output"', 'economy audit output');
assertContains(html, 'id="filter-import-review-panel"', 'filter import review panel');
assertContains(html, 'id="confirm-filter-import-button"', 'confirm filter import button');
assertContains(html, 'Save Changes');
assertContains(html, 'Write Filter File');
assertNotContains(html, 'Save Settings', 'old split settings save button');
assertNotContains(html, 'Save Profile', 'old split profile save button');
assertNotContains(html, 'Capture Hovered Item', 'top-panel capture button');
assertNotContains(html, 'Refresh Preview', 'top-panel refresh preview button');
assertNotContains(html, 'Clear Captured Rules', 'top-panel clear captured rules button');
assertContains(html, '<script src="./shared/equipment-selection.js"></script>', 'shared equipment selection script');
assertContains(html, '<script src="./shared/settings-workbench.js"></script>', 'shared settings workbench script');
assert.ok(
  html.indexOf('./shared/equipment-selection.js') < html.indexOf('./settings-renderer.js'),
  'Shared equipment selection helper must load before settings-renderer.js.'
);
assert.ok(
  html.indexOf('./shared/settings-workbench.js') < html.indexOf('./settings-renderer.js'),
  'Shared settings workbench helper must load before settings-renderer.js.'
);

assertContains(css, '.filter-summary-panel');
assertContains(css, '.app-topbar');
assertContains(css, '.filter-summary-chip');
assertContains(css, '.filter-summary-details');
assertContains(css, '.filter-dirty-indicator');
assertContains(css, '.filter-dirty-indicator.is-dirty');

assertContains(renderer, "document.querySelector('#filter-summary-panel')");
assertContains(renderer, "document.querySelector('#filter-dirty-indicator')");
assertContains(renderer, "document.querySelector('#catalog-metadata-output')");
assertContains(renderer, 'function renderFilterSummaryPanel');
assertContains(renderer, 'function createFilterSummaryChip');
assertContains(renderer, 'function setInlineStylePanelEnabled');
assertContains(renderer, 'function renderFilterPreviewOutput');
assertContains(renderer, 'function renderFilterHistory');
assertContains(renderer, 'function renderEconomyAudit');
assertContains(renderer, 'function renderFilterImportReview');
assertContains(renderer, 'function moveWorkbenchRule');
assertContains(renderer, 'function appendRulePreview');
assertContains(renderer, 'function formatCatalogMetadata');
assertContains(renderer, 'function refreshCatalogMetadata');
assertContains(renderer, 'function setLootFilterDirty');
assertContains(renderer, 'function markLootFilterDirty');
assertContains(renderer, 'Provider diagnostics:');
assertContains(renderer, 'skipped economy rows');
assertContains(renderer, 'Cache is');
assertContains(renderer, 'Economy audit');
assertContains(renderer, 'Save Changes to keep');
assertNotContains(renderer, 'Save Profile', 'legacy save profile copy');
assertContains(renderer, 'Loot filter profile and output settings saved.');
assertContains(renderer, 'Write Filter File');
assertContains(renderer, 'restoreLootFilterHistory');
assertContains(renderer, 'previewLootFilterProfileImport');
assertContains(renderer, 'confirmLootFilterProfileImport');
assertContains(renderer, 'Catalog metadata refreshed');
assertContains(renderer, 'poehelperEquipmentSelection');
assertContains(renderer, 'poehelperSettingsWorkbench');
assertContains(css, '.rule-preview-row');
assertContains(css, '.rule-order-controls');
assertContains(css, '.filter-history-row');
assertContains(css, '.economy-audit-output');
assertContains(css, '.filter-import-review-panel');
assertContains(css, '.inline-style-panel--disabled');
assertContains(css, 'grid-template-rows: 48px minmax(0, 1fr)', 'top-nav app shell grid');

console.log('Settings workbench UI smoke tests passed.');
