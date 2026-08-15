const CATALOG_AMBIGUITY_RULES_METADATA = {
  schemaVersion: 1,
  dataVersion: 'ambiguity-rules-2026-08-15',
  gameVersion: 'release-reviewed-2026-08-15',
  updatedAt: '2026-08-15',
  source: 'Manual rules for names where UI grouping and item-filter BaseType matching can diverge.',
  updatePolicy: 'Review whenever GGG adds same-display-name base variants or filter syntax gains variant-specific conditions.'
};

const CATALOG_AMBIGUITY_RULES = [
  {
    displayName: 'Two-Toned Boots',
    canonicalBaseType: 'Two-Toned Boots',
    issue: 'Several defensive variants share the same item-filter BaseType string.',
    rule: 'Use variant labels only for UI/catalog metadata. Generated filters must emit BaseType "Two-Toned Boots" unless a future filter condition can distinguish the variant.',
    internalVariantNames: [
      'Two-Toned Boots (Armour/Energy Shield)',
      'Two-Toned Boots (Armour/Evasion)',
      'Two-Toned Boots (Evasion/Energy Shield)'
    ]
  }
];

function getCanonicalBaseType(baseType) {
  const text = String(baseType || '');
  const rule = CATALOG_AMBIGUITY_RULES.find((entry) =>
    entry.internalVariantNames.includes(text) || entry.displayName === text
  );
  return rule?.canonicalBaseType || text;
}

module.exports = {
  CATALOG_AMBIGUITY_RULES,
  CATALOG_AMBIGUITY_RULES_METADATA,
  getCanonicalBaseType
};
