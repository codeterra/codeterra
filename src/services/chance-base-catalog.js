const {
  CHANCE_TARGET_OVERRIDES,
  CHANCE_TARGET_OVERRIDES_METADATA
} = require('../data/chance-target-overrides');
const {
  fetchPoeNinjaOverview,
  getPoeNinjaEndpoint
} = require('./pricing');

const UNIQUE_TYPES = [
  'UniqueWeapon',
  'UniqueArmour',
  'UniqueAccessory',
  'UniqueFlask',
  'UniqueJewel',
  'UniqueMap'
];

const DEFAULT_THRESHOLDS = {
  high: 1000,
  valuable: 100,
  watch: 20
};

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .trim()
    .toLowerCase();
}

function getOverrideKey(name, baseType) {
  return `${normalizeName(name)}:${normalizeName(baseType)}`;
}

function createOverrideIndex(overrides = CHANCE_TARGET_OVERRIDES) {
  const index = new Map();
  for (const override of overrides) {
    index.set(getOverrideKey(override.name, override.baseType), override);
  }
  return index;
}

async function getChanceBaseCatalog(league, options = {}) {
  const overviews = await Promise.all(
    UNIQUE_TYPES.map(async (type) => ({
      type,
      overview: await fetchPoeNinjaOverview(league, type, getPoeNinjaEndpoint(type))
    }))
  );

  const lines = overviews.flatMap(({ type, overview }) =>
    (overview.lines || []).map((line) => ({ ...line, poeNinjaType: type }))
  );

  return buildChanceBaseCatalog(lines, options);
}

async function getChanceBaseEntry(league, baseType, options = {}) {
  const catalog = await getChanceBaseCatalog(league, options);
  const target = normalizeName(baseType);
  return catalog.bases.find((entry) => normalizeName(entry.baseType) === target);
}

async function getChanceBaseEntryForItem(league, item, options = {}) {
  const catalog = await getChanceBaseCatalog(league, options);
  return findChanceBaseEntry(catalog, item);
}

function findChanceBaseEntry(catalog, item) {
  if (!item?.looksLikePoeItem) {
    return undefined;
  }

  if (item.corrupted) {
    return undefined;
  }

  if (item.category === 'unique' || String(item.category || '').startsWith('unique-')) {
    return undefined;
  }

  const directBaseType = item.baseType || (item.category === 'normal' || item.rarity === 'Normal' ? item.name : undefined);
  if (directBaseType) {
    const target = normalizeName(directBaseType);
    const direct = (catalog.bases || []).find((entry) => normalizeName(entry.baseType) === target);
    if (direct) {
      return direct;
    }
  }

  if (item.category !== 'magic' && item.category !== 'rare') {
    return undefined;
  }

  const itemName = normalizeName(item.name);
  return (catalog.bases || [])
    .filter((entry) => {
      const base = normalizeName(entry.baseType);
      return containsBasePhrase(itemName, base);
    })
    .sort((a, b) => b.baseType.length - a.baseType.length)[0];
}

function containsBasePhrase(itemName, baseName) {
  return itemName === baseName || ` ${itemName} `.includes(` ${baseName} `);
}

function buildChanceBaseCatalog(lines, options = {}) {
  const thresholds = {
    ...DEFAULT_THRESHOLDS,
    ...(options.thresholds || {})
  };
  const overrideIndex = createOverrideIndex(options.overrides || CHANCE_TARGET_OVERRIDES);
  const bases = new Map();

  for (const line of lines || []) {
    if (!line?.name || !line?.baseType) {
      continue;
    }

    const target = createChanceTarget(line, overrideIndex);
    const baseKey = normalizeName(target.baseType);
    const base = bases.get(baseKey) || {
      baseType: target.baseType,
      itemClass: target.itemClass,
      chanceTargets: []
    };

    base.itemClass ||= target.itemClass;
    base.chanceTargets.push(target);
    bases.set(baseKey, base);
  }

  const catalogBases = [...bases.values()]
    .map((base) => summarizeBase(base, thresholds))
    .sort((a, b) => b.filterScore - a.filterScore || a.baseType.localeCompare(b.baseType));

  return {
    generatedAt: new Date().toISOString(),
    source: 'poe.ninja + curated chance overrides',
    curation: CHANCE_TARGET_OVERRIDES_METADATA,
    thresholds,
    bases: catalogBases
  };
}

