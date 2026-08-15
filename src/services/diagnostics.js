const MAX_EVENTS = 40;
const MAX_TEXT_LENGTH = 8000;

const state = {
  events: [],
  lastCopiedText: '',
  lastParsedItem: undefined,
  lastApiError: undefined,
  lastLookup: undefined,
  lastLootFilterWrite: undefined
};
const diagnosticProviders = new Map();

function recordEvent(type, details = {}) {
  state.events.unshift({
    at: new Date().toISOString(),
    type,
    ...sanitize(details)
  });

  if (state.events.length > MAX_EVENTS) {
    state.events.length = MAX_EVENTS;
  }
}

function recordCopiedText(text) {
  state.lastCopiedText = truncate(String(text || ''), MAX_TEXT_LENGTH);
  recordEvent('clipboard-read', {
    characters: state.lastCopiedText.length,
    lines: state.lastCopiedText ? state.lastCopiedText.split(/\r\n|\r|\n/).length : 0
  });
}

function recordParsedItem(item) {
  state.lastParsedItem = summarizeItem(item);
  recordEvent('item-parsed', state.lastParsedItem);
}

function recordLookup(details) {
  state.lastLookup = sanitize(details);
  recordEvent('lookup', state.lastLookup);
}

function recordLootFilterWrite(details) {
  state.lastLootFilterWrite = sanitize(details);
  recordEvent('loot-filter-written', state.lastLootFilterWrite);
}

function recordApiError(source, error, classified) {
  state.lastApiError = sanitize({
    source,
    kind: classified?.kind,
    message: classified?.message || error?.message || 'Unknown error',
    status: error?.status,
    retryAfter: error?.retryAfter
  });
  recordEvent('api-error', state.lastApiError);
}

function getDiagnostics() {
  const providerDiagnostics = {};
  for (const [id, provider] of diagnosticProviders.entries()) {
    try {
      providerDiagnostics[id] = sanitize(provider());
    } catch (error) {
      providerDiagnostics[id] = { error: error.message || String(error) };
    }
  }

  return {
    ...state,
    events: [...state.events],
    lastCopiedTextPreview: state.lastCopiedText,
    providers: providerDiagnostics
  };
}

function clearDiagnostics() {
  state.events = [];
  state.lastCopiedText = '';
  state.lastParsedItem = undefined;
  state.lastApiError = undefined;
  state.lastLookup = undefined;
  state.lastLootFilterWrite = undefined;
  recordEvent('diagnostics-cleared');
  return getDiagnostics();
}

function registerDiagnosticProvider(id, provider) {
  if (!id || typeof provider !== 'function') {
    return;
  }
  diagnosticProviders.set(id, provider);
}

function summarizeItem(item) {
  if (!item) {
    return undefined;
  }

  return sanitize({
    looksLikePoeItem: item.looksLikePoeItem,
    name: item.name,
    rarity: item.rarity,
    itemClass: item.itemClass,
    baseType: item.baseType,
    category: item.category,
    poeNinjaType: item.poeNinjaType,
    itemLevel: item.itemLevel,
    mapTier: item.mapTier,
    gemLevel: item.gemLevel,
    qualityValue: item.qualityValue,
    socketCount: item.socketCount,
    linkedSockets: item.linkedSockets,
    corrupted: item.corrupted,
    unidentified: item.unidentified,
    mirrored: item.mirrored,
    fractured: item.fractured,
    synthesised: item.synthesised,
    influences: item.influences,
    modifiers: Array.isArray(item.modifiers) ? item.modifiers.length : 0,
    pseudoGroups: Array.isArray(item.pseudoGroups) ? item.pseudoGroups.length : 0,
    mapWarnings: Array.isArray(item.mapWarnings) ? item.mapWarnings.length : 0,
    statMatchWarning: item.statMatchWarning
  });
}

function sanitize(value) {
  if (Array.isArray(value)) {
    return value.map(sanitize);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const output = {};
  for (const [key, child] of Object.entries(value)) {
    if (/token|secret|authorization/i.test(key)) {
      output[key] = child ? '[redacted]' : child;
      continue;
    }

    output[key] = sanitize(child);
  }
  return output;
}

function truncate(value, maxLength) {
  return value.length > maxLength
    ? `${value.slice(0, maxLength)}\n...[truncated]`
    : value;
}

module.exports = {
  clearDiagnostics,
  getDiagnostics,
  recordApiError,
  recordCopiedText,
  recordEvent,
  recordLootFilterWrite,
  recordLookup,
  recordParsedItem,
  registerDiagnosticProvider,
  summarizeItem
};
