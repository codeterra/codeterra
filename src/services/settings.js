const fs = require('node:fs');
const path = require('node:path');
const { app } = require('electron');
const { normalizeLootFilterSettings } = require('./loot-filter-manager');

const SETTINGS_SCHEMA_VERSION = 3;

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
    scopes: 'account:profile account:item_filter',
    token: undefined,
    serviceToken: undefined
  },
  lootFilter: undefined,
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
    lootFilter: normalizeLootFilterSettings(nextSettings.lootFilter),
    presets: Array.isArray(nextSettings.presets) ? nextSettings.presets : []
  };
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
  writeSettings
};
