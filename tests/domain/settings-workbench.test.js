import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  buildFilterImportReviewModel,
  formatProfileOptionLabel
} = require('../../src/shared/settings-workbench');

describe('settings workbench shared helpers', () => {
  it('formats profile selector labels consistently', () => {
    expect(formatProfileOptionLabel({ name: 'Mapper', userRuleCount: 7 })).toBe('Mapper (7 rules)');
    expect(formatProfileOptionLabel({})).toBe('Unnamed profile (0 rules)');
  });

  it('builds a raw filter import review model', () => {
    const model = buildFilterImportReviewModel({
      status: 'preview',
      profileName: 'Friend',
      filePath: 'C:\\Filters\\Friend.filter',
      outputPath: 'C:\\Filters\\Friend Imported.filter',
      importedSummary: {
        type: 'Raw .filter',
        blocks: 3,
        showBlocks: 2,
        hideBlocks: 1,
        lines: 42,
        bytes: 900,
        preservesOriginalText: true
      },
      migration: {
        fromVersion: 1,
        toVersion: 2,
        warnings: ['Newer fields ignored']
      },
      diff: {
        changes: [{ label: 'Raw imported filter', before: 'no', after: 'yes' }]
      }
    });

    expect(model.title).toBe('Import Friend');
    expect(model.summary).toContain('Raw filter text will be preserved exactly.');
    expect(model.rows.map((row) => row.label)).toContain('Filter blocks');
    expect(model.rows.some((row) => row.label === 'Warning' && row.warn)).toBe(true);
    expect(model.rows.some((row) => row.value === 'no -> yes')).toBe(true);
  });
});
