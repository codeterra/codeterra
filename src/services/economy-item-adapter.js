const UNSUPPORTED_FILTER_ECONOMY_TYPES = new Set([
  'UniqueJewel',
  'UniqueMap'
]);

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

function hasAlternateGemDiscriminator(row) {
  return /^alt_/i.test(normalizeName(row.tradeFilter?.query?.type?.discriminator || row.tradeType?.discriminator));
}

function getExchangeItemName(overview, row) {
  const item = overview?.core?.items?.[row.id] || overview?.items?.[row.id];
  return item?.name || row.currencyTypeName || row.name;
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
    Currency: 'Stackable Currency',
    DivinationCard: 'Divination Cards',
    Fragment: 'Map Fragments',
    Map: 'Maps',
    Scarab: 'Map Fragments'
  };

  if (classByType[type]) {
    conditions.unshift({ key: 'Class', value: classByType[type] });
  }

  return {
    conditions,
    matchPrecision: 'exact-base-type'
  };
}

function normalizePoeNinjaEconomyRow({ type, endpoint, overview, row }) {
  const displayName = getProviderDisplayName(overview, row, endpoint);
  const chaosValue = getProviderChaosValue(row, endpoint);
  if (!displayName || !Number.isFinite(chaosValue)) {
    return {
      supported: false,
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
      displayName,
      chaosValue,
      unsupportedReason: filter.unsupportedReason
    };
  }

  return {
    supported: true,
    providerType: type,
    providerId: row.detailsId || row.id,
    displayName,
    providerBaseType: normalizeName(row.baseType),
    variant: normalizeName(row.variant),
    chaosValue,
    formattedChaosValue: formatChaos(chaosValue),
    conditions: filter.conditions,
    matchPrecision: filter.matchPrecision
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
  normalizeName,
  normalizePoeNinjaEconomyRow
};
