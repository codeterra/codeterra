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
assertContains(renderer, 'function renderFilterSummaryPanel');
assertContains(renderer, 'function setLootFilterDirty');
assertContains(renderer, 'function markLootFilterDirty');
assertContains(renderer, 'skipped economy rows');
assertContains(renderer, 'Save Profile to keep');
assertContains(renderer, 'Write Filter File');
assertContains(renderer, 'poehelperEquipmentSelection');

console.log('Settings workbench UI smoke tests passed.');
