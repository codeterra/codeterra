const fs = require('node:fs');
const path = require('node:path');
const { app } = require('electron');
const {
  EQUIPMENT_MISC_VISIBILITY_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS,
  createRuleFromItem,
  normalizeLootFilterProfile
} = require('../domain/loot-filter');
const { EQUIPMENT_BASE_REQUIREMENTS } = require('../data/equipment-base-requirements');
const { refreshEconomyHighlightRules } = require('./economy-highlights');
const { getChanceBaseOptions } = require('./base-type-catalog');
const { getCatalogMetadata } = require('./catalog-metadata');
const { generateLootFilter } = require('./loot-filter-generator');
const { summarizeFilterFileDiff } = require('./loot-filter-diff');
const { diffLootFilterProfiles } = require('./loot-filter-profile-diff');
const { parseLootFilter } = require('./loot-filter-parser');
const { summarizeGeneratedFilter } = require('./loot-filter-summary');

const LOOT_FILTER_LIBRARY_SCHEMA_VERSION = 1;
const LOOT_FILTER_PROFILE_EXPORT_VERSION = 2;
const DEFAULT_PROFILE_ID = 'profile-default';
const HISTORY_DIR_NAME = '.poehelper-history';
const HISTORY_LIMIT = 20;

function sanitizeFilterFileName(name) {
  const safe = String(name || 'POEHelper')
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[. ]+$/g, '')
    .slice(0, 80);
  return safe || 'POEHelper';
}

function getDefaultFilterDirectory() {
  return path.join(app.getPath('documents'), 'My Games', 'Path of Exile');
}

function getDefaultFilterPath(profileName = 'POEHelper') {
  return path.join(getDefaultFilterDirectory(), `${sanitizeFilterFileName(profileName)}.filter`);
}

function getLootFilterSummary(settings) {
  const lootFilter = normalizeLootFilterSettings(settings?.lootFilter);
  return {
    activeProfileId: lootFilter.activeProfileId,
    enabled: lootFilter.enabled,
    outputPath: lootFilter.outputPath,
    quickAction: lootFilter.profile.quickAction,
    userRuleCount: lootFilter.profile.userRules.length,
    profiles: lootFilter.profiles.map(toProfileSummary),
    profileName: lootFilter.profile.name,
    profileVersion: lootFilter.profile.profileVersion
  };
}

async function getLootFilterState(settings) {
  const lootFilter = normalizeLootFilterSettings(settings?.lootFilter);
  const preview = generateLootFilter(lootFilter.profile);
  const previewSummary = summarizeGeneratedFilter(preview, lootFilter.profile);
  const previewDiff = summarizeFilterFileDiff(lootFilter.outputPath, preview);
  return {
    ...getLootFilterSummary({ lootFilter }),
    profile: lootFilter.profile,
    rareEquipmentGroups: {
      armor: toUiGroups(RARE_ARMOR_GROUPS),
      shields: toUiGroups(RARE_SHIELD_GROUPS),
      weapons: toUiGroups(RARE_WEAPON_GROUPS),
      misc: toUiGroups(EQUIPMENT_MISC_VISIBILITY_GROUPS)
    },
    equipmentBaseRequirements: EQUIPMENT_BASE_REQUIREMENTS,
    chanceBaseOptions: await getChanceBaseOptions(lootFilter.profile),
    soundFiles: getLootFilterSoundFiles(lootFilter),
    preview,
    previewBytes: previewSummary.bytes,
    previewSummary,
    previewDiff,
    history: getLootFilterHistoryEntries(lootFilter)
  };
}

function toUiGroups(groups) {
  return groups.map(({ id, label, classes, bases }) => ({
    id,
    label,
    classes: classes || [],
    bases: bases || []
  }));
}

function normalizeLootFilterSettings(lootFilter) {
  const source = lootFilter && typeof lootFilter === 'object' ? lootFilter : {};
  const profileEntries = normalizeProfileEntries(source);
  const activeProfileId = profileEntries.some((entry) => entry.id === source.activeProfileId)
    ? String(source.activeProfileId)
    : profileEntries[0].id;
  const activeProfile = profileEntries.find((entry) => entry.id === activeProfileId) || profileEntries[0];

  return {
    librarySchemaVersion: LOOT_FILTER_LIBRARY_SCHEMA_VERSION,
    enabled: source.enabled !== false,
    activeProfileId,
    profiles: profileEntries,
    outputPath: activeProfile.outputPath,
    profile: activeProfile.profile
  };
}

