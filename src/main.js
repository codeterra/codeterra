const { app, BrowserWindow, clipboard, dialog, globalShortcut, ipcMain, screen, Tray, Menu, nativeImage, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const { execFile } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { parseCopiedItem } = require('./domain/item-parser');
const { createConfidenceHints } = require('./domain/item-intelligence');
const { createOfficialTradeSearch, createTradeQuery, getInstantBuyoutListings, getSummaryPrice } = require('./services/pricing');
const { DEFAULT_SETTINGS, readSettings, writeSettings } = require('./services/settings');
const { matchTradeStats } = require('./services/trade-stats');
const { beginAuthorization, fetchCurrencyExchange, gggApiFetch, refreshToken } = require('./services/ggg-oauth');
const { getRelatedOutcomes } = require('./services/related-outcomes');
const {
  addCapturedItemRule,
  clearLootFilterRules,
  createLootFilterProfile,
  deleteLootFilterProfile,
  exportLootFilterProfile,
  getLootFilterSummary,
  getLootFilterState,
  importLootFilterProfile,
  removeLootFilterRule,
  refreshLootFilterEconomyHighlights,
  sanitizeFilterFileName,
  setActiveLootFilterProfile,
  setLootFilterConfig,
  updateLootFilterProfile,
  writeLootFilter
} = require('./services/loot-filter-manager');
const { classifyError, formatErrorMessage } = require('./services/errors');
const {
  clearDiagnostics,
  getDiagnostics,
  recordApiError,
  recordCopiedText,
  recordEvent,
  recordLookup,
  recordParsedItem
} = require('./services/diagnostics');

const POE_PROCESS_PATTERN = 'PathOfExile|PathOfExileSteam|PathOfExile_x64|PathOfExile_x64Steam';

let overlayWindow;
let settingsWindow;
let tray;
let clickThrough = false;
let overlayReady;
let settingsReady;
let currentLookup;
let settings;
let overlayBoundsSaveTimer;
let registeredHideShortcut;
let activeLookupId = 0;
let updateState = {
  status: 'idle',
  message: 'Updates have not been checked yet.',
  version: app.getVersion(),
  availableVersion: undefined,
  downloaded: false,
  canCheck: false
};

function getPublicSettings() {
  const token = settings?.oauth?.token;
  const serviceToken = settings?.oauth?.serviceToken;

  return {
    ...settings,
    oauth: {
      clientId: settings?.oauth?.clientId || '',
      redirectUri: settings?.oauth?.redirectUri || 'http://127.0.0.1:8585/callback',
      scopes: settings?.oauth?.scopes || 'account:profile account:item_filter',
      connected: Boolean(token?.access_token),
      scope: token?.scope,
      expiresAt: token?.expires_at,
      tokenType: token?.token_type,
      serviceTokenConfigured: Boolean(serviceToken?.access_token)
    },
    lootFilter: getLootFilterSummary(settings)
  };
}

function createSettingsPayload() {
  return {
    settings: getPublicSettings(),
    shortcuts: getShortcutLabels()
  };
}

function publishSettings() {
  const payload = createSettingsPayload();
  settingsWindow?.webContents.send('settings-updated', payload);
  overlayWindow?.webContents.send('settings-updated', payload);
}

function getUpdateStatus() {
  return {
    ...updateState,
    version: app.getVersion(),
    canCheck: app.isPackaged
  };
}

function setUpdateStatus(patch) {
  updateState = {
    ...updateState,
    ...patch,
    version: app.getVersion(),
    canCheck: app.isPackaged
  };
  settingsWindow?.webContents.send('update-status', getUpdateStatus());
  recordEvent('update-status', updateState);
  return getUpdateStatus();
}

function configureAutoUpdates() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('checking-for-update', () => {
    setUpdateStatus({
      status: 'checking',
      message: 'Checking GitHub releases for updates.',
      downloaded: false
    });
  });

  autoUpdater.on('update-available', (info) => {
    setUpdateStatus({
      status: 'available',
      message: `Update ${info.version} is available. Downloading...`,
      availableVersion: info.version,
      downloaded: false
    });
  });

  autoUpdater.on('update-not-available', () => {
    setUpdateStatus({
      status: 'current',
      message: `POEHelper ${app.getVersion()} is up to date.`,
      availableVersion: undefined,
      downloaded: false
    });
  });

  autoUpdater.on('download-progress', (progress) => {
    const percent = typeof progress.percent === 'number' ? `${progress.percent.toFixed(0)}%` : 'in progress';
    setUpdateStatus({
      status: 'downloading',
      message: `Downloading update ${percent}.`
    });
  });

  autoUpdater.on('update-downloaded', (info) => {
    setUpdateStatus({
      status: 'downloaded',
      message: `Update ${info.version} downloaded. Restart to install.`,
      availableVersion: info.version,
      downloaded: true
    });
  });

  autoUpdater.on('error', (error) => {
    setUpdateStatus({
      status: 'error',
      message: `Update check failed: ${error.message}`,
      downloaded: false
    });
  });
}

async function checkForAppUpdates({ manual = false } = {}) {
  if (!app.isPackaged) {
    return setUpdateStatus({
      status: manual ? 'dev-mode' : updateState.status,
      message: 'Auto-update checks run from packaged installer builds, not watch-dev.',
      downloaded: false
    });
  }

  try {
    await autoUpdater.checkForUpdatesAndNotify();
  } catch (error) {
    return setUpdateStatus({
      status: 'error',
      message: `Update check failed: ${error.message}`,
      downloaded: false
    });
  }

  return getUpdateStatus();
}

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 520,
    height: 650,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  overlayWindow.setAlwaysOnTop(true, 'screen-saver');
  overlayReady = overlayWindow.loadFile(path.join(__dirname, 'overlay.html'));

  overlayWindow.on('closed', () => {
    overlayWindow = undefined;
  });

  overlayWindow.on('moved', scheduleOverlayBoundsSave);
  overlayWindow.on('resized', scheduleOverlayBoundsSave);
}

