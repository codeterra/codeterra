import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { parseLootFilter, serializeLootFilterAst } = require('../../src/services/loot-filter-parser');
const { generateLootFilter } = require('../../src/services/loot-filter-generator');
const { normalizeLootFilterProfile } = require('../../src/domain/loot-filter');

describe('loot filter parser interop', () => {
  it('round-trips raw filter text without normalizing comments or directives', () => {
    const rawText = [
      '# Friend filter',
      'Continue',
      '',
      'Show',
      '    Class "Stackable Currency"',
      '    BaseType "Divine Orb"',
      '    SetTextColor 80 255 120 255'
    ].join('\r\n');

    const ast = parseLootFilter(rawText, { sourcePath: 'Friend.filter' });

    expect(serializeLootFilterAst(ast)).toBe(rawText);
    expect(ast.summary.showBlocks).toBe(1);
    expect(ast.summary.unknownLines).toBe(1);
    expect(ast.summary.directiveCounts.BaseType).toBe(1);
  });

  it('generates raw-reference imported filters exactly as imported', () => {
    const rawText = 'Show\n    BaseType "Divine Orb"';
    const profile = normalizeLootFilterProfile({
      name: 'Imported',
      importedFilter: {
        mode: 'raw-reference',
        fileName: 'Imported.filter',
        rawText
      }
    });

    expect(generateLootFilter(profile)).toBe(rawText);
  });
});
