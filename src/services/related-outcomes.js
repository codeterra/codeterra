const {
  fetchPoeNinjaOverview,
  getExchangeItemName,
  getPoeNinjaEndpoint
} = require('./pricing');
const { getChanceBaseEntryForItem } = require('./chance-base-catalog');
const { formatErrorMessage } = require('./errors');

const BOSS_DROP_SETS = [
  {
    id: 'shaper',
    title: 'The Shaper',
    triggers: ['Fragment of the Hydra', 'Fragment of the Phoenix', 'Fragment of the Minotaur', 'Fragment of the Chimera'],
    required: ['Fragment of the Hydra', 'Fragment of the Phoenix', 'Fragment of the Minotaur', 'Fragment of the Chimera'],
    drops: [
      item('Starforge', 'UniqueWeapon'),
      item('Dying Sun', 'UniqueFlask'),
      item('Solstice Vigil', 'UniqueAccessory'),
      item('The Eternity Shroud', 'UniqueArmour'),
      item("Shaper's Touch", 'UniqueArmour'),
      item('Voidwalker', 'UniqueArmour')
    ],
    notes: ['Drop rates are not public; prices are current market references only.']
  },
  {
    id: 'elder',
    title: 'The Elder',
    triggers: ['Fragment of Purification', 'Fragment of Enslavement', 'Fragment of Eradication', 'Fragment of Constriction'],
    required: ['Fragment of Purification', 'Fragment of Enslavement', 'Fragment of Eradication', 'Fragment of Constriction'],
    drops: [
      item("Watcher's Eye", 'UniqueJewel'),
      item('Indigon', 'UniqueArmour'),
      item('Impresence', 'UniqueAccessory'),
      item('Voidfletcher', 'UniqueAccessory'),
      item('Nebuloch', 'UniqueWeapon')
    ],
    notes: ['Watchers Eye value depends heavily on modifiers and is shown as a broad market reference.']
  },
  {
    id: 'uber-elder',
    title: 'Uber Elder',
    triggers: ['Fragment of Knowledge', 'Fragment of Shape', 'Fragment of Terror', 'Fragment of Emptiness'],
    required: ['Fragment of Knowledge', 'Fragment of Shape', 'Fragment of Terror', 'Fragment of Emptiness'],
    drops: [
      item("Watcher's Eye", 'UniqueJewel'),
      item('Voidforge', 'UniqueWeapon'),
      item('Indigon', 'UniqueArmour'),
      item('Mark of the Shaper', 'UniqueAccessory'),
      item('Mark of the Elder', 'UniqueAccessory')
    ],
    notes: ['Some drops overlap with Elder/Shaper pools; exact weighting is not shown.']
  },
  {
    id: 'atziri',
    title: 'Atziri',
    triggers: ['Sacrifice at Dusk', 'Sacrifice at Dawn', 'Sacrifice at Noon', 'Sacrifice at Midnight'],
    required: ['Sacrifice at Dusk', 'Sacrifice at Dawn', 'Sacrifice at Noon', 'Sacrifice at Midnight'],
    drops: [
      item("Atziri's Promise", 'UniqueFlask'),
      item("Atziri's Step", 'UniqueArmour'),
      item("Doryani's Catalyst", 'UniqueWeapon'),
      item('The Vertex', 'UniqueArmour')
    ],
    notes: ['This is the regular Atziri set, not the Alluring Abyss encounter.']
  },
  {
    id: 'uber-atziri',
    title: 'Uber Atziri',
    triggers: ['Mortal Grief', 'Mortal Rage', 'Mortal Hope', 'Mortal Ignorance'],
    required: ['Mortal Grief', 'Mortal Rage', 'Mortal Hope', 'Mortal Ignorance'],
    drops: [
      item("Atziri's Acuity", 'UniqueArmour'),
      item("Atziri's Disfavour", 'UniqueWeapon'),
      item("Atziri's Splendour", 'UniqueArmour'),
      item("Atziri's Promise", 'UniqueFlask')
    ],
    notes: ['Prices do not account for variable rolls, corruption outcomes, or double-corrupt setups.']
  },
  {
    id: 'maven',
    title: 'The Maven',
    triggers: ["Maven's Writ"],
    required: ["Maven's Writ"],
    drops: [
      item('Progenesis', 'UniqueFlask'),
      item('Impossible Escape', 'UniqueJewel'),
      item('Echoforge', 'UniqueWeapon'),
      item("Viridi's Veil", 'UniqueArmour'),
      item('Awakened Multistrike Support', 'SkillGem'),
      item('Awakened Enlighten Support', 'SkillGem'),
      item('Awakened Empower Support', 'SkillGem'),
      item('Awakened Enhance Support', 'SkillGem')
    ],
    notes: ['Awakened gem prices vary strongly by gem level and quality.']
  },
  {
    id: 'sirus',
    title: 'Sirus, Awakener of Worlds',
    triggers: ['Fragment of Al-Hezmin', 'Fragment of Baran', 'Fragment of Drox', 'Fragment of Veritania'],
    required: ['Fragment of Al-Hezmin', 'Fragment of Baran', 'Fragment of Drox', 'Fragment of Veritania'],
    drops: [
      item('Thread of Hope', 'UniqueJewel'),
      item('The Saviour', 'UniqueWeapon'),
      item('Crown of the Inward Eye', 'UniqueArmour'),
      item('Hands of the High Templar', 'UniqueArmour'),
      item("Awakener's Orb", 'Currency')
    ],
    notes: ['Awakener drop values are market references; awakened gems are not listed exhaustively here.']
  },
  {
    id: 'eater',
    title: 'The Eater of Worlds',
    triggers: ['Screaming Invitation'],
    required: ['Screaming Invitation'],
    drops: [
      item('Ashes of the Stars', 'UniqueAccessory'),
      item('Nimis', 'UniqueAccessory'),
      item('Forbidden Flesh', 'UniqueJewel'),
      item('Melding of the Flesh', 'UniqueJewel')
    ],
    notes: ['Forbidden jewel prices depend on the rolled notable.']
  },
  {
    id: 'exarch',
    title: 'The Searing Exarch',
    triggers: ['Incandescent Invitation'],
    required: ['Incandescent Invitation'],
    drops: [
      item('Crystallised Omniscience', 'UniqueAccessory'),
      item('Forbidden Flame', 'UniqueJewel'),
      item('Dawnbreaker', 'UniqueArmour'),
      item('The Annihilating Light', 'UniqueWeapon')
    ],
    notes: ['Forbidden jewel prices depend on the rolled notable.']
  }
];