function setLootFilterConfig(settings, patch = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const nextName = normalizeProfileName(patch.profileName || current.profile.name);
  const requestedOutputPath = String(patch.outputPath || '').trim();
  const outputPath = requestedOutputPath
    ? maybeRetargetManagedPath(requestedOutputPath, current.profile.name, nextName)
    : getDefaultFilterPath(nextName);
  const profile = normalizeLootFilterProfile({
    ...current.profile,
    name: nextName,
    quickAction: patch.quickAction || current.profile.quickAction,
    quickRuleDefaults: patch.quickRuleDefaults || current.profile.quickRuleDefaults
  });

  return updateActiveProfileEntry({
    ...current,
    enabled: patch.enabled === undefined ? current.enabled : Boolean(patch.enabled)
  }, {
    name: nextName,
    outputPath,
    profile
  });
}

function updateLootFilterProfile(settings, profilePatch = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const nextName = normalizeProfileName(profilePatch.name || current.profile.name);
  const profile = normalizeLootFilterProfile({
    ...current.profile,
    ...profilePatch,
    name: nextName
  });

  return updateActiveProfileEntry(current, {
    name: nextName,
    profile
  });
}

function setActiveLootFilterProfile(settings, profileId) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const activeProfile = current.profiles.find((entry) => entry.id === String(profileId || ''));
  if (!activeProfile) {
    return current;
  }

  return normalizeLootFilterSettings({
    ...current,
    activeProfileId: activeProfile.id
  });
}

function createLootFilterProfile(settings, options = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const copyCurrent = Boolean(options.copyCurrent);
  const sourceProfile = copyCurrent ? current.profile : undefined;
  const name = getUniqueProfileName(
    normalizeProfileName(options.name || (copyCurrent ? `${current.profile.name} Copy` : 'New Filter')),
    current.profiles
  );
  const profile = normalizeLootFilterProfile({
    ...(sourceProfile || {}),
    name,
    userRules: copyCurrent ? sourceProfile.userRules : []
  });
  const entry = normalizeProfileEntry({
    id: createProfileId(name),
    name,
    outputPath: getDefaultFilterPath(name),
    profile,
    createdAt: new Date().toISOString()
  });

  return normalizeLootFilterSettings({
    ...current,
    activeProfileId: entry.id,
    profiles: [...current.profiles, entry]
  });
}

function deleteLootFilterProfile(settings, profileId) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  if (current.profiles.length <= 1) {
    return current;
  }

  const nextProfiles = current.profiles.filter((entry) => entry.id !== String(profileId || current.activeProfileId));
  return normalizeLootFilterSettings({
    ...current,
    activeProfileId: nextProfiles[0]?.id,
    profiles: nextProfiles
  });
}

function exportLootFilterProfile(settings, profileId) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const entry = current.profiles.find((profileEntry) => profileEntry.id === String(profileId || current.activeProfileId))
    || current.profiles[0];
  return {
    kind: 'poehelper-loot-filter-profile',
    version: LOOT_FILTER_PROFILE_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    profile: {
      ...entry,
      profile: normalizeLootFilterProfile({
        ...entry.profile,
        name: entry.name
      })
    }
  };
}

function createLootFilterProfileImportPreview(settings, payload, options = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const prepared = prepareImportedProfileEntry(current, payload, options);
  return {
    status: 'preview',
    kind: prepared.kind,
    filePath: options.filePath,
    profileName: prepared.entry.name,
    outputPath: prepared.entry.outputPath,
    importedSummary: prepared.summary,
    migration: prepared.migration,
    diff: diffLootFilterProfiles(current.profile, prepared.entry.profile)
  };
}

function importLootFilterProfile(settings, payload, options = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  const { entry } = prepareImportedProfileEntry(current, payload, options);

  return normalizeLootFilterSettings({
    ...current,
    activeProfileId: entry.id,
    profiles: [...current.profiles, entry]
  });
}

