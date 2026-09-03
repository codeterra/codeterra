const { createTradeQuery } = require('../domain/trade-query');
const { classifyError, formatErrorMessage } = require('./errors');

const USER_AGENT = 'OAuth poehelper-local/0.0.1 (contact: local-dev) Phase1ElectronPrototype';
const POE_NINJA_BASE_URL = 'https://poe.ninja/poe1/api/economy';
const TRADE_BASE_URL = 'https://www.pathofexile.com';
const CACHE_TTL_MS = 15 * 60 * 1000;

const overviewCache = new Map();
const pricingStats = {
  overviewCacheHits: 0,
  overviewCacheMisses: 0,
  lastOverviewFetch: undefined,
  lastTradeSearch: undefined,
  lastListingFetch: undefined
};

function normalizeName(value) {
  return String(value || '').trim().toLowerCase();
}

function getCachedOverview(key) {
  const entry = overviewCache.get(key);
  if (!entry) {
    return undefined;
  }

  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    overviewCache.delete(key);
    return undefined;
  }

  return entry.data;
}

function setCachedOverview(key, data) {
  overviewCache.set(key, {
    timestamp: Date.now(),
    data
  });
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
      ...(options.headers || {})
    }
  });

  const retryAfter = response.headers.get('retry-after');

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      message = body?.error?.message || message;
    } catch {
      // Keep the HTTP status text when the response body is not JSON.
    }

    const error = new Error(message);
    error.status = response.status;
    error.retryAfter = retryAfter ? Number(retryAfter) : undefined;
    throw error;
  }

  return response.json();
}

async function fetchPoeNinjaOverview(league, type, endpoint) {
  const cacheKey = `${endpoint}:${league}:${type}`;
  const cached = getCachedOverview(cacheKey);
  if (cached) {
    pricingStats.overviewCacheHits += 1;
    return cached;
  }

  pricingStats.overviewCacheMisses += 1;
  const params = new URLSearchParams({
    league,
    type,
    language: 'en'
  });
  const data = await fetchJson(`${POE_NINJA_BASE_URL}/${endpoint}?${params.toString()}`);
  setCachedOverview(cacheKey, data);
  pricingStats.lastOverviewFetch = {
    league,
    type,
    endpoint,
    rows: Array.isArray(data?.lines) ? data.lines.length : undefined,
    fetchedAt: new Date().toISOString()
  };
  return data;
}

function getPoeNinjaEndpoint(type) {
  if (type === 'Currency' || type === 'Fragment') {
    return 'stash/current/currency/overview';
  }

  if ([
    'DivinationCard',
    'Fossil',
    'Resonator',
    'Oil',
    'Scarab',
    'Essence',
    'DeliriumOrb',
    'Runegraft',
    'AllflameEmber',
    'Tattoo',
    'Omen',
    'Artifact'
  ].includes(type)) {
    return 'exchange/current/overview';
  }

  return 'stash/current/item/overview';
}

function getCandidateNinjaTypes(item) {
  if (!item.poeNinjaType) {
    return [];
  }

  if (item.poeNinjaType === 'Currency') {
    return ['Currency', 'Fragment'];
  }

  if (item.poeNinjaType === 'Fossil') {
    return ['Fossil', 'Resonator'];
  }

  if (item.category === 'unique') {
    return ['UniqueWeapon', 'UniqueArmour', 'UniqueAccessory', 'UniqueFlask', 'UniqueJewel', 'UniqueMap'];
  }

  return [item.poeNinjaType];
}

function findCurrencyLine(lines, item) {
  const target = normalizeName(item.name);
  return lines.find((line) => normalizeName(line.currencyTypeName) === target);
}

