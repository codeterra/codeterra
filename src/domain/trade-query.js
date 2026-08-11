const RARITY_OPTIONS = {
  Normal: 'normal',
  Magic: 'magic',
  Rare: 'rare',
  Unique: 'unique',
  Gem: 'gem',
  Currency: 'currency',
  'Divination Card': 'divination'
};

function createFilterGroup() {
  return {
    type_filters: { filters: {} },
    misc_filters: { filters: {} },
    map_filters: { filters: {} },
    trade_filters: { filters: {} }
  };
}

function compactFilters(filters) {
  const compacted = {};

  for (const [groupName, group] of Object.entries(filters)) {
    if (Object.keys(group.filters).length > 0) {
      compacted[groupName] = group;
    }
  }

  return compacted;
}

function getModifierFilter(modifier, options) {
  if (!modifier.tradeStatId) {
    return undefined;
  }

  const value = Number(modifier.value);
  const filter = {
    id: modifier.tradeStatId
  };

  if (Number.isFinite(value) && options?.useModifierValues !== false) {
    const tolerance = Math.max(1, Math.round(Math.abs(value) * (options?.modifierTolerance ?? 0.15)));
    filter.value = {
      min: Math.max(0, Math.round((value - tolerance) * 10) / 10)
    };
  }

  return filter;
}

function getSelectedStatFilters(item, options = {}) {
  const selectedIds = new Set(options.selectedModifierIds || []);
  if (selectedIds.size === 0) {
    return [];
  }

  return (item.modifiers || [])
    .filter((modifier) => selectedIds.has(modifier.id))
    .map((modifier) => getModifierFilter(modifier, options))
    .filter(Boolean);
}

function createTradeQuery(item, options = {}) {
  const filters = createFilterGroup();
  const statFilters = getSelectedStatFilters(item, options);
  const query = {
    status: { option: 'online' },
    stats: [{ type: 'and', filters: statFilters }]
  };

  filters.trade_filters.filters.sale_type = {
    option: options.saleType || 'priced'
  };

  if (item.rarity && RARITY_OPTIONS[item.rarity]) {
    filters.type_filters.filters.rarity = { option: RARITY_OPTIONS[item.rarity] };
  }

  if (item.category?.startsWith('unique')) {
    query.name = item.name;
    if (item.baseType) {
      query.type = item.baseType;
    }
  } else if (item.category === 'currency' || item.category === 'divination-card' || item.category === 'gem') {
    query.type = item.name;
  } else if (item.baseType) {
    query.type = item.baseType;
  } else if (item.name && item.looksLikePoeItem) {
    query.type = item.name;
  }

  if (item.itemLevel && options.includeItemLevel !== false) {
    filters.misc_filters.filters.ilvl = {
      min: Math.max(1, item.itemLevel - 2)
    };
  }

  if (item.mapTier && options.includeMapTier !== false) {
    filters.map_filters.filters.map_tier = {
      min: item.mapTier,
      max: item.mapTier
    };
  }

  if (item.corrupted && options.includeCorrupted !== false) {
    filters.misc_filters.filters.corrupted = { option: 'true' };
  }

  if (item.unidentified && options.includeIdentified !== false) {
    filters.misc_filters.filters.identified = { option: 'false' };
  }

  const compactedFilters = compactFilters(filters);
  if (Object.keys(compactedFilters).length > 0) {
    query.filters = compactedFilters;
  }

  return {
    query,
    sort: { price: 'asc' }
  };
}

module.exports = {
  createTradeQuery
};