function createSettingsWindow() {
  const { workArea } = screen.getPrimaryDisplay();
  const width = Math.max(980, Math.min(1320, workArea.width - 48));
  const height = Math.max(680, Math.min(920, workArea.height - 64));

  settingsWindow = new BrowserWindow({
    width,
    height,
    minWidth: 900,
    minHeight: 620,
    show: false,
    frame: true,
    resizable: true,
    minimizable: true,
    maximizable: true,
    title: 'POEHelper Settings',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  settingsReady = settingsWindow.loadFile(path.join(__dirname, 'settings.html'));

  settingsWindow.on('closed', () => {
    settingsWindow = undefined;
    settingsReady = undefined;
  });
}

async function showSettingsWindow() {
  if (!settingsWindow) {
    createSettingsWindow();
  }

  await settingsReady;
  settingsWindow.webContents.send('settings-updated', createSettingsPayload());
  settingsWindow.show();
  settingsWindow.focus();
}

function hideOverlay() {
  if (overlayWindow?.isVisible()) {
    overlayWindow.hide();
  }

  unregisterRegisteredHideShortcut();
}

function getShortcut(name) {
  return settings?.shortcuts?.[name] || DEFAULT_SETTINGS.shortcuts[name];
}

function getShortcutLabel(shortcut) {
  return String(shortcut || '')
    .replace(/CommandOrControl/g, 'Ctrl')
    .replace(/Command/g, 'Cmd')
    .replace(/Control/g, 'Ctrl')
    .replace(/Plus/g, '+')
    .replace(/^Escape$/, 'Esc');
}

function getShortcutLabels() {
  return {
    lookup: getShortcutLabel(getShortcut('lookup')),
    relatedOutcomes: getShortcutLabel(getShortcut('relatedOutcomes')),
    captureFilterRule: getShortcutLabel(getShortcut('captureFilterRule')),
    settings: getShortcutLabel(getShortcut('settings')),
    clickThrough: getShortcutLabel(getShortcut('clickThrough')),
    hideOverlay: getShortcutLabel(getShortcut('hideOverlay'))
  };
}

function getShortcutSettings() {
  return {
    lookup: getShortcut('lookup'),
    relatedOutcomes: getShortcut('relatedOutcomes'),
    captureFilterRule: getShortcut('captureFilterRule'),
    settings: getShortcut('settings'),
    clickThrough: getShortcut('clickThrough'),
    hideOverlay: getShortcut('hideOverlay')
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForClipboardTextChange(previousText, timeoutMs = 900) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const nextText = clipboard.readText();
    if (nextText !== previousText) {
      return nextText;
    }

    await sleep(40);
  }

  return clipboard.readText();
}

function scheduleOverlayBoundsSave() {
  clearTimeout(overlayBoundsSaveTimer);
  overlayBoundsSaveTimer = setTimeout(saveOverlayBounds, 350);
}

function saveOverlayBounds() {
  if (!overlayWindow || !settings) {
    return;
  }

  settings = writeSettings({
    ...settings,
    overlayBounds: overlayWindow.getBounds()
  });
}

function sendCopyCommandToActiveWindow() {
  return new Promise((resolve) => {
    const script = [
      'Add-Type -AssemblyName System.Windows.Forms;',
      '[System.Windows.Forms.SendKeys]::SendWait("^c");'
    ].join(' ');

    execFile(
      'powershell.exe',
      ['-NoProfile', '-STA', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { windowsHide: true, timeout: 1500 },
      (error) => resolve({ ok: !error, message: error?.message })
    );
  });
}

function getForegroundWindowSnapshot() {
  return new Promise((resolve) => {
    const script = [
      "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class User32ForegroundSnapshot { [DllImport(\"user32.dll\")] public static extern IntPtr GetForegroundWindow(); }';",
      '$hwnd = [User32ForegroundSnapshot]::GetForegroundWindow();',
      '$handle = $hwnd.ToInt64();',
      '$process = Get-Process | Where-Object { $_.MainWindowHandle -eq $handle } | Select-Object -First 1 ProcessName, MainWindowTitle;',
      '[pscustomobject]@{ handle = $handle; processName = $process.ProcessName; windowTitle = $process.MainWindowTitle } | ConvertTo-Json -Compress'
    ].join(' ');

    execFile(
      'powershell.exe',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { windowsHide: true, timeout: 1000 },
      (error, stdout) => {
        if (error || !stdout.trim()) {
          resolve(undefined);
          return;
        }

        try {
          const result = JSON.parse(stdout.trim());
          resolve({
            handle: Number(result.handle),
            processName: result.processName,
            windowTitle: result.windowTitle
          });
        } catch {
          resolve(undefined);
        }
      }
    );
  });
}

function sendCopyCommandToWindow(targetWindow) {
  return new Promise((resolve) => {
    const handle = Number(targetWindow?.handle);
    const focusScript = Number.isFinite(handle) && handle > 0
      ? [
          "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class User32CopyFocus { [DllImport(\"user32.dll\")] public static extern bool SetForegroundWindow(IntPtr hWnd); }';",
          `[User32CopyFocus]::SetForegroundWindow([IntPtr]${Math.trunc(handle)}) | Out-Null;`,
          'Start-Sleep -Milliseconds 80;'
        ].join(' ')
      : '';
    const script = [
      focusScript,
      'Add-Type -AssemblyName System.Windows.Forms;',
      '[System.Windows.Forms.SendKeys]::SendWait("^c");'
    ].join(' ');

    execFile(
      'powershell.exe',
      ['-NoProfile', '-STA', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { windowsHide: true, timeout: 1500 },
      (error) => resolve({ ok: !error, message: error?.message, targetWindow })
    );
  });
}

function placeOverlayNearCursor() {
  const cursorPoint = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(cursorPoint);
  const bounds = display.workArea;
  const size = overlayWindow.getBounds();
  const margin = 18;

  const x = Math.min(
    Math.max(cursorPoint.x + margin, bounds.x + margin),
    bounds.x + bounds.width - size.width - margin
  );
  const y = Math.min(
    Math.max(cursorPoint.y + margin, bounds.y + margin),
    bounds.y + bounds.height - size.height - margin
  );

  overlayWindow.setPosition(x, y, false);
}

function getClampedOverlayBounds(savedBounds) {
  if (!savedBounds) {
    return undefined;
  }

  const display = screen.getDisplayMatching(savedBounds);
  const workArea = display.workArea;
  const width = Math.min(savedBounds.width, workArea.width);
  const height = Math.min(savedBounds.height, workArea.height);
  const margin = 8;

  return {
    width,
    height,
    x: Math.min(
      Math.max(savedBounds.x, workArea.x + margin),
      workArea.x + workArea.width - width - margin
    ),
    y: Math.min(
      Math.max(savedBounds.y, workArea.y + margin),
      workArea.y + workArea.height - height - margin
    )
  };
}

function placeOverlay() {
  const savedBounds = getClampedOverlayBounds(settings.overlayBounds);
  if (savedBounds) {
    overlayWindow.setBounds(savedBounds, false);
    return;
  }

  placeOverlayNearCursor();
}

function detectPoeWindow() {
  return new Promise((resolve) => {
    const script = [
      '$pattern = "' + POE_PROCESS_PATTERN + '";',
      'Get-Process |',
      'Where-Object {',
      '  $_.ProcessName -match $pattern -or $_.MainWindowTitle -like "*Path of Exile*"',
      '} |',
      'Select-Object -First 1 ProcessName, MainWindowTitle, MainWindowHandle |',
      'ConvertTo-Json -Compress'
    ].join(' ');

    execFile(
      'powershell.exe',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { windowsHide: true, timeout: 2500 },
      (error, stdout) => {
        if (error || !stdout.trim()) {
          resolve({ detected: false });
          return;
        }

        try {
          const result = JSON.parse(stdout.trim());
          resolve({
            detected: true,
            processName: result.ProcessName,
            windowTitle: result.MainWindowTitle,
            windowHandle: result.MainWindowHandle
          });
        } catch {
          resolve({ detected: false });
        }
      }
    );
  });
}

function createParseErrorItem(rawText, error) {
  const text = String(rawText || '');
  return {
    rawText: text,
    lineCount: text ? text.split(/\r\n|\r|\n/).length : 0,
    looksLikePoeItem: false,
    name: 'Unable to parse clipboard',
    baseType: undefined,
    rarity: undefined,
    itemClass: undefined,
    itemLevel: undefined,
    mapTier: undefined,
    gemLevel: undefined,
    quality: undefined,
    stackSize: undefined,
    corrupted: false,
    unidentified: false,
    mirrored: false,
    synthesised: false,
    fractured: false,
    category: 'unknown',
    poeNinjaType: undefined,
    modifiers: [],
    pseudoGroups: [],
    mapWarnings: [],
    statMatchWarning: `Parser error: ${error.message}`,
    searchLabel: 'Unable to parse clipboard'
  };
}

function createCaptureErrorItem(message) {
  return {
    rawText: '',
    lineCount: 0,
    looksLikePoeItem: false,
    name: 'Unable to capture hovered item',
    baseType: undefined,
    rarity: undefined,
    itemClass: undefined,
    itemLevel: undefined,
    mapTier: undefined,
    gemLevel: undefined,
    quality: undefined,
    stackSize: undefined,
    corrupted: false,
    unidentified: false,
    mirrored: false,
    synthesised: false,
    fractured: false,
    category: 'unknown',
    poeNinjaType: undefined,
    modifiers: [],
    pseudoGroups: [],
    mapWarnings: [],
    statMatchWarning: message,
    searchLabel: 'Unable to capture hovered item'
  };
}

async function captureCurrentItem(copyHighlightedItem, targetWindow) {
  let captureWarning;
  let rawText;

  if (copyHighlightedItem) {
    const previousText = clipboard.readText();
    const clipboardMarker = `__POEHELPER_CAPTURE_PENDING_${Date.now()}_${Math.random().toString(36).slice(2)}__`;
    clipboard.writeText(clipboardMarker);

    const copyResult = targetWindow
      ? await sendCopyCommandToWindow(targetWindow)
      : await sendCopyCommandToActiveWindow();

    rawText = await waitForClipboardTextChange(clipboardMarker);

    if (!copyResult.ok) {
      captureWarning = 'Could not send Ctrl+C to the active window. The previous item was not reused.';
      clipboard.writeText(previousText);
      const item = createCaptureErrorItem(captureWarning);
      recordCopiedText('');
      recordParsedItem(item);
      return {
        item,
        poeWindow: await detectPoeWindow(),
        captureWarning
      };
    } else if (targetWindow) {
      recordEvent('copy-targeted-window', {
        processName: targetWindow.processName,
        windowTitle: targetWindow.windowTitle,
        handle: targetWindow.handle
      });
    }

    if (rawText === clipboardMarker) {
      captureWarning = 'The hovered-item copy did not update the clipboard. Move the cursor back over the item and try again.';
      clipboard.writeText(previousText);
      const item = createCaptureErrorItem(captureWarning);
      recordEvent('clipboard-capture-timeout', {
        targetProcessName: targetWindow?.processName,
        targetWindowTitle: targetWindow?.windowTitle
      });
      recordCopiedText('');
      recordParsedItem(item);
      return {
        item,
        poeWindow: await detectPoeWindow(),
        captureWarning
      };
    }
  } else {
    rawText = clipboard.readText();
  }

  recordCopiedText(rawText);
  let item;
  try {
    const parsedItem = parseCopiedItem(rawText);
    try {
      item = await matchTradeStats(parsedItem);
    } catch {
      item = {
        ...parsedItem,
        statMatchWarning: 'Trade stat matching is unavailable right now.'
      };
    }
  } catch (error) {
    item = createParseErrorItem(rawText, error);
    recordEvent('parse-error', { message: error.message });
  }
  recordParsedItem(item);
  const poeWindow = await detectPoeWindow();
  return {
    item,
    poeWindow,
    captureWarning
  };
}

async function showOverlayPending({ copyHighlightedItem, mode, message }) {
  const lookupId = ++activeLookupId;
  currentLookup = undefined;
  if (!overlayWindow) {
    createOverlayWindow();
  }

  await overlayReady;

  placeOverlay();
  overlayWindow.webContents.send('lookup-pending', {
    lookupId,
    mode,
    startedAt: new Date().toISOString(),
    clickThrough,
    settings: getPublicSettings(),
    shortcuts: getShortcutLabels(),
    message: message || (copyHighlightedItem ? 'Capturing hovered item...' : 'Reading clipboard...')
  });
  overlayWindow.showInactive();
  registerOverlayHideShortcut();
  return lookupId;
}

function isActiveLookup(lookupId, item, league) {
  return Boolean(
    overlayWindow
    && lookupId === activeLookupId
    && currentLookup?.lookupId === lookupId
    && (!item || currentLookup?.item.rawText === item.rawText)
    && (!league || currentLookup?.league === league)
  );
}

async function showLookupOverlay({ copyHighlightedItem = false } = {}) {
  const targetWindow = copyHighlightedItem ? await getForegroundWindowSnapshot() : undefined;
  const lookupId = await showOverlayPending({
    copyHighlightedItem,
    mode: 'price',
    message: copyHighlightedItem ? 'Capturing hovered item...' : 'Reading clipboard...'
  });

  const { item, poeWindow, captureWarning } = await captureCurrentItem(copyHighlightedItem, targetWindow);
  if (lookupId !== activeLookupId) {
    return;
  }

  const lookupLeague = settings.league;
  currentLookup = {
    lookupId,
    item,
    league: lookupLeague,
    queryOptions: createDefaultQueryOptions(item)
  };
  recordLookup({
    lookupId,
    mode: 'price',
    league: lookupLeague,
    item: item.searchLabel || item.name,
    category: item.category
  });

  overlayWindow.webContents.send('lookup-result', {
    lookupId,
    shortcut: getShortcut('lookup'),
    capturedAt: new Date().toISOString(),
    item,
    poeWindow,
    clickThrough,
    settings: getPublicSettings(),
    shortcuts: getShortcutLabels(),
    captureWarning,
    queryOptions: currentLookup.queryOptions,
    confidenceHints: createConfidenceHints(item)
  });
  getSummaryPrice(item, lookupLeague)
    .then((price) => {
      if (!isActiveLookup(lookupId, item, lookupLeague)) {
        return;
      }

      overlayWindow.webContents.send('price-result', {
        lookupId,
        league: lookupLeague,
        price,
        confidenceHints: createConfidenceHints(item, price)
      });
    })
    .catch((error) => {
      if (!isActiveLookup(lookupId, item, lookupLeague)) {
        return;
      }

      const classified = classifyError(error);
      recordApiError('summary-price', error, classified);
      overlayWindow?.webContents.send('price-result', {
        lookupId,
        league: lookupLeague,
        price: {
          status: 'error',
          message: formatErrorMessage('Pricing request failed', error),
          errorKind: classified.kind
        }
      });
    });

  if (usesInstantBuyoutListings(item)) {
    getInstantBuyoutListings(item, lookupLeague, currentLookup.queryOptions, settings.listingCount)
      .then((listings) => {
        if (!isActiveLookup(lookupId, item, lookupLeague)) {
          return;
        }

        overlayWindow.webContents.send('listing-result', {
          lookupId,
          league: lookupLeague,
          listings
        });
      })
      .catch((error) => {
        if (!isActiveLookup(lookupId, item, lookupLeague)) {
          return;
        }

        const classified = classifyError(error);
        recordApiError('trade-listings', error, classified);
        overlayWindow?.webContents.send('listing-result', {
          lookupId,
          league: lookupLeague,
          listings: {
            status: 'error',
            message: formatErrorMessage('Trade listings failed', error),
            errorKind: classified.kind
          }
        });
      });
  }

}

async function showRelatedOutcomesOverlay({ copyHighlightedItem = false } = {}) {
  const targetWindow = copyHighlightedItem ? await getForegroundWindowSnapshot() : undefined;
  const lookupId = await showOverlayPending({
    copyHighlightedItem,
    mode: 'related',
    message: copyHighlightedItem ? 'Checking related outcomes...' : 'Checking clipboard outcomes...'
  });

  const { item, poeWindow, captureWarning } = await captureCurrentItem(copyHighlightedItem, targetWindow);
  if (lookupId !== activeLookupId) {
    return;
  }

  const lookupLeague = settings.league;
  currentLookup = {
    lookupId,
    item,
    league: lookupLeague,
    queryOptions: createDefaultQueryOptions(item)
  };
  recordLookup({
    lookupId,
    mode: 'related',
    league: lookupLeague,
    item: item.searchLabel || item.name,
    category: item.category
  });

  overlayWindow.webContents.send('lookup-result', {
    lookupId,
    mode: 'related',
    shortcut: getShortcut('relatedOutcomes'),
    capturedAt: new Date().toISOString(),
    item,
    poeWindow,
    clickThrough,
    settings: getPublicSettings(),
    shortcuts: getShortcutLabels(),
    captureWarning,
    queryOptions: currentLookup.queryOptions,
    confidenceHints: createConfidenceHints(item)
  });

  getRelatedOutcomes(item, lookupLeague)
    .then((related) => {
      if (!isActiveLookup(lookupId, item, lookupLeague)) {
        return;
      }

      overlayWindow.webContents.send('related-outcomes-result', {
        lookupId,
        league: lookupLeague,
        related
      });
    })
    .catch((error) => {
      if (!isActiveLookup(lookupId, item, lookupLeague)) {
        return;
      }

      const classified = classifyError(error);
      recordApiError('related-outcomes', error, classified);
      overlayWindow?.webContents.send('related-outcomes-result', {
        lookupId,
        league: lookupLeague,
        related: {
          status: 'error',
          message: formatErrorMessage('Related outcomes failed', error),
          errorKind: classified.kind
        }
      });
    });
}

async function captureFilterRuleFromHoveredItem() {
  const targetWindow = await getForegroundWindowSnapshot();
  const { item, captureWarning } = await captureCurrentItem(true, targetWindow);
  if (!item?.looksLikePoeItem) {
    throw new Error(item?.statMatchWarning || 'Clipboard does not look like a Path of Exile item.');
  }

  const result = addCapturedItemRule(settings, item);
  settings = writeSettings({
    ...settings,
    lootFilter: result.lootFilter
  });
  const written = writeLootFilter(settings);
  publishSettings();
  recordEvent('loot-filter-rule-captured', {
    rule: result.rule.label,
    outputPath: written.outputPath,
    captureWarning
  });

  return {
    status: 'saved',
    rule: result.rule,
    output: written,
    settings: getPublicSettings(),
    captureWarning
  };
}

function createDefaultQueryOptions(item) {
  const selectedModifierIds = [];

  if (item.category === 'rare' || item.category === 'magic') {
    for (const modifier of item.modifiers || []) {
      if (selectedModifierIds.length >= 3) {
        break;
      }

      if (modifier.tradeStatId && modifier.value) {
        selectedModifierIds.push(modifier.id);
      }
    }
  }

  return {
    selectedModifierIds,
    includeItemLevel: item.category === 'rare' || item.category === 'magic' || item.synthesised || item.fractured,
    includeMapTier: Boolean(item.mapTier),
    includeCorrupted: Boolean(item.corrupted),
    includeIdentified: Boolean(item.unidentified),
    useModifierValues: true,
    modifierTolerance: 0.15
  };
}

function usesInstantBuyoutListings(item) {
  return item?.category !== 'currency';
}

function setClickThrough(enabled) {
  clickThrough = enabled;
  if (!overlayWindow) {
    updateTrayMenu();
    return;
  }

  overlayWindow.setIgnoreMouseEvents(enabled, { forward: true });
  overlayWindow.webContents.send('click-through-changed', clickThrough);
  updateTrayMenu();
}

function toggleClickThrough() {
  setClickThrough(!clickThrough);
  return clickThrough;
}

function updateTrayMenu() {
  if (!tray) {
    return;
  }

  tray.setContextMenu(Menu.buildFromTemplate([
    { label: `Price hovered item (${getShortcutLabels().lookup})`, click: () => showLookupOverlay({ copyHighlightedItem: true }) },
    { label: `Related outcomes (${getShortcutLabels().relatedOutcomes})`, click: () => showRelatedOutcomesOverlay({ copyHighlightedItem: true }) },
    { label: `Add loot-filter rule (${getShortcutLabels().captureFilterRule})`, click: () => captureFilterRuleFromHoveredItem().catch((error) => recordEvent('loot-filter-rule-error', { message: error.message })) },
    { label: 'Lookup current clipboard', click: () => showLookupOverlay() },
    { label: `Settings (${getShortcutLabels().settings})`, click: showSettingsWindow },
    { label: 'Hide overlay', click: hideOverlay },
    {
      label: `Click-through overlay (${getShortcutLabels().clickThrough})`,
      type: 'checkbox',
      checked: clickThrough,
      click: (item) => setClickThrough(item.checked)
    },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]));
}

function createTray() {
  const fallbackTraySvg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">',
    '<rect x="5" y="5" width="54" height="54" rx="13" fill="#111820"/>',
    '<rect x="5" y="5" width="54" height="54" rx="13" fill="none" stroke="#6ee08f" stroke-width="4"/>',
    '<path d="M32 12 18 29h8L16 42h13v9h6v-9h13L38 29h8L32 12Z" fill="#69d982"/>',
    '<path d="M32 12v39h3v-9h13L38 29h8L32 12Z" fill="#3eb86d" opacity=".85"/>',
    '</svg>'
  ].join('');
  const traySvgPath = path.join(__dirname, 'assets', 'tray-icon.svg');
  const traySvg = fs.existsSync(traySvgPath) ? fs.readFileSync(traySvgPath, 'utf8') : fallbackTraySvg;
  let icon = nativeImage.createFromDataURL(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(traySvg)}`);
  if (icon.isEmpty()) {
    icon = nativeImage.createFromDataURL(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4AWMYOnTof2RkZITJgBswagDRgqMGjBqAFAAAUCMCHh8QdNwAAAAASUVORK5CYII='
    );
  }

  tray = new Tray(icon);
  tray.setToolTip('POEHelper');
  updateTrayMenu();
}

function validateShortcutConfig(shortcuts) {
  const required = ['lookup', 'relatedOutcomes', 'captureFilterRule', 'settings', 'clickThrough', 'hideOverlay'];
  const seen = new Map();

  for (const name of required) {
    const value = String(shortcuts?.[name] || '').trim();
    if (!value) {
      throw new Error(`${name} shortcut is required.`);
    }

    const normalized = value.toLowerCase();
    if (seen.has(normalized)) {
      throw new Error(`${getShortcutLabel(value)} is assigned to both ${seen.get(normalized)} and ${name}.`);
    }
    seen.set(normalized, name);
  }
}

function unregisterRegisteredHideShortcut() {
  if (registeredHideShortcut && globalShortcut.isRegistered(registeredHideShortcut)) {
    globalShortcut.unregister(registeredHideShortcut);
  }
  registeredHideShortcut = undefined;
}

function registerOverlayHideShortcut() {
  const hideShortcut = getShortcut('hideOverlay');
  if (!globalShortcut.isRegistered(hideShortcut) && globalShortcut.register(hideShortcut, hideOverlay)) {
    registeredHideShortcut = hideShortcut;
  }
}

function registerShortcuts() {
  validateShortcutConfig(settings.shortcuts);
  globalShortcut.unregisterAll();
  registeredHideShortcut = undefined;

  const registrations = [
    ['lookup', getShortcut('lookup'), () => showLookupOverlay({ copyHighlightedItem: true })],
    ['relatedOutcomes', getShortcut('relatedOutcomes'), () => showRelatedOutcomesOverlay({ copyHighlightedItem: true })],
    ['captureFilterRule', getShortcut('captureFilterRule'), () => captureFilterRuleFromHoveredItem().catch((error) => recordEvent('loot-filter-rule-error', { message: error.message }))],
    ['settings', getShortcut('settings'), showSettingsWindow],
    ['clickThrough', getShortcut('clickThrough'), toggleClickThrough]
  ];

  for (const [name, accelerator, handler] of registrations) {
    if (!globalShortcut.register(accelerator, handler)) {
      globalShortcut.unregisterAll();
      throw new Error(`Could not register ${name} shortcut (${getShortcutLabel(accelerator)}). It may be used by another app.`);
    }
  }

  if (overlayWindow?.isVisible()) {
    registerOverlayHideShortcut();
  }
}

function applyShortcutSettings(shortcuts) {
  const previousShortcuts = getShortcutSettings();
  const nextSettings = writeSettings({
    ...settings,
    shortcuts: {
      ...settings.shortcuts,
      ...shortcuts
    }
  });

  settings = nextSettings;
  try {
    registerShortcuts();
  } catch (error) {
    settings = writeSettings({
      ...settings,
      shortcuts: previousShortcuts
    });
    registerShortcuts();
    throw error;
  }

  updateTrayMenu();
  publishSettings();
  return getPublicSettings();
}

ipcMain.handle('hide-overlay', () => {
  hideOverlay();
});

ipcMain.handle('toggle-click-through', () => {
  return toggleClickThrough();
});

ipcMain.handle('refresh-lookup', () => showLookupOverlay());

ipcMain.handle('capture-highlighted-item', () => showLookupOverlay({ copyHighlightedItem: true }));

ipcMain.handle('capture-related-outcomes', () => showRelatedOutcomesOverlay({ copyHighlightedItem: true }));

ipcMain.handle('open-settings', showSettingsWindow);

ipcMain.handle('get-settings', () => getPublicSettings());

ipcMain.handle('get-update-status', () => getUpdateStatus());

ipcMain.handle('check-for-updates', () => checkForAppUpdates({ manual: true }));

ipcMain.handle('install-update', () => {
  if (!updateState.downloaded) {
    return {
      ...getUpdateStatus(),
      status: 'not-ready',
      message: 'No downloaded update is ready to install.'
    };
  }

  autoUpdater.quitAndInstall(true, true);
  return {
    ...getUpdateStatus(),
    status: 'installing',
    message: 'Restarting to install update.'
  };
});

ipcMain.handle('get-diagnostics', () => getDiagnostics());

ipcMain.handle('clear-diagnostics', () => clearDiagnostics());

ipcMain.handle('set-shortcuts', (_event, shortcuts) => {
  return applyShortcutSettings(shortcuts);
});

ipcMain.handle('set-league', (_event, league) => {
  const normalizedLeague = String(league || '').trim() || 'Standard';
  settings = writeSettings({
    ...settings,
    league: normalizedLeague
  });

  if (currentLookup) {
    currentLookup.league = settings.league;
  }

  publishSettings();

  return getPublicSettings();
});

ipcMain.handle('set-listing-count', (_event, listingCount) => {
  settings = writeSettings({
    ...settings,
    listingCount
  });

  publishSettings();

  return getPublicSettings();
});

ipcMain.handle('set-loot-filter-config', (_event, config) => {
  settings = writeSettings({
    ...settings,
    lootFilter: setLootFilterConfig(settings, config)
  });
  publishSettings();
  return getPublicSettings();
});

ipcMain.handle('get-loot-filter-state', () => getLootFilterState(settings));

ipcMain.handle('set-active-loot-filter-profile', async (_event, profileId) => {
  settings = writeSettings({
    ...settings,
    lootFilter: setActiveLootFilterProfile(settings, profileId)
  });
  publishSettings();
  return await getLootFilterState(settings);
});

ipcMain.handle('create-loot-filter-profile', async (_event, options) => {
  settings = writeSettings({
    ...settings,
    lootFilter: createLootFilterProfile(settings, options)
  });
  publishSettings();
  return await getLootFilterState(settings);
});

ipcMain.handle('delete-loot-filter-profile', async (_event, profileId) => {
  settings = writeSettings({
    ...settings,
    lootFilter: deleteLootFilterProfile(settings, profileId)
  });
  publishSettings();
  return await getLootFilterState(settings);
});

ipcMain.handle('export-loot-filter-profile', async (_event, profileId) => {
  const exportData = exportLootFilterProfile(settings, profileId);
  const profileName = exportData.profile?.name || 'POEHelper Filter';
  const result = await dialog.showSaveDialog(settingsWindow || overlayWindow, {
    title: 'Export loot filter profile',
    defaultPath: path.join(app.getPath('documents'), `${sanitizeFilterFileName(profileName)}.poehelper-profile.json`),
    filters: [
      { name: 'POEHelper Profile', extensions: ['json'] },
      { name: 'JSON', extensions: ['json'] }
    ]
  });

  if (result.canceled || !result.filePath) {
    return { status: 'cancelled' };
  }

  fs.writeFileSync(result.filePath, `${JSON.stringify(exportData, null, 2)}\n`, 'utf8');
  return {
    status: 'exported',
    filePath: result.filePath,
    profileName
  };
});

ipcMain.handle('import-loot-filter-profile', async () => {
  const result = await dialog.showOpenDialog(settingsWindow || overlayWindow, {
    title: 'Import loot filter profile',
    properties: ['openFile'],
    filters: [
      { name: 'POEHelper Profile', extensions: ['json'] },
      { name: 'JSON', extensions: ['json'] }
    ]
  });

  if (result.canceled || !result.filePaths?.[0]) {
    return {
      status: 'cancelled',
      state: await getLootFilterState(settings)
    };
  }

  const filePath = result.filePaths[0];
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  settings = writeSettings({
    ...settings,
    lootFilter: importLootFilterProfile(settings, payload)
  });
  publishSettings();
  return {
    status: 'imported',
    filePath,
    state: await getLootFilterState(settings)
  };
});

ipcMain.handle('update-loot-filter-profile', async (_event, profilePatch) => {
  settings = writeSettings({
    ...settings,
    lootFilter: updateLootFilterProfile(settings, profilePatch)
  });
  publishSettings();
  return await getLootFilterState(settings);
});

ipcMain.handle('write-loot-filter', () => {
  const result = writeLootFilter(settings);
  recordEvent('loot-filter-written', result);
  return result;
});

ipcMain.handle('capture-loot-filter-rule', () => captureFilterRuleFromHoveredItem());

ipcMain.handle('remove-loot-filter-rule', async (_event, ruleId) => {
  settings = writeSettings({
    ...settings,
    lootFilter: removeLootFilterRule(settings, String(ruleId || ''))
  });
  publishSettings();
  return await getLootFilterState(settings);
});

ipcMain.handle('clear-loot-filter-rules', async () => {
  settings = writeSettings({
    ...settings,
    lootFilter: clearLootFilterRules(settings)
  });
  publishSettings();
  return await getLootFilterState(settings);
});

ipcMain.handle('refresh-loot-filter-economy', async () => {
  try {
    settings = writeSettings({
      ...settings,
      lootFilter: await refreshLootFilterEconomyHighlights(settings, settings.league || 'Standard')
    });
    publishSettings();
    return await getLootFilterState(settings);
  } catch (error) {
    const classified = classifyError(error);
    recordApiError('loot-filter-economy', error, classified);
    throw new Error(formatErrorMessage('Economy highlight refresh failed', error));
  }
});

ipcMain.handle('set-oauth-config', (_event, oauthConfig) => {
  const nextConfig = oauthConfig && typeof oauthConfig === 'object' ? oauthConfig : {};
  settings = writeSettings({
    ...settings,
    oauth: {
      ...settings.oauth,
      clientId: nextConfig.clientId,
      redirectUri: nextConfig.redirectUri,
      scopes: nextConfig.scopes,
      token: settings.oauth?.token,
      serviceToken: settings.oauth?.serviceToken
    }
  });

  publishSettings();
  return getPublicSettings();
});

ipcMain.handle('connect-ggg-oauth', async () => {
  const token = await beginAuthorization(settings.oauth);
  settings = writeSettings({
    ...settings,
    oauth: {
      ...settings.oauth,
      token
    }
  });
  publishSettings();
  return getPublicSettings();
});

ipcMain.handle('refresh-ggg-oauth', async () => {
  if (!settings.oauth?.token?.refresh_token) {
    throw new Error('No refresh token is available.');
  }

  const token = await refreshToken({
    clientId: settings.oauth.clientId,
    refreshToken: settings.oauth.token.refresh_token
  });
  settings = writeSettings({
    ...settings,
    oauth: {
      ...settings.oauth,
      token
    }
  });
  publishSettings();
  return getPublicSettings();
});

ipcMain.handle('disconnect-ggg-oauth', () => {
  settings = writeSettings({
    ...settings,
    oauth: {
      ...settings.oauth,
      token: undefined
    }
  });
  publishSettings();
  return getPublicSettings();
});

ipcMain.handle('set-ggg-service-token', (_event, token) => {
  const accessToken = String(token || '').trim();
  settings = writeSettings({
    ...settings,
    oauth: {
      ...settings.oauth,
      serviceToken: accessToken
        ? {
            access_token: accessToken,
            token_type: 'bearer',
            scope: 'service:cxapi',
            obtained_at: new Date().toISOString()
          }
        : undefined
    }
  });
  publishSettings();
  return getPublicSettings();
});

ipcMain.handle('test-ggg-profile', async () => {
  const profile = await gggApiFetch('/profile', settings.oauth?.token);
  return {
    status: 'ok',
    name: profile.name || profile.uuid || profile.sub || 'Connected'
  };
});

ipcMain.handle('test-currency-exchange', async () => {
  const payload = await fetchCurrencyExchange();
  return {
    status: 'ok',
    markets: Array.isArray(payload?.markets) ? payload.markets.length : undefined
  };
});

ipcMain.handle('lookup-price', async () => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  const price = await getSummaryPrice(currentLookup.item, currentLookup.league);
  return {
    ...price,
    confidenceHints: createConfidenceHints(currentLookup.item, price)
  };
});

ipcMain.handle('lookup-listings', async () => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  if (!usesInstantBuyoutListings(currentLookup.item)) {
    return {
      status: 'skipped',
      message: 'Instant-buyout listings are hidden for currency items.'
    };
  }

  return getInstantBuyoutListings(
    currentLookup.item,
    currentLookup.league,
    currentLookup.queryOptions,
    settings.listingCount
  );
});

ipcMain.handle('lookup-related-outcomes', async () => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  return getRelatedOutcomes(currentLookup.item, currentLookup.league);
});

ipcMain.handle('set-query-options', (_event, queryOptions) => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  currentLookup.queryOptions = {
    ...currentLookup.queryOptions,
    ...queryOptions,
    selectedModifierIds: Array.isArray(queryOptions?.selectedModifierIds)
      ? queryOptions.selectedModifierIds
      : currentLookup.queryOptions.selectedModifierIds
  };

  return {
    status: 'updated',
    queryOptions: currentLookup.queryOptions,
    query: createTradeQuery(currentLookup.item, currentLookup.queryOptions)
  };
});

ipcMain.handle('copy-trade-query', () => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  const query = createTradeQuery(currentLookup.item, currentLookup.queryOptions);
  clipboard.writeText(JSON.stringify(query, null, 2));
  return {
    status: 'copied',
    query
  };
});

ipcMain.handle('open-trade-search', async () => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  try {
    const search = await createOfficialTradeSearch(currentLookup.item, currentLookup.league, currentLookup.queryOptions);
    if (search.status === 'ready') {
      await shell.openExternal(search.url);
    }

    return search;
  } catch (error) {
    return {
      status: 'error',
      message: error.retryAfter
        ? `Rate limited by trade search. Retry after ${error.retryAfter}s.`
        : `Trade search failed: ${error.message}`
    };
  }
});

ipcMain.handle('save-search-preset', (_event, name) => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  const presetName = String(name || '').trim() || `${currentLookup.item.searchLabel} preset`;
  const preset = {
    id: `${Date.now()}`,
    name: presetName,
    createdAt: new Date().toISOString(),
    itemLabel: currentLookup.item.searchLabel,
    category: currentLookup.item.category,
    queryOptions: currentLookup.queryOptions
  };

  settings = writeSettings({
    ...settings,
    presets: [preset, ...(settings.presets || [])].slice(0, 20)
  });
  publishSettings();

  return {
    status: 'saved',
    preset,
    settings: getPublicSettings()
  };
});

ipcMain.handle('apply-search-preset', (_event, presetId) => {
  if (!currentLookup) {
    return {
      status: 'skipped',
      message: 'No copied item has been captured yet.'
    };
  }

  const preset = (settings.presets || []).find((entry) => entry.id === presetId);
  if (!preset) {
    return {
      status: 'not-found',
      message: 'Preset was not found.'
    };
  }

  currentLookup.queryOptions = {
    ...currentLookup.queryOptions,
    ...preset.queryOptions
  };

  return {
    status: 'applied',
    preset,
    queryOptions: currentLookup.queryOptions,
    query: createTradeQuery(currentLookup.item, currentLookup.queryOptions)
  };
});

app.whenReady().then(() => {
  settings = readSettings();
  configureAutoUpdates();
  createOverlayWindow();
  createTray();
  try {
    registerShortcuts();
  } catch {
    settings = writeSettings({
      ...settings,
      shortcuts: DEFAULT_SETTINGS.shortcuts
    });
    registerShortcuts();
    updateTrayMenu();
  }
  setTimeout(() => checkForAppUpdates(), 5000);
});

app.on('will-quit', () => {
  clearTimeout(overlayBoundsSaveTimer);
  saveOverlayBounds();
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', (event) => {
  event.preventDefault();
});