function item(name, type, note) {
  return { name, type, note };
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .trim()
    .toLowerCase();
}

function getChanceBaseType(item) {
  if (!item?.looksLikePoeItem) {
    return undefined;
  }

  if (item.category === 'unique' || String(item.category || '').startsWith('unique-')) {
    return undefined;
  }

  if (item.corrupted) {
    return undefined;
  }

  if (item.baseType) {
    return item.baseType;
  }

  if (item.category === 'normal' || item.rarity === 'Normal') {
    return item.name;
  }

  return undefined;
}

function findBossDropSet(item) {
  const target = normalizeName(item?.name);
  if (!target) {
    return undefined;
  }

  return BOSS_DROP_SETS.find((set) => set.triggers.some((trigger) => normalizeName(trigger) === target));
}

async function getRelatedOutcomes(item, league) {
  if (!item?.looksLikePoeItem) {
    return {
      status: 'skipped',
      message: 'Clipboard does not look like a Path of Exile item.'
    };
  }

  const bossSet = findBossDropSet(item);
  if (bossSet) {
    return createBossDropResult(bossSet, league);
  }

  if (item.corrupted) {
    return {
      status: 'unsupported',
      message: 'Corrupted items cannot be chanced.'
    };
  }

  const baseEntry = await getChanceBaseEntryForItem(league, item);
  if (baseEntry) {
    return createChanceResult(item, league, baseEntry.baseType, baseEntry);
  }

  return {
    status: 'unsupported',
    message: 'No related outcomes are known for this item yet.'
  };
}

