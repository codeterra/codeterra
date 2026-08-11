const {
  fetchPoeNinjaOverview,
  getPoeNinjaEndpoint
} = require('./pricing');
const {
  UNSUPPORTED_FILTER_ECONOMY_TYPES,
  createEconomyItemKey,
  formatChaos,
  normalizeName,
  normalizePoeNinjaEconomyRow
} = require('./economy-item-adapter');

const DEFAULT_ECONOMY_TYPES = [
  'Currency',
  'Fragment',
  'DivinationCard',
  'Scarab',
  'UniqueAccessory',
  'UniqueArmour',
  'UniqueWeapon',
  'SkillGem'
];

const ECONOMY_CACHE_VERSION = 3;

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

const ECONOMY_SELECTION_PRIORITY = {
  Currency: 0,
  Fragment: 1,
  DivinationCard: 2,
  Scarab: 3,
  UniqueAccessory: 4,
  UniqueArmour: 5,
  UniqueWeapon: 6,
  SkillGem: 7
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
    economyProviderType: item.providerType,
    economyProviderBaseType: item.providerBaseType || undefined,
    economyMatchPrecision: item.matchPrecision,
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

  return source.slice(0, 3).map((tier, index) => ({
    ...DEFAULT_ECONOMY_TIERS[index],
    ...(tier && typeof tier === 'object' ? tier : {}),
    id: String(tier?.id || DEFAULT_ECONOMY_TIERS[index].id),
    label: String(tier?.label || DEFAULT_ECONOMY_TIERS[index].label),
    style: String(tier?.style || DEFAULT_ECONOMY_TIERS[index].style),
    tier: String(tier?.tier || DEFAULT_ECONOMY_TIERS[index].tier),
    maxItems: Math.max(1, Math.min(2000, Math.round(Number(tier?.maxItems) || DEFAULT_ECONOMY_TIERS[index].maxItems)))
  }));
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

function createEconomyRulesFromOverviews(overviews, options = {}) {
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

  for (const { type, endpoint, overview } of overviews) {
    if (UNSUPPORTED_FILTER_ECONOMY_TYPES.has(type)) {
      continue;
    }

    for (const line of overview?.lines || []) {
      const item = normalizePoeNinjaEconomyRow({ type, endpoint, overview, row: line });
      if (!item.supported || item.chaosValue < minChaos) {
        continue;
      }

      const key = createEconomyItemKey(item);
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      candidates.push(item);
    }
  }

  const byTierCount = new Map();
  const selected = candidates
    .map((item) => ({
      item,
      tier: tiers.find((candidateTier) => item.chaosValue >= candidateTier.minChaosValue)
    }))
    .filter((entry) => entry.tier)
    .sort(compareEconomySelectionEntries)
    .flatMap((item) => {
      const count = byTierCount.get(item.tier.id) || 0;
      if (count >= item.tier.maxItems) {
        return [];
      }

      byTierCount.set(item.tier.id, count + 1);
      return [item];
    });

  return selected
    .sort(compareEconomyOutputEntries)
    .map(({ item, tier }) => createEconomyRule({ item, tier }));
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

  return {
    entries: createEconomyRulesFromOverviews(overviews, config),
    cacheVersion: ECONOMY_CACHE_VERSION,
    source: 'poe.ninja',
    league,
    types,
    tiers: normalizeTierConfig(config.tiers, config),
    divineChaosValue: findDivineChaosValue(overviews),
    refreshedAt: new Date().toISOString(),
    errors
  };
}

module.exports = {
  ECONOMY_CACHE_VERSION,
  DEFAULT_ECONOMY_TYPES,
  DEFAULT_ECONOMY_TIERS,
  createEconomyRulesFromOverviews,
  refreshEconomyHighlightRules
};
