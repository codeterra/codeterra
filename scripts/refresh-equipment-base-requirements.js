const fs = require('node:fs');
const path = require('node:path');

const BASE_FILES = ['body', 'boots', 'gloves', 'helmet', 'shield'];
const DEFAULT_SOURCE = 'https://raw.githubusercontent.com/PathOfBuildingCommunity/PathOfBuilding/dev/src/Data/Bases';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'equipment-base-requirements.js');

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const source = options.source || DEFAULT_SOURCE;
  const generatedAt = options.generatedAt || new Date().toISOString().slice(0, 10);
  const sourceRevision = options.sourceRevision || (source === DEFAULT_SOURCE ? 'PathOfBuilding dev branch' : source);
  const gameVersion = options.gameVersion || `release-reviewed-${generatedAt}`;
  const entries = [];

  for (const file of BASE_FILES) {
    const text = await readBaseFile(source, file);
    entries.push(...parseBaseFile(text));
  }

  const catalog = createRequirementCatalog(entries);
  const output = renderCatalogModule(catalog, {
    generatedAt,
    gameVersion,
    sourceRevision
  });

  if (options.dryRun) {
    console.log(`Parsed ${Object.keys(catalog).length} equipment base requirement rows from ${source}.`);
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`Wrote ${Object.keys(catalog).length} equipment base requirement rows to ${OUTPUT_PATH}.`);
}

function parseArgs(args) {
  const options = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
      options[key] = args[index + 1];
      index += 1;
    }
  }
  return options;
}

async function readBaseFile(source, file) {
  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(`${source.replace(/\/$/, '')}/${file}.lua`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}.lua: ${response.status} ${response.statusText}`);
    }
    return response.text();
  }

  return fs.readFileSync(path.join(source, `${file}.lua`), 'utf8');
}

function parseBaseFile(text) {
  const entries = [];
  const pattern = /itemBases\["((?:\\.|[^"\\])*)"\]\s*=\s*\{/g;
  let match;
  while ((match = pattern.exec(text))) {
    const start = text.indexOf('{', match.index);
    const end = findMatchingBrace(text, start);
    if (end === -1) {
      continue;
    }

    const body = text.slice(start + 1, end);
    const entry = parseBaseEntry(unescapeLuaString(match[1]), body);
    if (entry) {
      entries.push(entry);
    }
    pattern.lastIndex = end + 1;
  }
  return entries;
}

function findMatchingBrace(text, start) {
  let depth = 0;
  let quote;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    const previous = text[index - 1];
    if (quote) {
      if (char === quote && previous !== '\\') {
        quote = undefined;
      }
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }
  return -1;
}

function parseBaseEntry(name, body) {
  const armourBlock = getLuaTableBody(body, 'armour');
  if (!armourBlock) {
    return undefined;
  }

  const reqBlock = getLuaTableBody(body, 'req') || '';
  const entry = {
    name,
    level: getLuaNumber(reqBlock, 'level') || 1
  };

  addDefense(entry, 'armour', armourBlock, 'ArmourBaseMin', 'ArmourBaseMax');
  addDefense(entry, 'evasion', armourBlock, 'EvasionBaseMin', 'EvasionBaseMax');
  addDefense(entry, 'energyShield', armourBlock, 'EnergyShieldBaseMin', 'EnergyShieldBaseMax');

  entry.defenses = ['armour', 'evasion', 'energyShield']
    .map((key) => Array.isArray(entry[key]) ? entry[key][1] : 0)
    .reduce((total, value) => total + value, 0);

  return entry.defenses > 0 ? entry : undefined;
}

function getLuaTableBody(body, key) {
  const match = new RegExp(`${key}\\s*=\\s*\\{([^}]*)\\}`).exec(body);
  return match?.[1];
}

function getLuaNumber(body, key) {
  const match = new RegExp(`${key}\\s*=\\s*(\\d+)`).exec(body);
  return match ? Number(match[1]) : undefined;
}

function addDefense(entry, key, block, minKey, maxKey) {
  const min = getLuaNumber(block, minKey);
  const max = getLuaNumber(block, maxKey);
  if (min !== undefined && max !== undefined) {
    entry[key] = [min, max];
  }
}

function createRequirementCatalog(entries) {
  const duplicateCounts = new Map();
  const output = {};
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const seen = duplicateCounts.get(entry.name) || 0;
    duplicateCounts.set(entry.name, seen + 1);
    const key = seen === 0 ? entry.name : `${entry.name} (${getDefenseLabel(entry)})`;
    output[key] = entryToCatalogRow(entry);
  }
  return output;
}

function getDefenseLabel(entry) {
  const labels = [];
  if (entry.armour) labels.push('Armour');
  if (entry.evasion) labels.push('Evasion');
  if (entry.energyShield) labels.push('Energy Shield');
  return labels.join('/') || 'Variant';
}

function entryToCatalogRow(entry) {
  const row = {
    level: entry.level,
    defenses: entry.defenses
  };
  if (entry.armour) row.armour = entry.armour;
  if (entry.evasion) row.evasion = entry.evasion;
  if (entry.energyShield) row.energyShield = entry.energyShield;
  return row;
}

function renderCatalogModule(catalog, metadata) {
  return `// Generated from Path of Building Community Fork src/Data/Bases on ${metadata.generatedAt}.
// Item data copyright Grinding Gear Games; used here only for local UI base-tier ordering.
const EQUIPMENT_BASE_REQUIREMENTS_METADATA = ${JSON.stringify({
    schemaVersion: 1,
    dataVersion: `equipment-base-requirements-${metadata.generatedAt}`,
    gameVersion: metadata.gameVersion,
    generatedAt: metadata.generatedAt,
    source: 'Path of Building Community Fork src/Data/Bases',
    sourceUrl: 'https://github.com/PathOfBuildingCommunity/PathOfBuilding/tree/dev/src/Data/Bases',
    sourceRevision: metadata.sourceRevision,
    manualOverrides: [
      'Two-Toned Boots internal defensive variants are catalog-only labels and must be canonicalized before filter output.'
    ],
    updatePolicy: 'Run npm run catalog:refresh-equipment after Path of Exile or Path of Building base-data updates, then run npm run catalog:audit.'
  }, null, 2)};

const EQUIPMENT_BASE_REQUIREMENTS = ${JSON.stringify(catalog, null, 2)};

module.exports = {
  EQUIPMENT_BASE_REQUIREMENTS_METADATA,
  EQUIPMENT_BASE_REQUIREMENTS
};
`;
}

function unescapeLuaString(value) {
  return value.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
