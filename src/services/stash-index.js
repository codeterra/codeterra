const fs = require('node:fs');
const path = require('node:path');
const { classifyItem, getPoeNinjaType } = require('../domain/item-parser');

const CACHE_SCHEMA_VERSION = 1;
const FRAME_RARITY = new Map([
  [0, 'Normal'],
  [1, 'Magic'],
  [2, 'Rare'],
  [3, 'Unique'],
  [4, 'Gem'],
  [5, 'Currency'],
  [6, 'Divination Card']
]);

function getAccountCacheDir(userDataPath) {
  return path.join(userDataPath, 'account-cache');
}

function getStashIndexPath(userDataPath, league) {
  return path.join(getAccountCacheDir(userDataPath), `${sanitizeFilePart(league || 'Standard')}-stash-index.json`);
}

function readStashIndex(userDataPath, league) {
  try {
    return normalizeStashIndex(JSON.parse(fs.readFileSync(getStashIndexPath(userDataPath, league), 'utf8')));
  } catch {
    return createEmptyStashIndex(league);
  }
}

function writeStashIndex(userDataPath, index) {
  const normalized = normalizeStashIndex(index);
  const filePath = getStashIndexPath(userDataPath, normalized.league);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  return normalized;
}

function createEmptyStashIndex(league = 'Standard') {
  return {
    schemaVersion: CACHE_SCHEMA_VERSION,
    league,
    accountName: undefined,
    indexedAt: undefined,
    pricedAt: undefined,
    tabs: [],
    items: [],
    characters: [],
    itemValues: {},
    reports: createReports([])
  };
}

function normalizeStashIndex(index) {
  const source = index && typeof index === 'object' ? index : {};
  const items = Array.isArray(source.items) ? source.items.map(normalizeIndexedItem).filter(Boolean) : [];
  return {
    schemaVersion: CACHE_SCHEMA_VERSION,
    league: String(source.league || 'Standard'),
    accountName: source.accountName ? String(source.accountName) : undefined,
    indexedAt: source.indexedAt ? String(source.indexedAt) : undefined,
    pricedAt: source.pricedAt ? String(source.pricedAt) : undefined,
    tabs: Array.isArray(source.tabs) ? source.tabs.map(normalizeIndexedTab) : [],
    items,
    characters: Array.isArray(source.characters) ? source.characters.map(normalizeCharacterSummary) : [],
    itemValues: source.itemValues && typeof source.itemValues === 'object' ? source.itemValues : {},
    reports: source.reports && typeof source.reports === 'object' ? source.reports : createReports(items)
  };
}

function normalizeIndexedTab(tab = {}) {
  return {
    id: tab.id ? String(tab.id) : undefined,
    index: Number.isFinite(Number(tab.index)) ? Number(tab.index) : undefined,
    name: String(tab.name || tab.n || `Tab ${Number(tab.index || 0) + 1}`),
    type: String(tab.type || tab.typeLine || tab.t || 'Unknown'),
    colour: normalizeColour(tab.colour || tab.color || tab.metadata?.colour),
    hidden: Boolean(tab.hidden),
    folder: Boolean(tab.folder || tab.metadata?.folder),
    parent: tab.parent ? String(tab.parent) : undefined
  };
}

function normalizeCharacterSummary(character = {}) {
  return {
    name: String(character.name || ''),
    league: character.league ? String(character.league) : undefined,
    class: character.class ? String(character.class) : undefined,
    level: Number.isFinite(Number(character.level)) ? Number(character.level) : undefined,
    main: Boolean(character.lastActive)
  };
}

