const UNSUPPORTED_FILTER_ECONOMY_TYPES = new Set([
  'UniqueJewel',
  'UniqueMap'
]);

const ECONOMY_PROVIDER_CATEGORY_BY_TYPE = {
  Currency: 'stackables',
  Artifact: 'stackables',
  DivinationCard: 'stackables',
  DeliriumOrb: 'stackables',
  Essence: 'stackables',
  Fossil: 'stackables',
  Omen: 'stackables',
  Oil: 'stackables',
  Resonator: 'stackables',
  Runegraft: 'stackables',
  Scarab: 'stackables',
  Tattoo: 'stackables',
  Vial: 'stackables',
  AllflameEmber: 'league-items',
  Incubator: 'league-items',
  Wombgift: 'league-items',
  Fragment: 'maps-fragments',
  Map: 'maps-fragments',
  BlightedMap: 'maps-fragments',
  BlightRavagedMap: 'maps-fragments',
  Invitation: 'maps-fragments',
  Memory: 'maps-fragments',
  UniqueMap: 'maps-fragments',
  SkillGem: 'gems',
  UniqueJewel: 'jewels'
};

function normalizeName(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function normalizeSkillGemFilterName(value) {
  return normalizeName(value).replace(/\s+\([^)]*\)\s*$/, '');
}

function normalizePositiveInteger(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    return undefined;
  }

  return Math.round(number);
}

function formatChaos(value) {
  return Number.isFinite(value) ? Math.round(value * 10) / 10 : 0;
}

function getEconomyProviderCategory(type) {
  if (ECONOMY_PROVIDER_CATEGORY_BY_TYPE[type]) {
    return ECONOMY_PROVIDER_CATEGORY_BY_TYPE[type];
  }

  if (String(type || '').startsWith('Unique')) {
    return 'uniques';
  }

  return 'special-bases';
}

function getEconomyPrecisionCategory(matchPrecision) {
  if (matchPrecision === 'variant-unique-base') {
    return 'variant-sensitive';
  }

  if (matchPrecision === 'exact-gem' || matchPrecision === 'exact-transfigured-gem') {
    return 'exact-item';
  }

  if (matchPrecision === 'exact-base-type') {
    return 'base-only';
  }

  return 'skipped';
}

function hasAlternateGemDiscriminator(row) {
  return /^alt_/i.test(normalizeName(row.tradeFilter?.query?.type?.discriminator || row.tradeType?.discriminator));
}

function getExchangeItemName(overview, row) {
  const item = getExchangeItemById(overview?.core?.items, row.id)
    || getExchangeItemById(overview?.items, row.id);
  return item?.name || row.currencyTypeName || row.name;
}

function getExchangeItemById(items, id) {
  if (!items || !id) {
    return undefined;
  }

  if (Array.isArray(items)) {
    return items.find((item) => String(item?.id || '') === String(id));
  }

  return items[id];
}

function getProviderDisplayName(overview, row, endpoint) {
  if (endpoint.includes('currency/overview')) {
    return normalizeName(row.currencyTypeName);
  }

  if (endpoint.includes('exchange/')) {
    return normalizeName(getExchangeItemName(overview, row));
  }

  return normalizeName(row.name || row.baseType);
}

function getProviderChaosValue(row, endpoint) {
  if (endpoint.includes('currency/overview')) {
    return Number(row.chaosEquivalent);
  }

  if (endpoint.includes('exchange/')) {
    return Number(row.primaryValue);
  }

  return Number(row.chaosValue);
}

function getSkillGemConditions(row) {
  const displayName = normalizeName(row.name);
  const gemName = normalizeSkillGemFilterName(displayName);
  const baseType = normalizeName(row.baseType);
  const isVaal = /^Vaal\s+/i.test(gemName);
  const isTransfigured = !isVaal && Boolean(gemName && (
    hasAlternateGemDiscriminator(row) ||
    /^.+\s+of\s+Trarthus$/i.test(gemName) ||
    (baseType && baseType.toLowerCase() !== gemName.toLowerCase())
  ));

  const conditions = isTransfigured
    ? [{ key: 'TransfiguredGem', operator: '==', value: gemName }]
    : [
        { key: 'Class', value: ['Skill Gems', 'Support Gems'] },
        { key: 'BaseType', value: isVaal ? gemName : baseType || gemName }
      ];

  const gemLevel = normalizePositiveInteger(row.gemLevel);
  const gemQuality = normalizePositiveInteger(row.gemQuality);
  if (gemLevel !== undefined) {
    conditions.push({ key: 'GemLevel', operator: '>=', value: gemLevel });
  }
  if (gemQuality !== undefined) {
    conditions.push({ key: 'Quality', operator: '>=', value: gemQuality });
  }
  if (row.corrupted === true) {
    conditions.push({ key: 'Corrupted', value: true });
  } else if (row.corrupted === false) {
    conditions.push({ key: 'Corrupted', value: false });
  }

  return {
    conditions,
    matchPrecision: isTransfigured ? 'exact-transfigured-gem' : 'exact-gem'
  };
}

