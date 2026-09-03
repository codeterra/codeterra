const {
  fetchPoeNinjaOverview,
  getPoeNinjaEndpoint
} = require('./pricing');
const {
  UNSUPPORTED_FILTER_ECONOMY_TYPES,
  createEconomyItemKey,
  formatChaos,
  getEconomyPrecisionCategory,
  getEconomyProviderCategory,
  normalizeName,
  normalizePoeNinjaEconomyRow
} = require('./economy-item-adapter');

const DEFAULT_ECONOMY_TYPES = [
  'Currency',
  'Fragment',
  'DivinationCard',
  'Scarab',
  'Oil',
  'Essence',
  'Fossil',
  'Resonator',
  'DeliriumOrb',
  'Tattoo',
  'Omen',
  'Runegraft',
  'Artifact',
  'Incubator',
  'Wombgift',
  'Map',
  'BlightedMap',
  'BlightRavagedMap',
  'Invitation',
  'Memory',
  'Vial',
  'AllflameEmber',
  'UniqueAccessory',
  'UniqueArmour',
  'UniqueWeapon',
  'SkillGem'
];

const ECONOMY_CACHE_VERSION = 4;
const ECONOMY_CACHE_STALE_HOURS = 12;
const ECONOMY_SNAPSHOT_HISTORY_LIMIT = 10;

const DEFAULT_ECONOMY_TIERS = [
  {
    id: 'chaos-50',
    label: '50c+',
    minChaos: 50,
    style: 'highValue',
    tier: 'baseline',
    maxItems: 500
  },
  {
    id: 'divine-1',
    label: '1 divine+',
    minDivines: 1,
    style: 'highValue',
    tier: 'valuable',
    maxItems: 500
  },
  {
    id: 'divine-10',
    label: '10 divines+',
    minDivines: 10,
    style: 'highValue',
    tier: 'high',
    maxItems: 500
  }
];

const DEFAULT_DIVINATION_CARD_ECONOMY_TIERS = [
  { id: 's', label: 'S Tier', minDivines: 10 },
  { id: 'a', label: 'A Tier', minDivines: 1 },
  { id: 'b', label: 'B Tier', minChaos: 100 },
  { id: 'c', label: 'C Tier', minChaos: 20 },
  { id: 'd', label: 'D Tier', minChaos: 5 },
  { id: 'f', label: 'F Tier', minChaos: 0, catchAll: true }
];

const DEFAULT_DIVINATION_CARD_TIER_STYLES = {
  s: { textColor: [255, 255, 255, 255], backgroundColor: [0, 0, 0, 255], borderColor: [255, 70, 70, 255], fontSize: 45, minimapIcon: { color: 'Red', shape: 'Square', size: 1 }, beam: { color: 'Red', temporary: true }, alertSound: null, customAlertSound: null },
  a: { textColor: [255, 244, 180, 255], backgroundColor: [0, 0, 0, 235], borderColor: [255, 210, 80, 255], fontSize: 42, minimapIcon: { color: 'Yellow', shape: 'Square', size: 1 }, beam: { color: 'Yellow', temporary: true }, alertSound: null, customAlertSound: null },
  b: { textColor: [170, 230, 255, 255], backgroundColor: [0, 0, 0, 220], borderColor: [70, 190, 255, 255], fontSize: 38, minimapIcon: { color: 'Cyan', shape: 'Square', size: 1 }, beam: null, alertSound: null, customAlertSound: null },
  c: { textColor: [210, 220, 232, 255], backgroundColor: [0, 0, 0, 200], borderColor: [150, 170, 190, 255], fontSize: 34, minimapIcon: { color: 'White', shape: 'Square', size: 1 }, beam: null, alertSound: null, customAlertSound: null },
  d: { textColor: [170, 180, 190, 255], backgroundColor: [0, 0, 0, 180], borderColor: [85, 100, 115, 255], fontSize: 30, minimapIcon: { color: 'Grey', shape: 'Square', size: 1 }, beam: null, alertSound: null, customAlertSound: null },
  f: { textColor: [120, 130, 140, 255], backgroundColor: [0, 0, 0, 140], borderColor: [55, 65, 75, 200], fontSize: 26, minimapIcon: null, beam: null, alertSound: null, customAlertSound: null }
};

