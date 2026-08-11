const fs = require('node:fs');
const path = require('node:path');
const { app } = require('electron');
const {
  EQUIPMENT_MISC_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS,
  createRuleFromItem,
  normalizeLootFilterProfile
} = require('../domain/loot-filter');
const { refreshEconomyHighlightRules } = require('./economy-highlights');
const { getChanceBaseOptions } = require('./base-type-catalog');
const { generateLootFilter } = require('./loot-filter-generator');

function getDefaultFilterPath() {
  return path.join(app.getPath('documents'), 'My Games', 'Path of Exile', 'POEHelper.filter');
}

function getLootFilterSummary(settings) {
  const lootFilter = normalizeLootFilterSettings(settings?.lootFilter);
  return {
    enabled: lootFilter.enabled,
    outputPath: lootFilter.outputPath,
    quickAction: lootFilter.profile.quickAction,
    userRuleCount: lootFilter.profile.userRules.length,
    profileName: lootFilter.profile.name,
    profileVersion: lootFilter.profile.profileVersion
  };
}

async function getLootFilterState(settings) {
  const lootFilter = normalizeLootFilterSettings(settings?.lootFilter);
  const preview = generateLootFilter(lootFilter.profile);
  return {
    ...getLootFilterSummary({ lootFilter }),
    profile: lootFilter.profile,
    rareEquipmentGroups: {
      armor: toUiGroups(RARE_ARMOR_GROUPS),
      shields: toUiGroups(RARE_SHIELD_GROUPS),
      weapons: toUiGroups(RARE_WEAPON_GROUPS),
      misc: toUiGroups(EQUIPMENT_MISC_GROUPS)
    },
    chanceBaseOptions: await getChanceBaseOptions(lootFilter.profile),
    preview,
    previewBytes: Buffer.byteLength(preview, 'utf8')
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
  return {
    enabled: source.enabled !== false,
    outputPath: String(source.outputPath || getDefaultFilterPath()),
    profile: normalizeLootFilterProfile(source.profile)
  };
}

function setLootFilterConfig(settings, patch = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  return {
    ...current,
    enabled: patch.enabled === undefined ? current.enabled : Boolean(patch.enabled),
    outputPath: String(patch.outputPath || current.outputPath),
    profile: normalizeLootFilterProfile({
      ...current.profile,
      quickAction: patch.quickAction || current.profile.quickAction,
      quickRuleDefaults: patch.quickRuleDefaults || current.profile.quickRuleDefaults
    })
  };
}

function updateLootFilterProfile(settings, profilePatch = {}) {
  const current = normalizeLootFilterSettings(settings.lootFilter);
  return {
    ...current,
    profile: normalizeLootFilterProfile({
      ...current.profile,
      ...profilePatch
    })
  };
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
      ...lootFilter,
      profile
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
    ...lootFilter,
    profile
  };
}

function clearLootFilterRules(settings) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  return {
    ...lootFilter,
    profile: normalizeLootFilterProfile({
      ...lootFilter.profile,
      userRules: []
    })
  };
}

async function refreshLootFilterEconomyHighlights(settings, league) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const economy = lootFilter.profile.economyHighlights || {};
  const snapshot = await refreshEconomyHighlightRules(league, economy);
  return {
    ...lootFilter,
    profile: normalizeLootFilterProfile({
      ...lootFilter.profile,
      economyHighlights: {
        ...economy,
        ...snapshot
      }
    })
  };
}

function writeLootFilter(settings) {
  const lootFilter = normalizeLootFilterSettings(settings.lootFilter);
  const output = generateLootFilter(lootFilter.profile);
  fs.mkdirSync(path.dirname(lootFilter.outputPath), { recursive: true });
  fs.writeFileSync(lootFilter.outputPath, output, 'utf8');
  return {
    status: 'written',
    outputPath: lootFilter.outputPath,
    bytes: Buffer.byteLength(output, 'utf8'),
    userRuleCount: lootFilter.profile.userRules.length
  };
}

module.exports = {
  addCapturedItemRule,
  clearLootFilterRules,
  generateLootFilter,
  getDefaultFilterPath,
  getLootFilterSummary,
  getLootFilterState,
  normalizeLootFilterSettings,
  removeLootFilterRule,
  refreshLootFilterEconomyHighlights,
  setLootFilterConfig,
  updateLootFilterProfile,
  writeLootFilter
};
