const PROPERTY_PREFIXES = [
  'Item Class:',
  'Rarity:',
  'Quality:',
  'Sockets:',
  'Level:',
  'Item Level:',
  'Map Tier:',
  'Stack Size:',
  'Requirements:',
  'Str:',
  'Dex:',
  'Int:',
  'Physical Damage:',
  'Elemental Damage:',
  'Chaos Damage:',
  'Critical Strike Chance:',
  'Attacks per Second:',
  'Weapon Range:',
  'Armour:',
  'Evasion Rating:',
  'Energy Shield:',
  'Ward:',
  'Chance to Block:',
  'Requires'
];

const STATUS_LINES = new Set([
  'Corrupted',
  'Unidentified',
  'Mirrored',
  'Synthesised Item',
  'Fractured Item'
]);

const MAP_WARNING_RULES = [
  { severity: 'danger', label: 'Elemental reflect', pattern: /reflects? \d+% of elemental damage/i },
  { severity: 'danger', label: 'Physical reflect', pattern: /reflects? \d+% of physical damage/i },
  { severity: 'danger', label: 'No regeneration', pattern: /cannot regenerate life, mana or energy shield/i },
  { severity: 'danger', label: 'No leech', pattern: /cannot leech/i },
  { severity: 'danger', label: 'Reduced recovery', pattern: /less recovery rate of life and energy shield|less effect of recovery/i },
  { severity: 'warn', label: 'Reduced maximum resistances', pattern: /maximum player resistances/i },
  { severity: 'warn', label: 'Extra critical damage', pattern: /extra damage as|critical strike/i },
  { severity: 'warn', label: 'Reduced aura effect', pattern: /less effect of auras/i },
  { severity: 'warn', label: 'Cannot inflict ailments', pattern: /cannot inflict elemental ailments/i },
  { severity: 'warn', label: 'Monsters avoid ailments', pattern: /avoid elemental ailments|avoid poison|avoid bleeding/i }
];