function normalizeIndexedItem(item = {}) {
  if (!item.id && !item.name && !item.baseType) {
    return undefined;
  }

  const stackSize = normalizeNumber(item.stackSize, 1) || 1;
  const category = item.category || classifyItem({
    rarity: item.rarity,
    itemClass: item.itemClass,
    name: item.name || item.baseType
  });

  return {
    id: String(item.id || `${item.tabIndex || 0}:${item.x || 0}:${item.y || 0}:${item.name || item.baseType}`),
    itemKey: String(item.itemKey || createItemKey(item)),
    name: String(item.name || item.baseType || 'Unknown item'),
    baseType: item.baseType ? String(item.baseType) : undefined,
    searchLabel: String(item.searchLabel || item.name || item.baseType || 'Unknown item'),
    rarity: item.rarity ? String(item.rarity) : undefined,
    itemClass: item.itemClass ? String(item.itemClass) : undefined,
    category,
    poeNinjaType: item.poeNinjaType || getPoeNinjaType(category, item.itemClass),
    itemLevel: normalizeNumber(item.itemLevel),
    mapTier: normalizeNumber(item.mapTier),
    gemLevel: normalizeNumber(item.gemLevel),
    qualityValue: normalizeNumber(item.qualityValue),
    stackSize,
    sockets: normalizeNumber(item.sockets),
    linkedSockets: normalizeNumber(item.linkedSockets),
    corrupted: Boolean(item.corrupted),
    identified: item.identified !== false,
    fractured: Boolean(item.fractured),
    synthesised: Boolean(item.synthesised),
    influences: Array.isArray(item.influences) ? item.influences.map(String) : [],
    tabId: item.tabId ? String(item.tabId) : undefined,
    tabName: item.tabName ? String(item.tabName) : undefined,
    tabIndex: normalizeNumber(item.tabIndex),
    x: normalizeNumber(item.x),
    y: normalizeNumber(item.y),
    chaosValue: normalizeNumber(item.chaosValue),
    totalChaosValue: normalizeNumber(item.totalChaosValue)
  };
}

function buildStashIndex({ accountName, league, tabsPayload, tabPayloads, characters, existing }) {
  const tabs = normalizeTabs(tabsPayload);
  const tabByIndex = new Map(tabs.map((tab) => [tab.index, tab]));
  const items = [];

  for (const payload of tabPayloads || []) {
    const tabIndex = Number(payload.tabIndex);
    const tab = tabByIndex.get(tabIndex) || { index: tabIndex, name: `Tab ${tabIndex + 1}` };
    for (const rawItem of payload.items || []) {
      items.push(normalizeRawStashItem(rawItem, tab));
    }
  }

  const itemValues = existing?.itemValues && typeof existing.itemValues === 'object' ? existing.itemValues : {};
  const indexed = normalizeStashIndex({
    schemaVersion: CACHE_SCHEMA_VERSION,
    league,
    accountName,
    indexedAt: new Date().toISOString(),
    pricedAt: existing?.pricedAt,
    tabs,
    characters: Array.isArray(characters) ? characters.map(normalizeCharacterSummary) : existing?.characters || [],
    items: applyValueCache(items, itemValues),
    itemValues
  });
  indexed.reports = createReports(indexed.items, indexed);
  return indexed;
}

function normalizeTabs(payload = {}) {
  return flattenTabs(payload.tabs || payload.stashes || [])
    .map((tab, fallbackIndex) => normalizeIndexedTab({
      id: tab.id,
      index: Number.isFinite(Number(tab.i)) ? Number(tab.i) : Number.isFinite(Number(tab.index)) ? Number(tab.index) : fallbackIndex,
      name: tab.n || tab.name,
      type: tab.type || tab.t,
      colour: tab.colour || tab.color,
      hidden: tab.hidden,
      folder: tab.folder,
      metadata: tab.metadata,
      parent: tab.parent
    }))
    .filter((tab) => !tab.hidden && !tab.folder);
}

function flattenTabs(tabs = []) {
  return tabs.flatMap((tab) => {
    if (Array.isArray(tab.children) && tab.children.length > 0) {
      return tab.children.map((child) => ({
        ...child,
        parent: child.parent || tab.id
      }));
    }
    return tab;
  });
}

function normalizeRawStashItem(rawItem, tab) {
  const rarity = FRAME_RARITY.get(Number(rawItem.frameType)) || rawItem.rarity || undefined;
  const itemClass = rawItem.type || rawItem.itemClass || rawItem.category?.items?.[0] || inferItemClass(rawItem);
  const baseType = rawItem.typeLine || rawItem.baseType || rawItem.name;
  const name = normalizeRawName(rawItem, rarity, baseType);
  const category = classifyItem({ rarity, itemClass, name });
  const sockets = Array.isArray(rawItem.sockets) ? rawItem.sockets.length : undefined;
  const linkedSockets = getLinkedSockets(rawItem.sockets);
  const qualityValue = getPropertyValue(rawItem.properties, 'Quality');
  const gemLevel = getPropertyValue(rawItem.properties, 'Level');
  const mapTier = getPropertyValue(rawItem.properties, 'Map Tier');
  const stackSize = Number(rawItem.stackSize || rawItem.stack || 1);
  const item = {
    id: rawItem.id,
    name,
    baseType,
    searchLabel: baseType && name !== baseType ? `${name} ${baseType}` : name,
    rarity,
    itemClass,
    category,
    poeNinjaType: inferPoeNinjaType(rawItem, category, itemClass),
    itemLevel: rawItem.ilvl,
    mapTier,
    gemLevel,
    qualityValue,
    stackSize: Number.isFinite(stackSize) && stackSize > 0 ? stackSize : 1,
    sockets,
    linkedSockets,
    corrupted: Boolean(rawItem.corrupted),
    identified: rawItem.identified !== false,
    fractured: Boolean(rawItem.fractured),
    synthesised: Boolean(rawItem.synthesised),
    influences: normalizeInfluences(rawItem.influences),
    tabId: tab.id,
    tabName: tab.name,
    tabIndex: tab.index,
    x: rawItem.x,
    y: rawItem.y
  };
  item.itemKey = createItemKey(item);
  return normalizeIndexedItem(item);
}

