const fs = require('node:fs');
const path = require('node:path');
const { app } = require('electron');
const { normalizeLootFilterSettings } = require('./loot-filter-manager');

const SETTINGS_SCHEMA_VERSION = 4;
const DEFAULT_BUFF_MIRROR = {
  enabled: false,
  scanRegion: { x: 0, y: 24, width: 900, height: 96 },
  templateRegion: { x: 20, y: 24, width: 32, height: 32 },
  barPosition: { x: 132, y: 760 },
  mirrorPosition: { x: 132, y: 760 },
  placementMode: false,
  barOrientation: 'horizontal',
  mirrorSize: 34,
  threshold: 0.88,
  intervalMs: 1500,
  templates: []
};

const DEFAULT_SETTINGS = {
  schemaVersion: SETTINGS_SCHEMA_VERSION,
  league: 'Standard',
  listingCount: 20,
  shortcuts: {
    lookup: 'CommandOrControl+D',
    relatedOutcomes: 'CommandOrControl+Alt+B',
    captureFilterRule: 'CommandOrControl+Alt+F',
    settings: 'Shift+Space',
    clickThrough: 'CommandOrControl+Alt+T',
    hideOverlay: 'Escape'
  },
  overlayBounds: undefined,
  oauth: {
    clientId: '',
    redirectUri: 'http://127.0.0.1:8585/callback',
    scopes: 'account:profile account:characters account:stashes account:item_filter',
    token: undefined,
    serviceToken: undefined
  },
  gggSession: {
    encryptedToken: undefined,
    tokenHint: undefined,
    tokenSetAt: undefined,
    validatedAt: undefined,
    accountName: undefined,
    manualAccountName: undefined,
    status: 'not-configured',
    lastError: undefined
  },
  lootFilter: undefined,
  buffMirror: DEFAULT_BUFF_MIRROR,
  presets: []
};

function getSettingsPath() {
  return path.join(app.getPath('userData'), 'settings.json');
}

