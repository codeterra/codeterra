const {
  EQUIPMENT_MISC_VISIBILITY_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
} = require('../domain/loot-filter');

function summarizeGeneratedFilter(output, profile = {}) {
  const text = String(output || '');
  const lines = text.length ? text.split(/\r?\n/) : [];
  const actionCounts = countActionBlocks(lines);
  const equipment = summarizeEquipmentVisibility(profile.rareEquipment);
  const economyEntries = profile.economyHighlights?.entries || [];
  const skippedEconomyEntries = countSkippedEconomyEntries(profile.economyHighlights?.skippedEntries);
  const chanceBases = profile.chanceBases?.bases || [];

  return {
    bytes: Buffer.byteLength(text, 'utf8'),
    lines: lines.length,
    blocks: actionCounts.show + actionCounts.hide + actionCounts.minimal,
    showBlocks: actionCounts.show,
    hideBlocks: actionCounts.hide,
    minimalBlocks: actionCounts.minimal,
    sectionHeaders: lines.filter((line) => /^#\s+/.test(line)).length,
    enabledCategoryRules: countEnabledCategoryRules(profile.categoryRules),
    enabledCustomRules: (profile.userRules || []).filter((rule) => rule.enabled !== false).length,
    enabledMiscRules: (profile.miscRules?.entries || []).filter((rule) => rule.enabled !== false).length,
    enabledFlaskRules: (profile.flaskRules?.rules || []).filter((rule) => rule.enabled !== false).length,
    economyEntries: economyEntries.filter((rule) => rule.enabled !== false).length,
    skippedEconomyEntries,
    chanceBases: profile.chanceBases?.enabled === false ? 0 : chanceBases.length,
    equipment
  };
}

function countSkippedEconomyEntries(skippedEntries = {}) {
  return Object.values(skippedEntries)
    .map((value) => Math.max(0, Math.round(Number(value) || 0)))
    .reduce((total, value) => total + value, 0);
}

function countActionBlocks(lines) {
  const counts = { show: 0, hide: 0, minimal: 0 };
  for (const line of lines) {
    const action = line.trim();
    if (action === 'Show') counts.show += 1;
    if (action === 'Hide') counts.hide += 1;
    if (action === 'Minimal') counts.minimal += 1;
  }
  return counts;
}

function countEnabledCategoryRules(categoryRules = {}) {
  return Object.values(categoryRules)
    .filter((category) => category?.enabled !== false)
    .reduce((count, category) => (
      count + (category.rules || []).filter((rule) => rule.enabled !== false).length
    ), 0);
}

function summarizeEquipmentVisibility(rareEquipment = {}) {
  if (!rareEquipment?.enabled) {
    return {
      enabled: false,
      hiddenArmorBases: 0,
      hiddenShieldBases: 0,
      hiddenWeaponBases: 0,
      hiddenMiscBases: 0,
      hiddenWeaponClasses: 0,
      hiddenMiscClasses: 0
    };
  }

  const selectedArmor = new Set(rareEquipment.armorGroups || []);
  const selectedShields = new Set(rareEquipment.shieldGroups || []);
  const selectedWeapons = new Set(rareEquipment.weaponGroups || []);
  const selectedMisc = new Set(rareEquipment.miscGroups || []);
  const baseSelections = rareEquipment.baseSelections || {};

  return {
    enabled: true,
    hiddenArmorBases: getDisabledBases(RARE_ARMOR_GROUPS, selectedArmor, baseSelections.armor).length,
    hiddenShieldBases: getDisabledBases(RARE_SHIELD_GROUPS, selectedShields, baseSelections.shields).length,
    hiddenWeaponBases: getDisabledBases(RARE_WEAPON_GROUPS, selectedWeapons, baseSelections.weapons).length,
    hiddenMiscBases: getDisabledBases(EQUIPMENT_MISC_VISIBILITY_GROUPS, selectedMisc, baseSelections.misc).length,
    hiddenWeaponClasses: getDisabledClasses(RARE_WEAPON_GROUPS, selectedWeapons).length,
    hiddenMiscClasses: getDisabledClasses(EQUIPMENT_MISC_VISIBILITY_GROUPS, selectedMisc).length
  };
}

function getDisabledBases(groups, selectedGroups, selectionMap = {}) {
  const allBases = new Set(groups.flatMap((group) => group.bases || []));
  const allowedBases = new Set();

  for (const group of groups) {
    if (!selectedGroups.has(group.id)) {
      continue;
    }

    const groupBases = group.bases || [];
    const selectedBases = Array.isArray(selectionMap[group.id])
      ? selectionMap[group.id]
      : groupBases;
    const available = new Set(groupBases);
    for (const base of selectedBases) {
      if (available.has(base)) {
        allowedBases.add(base);
      }
    }
  }

  return [...allBases].filter((base) => !allowedBases.has(base));
}

function getDisabledClasses(groups, selectedGroups) {
  return groups
    .filter((group) => !selectedGroups.has(group.id))
    .flatMap((group) => group.classes || []);
}

function formatFilterSummary(summary = {}) {
  const equipment = summary.equipment || {};
  const hiddenEquipment = equipment.enabled
    ? equipment.hiddenArmorBases
      + equipment.hiddenShieldBases
      + equipment.hiddenWeaponBases
      + equipment.hiddenMiscBases
      + equipment.hiddenWeaponClasses
      + equipment.hiddenMiscClasses
    : 0;

  return [
    `${summary.showBlocks || 0} Show`,
    `${summary.hideBlocks || 0} Hide`,
    `${summary.enabledCategoryRules || 0} category rules`,
    `${summary.enabledCustomRules || 0} custom rules`,
    `${summary.economyEntries || 0} economy entries`,
    `${summary.skippedEconomyEntries || 0} skipped economy rows`,
    `${summary.chanceBases || 0} chance bases`,
    equipment.enabled ? `${hiddenEquipment} equipment hides` : 'equipment narrowing off'
  ].join(' | ');
}

module.exports = {
  formatFilterSummary,
  summarizeGeneratedFilter
};