function inferItemClass(rawItem = {}) {
  const category = rawItem.category && typeof rawItem.category === 'object' ? rawItem.category : {};
  const keys = Object.keys(category);
  const typeLine = String(rawItem.typeLine || '');
  if (keys.includes('currency')) return 'Stackable Currency';
  if (keys.includes('cards')) return 'Divination Cards';
  if (keys.includes('gems')) return 'Skill Gems';
  if (keys.includes('maps')) return 'Maps';
  if (keys.includes('jewels')) return 'Jewels';
  if (keys.includes('flasks')) return 'Flasks';
  if (keys.includes('accessories')) {
    if (/ring/i.test(typeLine)) return 'Rings';
    if (/amulet/i.test(typeLine)) return 'Amulets';
    if (/belt/i.test(typeLine)) return 'Belts';
    if (/quiver/i.test(typeLine)) return 'Quivers';
    return 'Rings';
  }
  if (keys.includes('weapons')) return 'Wands';
  if (keys.includes('armour')) {
    if (/shield|buckler|spirit shield/i.test(typeLine)) return 'Shields';
    if (/boots|greaves|slippers|treads/i.test(typeLine)) return 'Boots';
    if (/gloves|gauntlets|mitts/i.test(typeLine)) return 'Gloves';
    if (/helmet|helm|crown|circlet|mask|hood|cap/i.test(typeLine)) return 'Helmets';
    return 'Body Armours';
  }
  return undefined;
}

function inferPoeNinjaType(rawItem, category, itemClass) {
  const type = getPoeNinjaType(category, itemClass);
  if (type) {
    return type;
  }

  const rawCategory = rawItem.category && typeof rawItem.category === 'object' ? rawItem.category : {};
  if (rawItem.frameType === 3 || category === 'unique') {
    if (rawCategory.weapons) return 'UniqueWeapon';
    if (rawCategory.armour) return 'UniqueArmour';
    if (rawCategory.accessories) return 'UniqueAccessory';
    if (rawCategory.flasks) return 'UniqueFlask';
    if (rawCategory.jewels) return 'UniqueJewel';
    if (rawCategory.maps) return 'UniqueMap';
  }
  return undefined;
}

function normalizeRawName(rawItem, rarity, baseType) {
  const rawName = String(rawItem.name || '').replace(/<<[^>]+>>/g, '').trim();
  if (rawName && rarity !== 'Currency' && rarity !== 'Gem' && rarity !== 'Divination Card') {
    return rawName;
  }
  return String(baseType || rawName || 'Unknown item').trim();
}

function getPropertyValue(properties = [], propertyName) {
  const property = (properties || []).find((entry) => String(entry.name || '').toLowerCase() === propertyName.toLowerCase());
  const raw = Array.isArray(property?.values) ? property.values[0]?.[0] : undefined;
  const match = String(raw || '').match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

function getLinkedSockets(sockets = []) {
  if (!Array.isArray(sockets) || sockets.length === 0) {
    return undefined;
  }
  const groups = new Map();
  for (const socket of sockets) {
    const group = Number(socket.group || 0);
    groups.set(group, (groups.get(group) || 0) + 1);
  }
  return Math.max(...groups.values());
}

function normalizeInfluences(influences = {}) {
  if (!influences || typeof influences !== 'object') {
    return [];
  }
  return Object.entries(influences)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([name]) => name);
}