function getExchangeItemName(overview, line) {
  const item = getExchangeItemById(overview.core?.items, line.id)
    || getExchangeItemById(overview.items, line.id);
  return item?.name || line.currencyTypeName || line.name;
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

function findExchangeLine(overview, item) {
  const target = normalizeName(item.name);
  return (overview.lines || []).find((line) => normalizeName(getExchangeItemName(overview, line)) === target);
}

function findItemLine(lines, item) {
  const target = normalizeName(item.name);
  const baseType = normalizeName(item.baseType);

  return lines.find((line) => {
    if (normalizeName(line.name) !== target) {
      return false;
    }

    if (baseType && line.baseType && normalizeName(line.baseType) !== baseType) {
      return false;
    }

    return rowMatchesCopiedItemVariant(line, item);
  });
}

function rowMatchesCopiedItemVariant(line, item) {
  const variantChecks = [
    ['gemLevel', 'gemLevel', 'exact'],
    ['gemQuality', 'qualityValue', 'exact'],
    ['quality', 'qualityValue', 'minimum'],
    ['links', 'linkedSockets', 'minimum']
  ];

  for (const [lineKey, itemKey, mode] of variantChecks) {
    const providerValue = normalizePositiveNumber(line[lineKey]);
    if (providerValue === undefined) {
      continue;
    }

    const itemValue = normalizePositiveNumber(item[itemKey]);
    if (itemValue === undefined) {
      return false;
    }

    if (mode === 'exact' && itemValue !== providerValue) {
      return false;
    }

    if (mode === 'minimum' && itemValue < providerValue) {
      return false;
    }
  }

  if (typeof line.corrupted === 'boolean' && Boolean(item.corrupted) !== line.corrupted) {
    return false;
  }

  return true;
}

function normalizePositiveNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
}

function formatNinjaResult(line, type, endpoint) {
  if (endpoint.includes('currency/overview')) {
    return {
      source: 'poe.ninja',
      kind: type,
      label: line.currencyTypeName,
      chaosValue: line.chaosEquivalent,
      divineValue: undefined,
      count: line.receive?.count || line.pay?.count,
      listingCount: line.receive?.listing_count || line.pay?.listing_count,
      confidence: line.lowConfidence ? 'low' : 'normal',
      sparkline: normalizeSparkline(line.receiveSparkLine || line.paySparkLine)
    };
  }

  if (endpoint.includes('exchange/')) {
    return {
      source: 'poe.ninja',
      kind: type,
      label: line.displayName || line.currencyTypeName || line.name || line.id,
      chaosValue: line.primaryValue,
      divineValue: undefined,
      count: undefined,
      listingCount: undefined,
      confidence: line.lowConfidence ? 'low' : 'normal',
      sparkline: normalizeSparkline(line.sparkline)
    };
  }

  return {
    source: 'poe.ninja',
    kind: type,
    label: line.baseType ? `${line.name} ${line.baseType}` : line.name,
    chaosValue: line.chaosValue,
    divineValue: line.divineValue,
    count: line.count,
    listingCount: line.listingCount,
    confidence: line.lowConfidence ? 'low' : 'normal',
    sparkline: normalizeSparkline(line.sparkLine)
  };
}

function normalizeSparkline(sparkline) {
  if (!sparkline || !Array.isArray(sparkline.data)) {
    return undefined;
  }

  const data = sparkline.data
    .filter((value) => typeof value === 'number' && Number.isFinite(value))
    .map((value) => Math.round(value * 100) / 100);

  if (data.length < 2) {
    return undefined;
  }

  return {
    data,
    totalChange: typeof sparkline.totalChange === 'number'
      ? Math.round(sparkline.totalChange * 100) / 100
      : undefined
  };
}

