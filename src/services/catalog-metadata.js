const {
  CATALOG_AMBIGUITY_RULES,
  CATALOG_AMBIGUITY_RULES_METADATA
} = require('../data/catalog-ambiguity-rules');
const {
  CHANCE_TARGET_OVERRIDES,
  CHANCE_TARGET_OVERRIDES_METADATA
} = require('../data/chance-target-overrides');
const {
  EQUIPMENT_BASE_REQUIREMENTS,
  EQUIPMENT_BASE_REQUIREMENTS_METADATA
} = require('../data/equipment-base-requirements');
const {
  EQUIPMENT_MISC_GROUPS,
  RARE_EQUIPMENT_GROUPS_METADATA,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
} = require('../data/rare-equipment-groups');
const {
  DEFAULT_ECONOMY_TYPES,
  ECONOMY_CACHE_VERSION
} = require('./economy-highlights');

function getCatalogMetadata() {
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    catalogs: [
      createCatalogEntry('equipmentBaseRequirements', EQUIPMENT_BASE_REQUIREMENTS_METADATA, {
        entries: Object.keys(EQUIPMENT_BASE_REQUIREMENTS).length,
        purpose: 'Equipment base required-level and defense ordering for the workbench UI.'
      }),
      createCatalogEntry('rareEquipmentGroups', RARE_EQUIPMENT_GROUPS_METADATA, {
        entries: countGroupBases([
          ...RARE_ARMOR_GROUPS,
          ...RARE_SHIELD_GROUPS,
          ...RARE_WEAPON_GROUPS,
          ...EQUIPMENT_MISC_GROUPS
        ]),
        groups: RARE_ARMOR_GROUPS.length + RARE_SHIELD_GROUPS.length + RARE_WEAPON_GROUPS.length + EQUIPMENT_MISC_GROUPS.length,
        purpose: 'Curated equipment visibility groups used by generated filter hide/show rules.'
      }),
      createCatalogEntry('chanceTargetOverrides', CHANCE_TARGET_OVERRIDES_METADATA, {
        entries: CHANCE_TARGET_OVERRIDES.length,
        purpose: 'Manual chanceability overrides for known chanceable and boss-restricted unique targets.'
      }),
      createCatalogEntry('catalogAmbiguityRules', CATALOG_AMBIGUITY_RULES_METADATA, {
        entries: CATALOG_AMBIGUITY_RULES.length,
        purpose: 'Rules for display names that need canonical BaseType handling.'
      }),
      {
        id: 'economyNormalization',
        schemaVersion: 1,
        dataVersion: `economy-cache-v${ECONOMY_CACHE_VERSION}`,
        gameVersion: 'league-runtime',
        source: 'poe.ninja economy endpoints translated through local economy-item-adapter rules',
        sourceUrl: 'https://poe.ninja/api/data',
        updatePolicy: 'Run npm run audit:economy <league> after league starts and after economy adapter changes.',
        entries: DEFAULT_ECONOMY_TYPES.length,
        purpose: 'Runtime economy rows normalized into conservative item-filter rules.'
      }
    ],
    releaseChecklist: [
      'npm run catalog:refresh-equipment -- --source <PathOfBuilding/src/Data/Bases>',
      'npm run validate:equipment',
      'npm run audit:chance <league> <minChaos>',
      'npm run audit:economy <league>',
      'npm run catalog:audit',
      'npm run check'
    ]
  };
}

function createCatalogEntry(id, metadata = {}, extra = {}) {
  return {
    id,
    schemaVersion: metadata.schemaVersion,
    dataVersion: metadata.dataVersion,
    gameVersion: metadata.gameVersion,
    generatedAt: metadata.generatedAt,
    updatedAt: metadata.updatedAt,
    source: metadata.source,
    sourceUrl: metadata.sourceUrl,
    sourceRevision: metadata.sourceRevision,
    manualOverrides: metadata.manualOverrides || [],
    updatePolicy: metadata.updatePolicy,
    ...extra
  };
}

function countGroupBases(groups) {
  return groups.reduce((total, group) => total + (group.bases || []).length, 0);
}

function formatCatalogMetadata(metadata = getCatalogMetadata()) {
  return (metadata.catalogs || [])
    .map((catalog) => {
      const version = catalog.dataVersion || 'unversioned';
      const gameVersion = catalog.gameVersion || 'unknown game version';
      const count = catalog.entries === undefined ? '' : ` (${catalog.entries} entries)`;
      return `${catalog.id}: ${version} / ${gameVersion}${count}`;
    })
    .join('\n');
}

module.exports = {
  formatCatalogMetadata,
  getCatalogMetadata
};
