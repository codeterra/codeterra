const { normalizeStatText } = require('../domain/item-intelligence');

const TRADE_STATS_URL = 'https://www.pathofexile.com/api/trade/data/stats';
const USER_AGENT = 'OAuth poehelper-local/0.0.1 (contact: local-dev) Phase2ElectronPrototype';
const STATS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let statCatalogCache;

async function fetchTradeStats() {
  if (statCatalogCache && Date.now() - statCatalogCache.timestamp < STATS_CACHE_TTL_MS) {
    return statCatalogCache.entries;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  const response = await fetch(TRADE_STATS_URL, {
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT
    }
  }).finally(() => clearTimeout(timeoutId));

  if (!response.ok) {
    const error = new Error(`${response.status} ${response.statusText}`);
    error.status = response.status;
    throw error;
  }

  const body = await response.json();
  const entries = [];

  for (const group of body.result || []) {
    for (const entry of group.entries || []) {
      entries.push({
        id: entry.id,
        text: entry.text,
        type: entry.type,
        group: group.label,
        normalized: normalizeStatText(entry.text)
      });
    }
  }

  statCatalogCache = {
    timestamp: Date.now(),
    entries
  };

  return entries;
}

function scoreStatMatch(modifier, stat) {
  if (!modifier.normalized || !stat.normalized) {
    return 0;
  }

  if (modifier.normalized === stat.normalized) {
    return 100;
  }

  const modifierWords = new Set(modifier.normalized.split(/\s+/).filter((word) => word.length > 2 && word !== '#'));
  const statWords = new Set(stat.normalized.split(/\s+/).filter((word) => word.length > 2 && word !== '#'));
  const shared = [...modifierWords].filter((word) => statWords.has(word));

  if (shared.length === 0) {
    return 0;
  }

  const coverage = shared.length / Math.max(modifierWords.size, statWords.size);
  const sameTypeBoost = modifier.type === stat.type ? 10 : 0;
  return Math.round(coverage * 70) + sameTypeBoost;
}

function chooseBestMatch(modifier, catalog) {
  let best;

  for (const stat of catalog) {
    const score = scoreStatMatch(modifier, stat);
    const sameType = modifier.type === stat.type;
    const bestSameType = modifier.type === best?.type;
    if (!best || score > best.score || (score === best.score && sameType && !bestSameType)) {
      best = { ...stat, score };
    }
  }

  if (!best || best.score < 72) {
    return undefined;
  }

  return best;
}

async function matchTradeStats(item) {
  if (!item?.modifiers?.length) {
    return item;
  }

  const catalog = await fetchTradeStats();
  const modifiers = item.modifiers.map((modifier) => {
    const match = chooseBestMatch(modifier, catalog);
    if (!match) {
      return modifier;
    }

    return {
      ...modifier,
      tradeStatId: match.id,
      tradeStatText: match.text,
      tradeStatType: match.type,
      tradeStatScore: match.score
    };
  });

  return {
    ...item,
    modifiers
  };
}

module.exports = {
  fetchTradeStats,
  matchTradeStats
};