async function getSummaryPrice(item, league) {
  if (!item.looksLikePoeItem) {
    return {
      status: 'skipped',
      message: 'Clipboard does not look like a Path of Exile item.'
    };
  }

  if (item.category === 'currency' && normalizeName(item.name) === 'chaos orb') {
    return {
      status: 'priced',
      result: {
        source: 'poe.ninja',
        kind: 'Currency',
        label: 'Chaos Orb',
        chaosValue: 1,
        divineValue: undefined,
        count: undefined,
        listingCount: undefined,
        confidence: 'reference',
        sparkline: undefined
      },
      cacheTtlSeconds: Math.round(CACHE_TTL_MS / 1000)
    };
  }

  const types = getCandidateNinjaTypes(item);
  if (types.length === 0) {
    return {
      status: 'unsupported',
      message: 'No summary pricing adapter for this item type yet.'
    };
  }

  const misses = [];
  for (const type of types) {
    const endpoint = getPoeNinjaEndpoint(type);
    try {
      const overview = await fetchPoeNinjaOverview(league, type, endpoint);
      const line = endpoint.includes('currency/overview')
        ? findCurrencyLine(overview.lines || [], item)
        : endpoint.includes('exchange/')
          ? findExchangeLine(overview, item)
          : findItemLine(overview.lines || [], item);

      if (line) {
        if (endpoint.includes('exchange/')) {
          line.displayName = getExchangeItemName(overview, line);
        }

        return {
          status: 'priced',
          result: formatNinjaResult(line, type, endpoint),
          cacheTtlSeconds: Math.round(CACHE_TTL_MS / 1000)
        };
      }

      misses.push(type);
    } catch (error) {
      const classified = classifyError(error);
      return {
        status: 'error',
        message: formatErrorMessage('Pricing request failed', error),
        errorKind: classified.kind
      };
    }
  }

  return {
    status: 'not-found',
    message: `No poe.ninja match in ${misses.join(', ')}.`
  };
}

async function createOfficialTradeSearch(item, league, queryOptions = {}) {
  if (!item.looksLikePoeItem) {
    return {
      status: 'skipped',
      message: 'Clipboard does not look like a Path of Exile item.'
    };
  }

  const query = createTradeQuery(item, queryOptions);
  const response = await fetchJson(`${TRADE_BASE_URL}/api/trade/search/${encodeURIComponent(league)}`, {
    method: 'POST',
    body: JSON.stringify(query)
  });
  pricingStats.lastTradeSearch = {
    item: item.searchLabel || item.name,
    category: item.category,
    league,
    total: response.total,
    resultCount: Array.isArray(response.result) ? response.result.length : undefined,
    searchedAt: new Date().toISOString(),
    query
  };

  if (!response.id) {
    return {
      status: 'error',
      message: 'Trade API response did not include a search id.',
      query
    };
  }

  return {
    status: 'ready',
    id: response.id,
    total: response.total,
    result: response.result || [],
    resultCount: Array.isArray(response.result) ? response.result.length : undefined,
    url: `${TRADE_BASE_URL}/trade/search/${encodeURIComponent(league)}/${response.id}`,
    query
  };
}

function isInstantBuyoutListing(listing) {
  const priceType = listing?.listing?.price?.type;
  return Boolean(listing?.listing?.price?.amount) && (priceType === '~b/o' || priceType === '~price');
}

function formatAge(indexed) {
  const indexedMs = Date.parse(indexed);
  if (!Number.isFinite(indexedMs)) {
    return undefined;
  }

  const minutes = Math.max(0, Math.round((Date.now() - indexedMs) / 60000));
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 48) {
    return `${hours}h`;
  }

  return `${Math.round(hours / 24)}d`;
}

function normalizeFetchedListing(entry) {
  const price = entry.listing?.price;
  const account = entry.listing?.account;
  return {
    id: entry.id,
    seller: account?.lastCharacterName || account?.name || 'Unknown seller',
    account: account?.name,
    online: account?.online?.league || account?.online?.status || undefined,
    amount: price?.amount,
    currency: price?.currency,
    priceType: price?.type,
    whisper: entry.listing?.whisper,
    indexed: entry.listing?.indexed,
    age: formatAge(entry.listing?.indexed)
  };
}