function stripMarkup(line) {
  return line
    .replace(/\{[^}]*\}/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeStatText(line) {
  return stripMarkup(line)
    .replace(/\([+-]?\d+(?:\.\d+)?(?:-[+-]?\d+(?:\.\d+)?)?\)/g, '')
    .replace(/[+-]?#%?/g, '#')
    .replace(/[+-]?\d+(?:\.\d+)?%?/g, '#')
    .replace(/#%/g, '#')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function getNumbers(line) {
  return [...line.replace(/\([^)]+\)/g, '').matchAll(/[+-]?\d+(?:\.\d+)?/g)].map((match) => Number(match[0]));
}

function looksLikeModifier(line) {
  const clean = stripMarkup(line);
  if (!clean || clean === '--------') {
    return false;
  }

  if (STATUS_LINES.has(clean)) {
    return false;
  }

  if (PROPERTY_PREFIXES.some((prefix) => clean.startsWith(prefix))) {
    return false;
  }

  if (/^note:/i.test(clean)) {
    return false;
  }

  return /\d|increased|reduced|more|less|adds?|gain|grants?|nearby|players|monsters|area contains|cannot|reflect|resistance|attributes|strength|dexterity|intelligence|life|mana|energy shield|movement speed|suppression|critical|damage/i.test(clean);
}

function classifyModifier(line, item) {
  if (/\(crafted\)$/i.test(line) || /\(crafted\)/i.test(line)) {
    return 'crafted';
  }

  if (/\(fractured\)$/i.test(line) || /\(fractured\)/i.test(line)) {
    return 'fractured';
  }

  if (item.category === 'map' || item.category === 'unique-map') {
    return 'map';
  }

  if (/implicit/i.test(line)) {
    return 'implicit';
  }

  return 'explicit';
}

function getModifierValue(line) {
  const numbers = getNumbers(line);
  if (numbers.length === 0) {
    return undefined;
  }

  return Math.max(...numbers.map((value) => Math.abs(value)));
}

function extractModifiers(lines, item, nameBlock = []) {
  const nameLines = new Set(nameBlock);
  const modifiers = [];
  let currentModifierType;

  for (const line of lines) {
    if (nameLines.has(line)) {
      continue;
    }

    const headerType = getModifierHeaderType(line, item);
    if (headerType) {
      currentModifierType = headerType;
      continue;
    }

    if (!looksLikeModifier(line)) {
      continue;
    }

    const type = currentModifierType || classifyModifier(line, item);
    modifiers.push({
      id: `mod-${modifiers.length}`,
      text: stripMarkup(line),
      normalized: normalizeStatText(line),
      value: getModifierValue(line),
      type,
      selected: false,
      tradeStatId: undefined,
      tradeStatText: undefined
    });
  }

  return modifiers;
}

function getModifierHeaderType(line, item) {
  if (!/^\{[^}]+Modifier/i.test(line)) {
    return undefined;
  }

  if (/implicit modifier/i.test(line)) {
    return 'implicit';
  }

  if (/crafted/i.test(line)) {
    return 'crafted';
  }

  if (/fractured/i.test(line)) {
    return 'fractured';
  }

  if (item.category === 'map' || item.category === 'unique-map') {
    return 'map';
  }

  return 'explicit';
}

function addPseudoValue(groups, id, label, value) {
  if (!Number.isFinite(value)) {
    return undefined;
  }

  const group = groups.get(id) || { id, label, value: 0, matchingModifierIds: [] };
  group.value += value;
  groups.set(id, group);
  return group;
}

function addPseudoMatch(groups, id, label, value, modifierId) {
  const group = addPseudoValue(groups, id, label, value);
  if (group) {
    group.matchingModifierIds.push(modifierId);
  }
}

function getFirstSignedNumber(line) {
  const match = line.match(/[+-]?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

function createPseudoGroups(modifiers = []) {
  const groups = new Map();

  for (const modifier of modifiers) {
    if (!modifier?.text) {
      continue;
    }

    const text = modifier.text;
    const value = getFirstSignedNumber(text);

    if (/\bmaximum life\b/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.life', 'Total life', Math.abs(value), modifier.id);
    }

    if (/\bmaximum energy shield\b|\bincreased energy shield\b/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.energy-shield', 'Energy shield mods', Math.abs(value), modifier.id);
    }

    if (/fire resistance/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.fire-resistance', 'Total fire resistance', value, modifier.id);
    }

    if (/cold resistance/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.cold-resistance', 'Total cold resistance', value, modifier.id);
    }

    if (/lightning resistance/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.lightning-resistance', 'Total lightning resistance', value, modifier.id);
    }

    if (/all elemental resistances/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.fire-resistance', 'Total fire resistance', value, modifier.id);
      addPseudoMatch(groups, 'pseudo.cold-resistance', 'Total cold resistance', value, modifier.id);
      addPseudoMatch(groups, 'pseudo.lightning-resistance', 'Total lightning resistance', value, modifier.id);
      addPseudoMatch(groups, 'pseudo.elemental-resistance', 'Total elemental resistance', value * 3, modifier.id);
    }

    if (/chaos resistance/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.chaos-resistance', 'Total chaos resistance', value, modifier.id);
    }

    if (/strength/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.strength', 'Total strength', value, modifier.id);
    }

    if (/dexterity/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.dexterity', 'Total dexterity', value, modifier.id);
    }

    if (/intelligence/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.intelligence', 'Total intelligence', value, modifier.id);
    }

    if (/all attributes/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.strength', 'Total strength', value, modifier.id);
      addPseudoMatch(groups, 'pseudo.dexterity', 'Total dexterity', value, modifier.id);
      addPseudoMatch(groups, 'pseudo.intelligence', 'Total intelligence', value, modifier.id);
      addPseudoMatch(groups, 'pseudo.attributes', 'Total attributes', value * 3, modifier.id);
    }

    if (/movement speed/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.movement-speed', 'Movement speed', value, modifier.id);
    }

    if (/suppress spell damage/i.test(text)) {
      addPseudoMatch(groups, 'pseudo.spell-suppression', 'Spell suppression', value, modifier.id);
    }
  }

  return [...groups.values()]
    .filter((group) => group.value !== 0)
    .map((group) => ({
      ...group,
      value: Math.round(group.value * 10) / 10
    }));
}

function analyzeMapWarnings(modifiers) {
  const warnings = [];

  for (const modifier of modifiers) {
    for (const rule of MAP_WARNING_RULES) {
      if (rule.pattern.test(modifier.text)) {
        warnings.push({
          severity: rule.severity,
          label: rule.label,
          text: modifier.text
        });
      }
    }
  }

  return warnings;
}

function createConfidenceHints(item, price) {
  const hints = [];

  if (!item.looksLikePoeItem) {
    hints.push({ severity: 'warn', text: 'Clipboard text was not recognized as a Path of Exile item.' });
  }

  if (item.category === 'rare') {
    hints.push({ severity: 'warn', text: 'Rare pricing is sensitive to selected modifiers; start broad, then tighten.' });
  }

  if (item.unidentified) {
    hints.push({ severity: 'warn', text: 'Unidentified items should usually be searched by base and item level only.' });
  }

  if (item.synthesised || item.fractured) {
    hints.push({ severity: 'info', text: 'Synthesised and fractured bases can have crafting value even without strong explicit mods.' });
  }

  if (item.category === 'gem' && (item.gemLevel || item.qualityValue)) {
    hints.push({ severity: 'info', text: 'Gem searches include level and quality when present to avoid matching low-value variants.' });
  }

  if (item.linkedSockets >= 5) {
    hints.push({ severity: 'info', text: `${item.linkedSockets}-linked items are searched with link count enabled.` });
  }

  if (item.socketCount >= 6 && item.linkedSockets < 5) {
    hints.push({ severity: 'info', text: 'Six-socket items are searched with socket count enabled.' });
  }

  if (Array.isArray(item.influences) && item.influences.length > 0) {
    hints.push({ severity: 'info', text: `Influenced item search includes: ${item.influences.join(', ')}.` });
  }

  if (item.statMatchWarning) {
    hints.push({ severity: 'warn', text: item.statMatchWarning });
  }

  if (price?.status === 'priced') {
    const listingCount = price.result?.listingCount || price.result?.count || 0;
    if (listingCount && listingCount < 10) {
      hints.push({ severity: 'warn', text: 'Low sample size; treat this price as directional.' });
    }

    if (price.result?.confidence === 'low') {
      hints.push({ severity: 'warn', text: 'Pricing source marked this result as low confidence.' });
    }
  }

  return hints;
}

module.exports = {
  extractModifiers,
  createPseudoGroups,
  analyzeMapWarnings,
  createConfidenceHints,
  normalizeStatText
};