function prepareImportedProfileEntry(current, payload, options = {}) {
  const migration = migrateImportedProfilePayload(payload);
  const rawEntry = migration.entry;
  const baseName = normalizeProfileName(rawEntry.name || rawEntry.profile?.name || getImportNameFromPath(options.filePath) || 'Imported Filter');
  const name = getUniqueProfileName(baseName, current.profiles);
  const entry = normalizeProfileEntry({
    ...rawEntry,
    id: createProfileId(name),
    name,
    outputPath: rawEntry.outputPath || getDefaultFilterPath(name),
    profile: {
      ...(rawEntry.profile || rawEntry),
      name
    },
    importedAt: new Date().toISOString()
  });

  return {
    kind: migration.kind,
    migration: migration.migration,
    summary: createImportedProfileSummary(entry.profile, migration),
    entry
  };
}

function migrateImportedProfilePayload(payload) {
  const source = payload && typeof payload === 'object' ? payload : {};
  if (source.kind === 'poehelper-raw-filter-import') {
    return {
      kind: 'filter',
      migration: {
        sourceKind: source.kind,
        fromVersion: Number(source.version) || 1,
        toVersion: LOOT_FILTER_PROFILE_EXPORT_VERSION,
        warnings: []
      },
      entry: createRawFilterProfileEntry(source)
    };
  }

  const rawEntry = unwrapImportedProfile(source);
  const fromVersion = Number(source.version) || 1;
  return {
    kind: 'json',
    migration: {
      sourceKind: source.kind || 'legacy-profile-json',
      fromVersion,
      toVersion: LOOT_FILTER_PROFILE_EXPORT_VERSION,
      warnings: fromVersion > LOOT_FILTER_PROFILE_EXPORT_VERSION
        ? [`Profile export version ${fromVersion} is newer than this app understands; unsupported fields may be ignored.`]
        : []
    },
    entry: rawEntry
  };
}

function createRawFilterImportPayload(filePath, rawText) {
  const parsed = parseLootFilter(rawText, { sourcePath: filePath });
  return {
    kind: 'poehelper-raw-filter-import',
    version: 1,
    importedAt: new Date().toISOString(),
    sourcePath: filePath,
    fileName: path.basename(filePath || 'Imported.filter'),
    summary: parsed.summary,
    rawText
  };
}

function createRawFilterProfileEntry(source) {
  const fileName = String(source.fileName || path.basename(source.sourcePath || 'Imported.filter'));
  const name = normalizeProfileName(fileName.replace(/\.filter$/i, ''));
  return {
    name,
    profile: normalizeLootFilterProfile({
      name,
      mode: 'raw-reference',
      userRules: [],
      importedFilter: {
        mode: 'raw-reference',
        fileName,
        sourcePath: source.sourcePath,
        importedAt: source.importedAt,
        summary: source.summary,
        rawText: String(source.rawText || '')
      }
    })
  };
}

function createImportedProfileSummary(profile, migration) {
  const importedFilter = profile.importedFilter;
  if (importedFilter?.mode === 'raw-reference') {
    return {
      type: 'Raw .filter',
      blocks: importedFilter.summary?.blocks || 0,
      showBlocks: importedFilter.summary?.showBlocks || 0,
      hideBlocks: importedFilter.summary?.hideBlocks || 0,
      lines: importedFilter.summary?.lines || 0,
      bytes: importedFilter.summary?.bytes || 0,
      preservesOriginalText: true
    };
  }

  return {
    type: 'POEHelper JSON profile',
    version: migration.migration?.fromVersion,
    capturedRules: profile.userRules?.length || 0,
    customRules: profile.specialItems?.entries?.length || 0,
    economyEntries: profile.economyHighlights?.entries?.length || 0,
    chanceBases: profile.chanceBases?.bases?.length || 0
  };
}

function getImportNameFromPath(filePath) {
  const baseName = path.basename(String(filePath || ''), path.extname(String(filePath || '')));
  return baseName || undefined;
}