function getUniqueConditions(type, row) {
  if (UNSUPPORTED_FILTER_ECONOMY_TYPES.has(type)) {
    return {
      unsupportedReason: `${type} cannot be translated to an exact item-filter BaseType safely.`
    };
  }

  const baseType = normalizeName(row.baseType);
  if (!baseType) {
    return {
      unsupportedReason: `${type} row is missing provider baseType; refusing to emit display-name BaseType.`
    };
  }

  const displayName = normalizeName(row.name);
  const isFoulborn = /^Foulborn\b/i.test(displayName);
  const isReplica = /^Replica\b/i.test(displayName);
  if (!isFoulborn && !isReplica) {
    return {
      unsupportedReason: `${type} ${displayName} only translates to Rarity Unique + BaseType ${baseType}; plain unique bases are too ambiguous for economy highlighting.`
    };
  }

  const conditions = [
    { key: 'Rarity', value: 'Unique' },
    { key: 'BaseType', value: baseType }
  ];

  if (isFoulborn) {
    conditions.push({ key: 'Foulborn', value: true });
  }

  if (isReplica) {
    conditions.push({ key: 'Replica', value: true });
  }

  const linkedSockets = normalizePositiveInteger(row.links);
  const quality = normalizePositiveInteger(row.quality);
  if (linkedSockets !== undefined) {
    conditions.push({ key: 'LinkedSockets', operator: '>=', value: linkedSockets });
  }
  if (quality !== undefined) {
    conditions.push({ key: 'Quality', operator: '>=', value: quality });
  }
  if (row.corrupted === true) {
    conditions.push({ key: 'Corrupted', value: true });
  } else if (row.corrupted === false) {
    conditions.push({ key: 'Corrupted', value: false });
  }

  return {
    conditions,
    matchPrecision: 'variant-unique-base'
  };
}

function getDefaultConditions(type, displayName) {
  const conditions = [{ key: 'BaseType', value: displayName }];

  const classByType = {
    AllflameEmber: 'Embers of the Allflame',
    Artifact: 'Stackable Currency',
    Currency: 'Stackable Currency',
    DeliriumOrb: 'Stackable Currency',
    DivinationCard: 'Divination Cards',
    Essence: 'Stackable Currency',
    Fossil: 'Stackable Currency',
    Fragment: 'Map Fragments',
    Incubator: 'Stackable Currency',
    Invitation: 'Misc Map Items',
    Map: 'Maps',
    BlightedMap: 'Maps',
    BlightRavagedMap: 'Maps',
    Memory: 'Misc Map Items',
    Omen: 'Stackable Currency',
    Oil: 'Stackable Currency',
    Resonator: 'Stackable Currency',
    Runegraft: 'Stackable Currency',
    Scarab: 'Map Fragments',
    Tattoo: 'Stackable Currency',
    Vial: 'Stackable Currency',
    Wombgift: 'Wombgifts'
  };

  if (classByType[type]) {
    conditions.unshift({ key: 'Class', value: classByType[type] });
  }

  if (type === 'BlightedMap') {
    conditions.push({ key: 'BlightedMap', value: true });
  } else if (type === 'BlightRavagedMap') {
    conditions.push({ key: 'UberBlightedMap', value: true });
  } else if (type === 'Memory') {
    conditions.push({ key: 'ZanaMemory', value: true });
  }

  return {
    conditions,
    matchPrecision: 'exact-base-type'
  };
}

function normalizePoeNinjaEconomyRow({ type, endpoint, overview, row }) {
  const economyCategory = getEconomyProviderCategory(type);
  const displayName = getProviderDisplayName(overview, row, endpoint);
  const chaosValue = getProviderChaosValue(row, endpoint);
  if (!displayName || !Number.isFinite(chaosValue)) {
    return {
      supported: false,
      providerType: type,
      economyCategory,
      unsupportedReason: 'Provider row has no display name or numeric chaos value.'
    };
  }

  let filter;
  if (type === 'SkillGem') {
    filter = getSkillGemConditions(row);
  } else if (type.startsWith('Unique')) {
    filter = getUniqueConditions(type, row);
  } else {
    filter = getDefaultConditions(type, displayName);
  }

  if (filter.unsupportedReason) {
    return {
      supported: false,
      providerType: type,
      economyCategory,
      displayName,
      chaosValue,
      precisionCategory: 'skipped',
      unsupportedReason: filter.unsupportedReason
    };
  }

  const precisionCategory = getEconomyPrecisionCategory(filter.matchPrecision);
  return {
    supported: true,
    providerType: type,
    economyCategory,
    providerId: row.detailsId || row.id,
    displayName,
    providerBaseType: normalizeName(row.baseType),
    variant: normalizeName(row.variant),
    chaosValue,
    formattedChaosValue: formatChaos(chaosValue),
    conditions: filter.conditions,
    matchPrecision: filter.matchPrecision,
    precisionCategory
  };
}

function createEconomyItemKey(item) {
  const conditionKey = (item.conditions || [])
    .map((condition) => `${condition.key}:${condition.operator || ''}:${JSON.stringify(condition.value)}`)
    .join('|');
  return `${item.providerType}:${item.displayName.toLowerCase()}:${conditionKey}`;
}

module.exports = {
  UNSUPPORTED_FILTER_ECONOMY_TYPES,
  createEconomyItemKey,
  formatChaos,
  getEconomyPrecisionCategory,
  getEconomyProviderCategory,
  normalizeName,
  normalizePoeNinjaEconomyRow
};
