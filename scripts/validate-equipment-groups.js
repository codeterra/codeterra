const {
  EQUIPMENT_MISC_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
} = require('../src/data/rare-equipment-groups');

const TRADE_ITEMS_URL = 'https://www.pathofexile.com/api/trade/data/items';
const USER_AGENT = 'OAuth poehelper-local/0.0.1 (contact: local-dev) equipment-validation';

async function main() {
  const response = await fetch(TRADE_ITEMS_URL, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`Official item catalog failed: ${response.status} ${response.statusText}`);
  }

  const body = await response.json();
  const officialTypes = [...new Set((body.result || [])
    .flatMap((group) => (group.entries || []).map((entry) => entry.type).filter(Boolean)))];
  const officialTypeSet = new Set(officialTypes);
  const invalid = [];

  const equipmentGroups = [
    ...RARE_ARMOR_GROUPS.map((group) => ({ ...group, kind: 'armour' })),
    ...RARE_SHIELD_GROUPS.map((group) => ({ ...group, kind: 'shield' })),
    ...RARE_WEAPON_GROUPS.map((group) => ({ ...group, kind: 'weapon' })),
    ...EQUIPMENT_MISC_GROUPS.map((group) => ({ ...group, kind: 'misc' }))
  ];

  for (const group of equipmentGroups) {
    for (const base of group.bases || []) {
      if (!officialTypeSet.has(base)) {
        invalid.push({
          kind: group.kind,
          group: group.id,
          base,
          suggestions: getClosest(base, officialTypes)
        });
      }
    }
  }

  if (invalid.length > 0) {
    console.error(JSON.stringify(invalid, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${equipmentGroups.reduce((count, group) => count + group.bases.length, 0)} curated equipment bases against GGG trade item data.`);
}

function getClosest(value, candidates) {
  return candidates
    .map((candidate) => ({
      value: candidate,
      distance: levenshtein(value.toLowerCase(), candidate.toLowerCase())
    }))
    .sort((a, b) => a.distance - b.distance || a.value.localeCompare(b.value))
    .slice(0, 5);
}

function levenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) dp[row][0] = row;
  for (let col = 0; col < cols; col += 1) dp[0][col] = col;

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      dp[row][col] = Math.min(
        dp[row - 1][col] + 1,
        dp[row][col - 1] + 1,
        dp[row - 1][col - 1] + (a[row - 1] === b[col - 1] ? 0 : 1)
      );
    }
  }

  return dp[a.length][b.length];
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