async function createBossDropResult(bossSet, league) {
  const [required, drops] = await Promise.all([
    priceTargets(league, bossSet.required.map((name) => item(name, 'Fragment'))),
    priceTargets(league, bossSet.drops)
  ]);

  return {
    status: 'ready',
    kind: 'boss-drops',
    title: bossSet.title,
    summary: `${drops.length} notable drops`,
    required,
    entries: drops,
    notes: bossSet.notes
  };
}

async function createChanceResult(item, league, baseType, baseEntry) {
  const targets = baseEntry?.chanceTargets || [];
  const candidates = targets
    .filter((target) => target.chanceability !== 'not_chanceable')
    .map(formatChanceTarget);
  const chanceableCount = targets.filter((target) => target.chanceability === 'chanceable').length;
  const unknownCount = targets.filter((target) => target.chanceability === 'unknown').length;

  return {
    status: 'ready',
    kind: 'chance',
    title: `Chance candidates for ${baseType}`,
    summary: `${chanceableCount} definite / ${unknownCount} unknown`,
    meta: item.rarity !== 'Normal' ? 'Scour to normal before chancing.' : 'Same-base unique outcomes.',
    required: [],
    entries: candidates,
    notes: item.synthesised || item.fractured || item.corrupted
      ? ['Special bases may not be valid chance targets.']
      : []
  };
}

async function priceTargets(league, targets) {
  const grouped = new Map();
  for (const target of targets) {
    const entries = grouped.get(target.type) || [];
    entries.push(target);
    grouped.set(target.type, entries);
  }

  const priced = [];
  for (const [type, typeTargets] of grouped.entries()) {
    const endpoint = getPoeNinjaEndpoint(type);
    let overview;
    try {
      overview = await fetchPoeNinjaOverview(league, type, endpoint);
    } catch (error) {
      priced.push(...typeTargets.map((target) => ({
        name: target.name,
        type,
        status: 'error',
        note: formatErrorMessage('Price unavailable', error)
      })));
      continue;
    }

    for (const target of typeTargets) {
      const line = findLineForTarget(overview, endpoint, target);
      priced.push(line
        ? formatLine(line, type, target.note)
        : {
            name: target.name,
            type,
            status: 'not-found',
            note: target.note || 'No poe.ninja price match.'
          });
    }
  }

  return priced.sort((a, b) => getChaosValue(b) - getChaosValue(a));
}

function findLineForTarget(overview, endpoint, target) {
  const wanted = normalizeName(target.name);
  if (endpoint.includes('currency/overview')) {
    return (overview.lines || []).find((line) => normalizeName(line.currencyTypeName) === wanted);
  }

  if (endpoint.includes('exchange/')) {
    return (overview.lines || []).find((line) => normalizeName(getExchangeItemName(overview, line)) === wanted);
  }

  return (overview.lines || []).find((line) => normalizeName(line.name) === wanted);
}

function formatChanceTarget(target) {
  return {
    name: target.name,
    type: target.poeNinjaType,
    baseType: target.baseType,
    variant: target.variant,
    chaosValue: target.chaosValue,
    divineValue: target.divineValue,
    count: target.count,
    listingCount: target.listingCount,
    confidence: target.lowConfidencePrice ? 'low' : target.confidence,
    chanceability: target.chanceability,
    note: target.chanceability === 'chanceable' ? 'chanceable' : 'unknown'
  };
}

function formatLine(line, type, note) {
  const name = line.currencyTypeName || line.displayName || line.name || line.id;
  return {
    name,
    type,
    baseType: line.baseType,
    variant: line.variant,
    chaosValue: line.chaosEquivalent ?? line.primaryValue ?? line.chaosValue,
    divineValue: line.divineValue,
    count: line.receive?.count || line.pay?.count || line.count,
    listingCount: line.receive?.listing_count || line.pay?.listing_count || line.listingCount,
    confidence: line.lowConfidence ? 'low' : 'normal',
    note
  };
}

function getChaosValue(entry) {
  return typeof entry.chaosValue === 'number' && Number.isFinite(entry.chaosValue)
    ? entry.chaosValue
    : -1;
}

module.exports = {
  getRelatedOutcomes,
  findBossDropSet,
  getChanceBaseType
};