function createListingSummary(listings) {
  const chaosListings = listings.filter((listing) => listing.currency === 'chaos' && Number.isFinite(listing.amount));
  const source = chaosListings.length > 0 ? chaosListings : listings.filter((listing) => Number.isFinite(listing.amount));
  if (source.length === 0) {
    return undefined;
  }

  const amounts = source.map((listing) => listing.amount).sort((a, b) => a - b);
  const median = amounts[Math.floor(amounts.length / 2)];
  const min = amounts[0];
  const max = amounts[amounts.length - 1];
  const currency = source[0].currency;
  const lowerQuartile = amounts[Math.floor((amounts.length - 1) * 0.25)];
  const upperQuartile = amounts[Math.floor((amounts.length - 1) * 0.75)];
  const spreadRatio = median > 0 ? Math.round((max / median) * 100) / 100 : undefined;
  const undercutRatio = median > 0 ? Math.round((min / median) * 100) / 100 : undefined;
  const outlierCount = amounts.filter((amount) => (
    median > 0 && (amount >= median * 3 || amount <= median * 0.4)
  )).length;
  const warnings = [];

  if (amounts.length < 5) {
    warnings.push('Very low instant-buyout sample size.');
  } else if (amounts.length < 10) {
    warnings.push('Low instant-buyout sample size.');
  }

  if (spreadRatio !== undefined && spreadRatio >= 4) {
    warnings.push('Very wide listing spread; verify manually before pricing.');
  } else if (spreadRatio !== undefined && spreadRatio >= 2.5) {
    warnings.push('Wide listing spread; estimate is directional.');
  }

  if (outlierCount > 0) {
    warnings.push(`${outlierCount} likely listing outlier${outlierCount === 1 ? '' : 's'} in fetched results.`);
  }

  return {
    count: source.length,
    currency,
    min,
    median,
    max,
    lowerQuartile,
    upperQuartile,
    spreadRatio,
    undercutRatio,
    outlierCount,
    confidence: warnings.length > 0 ? 'low' : 'normal',
    warnings
  };
}

function chunkItems(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

async function getInstantBuyoutListings(item, league, queryOptions = {}, limit = 20) {
  const search = await createOfficialTradeSearch(item, league, queryOptions);
  if (search.status !== 'ready') {
    return search;
  }

  const ids = (search.result || []).slice(0, Math.max(limit * 4, 40));
  if (ids.length === 0) {
    return {
      status: 'ready',
      id: search.id,
      total: search.total,
      url: search.url,
      listings: [],
      summary: undefined,
      message: 'No trade results returned.'
    };
  }

  const listings = [];
  for (const chunk of chunkItems(ids, 10)) {
    const params = new URLSearchParams({
      query: search.id,
      realm: 'pc'
    });
    const response = await fetchJson(`${TRADE_BASE_URL}/api/trade/fetch/${chunk.join(',')}?${params.toString()}`);
    listings.push(
      ...(response.result || [])
        .filter(isInstantBuyoutListing)
        .map(normalizeFetchedListing)
    );

    if (listings.length >= limit) {
      break;
    }
  }

  const limitedListings = listings.slice(0, limit);
  const summary = createListingSummary(limitedListings);
  pricingStats.lastListingFetch = {
    item: item.searchLabel || item.name,
    category: item.category,
    league,
    searchId: search.id,
    total: search.total,
    fetched: limitedListings.length,
    requestedLimit: limit,
    summary,
    fetchedAt: new Date().toISOString()
  };

  return {
    status: 'ready',
    id: search.id,
    total: search.total,
    url: search.url,
    listings: limitedListings,
    summary
  };
}

function getPricingDiagnostics() {
  return {
    cacheTtlSeconds: Math.round(CACHE_TTL_MS / 1000),
    overviewCacheSize: overviewCache.size,
    overviewCacheHits: pricingStats.overviewCacheHits,
    overviewCacheMisses: pricingStats.overviewCacheMisses,
    lastOverviewFetch: pricingStats.lastOverviewFetch,
    lastTradeSearch: pricingStats.lastTradeSearch,
    lastListingFetch: pricingStats.lastListingFetch
  };
}

module.exports = {
  getSummaryPrice,
  createOfficialTradeSearch,
  getInstantBuyoutListings,
  createTradeQuery,
  fetchPoeNinjaOverview,
  getPoeNinjaEndpoint,
  getExchangeItemName,
  getPricingDiagnostics,
  createListingSummary,
  findItemLine,
  USER_AGENT
};