function createChanceTarget(line, overrideIndex) {
  const override = overrideIndex.get(getOverrideKey(line.name, line.baseType));
  const inferred = inferRestriction(line);
  const status = override?.status || inferred.status;
  const confidence = override?.confidence || inferred.confidence;
  const reason = override?.reason || inferred.reason;

  return {
    name: line.name,
    baseType: line.baseType,
    itemClass: line.itemClass,
    poeNinjaType: line.poeNinjaType,
    variant: line.variant,
    chanceability: status,
    confidence,
    reason,
    source: override?.source || inferred.source,
    updatedIn: override?.updatedIn,
    chaosValue: normalizeNumber(line.chaosValue),
    divineValue: normalizeNumber(line.divineValue),
    count: line.count,
    listingCount: line.listingCount,
    lowConfidencePrice: Boolean(line.lowConfidence)
  };
}

function inferRestriction(line) {
  if (/^Replica\b/i.test(line.name)) {
    return {
      status: 'not_chanceable',
      confidence: 'high',
      reason: 'Replica uniques are Heist replicas, not Orb of Chance outcomes.',
      source: 'inferred:replica'
    };
  }

  if (/^Foulborn\b/i.test(line.name)) {
    return {
      status: 'not_chanceable',
      confidence: 'high',
      reason: 'Foulborn uniques are special variants, not Orb of Chance outcomes.',
      source: 'inferred:foulborn'
    };
  }

  if (line.poeNinjaType === 'UniqueMap') {
    return {
      status: 'unknown',
      confidence: 'low',
      reason: 'Unique map chanceability needs separate map-specific validation.',
      source: 'inferred:unique-map'
    };
  }

  return {
    status: 'unknown',
    confidence: 'medium',
    reason: 'No curated restriction entry yet.',
    source: 'inferred:uncurated'
  };
}

function summarizeBase(base, thresholds) {
  const targets = dedupeTargets(base.chanceTargets);
  const chanceableTargets = targets.filter((target) => target.chanceability === 'chanceable');
  const unknownTargets = targets.filter((target) => target.chanceability === 'unknown');
  const blockedTargets = targets.filter((target) => target.chanceability === 'not_chanceable');
  const maxChanceableChaos = maxChaos(chanceableTargets);
  const maxUnknownChaos = maxChaos(unknownTargets);
  const filterScore = Math.max(maxChanceableChaos, maxUnknownChaos * 0.35);
  const filterTier = getFilterTier(filterScore, thresholds);

  return {
    baseType: base.baseType,
    itemClass: base.itemClass,
    filterTier,
    filterScore,
    showInFilter: filterTier !== 'hidden' && (chanceableTargets.length > 0 || unknownTargets.length > 0),
    confidence: chanceableTargets.length > 0 ? 'high' : unknownTargets.length > 0 ? 'medium' : 'low',
    maxChanceableChaos,
    maxUnknownChaos,
    targetCounts: {
      chanceable: chanceableTargets.length,
      unknown: unknownTargets.length,
      notChanceable: blockedTargets.length
    },
    chanceTargets: targets.sort((a, b) =>
      getChanceabilityRank(a.chanceability) - getChanceabilityRank(b.chanceability)
      || getTargetScore(b) - getTargetScore(a)
    )
  };
}

function getChanceabilityRank(status) {
  if (status === 'chanceable') {
    return 0;
  }

  if (status === 'unknown') {
    return 1;
  }

  return 2;
}

function dedupeTargets(targets) {
  const byKey = new Map();
  for (const target of targets) {
    const key = getOverrideKey(`${target.name}:${target.variant || ''}`, target.baseType);
    const previous = byKey.get(key);
    if (!previous || getTargetScore(target) > getTargetScore(previous)) {
      byKey.set(key, target);
    }
  }
  return [...byKey.values()];
}

function getFilterTier(score, thresholds) {
  if (score >= thresholds.high) {
    return 'high';
  }

  if (score >= thresholds.valuable) {
    return 'valuable';
  }

  if (score >= thresholds.watch) {
    return 'watch';
  }

  return 'hidden';
}

function maxChaos(targets) {
  return targets.reduce((max, target) => Math.max(max, getTargetScore(target)), 0);
}

function getTargetScore(target) {
  return typeof target.chaosValue === 'number' && Number.isFinite(target.chaosValue)
    ? target.chaosValue
    : 0;
}

function normalizeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.round(value * 100) / 100
    : undefined;
}

module.exports = {
  DEFAULT_THRESHOLDS,
  CHANCE_TARGET_OVERRIDES_METADATA,
  UNIQUE_TYPES,
  buildChanceBaseCatalog,
  findChanceBaseEntry,
  getChanceBaseCatalog,
  getChanceBaseEntry,
  getChanceBaseEntryForItem,
  normalizeName
};