function addCapturedItemRule(settings, item, options = {}) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const action = options.action || lootFilter.profile.quickAction;
  const rule = createRuleFromItem(item, {
    action,
    defaults: lootFilter.profile.quickRuleDefaults
  });
  const profile = normalizeLootFilterProfile({
    ...lootFilter.profile,
    userRules: [rule, ...lootFilter.profile.userRules].slice(0, 200)
  });

  return {
    lootFilter: {
      ...updateActiveProfileEntry(lootFilter, { profile })
    },
    rule
  };
}

function removeLootFilterRule(settings, ruleId) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const profile = normalizeLootFilterProfile({
    ...lootFilter.profile,
    userRules: lootFilter.profile.userRules.filter((rule) => rule.id !== ruleId)
  });

  return {
    ...updateActiveProfileEntry(lootFilter, { profile })
  };
}

function clearLootFilterRules(settings) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  return {
    ...updateActiveProfileEntry(lootFilter, {
      profile: normalizeLootFilterProfile({
        ...lootFilter.profile,
        userRules: []
      })
    })
  };
}

async function refreshLootFilterEconomyHighlights(settings, league) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const economy = lootFilter.profile.economyHighlights || {};
  const snapshot = await refreshEconomyHighlightRules(league, economy);
  return updateActiveProfileEntry(lootFilter, {
    profile: normalizeLootFilterProfile({
      ...lootFilter.profile,
      economyHighlights: {
        ...economy,
        ...snapshot
      }
    })
  });
}

function writeLootFilter(settings) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const output = generateLootFilter(lootFilter.profile);
  const summary = summarizeGeneratedFilter(output, lootFilter.profile);
  const previousDiff = summarizeFilterFileDiff(lootFilter.outputPath, output);
  fs.mkdirSync(path.dirname(lootFilter.outputPath), { recursive: true });
  fs.writeFileSync(lootFilter.outputPath, output, 'utf8');
  const historyEntry = writeLootFilterHistoryEntry(lootFilter, output, summary);
  pruneLootFilterHistory(lootFilter);
  return {
    status: 'written',
    outputPath: lootFilter.outputPath,
    writtenAt: new Date().toISOString(),
    bytes: summary.bytes,
    userRuleCount: lootFilter.profile.userRules.length,
    summary,
    previousDiff,
    catalogMetadata: getCatalogMetadata(),
    historyEntry
  };
}