function createItemKey(item = {}) {
  return [
    normalizeKey(item.category),
    normalizeKey(item.rarity),
    normalizeKey(item.name || item.baseType),
    normalizeKey(item.baseType),
    item.gemLevel || '',
    item.qualityValue || '',
    item.corrupted ? 'corrupted' : '',
    item.linkedSockets || ''
  ].join('|');
}

function normalizeKey(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeColour(value) {
  if (!value) {
    return undefined;
  }
  if (typeof value === 'string') {
    return value.replace(/^#/, '');
  }
  if (typeof value === 'object') {
    return [value.r, value.g, value.b]
      .map((part) => Number(part || 0).toString(16).padStart(2, '0'))
      .join('');
  }
  return undefined;
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function applyValueCache(items, itemValues) {
  return items.map((item) => {
    const value = itemValues[item.itemKey];
    const chaosValue = normalizeNumber(value?.chaosValue);
    return chaosValue === undefined
      ? item
      : {
          ...item,
          chaosValue,
          totalChaosValue: Math.round(chaosValue * (item.stackSize || 1) * 100) / 100
        };
  });
}

function getPriceTargets(index, limit = 120) {
  const seen = new Set();
  const targets = [];
  const unsupported = new Set(['rare', 'magic', 'normal', 'unknown']);
  for (const item of index.items || []) {
    if (unsupported.has(item.category) || !item.poeNinjaType || seen.has(item.itemKey)) {
      continue;
    }
    seen.add(item.itemKey);
    targets.push(itemToPricingTarget(item));
    if (targets.length >= limit) {
      break;
    }
  }
  return targets;
}

function itemToPricingTarget(item) {
  return {
    itemKey: item.itemKey,
    looksLikePoeItem: true,
    name: item.name,
    baseType: item.baseType,
    rarity: item.rarity,
    itemClass: item.itemClass,
    itemLevel: item.itemLevel,
    mapTier: item.mapTier,
    gemLevel: item.gemLevel,
    qualityValue: item.qualityValue,
    linkedSockets: item.linkedSockets,
    corrupted: item.corrupted,
    category: item.category,
    poeNinjaType: item.poeNinjaType,
    searchLabel: item.searchLabel
  };
}

function applyPricingResults(index, priceResults = []) {
  const itemValues = {
    ...(index.itemValues || {})
  };

  for (const result of priceResults) {
    if (result?.itemKey && Number.isFinite(result.chaosValue)) {
      itemValues[result.itemKey] = {
        chaosValue: result.chaosValue,
        label: result.label,
        pricedAt: result.pricedAt || new Date().toISOString()
      };
    }
  }

  const priced = normalizeStashIndex({
    ...index,
    pricedAt: new Date().toISOString(),
    itemValues,
    items: applyValueCache(index.items || [], itemValues)
  });
  priced.reports = createReports(priced.items, priced);
  return priced;
}

function searchStashIndex(index, query = {}) {
  const text = normalizeKey(query.text);
  const category = normalizeKey(query.category);
  const rarity = normalizeKey(query.rarity);
  const minChaos = normalizeNumber(query.minChaos);
  const limit = Math.min(500, Math.max(1, normalizeNumber(query.limit, 100)));
  const items = (index.items || []).filter((item) => {
    if (text && ![
      item.name,
      item.baseType,
      item.itemClass,
      item.category,
      item.tabName
    ].some((part) => normalizeKey(part).includes(text))) {
      return false;
    }
    if (category && normalizeKey(item.category) !== category) return false;
    if (rarity && normalizeKey(item.rarity) !== rarity) return false;
    if (minChaos !== undefined && (item.totalChaosValue || item.chaosValue || 0) < minChaos) return false;
    return true;
  });
  return items
    .sort((a, b) => (b.totalChaosValue || b.chaosValue || 0) - (a.totalChaosValue || a.chaosValue || 0))
    .slice(0, limit);
}

function createReports(items = [], index = {}) {
  const summary = summarizeItems(items);
  const duplicates = findDuplicates(items).slice(0, 80);
  const worthSelling = items
    .filter((item) => (item.totalChaosValue || item.chaosValue || 0) >= 50)
    .sort((a, b) => (b.totalChaosValue || b.chaosValue || 0) - (a.totalChaosValue || a.chaosValue || 0))
    .slice(0, 120);

  return {
    summary,
    duplicates,
    worthSelling,
    stale: index.pricedAt ? Date.now() - Date.parse(index.pricedAt) > 12 * 60 * 60 * 1000 : true
  };
}

function summarizeItems(items = []) {
  const byCategory = {};
  const byRarity = {};
  const byTab = {};
  let totalChaosValue = 0;

  for (const item of items) {
    addSummary(byCategory, item.category || 'unknown', item.stackSize || 1, item.totalChaosValue || 0);
    addSummary(byRarity, item.rarity || 'Unknown', item.stackSize || 1, item.totalChaosValue || 0);
    addSummary(byTab, item.tabName || 'Unknown tab', 1, item.totalChaosValue || 0);
    totalChaosValue += item.totalChaosValue || 0;
  }

  return {
    itemCount: items.length,
    stackCount: items.reduce((total, item) => total + (item.stackSize || 1), 0),
    totalChaosValue: Math.round(totalChaosValue * 100) / 100,
    byCategory,
    byRarity,
    byTab
  };
}

function addSummary(target, key, count, chaosValue) {
  target[key] ||= { count: 0, chaosValue: 0 };
  target[key].count += count;
  target[key].chaosValue = Math.round((target[key].chaosValue + chaosValue) * 100) / 100;
}

function findDuplicates(items = []) {
  const groups = new Map();
  for (const item of items) {
    if (['currency', 'divination-card'].includes(item.category)) {
      continue;
    }
    const key = [item.category, item.name, item.baseType, item.gemLevel, item.qualityValue].map(normalizeKey).join('|');
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
  }

  return [...groups.values()]
    .filter((group) => group.length > 1)
    .map((group) => ({
      label: group[0].searchLabel,
      count: group.length,
      tabs: [...new Set(group.map((item) => item.tabName).filter(Boolean))],
      chaosValue: Math.round(group.reduce((total, item) => total + (item.totalChaosValue || item.chaosValue || 0), 0) * 100) / 100
    }))
    .sort((a, b) => b.count - a.count || b.chaosValue - a.chaosValue);
}

function findOwnedItems(index, copiedItem, limit = 20) {
  if (!copiedItem?.looksLikePoeItem) {
    return { count: 0, matches: [] };
  }
  const matches = (index.items || []).filter((item) => itemMatchesCopiedItem(item, copiedItem));
  return {
    count: matches.reduce((total, item) => total + (item.stackSize || 1), 0),
    matches: matches.slice(0, limit)
  };
}

function compareShoppingList(index, text) {
  const lines = String(text || '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 250);

  return lines.map((line) => {
    const owned = findOwnedItems(index, {
      looksLikePoeItem: true,
      name: line,
      baseType: line,
      category: undefined
    }, 8);
    return {
      name: line,
      owned: owned.count > 0,
      count: owned.count,
      tabs: [...new Set(owned.matches.map((item) => item.tabName).filter(Boolean))]
    };
  });
}

function itemMatchesCopiedItem(stashItem, copiedItem) {
  const copiedName = normalizeKey(copiedItem.name);
  const copiedBase = normalizeKey(copiedItem.baseType);
  const stashName = normalizeKey(stashItem.name);
  const stashBase = normalizeKey(stashItem.baseType);

  if (copiedItem.category === 'currency' || copiedItem.category === 'divination-card' || copiedItem.category === 'gem') {
    return stashName === copiedName || stashBase === copiedName;
  }

  if (copiedItem.rarity === 'Unique') {
    return stashName === copiedName && (!copiedBase || stashBase === copiedBase);
  }

  if (copiedBase) {
    return stashBase === copiedBase;
  }

  return stashName === copiedName || stashBase === copiedName;
}

function createPublicStashState(index, query = {}) {
  const normalized = normalizeStashIndex(index);
  return {
    league: normalized.league,
    accountName: normalized.accountName,
    indexedAt: normalized.indexedAt,
    pricedAt: normalized.pricedAt,
    tabCount: normalized.tabs.length,
    itemCount: normalized.items.length,
    characters: normalized.characters,
    tabs: normalized.tabs.slice(0, 250),
    reports: normalized.reports,
    results: searchStashIndex(normalized, query)
  };
}

function sanitizeFilePart(value) {
  return String(value || 'cache').replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '') || 'cache';
}

module.exports = {
  applyPricingResults,
  buildStashIndex,
  compareShoppingList,
  createEmptyStashIndex,
  createPublicStashState,
  findOwnedItems,
  getPriceTargets,
  getStashIndexPath,
  itemToPricingTarget,
  readStashIndex,
  searchStashIndex,
  writeStashIndex
};
