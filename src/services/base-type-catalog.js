const {
  EQUIPMENT_MISC_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
} = require('../domain/loot-filter');
const { CHANCE_TARGET_OVERRIDES } = require('../data/chance-target-overrides');

const TRADE_ITEMS_URL = 'https://www.pathofexile.com/api/trade/data/items';
const USER_AGENT = 'OAuth poehelper-local/0.0.1 (contact: local-dev) base-type-catalog';
const CHANCE_CATALOG_GROUPS = new Set(['accessory', 'armour', 'flask', 'jewel', 'map', 'weapon']);

let officialBaseTypesPromise;

function getLocalEquipmentBaseTypes(profile) {
  const bases = new Set();
  for (const group of [
    ...RARE_ARMOR_GROUPS,
    ...RARE_SHIELD_GROUPS,
    ...RARE_WEAPON_GROUPS,
    ...EQUIPMENT_MISC_GROUPS
  ]) {
    for (const base of group.bases || []) {
      bases.add(base);
    }
  }

  for (const override of CHANCE_TARGET_OVERRIDES) {
    if (override.baseType) {
      bases.add(override.baseType);
    }
  }

  for (const base of profile?.chanceBases?.bases || []) {
    bases.add(base);
  }

  return [...bases].sort((a, b) => a.localeCompare(b));
}

async function getChanceBaseOptions(profile) {
  const bases = new Set(getLocalEquipmentBaseTypes(profile));

  try {
    for (const base of await getOfficialTradeBaseTypes()) {
      bases.add(base);
    }
  } catch {
    // The local equipment catalog is enough for filter generation and common chance-base editing.
  }

  return [...bases].sort((a, b) => a.localeCompare(b));
}

async function getOfficialTradeBaseTypes() {
  officialBaseTypesPromise ||= fetchOfficialTradeBaseTypes();
  return officialBaseTypesPromise;
}

async function fetchOfficialTradeBaseTypes() {
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
  return [...new Set((body.result || [])
    .filter((group) => CHANCE_CATALOG_GROUPS.has(group.id))
    .flatMap((group) => (group.entries || []).map((entry) => entry.type).filter(Boolean)))];
}

module.exports = {
  getChanceBaseOptions,
  getLocalEquipmentBaseTypes,
  getOfficialTradeBaseTypes
};