const ECONOMY_SELECTION_PRIORITY = {
  Currency: 0,
  Fragment: 1,
  DivinationCard: 2,
  Scarab: 3,
  Oil: 4,
  Essence: 5,
  Fossil: 6,
  Resonator: 7,
  DeliriumOrb: 8,
  Tattoo: 9,
  Omen: 10,
  Runegraft: 11,
  Artifact: 12,
  Incubator: 13,
  Wombgift: 14,
  Map: 15,
  BlightedMap: 16,
  BlightRavagedMap: 17,
  Invitation: 18,
  Memory: 19,
  Vial: 20,
  AllflameEmber: 21,
  UniqueAccessory: 22,
  UniqueArmour: 23,
  UniqueWeapon: 24,
  SkillGem: 25
};

function getTierMinChaos(tier, divineChaosValue) {
  if (Number.isFinite(Number(tier.minDivines)) && Number(tier.minDivines) > 0 && divineChaosValue > 0) {
    return Number(tier.minDivines) * divineChaosValue;
  }

  return Math.max(0, Number(tier.minChaos) || 0);
}

function createEconomyRule({ item, tier }) {
  return {
    id: `economy-${tier.id}-${item.providerType}-${slugify(item.providerId || item.displayName)}`,
    enabled: true,
    action: 'Show',
    label: `${item.displayName} (${item.formattedChaosValue}c)`,
    source: 'poe.ninja-economy',
    style: tier.style || 'highValue',
    tier: tier.tier || 'baseline',
    economyTierId: tier.id,
    economyTierLabel: tier.label,
    economyChaosValue: item.formattedChaosValue,
    economyCategory: item.economyCategory,
    economyProviderType: item.providerType,
    economyProviderBaseType: item.providerBaseType || undefined,
    economyMatchPrecision: item.matchPrecision,
    economyPrecisionCategory: item.precisionCategory || getEconomyPrecisionCategory(item.matchPrecision),
    conditions: item.conditions
  };
}

