const assert = require('node:assert/strict');
const { CATALOG_AMBIGUITY_RULES, getCanonicalBaseType } = require('../src/data/catalog-ambiguity-rules');
const { EQUIPMENT_BASE_REQUIREMENTS } = require('../src/data/equipment-base-requirements');
const {
  EQUIPMENT_MISC_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
} = require('../src/data/rare-equipment-groups');
const { formatCatalogMetadata, getCatalogMetadata } = require('../src/services/catalog-metadata');

function main() {
  const metadata = getCatalogMetadata();
  const failures = [];

  for (const catalog of metadata.catalogs || []) {
    for (const key of ['id', 'schemaVersion', 'dataVersion', 'gameVersion', 'source', 'updatePolicy']) {
      if (!catalog[key]) {
        failures.push(`${catalog.id || 'unknown catalog'} is missing ${key}.`);
      }
    }
  }

  const requirementKeys = new Set(Object.keys(EQUIPMENT_BASE_REQUIREMENTS));
  const defensiveBases = [
    ...RARE_ARMOR_GROUPS,
    ...RARE_SHIELD_GROUPS
  ].flatMap((group) => group.bases || []);

  const missingRequirements = defensiveBases
    .filter((base) => !requirementKeys.has(base));
  if (missingRequirements.length) {
    failures.push(`Missing equipment requirement rows: ${missingRequirements.slice(0, 20).join(', ')}`);
  }

  for (const rule of CATALOG_AMBIGUITY_RULES) {
    assert.equal(getCanonicalBaseType(rule.displayName), rule.canonicalBaseType);
    for (const variantName of rule.internalVariantNames || []) {
      assert.equal(getCanonicalBaseType(variantName), rule.canonicalBaseType);
    }
  }

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
    return;
  }

  console.log('Catalog audit passed.');
  console.log(formatCatalogMetadata(metadata));
}

main();