function getLootFilterHistoryEntries(lootFilter, options = {}) {
  const historyDir = getLootFilterHistoryDir(lootFilter.outputPath);
  try {
    const entries = fs.readdirSync(historyDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => readHistoryMetadata(path.join(historyDir, entry.name)))
      .filter(Boolean)
      .sort((left, right) => String(right.writtenAt).localeCompare(String(left.writtenAt)));
    return options.limit === false ? entries : entries.slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

function writeLootFilterHistoryEntry(lootFilter, output, summary) {
  const writtenAt = new Date().toISOString();
  const historyDir = getLootFilterHistoryDir(lootFilter.outputPath);
  fs.mkdirSync(historyDir, { recursive: true });
  const id = `${writtenAt.replace(/[:.]/g, '-')}-${sanitizeFilterFileName(lootFilter.profile.name).replace(/\s+/g, '-')}`;
  const filterFile = `${id}.filter`;
  const metadataFile = `${id}.json`;
  fs.writeFileSync(path.join(historyDir, filterFile), output, 'utf8');
  const metadata = {
    id,
    writtenAt,
    profileName: lootFilter.profile.name,
    outputPath: lootFilter.outputPath,
    filterFile,
    bytes: summary.bytes,
    showBlocks: summary.showBlocks,
    hideBlocks: summary.hideBlocks,
    economyEntries: summary.economyEntries,
    chanceBases: summary.chanceBases
  };
  fs.writeFileSync(path.join(historyDir, metadataFile), `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
  return metadata;
}

function restoreLootFilterHistory(settings, historyId) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const entry = getLootFilterHistoryEntries(lootFilter).find((candidate) => candidate.id === String(historyId || ''));
  if (!entry) {
    return {
      status: 'missing',
      message: 'Selected filter history entry was not found.'
    };
  }

  const historyFile = path.join(getLootFilterHistoryDir(lootFilter.outputPath), entry.filterFile);
  const output = fs.readFileSync(historyFile, 'utf8');
  const previousDiff = summarizeFilterFileDiff(lootFilter.outputPath, output);
  fs.mkdirSync(path.dirname(lootFilter.outputPath), { recursive: true });
  fs.writeFileSync(lootFilter.outputPath, output, 'utf8');
  return {
    status: 'restored',
    outputPath: lootFilter.outputPath,
    restoredAt: new Date().toISOString(),
    historyEntry: entry,
    summary: summarizeGeneratedFilter(output, lootFilter.profile),
    previousDiff
  };
}

function getLootFilterHistoryDir(outputPath) {
  return path.join(path.dirname(outputPath || getDefaultFilterPath()), HISTORY_DIR_NAME);
}

function readHistoryMetadata(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return undefined;
  }
}

function pruneLootFilterHistory(lootFilter) {
  const historyDir = getLootFilterHistoryDir(lootFilter.outputPath);
  const entries = getLootFilterHistoryEntries(lootFilter, { limit: false });
  for (const entry of entries.slice(HISTORY_LIMIT)) {
    removeHistoryFile(historyDir, entry.filterFile);
    removeHistoryFile(historyDir, `${entry.id}.json`);
  }
}

function removeHistoryFile(historyDir, fileName) {
  if (!fileName || path.basename(fileName) !== fileName) {
    return;
  }

  try {
    fs.unlinkSync(path.join(historyDir, fileName));
  } catch {
    // History pruning is best-effort.
  }
}

function getLootFilterSoundFiles(lootFilter) {
  try {
    const filterDirectory = path.dirname(lootFilter.outputPath);
    return fs.readdirSync(filterDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.mp3$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right));
  } catch {
    return [];
  }
}

function getLootFilterSoundPreview(settings, fileName) {
  const lootFilter = normalizeLootFilterSettings(settings?.lootFilter);
  const requested = String(fileName || '').trim();
  if (!requested || path.basename(requested) !== requested || !/\.mp3$/i.test(requested)) {
    return { status: 'missing' };
  }

  const available = new Set(getLootFilterSoundFiles(lootFilter));
  if (!available.has(requested)) {
    return { status: 'missing' };
  }

  const filePath = path.join(path.dirname(lootFilter.outputPath), requested);
  const data = fs.readFileSync(filePath);
  return {
    status: 'ok',
    fileName: requested,
    mimeType: 'audio/mpeg',
    dataUrl: `data:audio/mpeg;base64,${data.toString('base64')}`
  };
}

function normalizeProfileEntries(source) {
  const entries = Array.isArray(source.profiles) ? source.profiles : [];
  const migrated = entries.length > 0
    ? entries
    : [{
        id: source.activeProfileId || DEFAULT_PROFILE_ID,
        name: source.profile?.name,
        outputPath: source.outputPath,
        profile: source.profile
      }];
  const usedIds = new Set();
  const normalized = [];

  for (let index = 0; index < migrated.length; index += 1) {
    const entry = normalizeProfileEntry(migrated[index], index);
    let id = entry.id;
    while (usedIds.has(id)) {
      id = `${entry.id}-${normalized.length + 1}`;
    }
    usedIds.add(id);
    normalized.push({ ...entry, id });
  }

  return normalized.length > 0
    ? normalized
    : [normalizeProfileEntry({ id: DEFAULT_PROFILE_ID })];
}

function normalizeProfileEntry(entryLike = {}, index = 0) {
  const source = entryLike && typeof entryLike === 'object' ? entryLike : {};
  const profileSource = source.profile && typeof source.profile === 'object' ? source.profile : source;
  const name = normalizeProfileName(source.name || profileSource.name || 'POEHelper Fresh Slate');
  const outputPath = normalizeProfileOutputPath(source.outputPath, name);
  const profile = normalizeLootFilterProfile({
    ...profileSource,
    name
  });
  return {
    id: normalizeProfileId(source.id) || (index === 0 ? DEFAULT_PROFILE_ID : createProfileId(name)),
    name,
    outputPath,
    profile,
    createdAt: source.createdAt || new Date().toISOString(),
    updatedAt: source.updatedAt
  };
}

function normalizeProfileName(name) {
  return String(name || '').trim() || 'POEHelper Fresh Slate';
}

function normalizeProfileId(id) {
  return String(id || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 80);
}

function createProfileId(name) {
  const slug = sanitizeFilterFileName(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'filter';
  return `profile-${slug}-${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`;
}

function getUniqueProfileName(name, existingProfiles) {
  const existing = new Set((existingProfiles || []).map((entry) => entry.name.toLowerCase()));
  if (!existing.has(name.toLowerCase())) {
    return name;
  }

  for (let index = 2; index < 1000; index += 1) {
    const nextName = `${name} ${index}`;
    if (!existing.has(nextName.toLowerCase())) {
      return nextName;
    }
  }

  return `${name} ${Date.now()}`;
}

function maybeRetargetManagedPath(outputPath, oldName, nextName) {
  const normalizedOutput = path.normalize(outputPath);
  const legacyDefault = path.normalize(path.join(getDefaultFilterDirectory(), 'POEHelper.filter'));
  if (normalizedOutput === legacyDefault) {
    return getDefaultFilterPath(nextName);
  }

  if (normalizeProfileName(oldName) === normalizeProfileName(nextName)) {
    return outputPath;
  }

  const oldDefault = path.normalize(getDefaultFilterPath(oldName));
  if (normalizedOutput === oldDefault) {
    return getDefaultFilterPath(nextName);
  }

  return outputPath;
}

function normalizeProfileOutputPath(outputPath, profileName) {
  const requested = String(outputPath || '').trim();
  if (!requested) {
    return getDefaultFilterPath(profileName);
  }

  const legacyDefault = path.normalize(path.join(getDefaultFilterDirectory(), 'POEHelper.filter'));
  return path.normalize(requested) === legacyDefault ? getDefaultFilterPath(profileName) : requested;
}

function updateActiveProfileEntry(lootFilter, patch = {}) {
  const now = new Date().toISOString();
  const profiles = lootFilter.profiles.map((entry) => {
    if (entry.id !== lootFilter.activeProfileId) {
      return entry;
    }

    const nextName = normalizeProfileName(patch.name || patch.profile?.name || entry.name);
    const profile = normalizeLootFilterProfile({
      ...entry.profile,
      ...(patch.profile || {}),
      name: nextName
    });
    return {
      ...entry,
      ...patch,
      name: nextName,
      outputPath: String(patch.outputPath || entry.outputPath || getDefaultFilterPath(nextName)),
      profile,
      updatedAt: now
    };
  });

  return normalizeLootFilterSettings({
    ...lootFilter,
    profiles
  });
}

function toProfileSummary(entry) {
  return {
    id: entry.id,
    name: entry.name,
    outputPath: entry.outputPath,
    userRuleCount: entry.profile?.userRules?.length || 0,
    profileVersion: entry.profile?.profileVersion
  };
}

function unwrapImportedProfile(payload) {
  const source = payload && typeof payload === 'object' ? payload : {};
  if (source.kind === 'poehelper-loot-filter-profile' && source.profile) {
    return source.profile;
  }

  if (source.profile && (source.name || source.outputPath || source.id)) {
    return source;
  }

  return {
    name: source.name,
    profile: source
  };
}

module.exports = {
  addCapturedItemRule,
  clearLootFilterRules,
  createLootFilterProfileImportPreview,
  createLootFilterProfile,
  createRawFilterImportPayload,
  deleteLootFilterProfile,
  exportLootFilterProfile,
  generateLootFilter,
  getDefaultFilterPath,
  getLootFilterSummary,
  getLootFilterState,
  getLootFilterSoundFiles,
  getLootFilterSoundPreview,
  importLootFilterProfile,
  normalizeLootFilterSettings,
  removeLootFilterRule,
  refreshLootFilterEconomyHighlights,
  restoreLootFilterHistory,
  sanitizeFilterFileName,
  setActiveLootFilterProfile,
  setLootFilterConfig,
  updateLootFilterProfile,
  writeLootFilter
};