function slugify(value) {
  return normalizeName(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeTierConfig(tiers, legacyOptions = {}) {
  const source = Array.isArray(tiers) && tiers.length > 0
    ? tiers
    : legacyOptions.minChaos || legacyOptions.highValueChaos
      ? [
          { ...DEFAULT_ECONOMY_TIERS[0], minChaos: Number(legacyOptions.minChaos) || DEFAULT_ECONOMY_TIERS[0].minChaos },
          { ...DEFAULT_ECONOMY_TIERS[1], minChaos: Number(legacyOptions.highValueChaos) || 150, minDivines: undefined },
          DEFAULT_ECONOMY_TIERS[2]
        ]
      : DEFAULT_ECONOMY_TIERS;

  return source.map((tier, index) => {
    const fallback = DEFAULT_ECONOMY_TIERS[index] || {
      ...DEFAULT_ECONOMY_TIERS[0],
      id: `economy-rule-${index + 1}`,
      label: `Economy rule ${index + 1}`,
      tier: 'baseline'
    };
    return {
      ...fallback,
      ...(tier && typeof tier === 'object' ? tier : {}),
      id: String(tier?.id || fallback.id),
      label: String(tier?.label || fallback.label),
      style: String(tier?.style || fallback.style),
      tier: String(tier?.tier || fallback.tier),
      maxItems: Math.max(1, Math.min(2000, Math.round(Number(tier?.maxItems) || fallback.maxItems)))
    };
  });
}

function findDivineChaosValue(overviews) {
  for (const { endpoint, overview } of overviews) {
    if (!endpoint.includes('currency/overview')) {
      continue;
    }

    const divine = (overview?.lines || []).find((line) => normalizeName(line.currencyTypeName).toLowerCase() === 'divine orb');
    const value = Number(divine?.chaosEquivalent);
    if (Number.isFinite(value) && value > 0) {
      return value;
    }
  }

  return undefined;
}

function createEconomyRuleSnapshotFromOverviews(overviews, options = {}) {
  const divineChaosValue = Number(options.divineChaosValue) || findDivineChaosValue(overviews) || 150;
  const tiers = normalizeTierConfig(options.tiers, options)
    .map((tier) => ({
      ...tier,
      minChaosValue: getTierMinChaos(tier, divineChaosValue)
    }))
    .sort((a, b) => b.minChaosValue - a.minChaosValue);
  const minChaos = Math.min(...tiers.map((tier) => tier.minChaosValue));
  const seen = new Set();
  const candidates = [];
  const skippedEntries = createSkippedEconomyCounters();
  const audit = createEconomyAudit();

  for (const { type, endpoint, overview } of overviews) {
    const economyCategory = getEconomyProviderCategory(type);
    if (UNSUPPORTED_FILTER_ECONOMY_TYPES.has(type)) {
      const amount = overview?.lines?.length || 0;
      incrementSkippedEconomyCounter(skippedEntries, 'unsupportedType', amount);
      incrementSkippedEconomyCategory(audit, economyCategory, 'unsupportedType', amount);
      continue;
    }

    for (const line of overview?.lines || []) {
      const item = normalizePoeNinjaEconomyRow({ type, endpoint, overview, row: line });
      if (!item.supported) {
        incrementSkippedEconomyCounter(skippedEntries, 'unsupportedRow');
        incrementSkippedEconomyCategory(audit, item.economyCategory || economyCategory, 'unsupportedRow');
        continue;
      }

      if (item.chaosValue < minChaos) {
        incrementSkippedEconomyCounter(skippedEntries, 'belowThreshold');
        incrementSkippedEconomyCategory(audit, item.economyCategory, 'belowThreshold');
        continue;
      }

      const key = createEconomyItemKey(item);
      if (seen.has(key)) {
        incrementSkippedEconomyCounter(skippedEntries, 'duplicate');
        incrementSkippedEconomyCategory(audit, item.economyCategory, 'duplicate');
        continue;
      }
      seen.add(key);
      candidates.push(item);
      incrementCountMap(audit.candidateByCategory, item.economyCategory);
    }
  }

  const byTierCount = new Map();
  const selected = candidates
    .map((item) => ({
      item,
      tier: tiers.find((candidateTier) => item.chaosValue >= candidateTier.minChaosValue)
    }))
    .flatMap((entry) => {
      if (!entry.tier) {
        incrementSkippedEconomyCounter(skippedEntries, 'noTier');
        incrementSkippedEconomyCategory(audit, entry.item.economyCategory, 'noTier');
        return [];
      }
      return [entry];
    })
    .sort(compareEconomySelectionEntries)
    .flatMap((item) => {
      const count = byTierCount.get(item.tier.id) || 0;
      if (count >= item.tier.maxItems) {
        incrementSkippedEconomyCounter(skippedEntries, 'overTierCap');
        incrementSkippedEconomyCategory(audit, item.item.economyCategory, 'overTierCap');
        return [];
      }

      byTierCount.set(item.tier.id, count + 1);
      incrementCountMap(audit.selectedByCategory, item.item.economyCategory);
      incrementCountMap(audit.precisionCounts, item.item.precisionCategory || getEconomyPrecisionCategory(item.item.matchPrecision));
      return [item];
    });

  const entries = selected
    .sort(compareEconomyOutputEntries)
    .map(({ item, tier }) => createEconomyRule({ item, tier }));

  return {
    entries,
    skippedEntries,
    audit: finalizeEconomyAudit(audit, skippedEntries),
    candidateCount: candidates.length,
    selectedCount: entries.length
  };
}

function createEconomyRulesFromOverviews(overviews, options = {}) {
  return createEconomyRuleSnapshotFromOverviews(overviews, options).entries;
}

function createSkippedEconomyCounters() {
  return {
    unsupportedType: 0,
    unsupportedRow: 0,
    belowThreshold: 0,
    duplicate: 0,
    noTier: 0,
    overTierCap: 0
  };
}

function createEconomyAudit() {
  return {
    candidateByCategory: {},
    selectedByCategory: {},
    skippedByCategory: {},
    precisionCounts: {}
  };
}

function incrementSkippedEconomyCounter(counters, key, amount = 1) {
  counters[key] = (counters[key] || 0) + Math.max(0, Number(amount) || 0);
}

function incrementCountMap(map, key, amount = 1) {
  const normalizedKey = String(key || 'unknown');
  map[normalizedKey] = (map[normalizedKey] || 0) + Math.max(0, Number(amount) || 0);
}

function incrementSkippedEconomyCategory(audit, category, reason, amount = 1) {
  const normalizedCategory = String(category || 'unknown');
  audit.skippedByCategory[normalizedCategory] = audit.skippedByCategory[normalizedCategory] || createSkippedEconomyCounters();
  incrementSkippedEconomyCounter(audit.skippedByCategory[normalizedCategory], reason, amount);
}

function sumSkippedEconomyCounters(counters = {}) {
  return Object.keys(createSkippedEconomyCounters())
    .reduce((sum, key) => sum + (Number(counters[key]) || 0), 0);
}

function finalizeEconomyAudit(audit, skippedEntries) {
  return {
    ...audit,
    skippedCount: sumSkippedEconomyCounters(skippedEntries),
    skippedEntries: { ...skippedEntries }
  };
}

function createEconomyCacheSnapshot(snapshot, metadata = {}) {
  return {
    id: `economy-${slugify(metadata.league || 'league')}-${metadata.refreshedAt || new Date().toISOString()}`,
    source: metadata.source || 'poe.ninja',
    league: metadata.league,
    refreshedAt: metadata.refreshedAt,
    cacheVersion: metadata.cacheVersion || ECONOMY_CACHE_VERSION,
    types: Array.isArray(metadata.types) ? metadata.types : [],
    divineChaosValue: Number.isFinite(Number(metadata.divineChaosValue)) ? Number(metadata.divineChaosValue) : undefined,
    candidateCount: snapshot.candidateCount,
    selectedCount: snapshot.selectedCount,
    skippedEntries: snapshot.skippedEntries,
    audit: snapshot.audit
  };
}

function mergeEconomyCacheSnapshots(nextSnapshot, previousSnapshots) {
  const snapshots = [nextSnapshot, ...(Array.isArray(previousSnapshots) ? previousSnapshots : [])]
    .filter((snapshot) => snapshot && typeof snapshot === 'object');
  const seen = new Set();
  const output = [];
  for (const snapshot of snapshots) {
    const key = `${snapshot.league || ''}:${snapshot.refreshedAt || ''}:${snapshot.cacheVersion || ''}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    output.push(snapshot);
    if (output.length >= ECONOMY_SNAPSHOT_HISTORY_LIMIT) {
      break;
    }
  }
  return output;
}

function compareEconomySelectionEntries(a, b) {
  return b.tier.minChaosValue - a.tier.minChaosValue
    || getEconomySelectionPriority(a.item) - getEconomySelectionPriority(b.item)
    || b.item.chaosValue - a.item.chaosValue
    || a.item.displayName.localeCompare(b.item.displayName);
}

function compareEconomyOutputEntries(a, b) {
  return b.tier.minChaosValue - a.tier.minChaosValue
    || b.item.chaosValue - a.item.chaosValue
    || getEconomySelectionPriority(a.item) - getEconomySelectionPriority(b.item)
    || a.item.displayName.localeCompare(b.item.displayName);
}

function getEconomySelectionPriority(item) {
  return ECONOMY_SELECTION_PRIORITY[item.providerType] ?? 99;
}

async function refreshEconomyHighlightRules(league, config = {}) {
  const types = Array.isArray(config.types) && config.types.length > 0
    ? config.types
    : DEFAULT_ECONOMY_TYPES;

  const overviews = [];
  const errors = [];
  for (const type of types) {
    const endpoint = getPoeNinjaEndpoint(type);
    try {
      overviews.push({
        type,
        endpoint,
        overview: await fetchPoeNinjaOverview(league, type, endpoint)
      });
    } catch (error) {
      errors.push(`${type}: ${error.message}`);
    }
  }

  const snapshot = createEconomyRuleSnapshotFromOverviews(overviews, config);
  const refreshedAt = new Date().toISOString();
  const divineChaosValue = findDivineChaosValue(overviews);
  const snapshotMetadata = createEconomyCacheSnapshot(snapshot, {
    source: 'poe.ninja',
    league,
    refreshedAt,
    cacheVersion: ECONOMY_CACHE_VERSION,
    types,
    divineChaosValue
  });

  return {
    entries: snapshot.entries,
    skippedEntries: snapshot.skippedEntries,
    audit: snapshot.audit,
    candidateCount: snapshot.candidateCount,
    selectedCount: snapshot.selectedCount,
    cacheVersion: ECONOMY_CACHE_VERSION,
    source: 'poe.ninja',
    league,
    types,
    tiers: normalizeTierConfig(config.tiers, config),
    divineChaosValue,
    refreshedAt,
    snapshots: mergeEconomyCacheSnapshots(snapshotMetadata, config.snapshots),
    errors
  };
}

async function refreshDivinationCardTierRules(league, category = {}) {
  const divinationEndpoint = getPoeNinjaEndpoint('DivinationCard');
  const currencyEndpoint = getPoeNinjaEndpoint('Currency');
  const [divinationOverview, currencyOverview] = await Promise.all([
    fetchPoeNinjaOverview(league, 'DivinationCard', divinationEndpoint),
    fetchPoeNinjaOverview(league, 'Currency', currencyEndpoint).catch(() => undefined)
  ]);

  return createDivinationCardTierRulesFromOverviews({
    league,
    category,
    divinationOverview,
    currencyOverview,
    divinationEndpoint,
    currencyEndpoint
  });
}

function createDivinationCardTierRulesFromOverviews({
  league,
  category = {},
  divinationOverview,
  currencyOverview,
  divinationEndpoint = 'exchange/current/overview',
  currencyEndpoint = 'stash/current/currency/overview'
} = {}) {
  const divineChaosValue = findDivineChaosValue([
    { type: 'Currency', endpoint: currencyEndpoint, overview: currencyOverview }
  ]) || 150;
  const existingRules = Array.isArray(category.rules) ? category.rules : [];
  const existingByTier = new Map(existingRules
    .filter((rule) => rule?.divinationTierId)
    .map((rule) => [String(rule.divinationTierId), rule]));
  const customRules = existingRules.filter((rule) => {
    const tierId = String(rule?.divinationTierId || '');
    return tierId
      && !DEFAULT_DIVINATION_CARD_ECONOMY_TIERS.some((tier) => tier.id === tierId)
      && getDivinationTierItems(rule).length > 0;
  });
  const customNames = new Set(customRules.flatMap(getDivinationTierItems).map((name) => normalizeName(name).toLowerCase()));
  const rows = (divinationOverview?.lines || [])
    .map((row) => normalizePoeNinjaEconomyRow({
      type: 'DivinationCard',
      endpoint: divinationEndpoint,
      overview: divinationOverview,
      row
    }))
    .filter((item) => item.supported && Number.isFinite(item.chaosValue))
    .filter((item) => !customNames.has(normalizeName(item.displayName).toLowerCase()))
    .sort((left, right) => right.chaosValue - left.chaosValue || left.displayName.localeCompare(right.displayName));
  const namesByTier = new Map(DEFAULT_DIVINATION_CARD_ECONOMY_TIERS.map((tier) => [tier.id, []]));

  for (const item of rows) {
    const tier = DEFAULT_DIVINATION_CARD_ECONOMY_TIERS.find((candidate) => {
      const minChaos = getTierMinChaos(candidate, divineChaosValue);
      return item.chaosValue >= minChaos;
    }) || DEFAULT_DIVINATION_CARD_ECONOMY_TIERS.at(-1);
    namesByTier.get(tier.id).push(item.displayName);
  }

  const fixedRules = DEFAULT_DIVINATION_CARD_ECONOMY_TIERS.map((tier) => {
    const existing = existingByTier.get(tier.id) || {};
    const names = namesByTier.get(tier.id) || [];
    if (!tier.catchAll && names.length === 0) {
      return undefined;
    }

    const conditions = [{ key: 'Class', value: 'Divination Cards' }];
    if (!tier.catchAll) {
      conditions.push({ key: 'BaseType', value: names });
    }

    return {
      ...existing,
      id: existing.id || `divination-card-tier-${tier.id}`,
      divinationTierId: tier.id,
      enabled: existing.enabled !== false,
      action: existing.action || 'Show',
      label: existing.label || tier.label,
      source: 'category-rule',
      style: existing.style || '__inherit',
      tier: 'baseline',
      overrideCategoryStyle: existing.overrideCategoryStyle !== false,
      styleOverride: existing.styleOverride || DEFAULT_DIVINATION_CARD_TIER_STYLES[tier.id],
      catchAll: Boolean(tier.catchAll),
      tierItems: names,
      conditions
    };
  }).filter(Boolean);

  return {
    category: {
      ...category,
      enabled: category.enabled !== false,
      rules: [
        ...fixedRules.filter((rule) => rule.divinationTierId !== 'f'),
        ...customRules,
        ...fixedRules.filter((rule) => rule.divinationTierId === 'f')
      ]
    },
    source: 'poe.ninja',
    league,
    refreshedAt: new Date().toISOString(),
    totalCards: rows.length,
    divineChaosValue,
    tierCounts: Object.fromEntries([...namesByTier.entries()].map(([tierId, names]) => [tierId, names.length]))
  };
}

function getDivinationTierItems(rule = {}) {
  if (Array.isArray(rule.tierItems)) {
    return rule.tierItems;
  }

  const baseType = (rule.conditions || []).find((condition) => condition.key === 'BaseType')?.value;
  if (Array.isArray(baseType)) {
    return baseType;
  }
  return baseType ? [baseType] : [];
}

module.exports = {
  ECONOMY_CACHE_VERSION,
  ECONOMY_CACHE_STALE_HOURS,
  DEFAULT_ECONOMY_TYPES,
  DEFAULT_ECONOMY_TIERS,
  DEFAULT_DIVINATION_CARD_ECONOMY_TIERS,
  createDivinationCardTierRulesFromOverviews,
  createEconomyRuleSnapshotFromOverviews,
  createEconomyRulesFromOverviews,
  refreshDivinationCardTierRules,
  refreshEconomyHighlightRules
};
