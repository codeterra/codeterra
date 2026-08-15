const RARITY_OPTIONS = {
  Normal: 'normal',
  Magic: 'magic',
  Rare: 'rare',
  Unique: 'unique',
  Gem: 'gem',
  Currency: 'currency',
  'Divination Card': 'divination'
};

const DEFAULT_TRADE_STATUS = 'securable';

function createFilterGroup() {
  return {
    type_filters: { filters: {} },
    misc_filters: { filters: {} },
    map_filters: { filters: {} },
    socket_filters: { filters: {} },
    influence_filters: { filters: {} },
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
    status: { option: options.tradeStatus || DEFAULT_TRADE_STATUS },
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

  if (Number.isFinite(item.gemLevel) && options.includeGemLevel !== false) {
    filters.misc_filters.filters.gem_level = {
      min: item.gemLevel,
      max: item.gemLevel
    };
  }

  if (Number.isFinite(item.qualityValue) && item.qualityValue > 0 && options.includeQuality !== false) {
    filters.misc_filters.filters.quality = {
      min: item.qualityValue
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

  if (item.mirrored && options.includeMirrored !== false) {
    filters.misc_filters.filters.mirrored = { option: 'true' };
  }

  if (item.fractured && options.includeFractured !== false) {
    filters.misc_filters.filters.fractured_item = { option: 'true' };
  }

  if (item.synthesised && options.includeSynthesised !== false) {
    filters.misc_filters.filters.synthesised_item = { option: 'true' };
  }

  if (Number.isFinite(item.linkedSockets) && item.linkedSockets >= 5 && options.includeLinkedSockets !== false) {
    filters.socket_filters.filters.links = {
      min: item.linkedSockets
    };
  } else if (Number.isFinite(item.socketCount) && item.socketCount >= 6 && options.includeSockets !== false) {
    filters.socket_filters.filters.sockets = {
      min: item.socketCount
    };
  }

  for (const influence of item.influences || []) {
    if (options.includeInfluence === false) {
      break;
    }
    const filterKey = `${influence}_item`;
    filters.influence_filters.filters[filterKey] = { option: 'true' };
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
  DEFAULT_TRADE_STATUS,
  createTradeQuery
};
