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

assertContains(html, 'id="filter-summary-panel"', 'filter summary panel');
assertContains(html, 'id="filter-dirty-indicator"', 'filter dirty indicator');
assertContains(html, 'id="catalog-metadata-output"', 'catalog metadata output');
assertContains(html, 'id="refresh-catalog-metadata-button"', 'catalog metadata refresh button');
assertContains(html, 'id="filter-preview-search-input"', 'filter preview search');
assertContains(html, 'id="filter-history-list"', 'filter history list');
assertContains(html, 'id="economy-audit-output"', 'economy audit output');
assertContains(html, 'id="filter-import-review-panel"', 'filter import review panel');
assertContains(html, 'id="confirm-filter-import-button"', 'confirm filter import button');
assertContains(html, 'Save Settings');
assertContains(html, 'Save Profile');
assertContains(html, 'Write Filter File');
assertContains(html, 'Capture Hovered Item');
assertContains(html, 'Clear Captured Rules');
assertContains(html, '<script src="./shared/equipment-selection.js"></script>', 'shared equipment selection script');
assert.ok(
  html.indexOf('./shared/equipment-selection.js') < html.indexOf('./settings-renderer.js'),
  'Shared equipment selection helper must load before settings-renderer.js.'
);

assertContains(css, '.filter-summary-panel');
assertContains(css, '.filter-summary-chip');
assertContains(css, '.filter-dirty-indicator');
assertContains(css, '.filter-dirty-indicator.is-dirty');

assertContains(renderer, "document.querySelector('#filter-summary-panel')");
assertContains(renderer, "document.querySelector('#filter-dirty-indicator')");
assertContains(renderer, "document.querySelector('#catalog-metadata-output')");
assertContains(renderer, 'function renderFilterSummaryPanel');
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
assertContains(renderer, 'Save Profile to keep');
assertContains(renderer, 'Write Filter File');
assertContains(renderer, 'restoreLootFilterHistory');
assertContains(renderer, 'previewLootFilterProfileImport');
assertContains(renderer, 'confirmLootFilterProfileImport');
assertContains(renderer, 'Catalog metadata refreshed');
assertContains(renderer, 'poehelperEquipmentSelection');
assertContains(css, '.rule-preview-row');
assertContains(css, '.rule-order-controls');
assertContains(css, '.filter-history-row');
assertContains(css, '.economy-audit-output');
assertContains(css, '.filter-import-review-panel');

console.log('Settings workbench UI smoke tests passed.');