function readSettings() {
  const settingsPath = getSettingsPath();
  try {
    const parsed = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    return migrateSettings(parsed);
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function writeSettings(nextSettings) {
  const settings = normalizeSettings(nextSettings);
  const settingsPath = getSettingsPath();
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`, 'utf8');
  return settings;
}

function migrateSettings(settingsLike) {
  const parsed = settingsLike && typeof settingsLike === 'object' ? settingsLike : {};
  const schemaVersion = Number(parsed.schemaVersion || 0);
  const migrated = {
    ...DEFAULT_SETTINGS,
    ...parsed
  };

  if (schemaVersion < 2) {
    migrated.shortcuts = normalizeShortcuts(parsed.shortcuts);
    migrated.oauth = normalizeOAuth(parsed.oauth);
  }

  return normalizeSettings(migrated);
}

function normalizeSettings(nextSettings = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...nextSettings,
    schemaVersion: SETTINGS_SCHEMA_VERSION,
    listingCount: normalizeListingCount(nextSettings.listingCount),
    shortcuts: normalizeShortcuts(nextSettings.shortcuts),
    overlayBounds: normalizeBounds(nextSettings.overlayBounds),
    oauth: normalizeOAuth(nextSettings.oauth),
    gggSession: normalizeGggSession(nextSettings.gggSession),
    lootFilter: normalizeLootFilterSettings(nextSettings.lootFilter),
    buffMirror: normalizeBuffMirror(nextSettings.buffMirror),
    presets: Array.isArray(nextSettings.presets) ? nextSettings.presets : []
  };
}

function normalizeBuffMirror(buffMirror) {
  const source = buffMirror && typeof buffMirror === 'object' ? buffMirror : {};
  return {
    enabled: source.enabled === true,
    scanRegion: normalizeRect(source.scanRegion, DEFAULT_BUFF_MIRROR.scanRegion, { minWidth: 24, minHeight: 24 }),
    templateRegion: normalizeRect(source.templateRegion, DEFAULT_BUFF_MIRROR.templateRegion, { minWidth: 8, minHeight: 8 }),
    barPosition: normalizePoint(source.barPosition || source.mirrorPosition, DEFAULT_BUFF_MIRROR.barPosition),
    mirrorPosition: normalizePoint(source.barPosition || source.mirrorPosition, DEFAULT_BUFF_MIRROR.mirrorPosition),
    placementMode: source.placementMode === true,
    barOrientation: source.barOrientation === 'vertical' ? 'vertical' : 'horizontal',
    mirrorSize: normalizeNumber(source.mirrorSize, DEFAULT_BUFF_MIRROR.mirrorSize, 16, 96),
    threshold: normalizeNumber(source.threshold, DEFAULT_BUFF_MIRROR.threshold, 0.5, 0.99),
    intervalMs: normalizeNumber(source.intervalMs, DEFAULT_BUFF_MIRROR.intervalMs, 1000, 5000),
    templates: Array.isArray(source.templates)
      ? source.templates.map(normalizeBuffTemplate).filter(Boolean).slice(0, 12)
      : []
  };
}

function normalizeBuffTemplate(template) {
  if (!template || typeof template !== 'object') {
    return undefined;
  }

  const dataUrl = String(template.dataUrl || '').trim();
  if (!dataUrl.startsWith('data:image/')) {
    return undefined;
  }

  const width = normalizeNumber(template.width, 32, 1, 128);
  const height = normalizeNumber(template.height, 32, 1, 128);
  const fallbackMatchRegion = {
    x: Math.max(0, Math.round(width * 0.2)),
    y: Math.max(0, Math.round(height * 0.2)),
    width: Math.max(4, Math.round(width * 0.6)),
    height: Math.max(4, Math.round(height * 0.6))
  };
  const matchRegion = clampRectToBounds(
    normalizeRect(template.matchRegion, fallbackMatchRegion, { minWidth: 4, minHeight: 4 }),
    width,
    height
  );

  return {
    id: String(template.id || `buff-${Date.now()}`).trim(),
    name: String(template.name || 'Buff template').trim().slice(0, 80) || 'Buff template',
    dataUrl,
    width,
    height,
    matchRegion,
    capturedAt: template.capturedAt ? String(template.capturedAt) : new Date().toISOString()
  };
}

function clampRectToBounds(rect, width, height) {
  const x = Math.max(0, Math.min(rect.x, Math.max(0, width - 1)));
  const y = Math.max(0, Math.min(rect.y, Math.max(0, height - 1)));
  return {
    x,
    y,
    width: Math.max(1, Math.min(rect.width, width - x)),
    height: Math.max(1, Math.min(rect.height, height - y))
  };
}

function normalizeRect(rect, fallback, { minWidth = 1, minHeight = 1 } = {}) {
  const source = rect && typeof rect === 'object' ? rect : {};
  return {
    x: Math.max(0, Math.round(Number.isFinite(Number(source.x)) ? Number(source.x) : fallback.x)),
    y: Math.max(0, Math.round(Number.isFinite(Number(source.y)) ? Number(source.y) : fallback.y)),
    width: Math.max(minWidth, Math.round(Number.isFinite(Number(source.width)) ? Number(source.width) : fallback.width)),
    height: Math.max(minHeight, Math.round(Number.isFinite(Number(source.height)) ? Number(source.height) : fallback.height))
  };
}

function normalizePoint(point, fallback) {
  const source = point && typeof point === 'object' ? point : {};
  return {
    x: Math.max(0, Math.round(Number.isFinite(Number(source.x)) ? Number(source.x) : fallback.x)),
    y: Math.max(0, Math.round(Number.isFinite(Number(source.y)) ? Number(source.y) : fallback.y))
  };
}

function normalizeNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, number));
}

function normalizeOAuth(oauth) {
  const merged = {
    ...DEFAULT_SETTINGS.oauth,
    ...(oauth && typeof oauth === 'object' ? oauth : {})
  };

  return {
    clientId: String(merged.clientId || '').trim(),
    redirectUri: String(merged.redirectUri || DEFAULT_SETTINGS.oauth.redirectUri).trim(),
    scopes: String(merged.scopes || DEFAULT_SETTINGS.oauth.scopes).trim(),
    token: merged.token && typeof merged.token === 'object' ? merged.token : undefined,
    serviceToken: merged.serviceToken && typeof merged.serviceToken === 'object' ? merged.serviceToken : undefined
  };
}

function normalizeGggSession(session) {
  const merged = {
    ...DEFAULT_SETTINGS.gggSession,
    ...(session && typeof session === 'object' ? session : {})
  };

  const encryptedToken = String(merged.encryptedToken || '').trim();
  const status = String(merged.status || (encryptedToken ? 'saved' : 'not-configured')).trim();

  return {
    encryptedToken: encryptedToken || undefined,
    tokenHint: encryptedToken ? String(merged.tokenHint || '').trim() || undefined : undefined,
    tokenSetAt: encryptedToken ? String(merged.tokenSetAt || '').trim() || undefined : undefined,
    validatedAt: encryptedToken ? String(merged.validatedAt || '').trim() || undefined : undefined,
    accountName: encryptedToken ? String(merged.accountName || '').trim() || undefined : undefined,
    manualAccountName: String(merged.manualAccountName || '').trim() || undefined,
    status: encryptedToken ? status || 'saved' : 'not-configured',
    lastError: encryptedToken ? String(merged.lastError || '').trim() || undefined : undefined
  };
}

function normalizeBounds(bounds) {
  if (!bounds || typeof bounds !== 'object') {
    return undefined;
  }

  const x = Number(bounds.x);
  const y = Number(bounds.y);
  const width = Number(bounds.width);
  const height = Number(bounds.height);

  if (![x, y, width, height].every(Number.isFinite)) {
    return undefined;
  }

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.max(320, Math.round(width)),
    height: Math.max(240, Math.round(height))
  };
}

function normalizeListingCount(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_SETTINGS.listingCount;
  }

  return Math.min(50, Math.max(5, Math.round(parsed)));
}

function normalizeShortcuts(shortcuts) {
  const merged = {
    ...DEFAULT_SETTINGS.shortcuts,
    ...(shortcuts && typeof shortcuts === 'object' ? shortcuts : {})
  };

  return {
    lookup: normalizeShortcut(merged.lookup, DEFAULT_SETTINGS.shortcuts.lookup),
    relatedOutcomes: normalizeShortcut(merged.relatedOutcomes, DEFAULT_SETTINGS.shortcuts.relatedOutcomes),
    captureFilterRule: normalizeShortcut(merged.captureFilterRule, DEFAULT_SETTINGS.shortcuts.captureFilterRule),
    settings: normalizeShortcut(merged.settings, DEFAULT_SETTINGS.shortcuts.settings),
    clickThrough: normalizeShortcut(merged.clickThrough, DEFAULT_SETTINGS.shortcuts.clickThrough),
    hideOverlay: normalizeShortcut(merged.hideOverlay, DEFAULT_SETTINGS.shortcuts.hideOverlay)
  };
}

function normalizeShortcut(value, fallback) {
  const shortcut = String(value || '').trim();
  return shortcut || fallback;
}

module.exports = {
  SETTINGS_SCHEMA_VERSION,
  DEFAULT_SETTINGS,
  migrateSettings,
  readSettings,
  writeSettings,
  normalizeGggSession
};
