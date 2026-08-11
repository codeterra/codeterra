const SECTION_SEPARATOR = '--------';
const {
  analyzeMapWarnings,
  createPseudoGroups,
  extractModifiers
} = require('./item-intelligence');

const UNIQUE_WEAPON_CLASSES = new Set([
  'Bows',
  'Claws',
  'Daggers',
  'One Hand Axes',
  'One Hand Maces',
  'One Hand Swords',
  'Rune Daggers',
  'Sceptres',
  'Staves',
  'Thrusting One Hand Swords',
  'Two Hand Axes',
  'Two Hand Maces',
  'Two Hand Swords',
  'Wands',
  'Warstaves'
]);

const UNIQUE_ARMOUR_CLASSES = new Set([
  'Body Armours',
  'Boots',
  'Gloves',
  'Helmets',
  'Shields'
]);

const UNIQUE_ACCESSORY_CLASSES = new Set([
  'Amulets',
  'Belts',
  'Quivers',
  'Rings'
]);

function normalizeLineEndings(text) {
  return String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function getLineValue(lines, label) {
  const prefix = `${label}:`;
  const line = lines.find((entry) => entry.startsWith(prefix));
  return line ? line.slice(prefix.length).trim() : undefined;
}

function getNumericLineValue(lines, label) {
  const value = getLineValue(lines, label);
  if (!value) {
    return undefined;
  }

  const match = value.match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

function getNameBlock(lines, rarityLine) {
  if (!rarityLine) {
    return [];
  }

  const rarityIndex = lines.indexOf(rarityLine);
  const following = lines.slice(rarityIndex + 1);
  const separatorIndex = following.indexOf(SECTION_SEPARATOR);
  const block = separatorIndex >= 0 ? following.slice(0, separatorIndex) : following;
  return block.filter((line) => line && line !== SECTION_SEPARATOR);
}

function classifyItem({ rarity, itemClass, name }) {
  if (!rarity && !itemClass) {
    return 'unknown';
  }

  if (rarity === 'Currency' || itemClass === 'Stackable Currency' || itemClass === 'Delve Stackable Socketable Currency') {
    return 'currency';
  }

  if (rarity === 'Divination Card' || itemClass === 'Divination Cards') {
    return 'divination-card';
  }

  if (itemClass === 'Skill Gems' || itemClass === 'Support Gems' || rarity === 'Gem') {
    return 'gem';
  }

  if (itemClass === 'Maps') {
    return rarity === 'Unique' ? 'unique-map' : 'map';
  }

  if (itemClass === 'Map Fragments' || itemClass === 'Misc Map Items') {
    return 'fragment';
  }

  if (rarity === 'Unique') {
    if (UNIQUE_WEAPON_CLASSES.has(itemClass)) {
      return 'unique-weapon';
    }

    if (UNIQUE_ARMOUR_CLASSES.has(itemClass)) {
      return 'unique-armour';
    }

    if (UNIQUE_ACCESSORY_CLASSES.has(itemClass)) {
      return 'unique-accessory';
    }

    if (itemClass === 'Flasks') {
      return 'unique-flask';
    }

    if (itemClass === 'Jewels' || name?.includes('Jewel')) {
      return 'unique-jewel';
    }

    return 'unique';
  }

  if (rarity === 'Rare') {
    return 'rare';
  }

  if (rarity === 'Magic') {
    return 'magic';
  }

  if (rarity === 'Normal') {
    return 'normal';
  }

  return 'unknown';
}

function getPoeNinjaType(category, itemClass) {
  switch (category) {
    case 'currency':
      if (itemClass === 'Delve Stackable Socketable Currency') {
        return 'Fossil';
      }

      return 'Currency';
    case 'divination-card':
      return 'DivinationCard';
    case 'gem':
      return 'SkillGem';
    case 'unique-map':
      return 'UniqueMap';
    case 'map':
      return 'Map';
    case 'fragment':
      return 'Fragment';
    case 'unique-weapon':
      return 'UniqueWeapon';
    case 'unique-armour':
      return 'UniqueArmour';
    case 'unique-accessory':
      return 'UniqueAccessory';
    case 'unique-flask':
      return 'UniqueFlask';
    case 'unique-jewel':
      return 'UniqueJewel';
    default:
      return undefined;
  }
}

function parseCopiedItem(rawText) {
  const text = normalizeLineEndings(rawText);
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const separators = lines
    .map((line, index) => (line === SECTION_SEPARATOR ? index : -1))
    .filter((index) => index >= 0);

  const rarityLine = lines.find((line) => line.startsWith('Rarity:'));
  const itemClass = getLineValue(lines, 'Item Class');
  const rarity = rarityLine ? rarityLine.replace('Rarity:', '').trim() : undefined;
  const nameBlock = getNameBlock(lines, rarityLine);
  const itemLevel = getNumericLineValue(lines, 'Item Level');
  const mapTier = getNumericLineValue(lines, 'Map Tier');
  const gemLevel = getNumericLineValue(lines, 'Level');
  const quality = getLineValue(lines, 'Quality');
  const stackSize = getLineValue(lines, 'Stack Size');
  const corrupted = lines.includes('Corrupted');
  const unidentified = lines.includes('Unidentified');
  const mirrored = lines.includes('Mirrored');
  const synthesised = lines.includes('Synthesised Item');
  const fractured = lines.some((line) => line.includes('Fractured'));

  let name = 'Clipboard text';
  let baseType;

  if (nameBlock.length > 0) {
    name = nameBlock[0];
    if (!['Currency', 'Divination Card', 'Gem'].includes(rarity) && nameBlock.length > 1) {
      baseType = nameBlock[1];
    }
  } else {
    name = lines.filter((line) => line !== SECTION_SEPARATOR)[0] || name;
  }

  const category = classifyItem({ rarity, itemClass, name });
  const poeNinjaType = getPoeNinjaType(category, itemClass);
  const itemCore = {
    name,
    baseType,
    rarity,
    itemClass,
    category
  };
  const modifiers = extractModifiers(lines, itemCore, nameBlock);
  const pseudoGroups = createPseudoGroups(modifiers);
  const mapWarnings = category === 'map' || category === 'unique-map'
    ? analyzeMapWarnings(modifiers)
    : [];

  return {
    rawText: text,
    lineCount: lines.length,
    looksLikePoeItem: Boolean(rarityLine || itemClass || itemLevel || separators.length >= 2),
    name,
    baseType,
    rarity,
    itemClass,
    itemLevel,
    mapTier,
    gemLevel,
    quality,
    stackSize,
    corrupted,
    unidentified,
    mirrored,
    synthesised,
    fractured,
    category,
    poeNinjaType,
    modifiers,
    pseudoGroups,
    mapWarnings,
    searchLabel: baseType ? `${name} ${baseType}` : name
  };
}

module.exports = {
  parseCopiedItem,
  classifyItem,
  getPoeNinjaType
};
