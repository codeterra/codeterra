function diffLootFilterProfiles(currentProfile = {}, importedProfile = {}) {
  const current = summarizeProfile(currentProfile);
  const imported = summarizeProfile(importedProfile);
  const changes = [];

  addChange(changes, 'Name', current.name, imported.name);
  addChange(changes, 'Mode', current.mode, imported.mode);
  addChange(changes, 'Raw imported filter', current.rawReference, imported.rawReference);
  addChange(changes, 'Captured rules', current.userRules, imported.userRules);
  addChange(changes, 'Custom rules', current.customRules, imported.customRules);
  addChange(changes, 'Category rules', current.categoryRules, imported.categoryRules);
  addChange(changes, 'Misc rules', current.miscRules, imported.miscRules);
  addChange(changes, 'Economy entries', current.economyEntries, imported.economyEntries);
  addChange(changes, 'Chance bases', current.chanceBases, imported.chanceBases);
  addChange(changes, 'Style groups', current.styles, imported.styles);

  return {
    status: changes.length ? 'changed' : 'unchanged',
    current,
    imported,
    changes
  };
}

function summarizeProfile(profile = {}) {
  return {
    name: profile.name || 'Unnamed profile',
    mode: profile.mode || 'show-all',
    rawReference: profile.importedFilter?.mode === 'raw-reference' ? 'yes' : 'no',
    userRules: Array.isArray(profile.userRules) ? profile.userRules.length : 0,
    customRules: Array.isArray(profile.specialItems?.entries) ? profile.specialItems.entries.length : 0,
    categoryRules: countCategoryRules(profile.categoryRules),
    miscRules: Array.isArray(profile.miscRules?.entries) ? profile.miscRules.entries.length : 0,
    economyEntries: Array.isArray(profile.economyHighlights?.entries) ? profile.economyHighlights.entries.length : 0,
    chanceBases: Array.isArray(profile.chanceBases?.bases) ? profile.chanceBases.bases.length : 0,
    styles: profile.styles && typeof profile.styles === 'object' ? Object.keys(profile.styles).length : 0
  };
}

function countCategoryRules(categoryRules = {}) {
  if (!categoryRules || typeof categoryRules !== 'object') {
    return 0;
  }

  return Object.values(categoryRules)
    .reduce((sum, category) => sum + (Array.isArray(category?.rules) ? category.rules.length : 0), 0);
}

function addChange(changes, label, before, after) {
  if (String(before) === String(after)) {
    return;
  }

  changes.push({ label, before, after });
}

module.exports = {
  diffLootFilterProfiles,
  summarizeProfile
};
