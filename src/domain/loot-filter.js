const {
  EQUIPMENT_MISC_GROUPS,
  FLASK_EQUIPMENT_GROUP_IDS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
} = require('../data/rare-equipment-groups');

const LOOT_FILTER_PROFILE_SCHEMA_VERSION = 1;
const ECONOMY_HIGHLIGHT_CACHE_VERSION = 3;

const OIL_BASE_TYPES = [
  'Golden Oil',
  'Silver Oil',
  'Opalescent Oil',
  'Black Oil',
  'Crimson Oil',
  'Violet Oil',
  'Azure Oil',
  'Teal Oil',
  'Verdant Oil',
  'Amber Oil',
  'Sepia Oil',
  'Clear Oil',
  'Prismatic Oil',
  'Reflective Oil',
  'Tainted Oil'
];
const FLASK_GROUPS = EQUIPMENT_MISC_GROUPS.filter((group) => FLASK_EQUIPMENT_GROUP_IDS.includes(group.id));
const EQUIPMENT_MISC_VISIBILITY_GROUPS = EQUIPMENT_MISC_GROUPS.filter((group) => !FLASK_EQUIPMENT_GROUP_IDS.includes(group.id));
const FLASK_CLASSES = [...new Set(FLASK_GROUPS.flatMap((group) => group.classes || []))];
const FLASK_BASE_TYPES = [...new Set(FLASK_GROUPS.flatMap((group) => group.bases || []))];

const DEFAULT_LOOT_FILTER_PROFILE = {
  schemaVersion: LOOT_FILTER_PROFILE_SCHEMA_VERSION,
  profileVersion: 'poehelper-filter-profile-2026-08-09',
  name: 'POEHelper Fresh Slate',
  mode: 'show-all',
  quickAction: 'Show',
  quickRuleDefaults: {
    includeClass: true,
    includeBaseType: true,
    includeRarity: true,
    includeItemLevel: true,
    includeMapTier: true,
    includeQuality: false,
    includeCorrupted: false
  },
  styles: {
    default: {
      textColor: [230, 230, 230, 255],
      backgroundColor: [20, 20, 20, 210],
      borderColor: [90, 90, 90, 220],
      fontSize: 32
    },
    currency: {
      textColor: [80, 255, 120, 255],
      backgroundColor: [0, 0, 0, 240],
      borderColor: [40, 160, 80, 255],
      fontSize: 40,
      alertSound: { id: 2, volume: 80 },
      minimapIcon: { size: 1, color: 'Green', shape: 'Circle' },
      beam: { color: 'Green', temporary: true },
      tierBorders: {
        high: [120, 255, 120, 255],
        valuable: [70, 210, 100, 255],
        baseline: [35, 120, 65, 255]
      }
    },
    rare: {
      textColor: [0, 0, 0, 255],
      backgroundColor: [255, 215, 65, 240],
      borderColor: [120, 90, 0, 255],
      fontSize: 36,
      tierBorders: {
        high: [255, 40, 40, 255],
        valuable: [255, 140, 0, 255],
        baseline: [120, 90, 0, 255]
      }
    },
    chance: {
      textColor: [150, 255, 180, 255],
      backgroundColor: [10, 18, 12, 240],
      borderColor: [80, 220, 120, 255],
      fontSize: 40,
      alertSound: { id: 2, volume: 70 },
      minimapIcon: { size: 1, color: 'Green', shape: 'Star' },
      beam: { color: 'Green', temporary: true },
      tierBorders: {
        high: [160, 255, 180, 255],
        valuable: [80, 220, 120, 255],
        baseline: [45, 140, 80, 255]
      }
    },
    unique: {
      textColor: [255, 170, 80, 255],
      backgroundColor: [30, 20, 10, 235],
      borderColor: [210, 120, 50, 255],
      fontSize: 40,
      alertSound: { id: 3, volume: 70 }
    },
    maps: {
      textColor: [170, 220, 255, 255],
      backgroundColor: [0, 10, 24, 235],
      borderColor: [80, 160, 240, 255],
      fontSize: 38,
      minimapIcon: { size: 1, color: 'Cyan', shape: 'Square' }
    },
    fragments: {
      textColor: [205, 235, 255, 255],
      backgroundColor: [6, 14, 28, 240],
      borderColor: [130, 110, 255, 255],
      fontSize: 40,
      alertSound: { id: 4, volume: 75 },
      minimapIcon: { size: 1, color: 'Blue', shape: 'Triangle' },
      beam: { color: 'Blue', temporary: true },
      tierBorders: {
        high: [170, 150, 255, 255],
        valuable: [130, 110, 255, 255],
        baseline: [75, 95, 170, 255]
      }
    },
    gems: {
      textColor: [120, 220, 255, 255],
      backgroundColor: [0, 0, 0, 225],
      borderColor: [60, 160, 220, 255],
      fontSize: 34
    },
    divinationCards: {
      textColor: [20, 20, 20, 255],
      backgroundColor: [210, 235, 255, 235],
      borderColor: [95, 150, 210, 255],
      fontSize: 36,
      minimapIcon: { size: 1, color: 'Cyan', shape: 'Diamond' },
      tierBorders: {
        high: [90, 210, 255, 255],
        valuable: [95, 150, 210, 255],
        baseline: [60, 100, 150, 255]
      }
    },
    scarabs: {
      textColor: [255, 225, 150, 255],
      backgroundColor: [22, 16, 8, 235],
      borderColor: [220, 170, 70, 255],
      fontSize: 36,
      minimapIcon: { size: 1, color: 'Yellow', shape: 'Hexagon' },
      tierBorders: {
        high: [255, 210, 95, 255],
        valuable: [220, 170, 70, 255],
        baseline: [130, 95, 40, 255]
      }
    },
    oils: {
      textColor: [150, 255, 180, 255],
      backgroundColor: [0, 0, 0, 240],
      borderColor: [95, 210, 120, 255],
      fontSize: 36,
      minimapIcon: { size: 1, color: 'Green', shape: 'Raindrop' },
      tierBorders: {
        high: [255, 210, 90, 255],
        valuable: [190, 150, 255, 255],
        baseline: [95, 210, 120, 255]
      }
    },
    flasks: {
      textColor: [185, 230, 255, 255],
      backgroundColor: [4, 16, 24, 235],
      borderColor: [80, 180, 230, 255],
      fontSize: 34,
      minimapIcon: { size: 1, color: 'Cyan', shape: 'Raindrop' },
      tierBorders: {
        high: [140, 220, 255, 255],
        valuable: [80, 180, 230, 255],
        baseline: [45, 110, 150, 255]
      }
    },
    jewelNormal: {
      textColor: [225, 235, 245, 255],
      backgroundColor: [16, 18, 24, 225],
      borderColor: [110, 120, 135, 255],
      fontSize: 34
    },
    jewelMagic: {
      textColor: [165, 205, 255, 255],
      backgroundColor: [8, 18, 36, 230],
      borderColor: [70, 125, 220, 255],
      fontSize: 35,
      minimapIcon: { size: 1, color: 'Blue', shape: 'Diamond' }
    },
    jewelRare: {
      textColor: [255, 232, 118, 255],
      backgroundColor: [28, 22, 8, 235],
      borderColor: [225, 175, 60, 255],
      fontSize: 36,
      minimapIcon: { size: 1, color: 'Yellow', shape: 'Diamond' }
    },
    jewelUnique: {
      textColor: [255, 170, 95, 255],
      backgroundColor: [34, 18, 8, 238],
      borderColor: [230, 120, 55, 255],
      fontSize: 38,
      alertSound: { id: 3, volume: 70 },
      minimapIcon: { size: 1, color: 'Orange', shape: 'Diamond' }
    },
    specialItems: {
      textColor: [255, 255, 255, 255],
      backgroundColor: [34, 8, 46, 245],
      borderColor: [255, 80, 220, 255],
      fontSize: 42,
      alertSound: { id: 6, volume: 90 },
      minimapIcon: { size: 2, color: 'Pink', shape: 'Star' },
      beam: { color: 'Pink', temporary: true },
      tierBorders: {
        high: [255, 80, 220, 255],
        valuable: [190, 95, 255, 255],
        baseline: [130, 75, 175, 255]
      }
    },
    highValue: {
      textColor: [255, 255, 210, 255],
      backgroundColor: [18, 12, 4, 245],
      borderColor: [255, 210, 70, 255],
      fontSize: 42,
      alertSound: { id: 6, volume: 85 },
      minimapIcon: { size: 2, color: 'Yellow', shape: 'Star' },
      beam: { color: 'Yellow', temporary: true },
      tierBorders: {
        high: [255, 210, 70, 255],
        valuable: [220, 160, 55, 255],
        baseline: [150, 105, 45, 255]
      }
    },
    misc: {
      textColor: [235, 245, 255, 255],
      backgroundColor: [12, 18, 24, 240],
      borderColor: [80, 190, 255, 255],
      fontSize: 40,
      alertSound: { id: 5, volume: 75 },
      minimapIcon: { size: 1, color: 'Cyan', shape: 'Square' },
      beam: { color: 'Cyan', temporary: true },
      tierBorders: {
        high: [120, 220, 255, 255],
        valuable: [80, 190, 255, 255],
        baseline: [55, 120, 170, 255]
      }
    }
  },
  currencyTiers: [
    {
      id: 'high',
      action: 'Show',
      label: 'High currency',
      bases: ['Divine Orb', 'Mirror of Kalandra', 'Exalted Orb', 'Orb of Annulment'],
      style: 'currency',
      tier: 'high'
    },
    {
      id: 'valuable',
      action: 'Show',
      label: 'Useful currency',
      bases: ['Chaos Orb', 'Regal Orb', 'Vaal Orb', 'Orb of Alchemy', 'Orb of Scouring'],
      style: 'currency',
      tier: 'valuable'
    }
  ],
  rareTiers: [
    {
      id: 'rare-ilvl-86',
      enabled: true,
      action: 'Show',
      label: 'Rare ilvl 86+',
      source: 'rare-item-rule',
      style: 'rare',
      tier: 'high',
      minItemLevel: 86,
      conditions: [
        { key: 'Rarity', value: 'Rare' },
        { key: 'ItemLevel', operator: '>=', value: 86 }
      ]
    },
    {
      id: 'rare-ilvl-84',
      enabled: true,
      action: 'Show',
      label: 'Rare ilvl 84+',
      source: 'rare-item-rule',
      style: 'rare',
      tier: 'valuable',
      minItemLevel: 84,
      conditions: [
        { key: 'Rarity', value: 'Rare' },
        { key: 'ItemLevel', operator: '>=', value: 84 }
      ]
    },
    {
      id: 'rare-baseline',
      enabled: true,
      action: 'Show',
      label: 'Rare baseline',
      source: 'rare-item-rule',
      style: 'rare',
      tier: 'baseline',
      conditions: [{ key: 'Rarity', value: 'Rare' }]
    }
  ],
  rareEquipment: {
    enabled: false,
    armorGroups: RARE_ARMOR_GROUPS.map((group) => group.id),
    shieldGroups: RARE_SHIELD_GROUPS.map((group) => group.id),
    weaponGroups: RARE_WEAPON_GROUPS.map((group) => group.id),
    miscGroups: EQUIPMENT_MISC_VISIBILITY_GROUPS.map((group) => group.id),
    baseSelections: {
      armor: {},
      shields: {},
      weapons: {},
      misc: {}
    }
  },
  categoryRules: {
    uniques: {
      enabled: true,
      rules: [
        {
          id: 'uniques-baseline',
          enabled: true,
          action: 'Show',
          label: 'Unique items',
          source: 'category-rule',
          style: 'unique',
          tier: 'baseline',
          conditions: [{ key: 'Rarity', value: 'Unique' }]
        }
      ]
    },
    maps: {
      enabled: true,
      rules: [
        {
          id: 'maps-tier-14-plus',
          enabled: true,
          action: 'Show',
          label: 'Maps tier 14+',
          source: 'category-rule',
          style: 'maps',
          tier: 'high',
          conditions: [
            { key: 'Class', value: 'Maps' },
            { key: 'MapTier', operator: '>=', value: 14 }
          ]
        },
        {
          id: 'maps-tier-6-to-13',
          enabled: true,
          action: 'Show',
          label: 'Maps tier 6-13',
          source: 'category-rule',
          style: 'maps',
          tier: 'valuable',
          conditions: [
            { key: 'Class', value: 'Maps' },
            { key: 'MapTier', operator: '>=', value: 6 },
            { key: 'MapTier', operator: '<=', value: 13 }
          ]
        },
        {
          id: 'maps-tier-1-to-5',
          enabled: true,
          action: 'Show',
          label: 'Maps tier 1-5',
          source: 'category-rule',
          style: 'maps',
          tier: 'baseline',
          conditions: [
            { key: 'Class', value: 'Maps' },
            { key: 'MapTier', operator: '<=', value: 5 }
          ]
        }
      ]
    },
    fragments: {
      enabled: true,
      rules: [
        {
          id: 'fragments-baseline',
          enabled: true,
          action: 'Show',
          label: 'Fragments and invitations',
          source: 'category-rule',
          style: 'fragments',
          tier: 'baseline',
          conditions: [{ key: 'Class', value: ['Map Fragments', 'Misc Map Items'] }]
        }
      ]
    },
    gems: {
      enabled: true,
      rules: [
        {
          id: 'gems-quality',
          enabled: true,
          action: 'Show',
          label: 'Quality gems',
          source: 'category-rule',
          style: 'gems',
          tier: 'valuable',
          conditions: [
            { key: 'Class', value: ['Skill Gems', 'Support Gems'] },
            { key: 'Quality', operator: '>=', value: 20 }
          ]
        },
        {
          id: 'gems-baseline',
          enabled: true,
          action: 'Show',
          label: 'All gems',
          source: 'category-rule',
          style: 'gems',
          tier: 'baseline',
          conditions: [{ key: 'Class', value: ['Skill Gems', 'Support Gems'] }]
        }
      ]
    },
    divinationCards: {
      enabled: true,
      rules: [
        {
          id: 'divination-cards-baseline',
          enabled: true,
          action: 'Show',
          label: 'Divination cards',
          source: 'category-rule',
          style: 'divinationCards',
          tier: 'baseline',
          conditions: [{ key: 'Class', value: 'Divination Cards' }]
        }
      ]
    },
    scarabs: {
      enabled: true,
      rules: [
        {
          id: 'scarabs-baseline',
          enabled: true,
          action: 'Show',
          label: 'Scarabs',
          source: 'category-rule',
          style: 'scarabs',
          tier: 'baseline',
          conditions: [{ key: 'BaseType', value: 'Scarab' }]
        }
      ]
    },
    oils: {
      enabled: true,
      rules: [
        {
          id: 'oils-premium',
          enabled: true,
          action: 'Show',
          label: 'Premium oils',
          source: 'category-rule',
          style: 'oils',
          tier: 'high',
          conditions: [
            { key: 'Class', value: 'Stackable Currency' },
            { key: 'BaseType', value: ['Golden Oil', 'Silver Oil', 'Opalescent Oil'] }
          ]
        },
        {
          id: 'oils-useful',
          enabled: true,
          action: 'Show',
          label: 'Useful oils',
          source: 'category-rule',
          style: 'oils',
          tier: 'valuable',
          conditions: [
            { key: 'Class', value: 'Stackable Currency' },
            { key: 'BaseType', value: ['Black Oil', 'Crimson Oil', 'Violet Oil', 'Azure Oil'] }
          ]
        },
        {
          id: 'oils-baseline',
          enabled: true,
          action: 'Show',
          label: 'All oils',
          source: 'category-rule',
          style: 'oils',
          tier: 'baseline',
          conditions: [
            { key: 'Class', value: 'Stackable Currency' },
            { key: 'BaseType', value: OIL_BASE_TYPES }
          ]
        }
      ]
    },
    flasks: {
      enabled: true,
      rules: [
        {
          id: 'flasks-quality',
          enabled: true,
          action: 'Show',
          label: 'Quality flasks',
          source: 'category-rule',
          style: 'flasks',
          tier: 'valuable',
          conditions: [
            { key: 'Class', value: FLASK_CLASSES },
            { key: 'Rarity', value: ['Normal', 'Magic', 'Rare'] },
            { key: 'Quality', operator: '>=', value: 20 }
          ]
        },
        {
          id: 'flasks-baseline',
          enabled: true,
          action: 'Show',
          label: 'All flasks',
          source: 'category-rule',
          style: 'flasks',
          tier: 'baseline',
          conditions: [
            { key: 'Class', value: FLASK_CLASSES },
            { key: 'Rarity', value: ['Normal', 'Magic', 'Rare'] }
          ]
        }
      ]
    },
    jewels: {
      enabled: true,
      rules: [
        {
          id: 'jewels-unique',
          enabled: true,
          action: 'Show',
          label: 'Unique jewels',
          source: 'category-rule',
          style: 'jewelUnique',
          tier: 'high',
          conditions: [
            { key: 'Class', value: 'Jewels' },
            { key: 'Rarity', value: 'Unique' }
          ]
        },
        {
          id: 'jewels-rare',
          enabled: true,
          action: 'Show',
          label: 'Rare jewels',
          source: 'category-rule',
          style: 'jewelRare',
          tier: 'valuable',
          conditions: [
            { key: 'Class', value: 'Jewels' },
            { key: 'Rarity', value: 'Rare' }
          ]
        },
        {
          id: 'jewels-magic',
          enabled: true,
          action: 'Show',
          label: 'Magic jewels',
          source: 'category-rule',
          style: 'jewelMagic',
          tier: 'baseline',
          conditions: [
            { key: 'Class', value: 'Jewels' },
            { key: 'Rarity', value: 'Magic' }
          ]
        },
        {
          id: 'jewels-normal',
          enabled: true,
          action: 'Show',
          label: 'Normal jewels',
          source: 'category-rule',
          style: 'jewelNormal',
          tier: 'baseline',
          conditions: [
            { key: 'Class', value: 'Jewels' },
            { key: 'Rarity', value: 'Normal' }
          ]
        }
      ]
    }
  },
  chanceBases: {
    enabled: true,
    bases: [],
    style: 'chance',
    tier: 'valuable'
  },
  miscRules: {
    enabled: true,
    entries: [
      {
        id: 'six-link',
        enabled: true,
        action: 'Show',
        label: '6-linked items',
        source: 'misc-rule',
        style: 'misc',
        tier: 'high',
        conditions: [{ key: 'LinkedSockets', operator: '>=', value: 6 }]
      },
      {
        id: 'six-socket',
        enabled: true,
        action: 'Show',
        label: '6-socket vendor recipe',
        source: 'misc-rule',
        style: 'misc',
        tier: 'valuable',
        conditions: [{ key: 'Sockets', operator: '>=', value: 6 }]
      },
      {
        id: 'chromatic-rgb',
        enabled: true,
        action: 'Show',
        label: 'Chromatic RGB recipe',
        source: 'misc-rule',
        style: 'misc',
        tier: 'baseline',
        conditions: [{ key: 'SocketGroup', value: 'RGB' }]
      },
      {
        id: 'quality-equipment',
        enabled: false,
        action: 'Show',
        label: '20% quality equipment recipe',
        source: 'misc-rule',
        style: 'misc',
        tier: 'baseline',
        conditions: [
          {
            key: 'Class',
            value: [
              'Body Armours',
              'Boots',
              'Gloves',
              'Helmets',
              'Shields',
              'Bows',
              'Claws',
              'Daggers',
              'One Hand Axes',
              'One Hand Maces',
              'One Hand Swords',
              'Rune Daggers',
              'Sceptres',
              'Staves',
              'Thrusting One Hand Swords',
              'Two Hand Axes',
              'Two Hand Maces',
              'Two Hand Swords',
              'Wands',
              'Warstaves'
            ]
          },
          { key: 'Quality', operator: '>=', value: 20 }
        ]
      },
      {
        id: 'quality-flasks',
        enabled: false,
        action: 'Show',
        label: '20% quality flask recipe',
        source: 'misc-rule',
        style: 'misc',
        tier: 'baseline',
        conditions: [
          { key: 'Class', value: ['Life Flasks', 'Mana Flasks', 'Hybrid Flasks', 'Utility Flasks'] },
          { key: 'Quality', operator: '>=', value: 20 }
        ]
      },
      {
        id: 'quality-gems',
        enabled: false,
        action: 'Show',
        label: '20% quality gem recipe',
        source: 'misc-rule',
        style: 'misc',
        tier: 'baseline',
        conditions: [
          { key: 'Class', value: ['Skill Gems', 'Support Gems'] },
          { key: 'Quality', operator: '>=', value: 20 }
        ]
      }
    ]
  },
  specialItems: {
    enabled: true,
    entries: []
  },
  economyHighlights: {
    enabled: true,
    tiers: [
      {
        id: 'chaos-50',
        label: '50c+',
        minChaos: 50,
        style: 'highValue',
        tier: 'baseline',
        maxItems: 500
      },
      {
        id: 'divine-1',
        label: '1 divine+',
        minDivines: 1,
        style: 'highValue',
        tier: 'valuable',
        maxItems: 500
      },
      {
        id: 'divine-10',
        label: '10 divines+',
        minDivines: 10,
        style: 'highValue',
        tier: 'high',
        maxItems: 500
      }
    ],
    types: ['Currency', 'Fragment', 'DivinationCard', 'Scarab', 'UniqueAccessory', 'UniqueArmour', 'UniqueWeapon', 'SkillGem'],
    style: 'highValue',
    entries: [],
    cacheVersion: ECONOMY_HIGHLIGHT_CACHE_VERSION,
    refreshedAt: undefined,
    league: undefined,
    source: undefined,
    divineChaosValue: undefined,
    errors: []
  },
  rarityVisibility: {
    normal: true,
    magic: true
  },
  userRules: []
};

function normalizeLootFilterProfile(profile) {
  const source = profile && typeof profile === 'object' ? profile : {};
  return {
    ...DEFAULT_LOOT_FILTER_PROFILE,
    ...source,
    schemaVersion: LOOT_FILTER_PROFILE_SCHEMA_VERSION,
    quickAction: source.quickAction === 'Hide' ? 'Hide' : 'Show',
    quickRuleDefaults: {
      ...DEFAULT_LOOT_FILTER_PROFILE.quickRuleDefaults,
      ...(source.quickRuleDefaults && typeof source.quickRuleDefaults === 'object' ? source.quickRuleDefaults : {})
    },
    styles: normalizeStyles(source.styles),
    currencyTiers: Array.isArray(source.currencyTiers) ? source.currencyTiers : DEFAULT_LOOT_FILTER_PROFILE.currencyTiers,
    rareTiers: normalizeRareItemRules(source.rareTiers),
    rareEquipment: normalizeRareEquipment(source.rareEquipment),
    categoryRules: normalizeCategoryRules(source.categoryRules),
    chanceBases: normalizeChanceBases(source.chanceBases),
    miscRules: normalizeMiscRules(source.miscRules),
    specialItems: normalizeSpecialItems(source.specialItems),
    economyHighlights: normalizeEconomyHighlights(source.economyHighlights),
    rarityVisibility: normalizeRarityVisibility(source.rarityVisibility),
    userRules: Array.isArray(source.userRules) ? source.userRules.map(normalizeRule).filter(Boolean) : []
  };
}

function normalizeCategoryRules(categoryRules) {
  const source = categoryRules && typeof categoryRules === 'object' ? categoryRules : {};
  const output = {};

  for (const [categoryId, fallback] of Object.entries(DEFAULT_LOOT_FILTER_PROFILE.categoryRules)) {
    const category = source[categoryId] && typeof source[categoryId] === 'object' ? source[categoryId] : {};
    const rules = Array.isArray(category.rules)
      ? category.rules.map(normalizeCategoryRule).filter(Boolean)
      : (fallback.rules || []).map(normalizeCategoryRule).filter(Boolean);

    output[categoryId] = {
      enabled: category.enabled === undefined ? fallback.enabled !== false : category.enabled !== false,
      rules
    };
  }

  return output;
}

function normalizeCategoryRule(entry) {
  const rule = normalizeRule({
    ...entry,
    action: entry?.action || 'Show',
    label: entry?.label || 'Category rule',
    source: 'category-rule',
    style: entry?.style || 'default',
    tier: entry?.tier || 'baseline'
  });

  if (!rule || rule.conditions.length === 0) {
    return undefined;
  }

  return rule;
}

function normalizeStyles(styles) {
  const source = styles && typeof styles === 'object' ? styles : {};
  const merged = {
    ...DEFAULT_LOOT_FILTER_PROFILE.styles,
    ...source
  };
  const output = {};
  for (const [name, style] of Object.entries(merged)) {
    output[name] = normalizeStyle(style, DEFAULT_LOOT_FILTER_PROFILE.styles[name] || DEFAULT_LOOT_FILTER_PROFILE.styles.default);
  }
  return output;
}

function normalizeRule(rule) {
  if (!rule || typeof rule !== 'object') {
    return undefined;
  }

  const output = {
    id: String(rule.id || `rule-${Date.now()}`),
    enabled: rule.enabled !== false,
    action: rule.action === 'Hide' ? 'Hide' : 'Show',
    label: String(rule.label || 'Personal item rule'),
    source: String(rule.source || 'manual'),
    style: String(rule.style || 'default'),
    tier: rule.tier ? String(rule.tier) : undefined,
    conditions: Array.isArray(rule.conditions) ? rule.conditions.map(normalizeCondition).filter(Boolean) : [],
    createdAt: rule.createdAt || new Date().toISOString(),
    itemSnapshot: rule.itemSnapshot && typeof rule.itemSnapshot === 'object' ? rule.itemSnapshot : undefined
  };

  if (rule.economyTierId) {
    output.economyTierId = String(rule.economyTierId);
  }

  if (rule.economyTierLabel) {
    output.economyTierLabel = String(rule.economyTierLabel);
  }

  if (Number.isFinite(Number(rule.economyChaosValue))) {
    output.economyChaosValue = Number(rule.economyChaosValue);
  }

  if (rule.economyProviderType) {
    output.economyProviderType = String(rule.economyProviderType);
  }

  if (rule.economyProviderBaseType) {
    output.economyProviderBaseType = String(rule.economyProviderBaseType);
  }

  if (rule.economyMatchPrecision) {
    output.economyMatchPrecision = String(rule.economyMatchPrecision);
  }

  return output;
}

function normalizeRareItemRules(rareTiers) {
  const source = Array.isArray(rareTiers) ? rareTiers : DEFAULT_LOOT_FILTER_PROFILE.rareTiers;
  return source.map(normalizeRareItemRule).filter(Boolean);
}

function normalizeRareItemRule(entry) {
  const conditions = Array.isArray(entry?.conditions)
    ? entry.conditions
    : createLegacyRareConditions(entry);
  const rule = normalizeRule({
    ...entry,
    enabled: entry?.enabled !== false,
    action: entry?.action || 'Show',
    label: entry?.label || 'Rare item rule',
    source: 'rare-item-rule',
    style: entry?.style || 'rare',
    tier: entry?.tier || 'baseline',
    conditions
  });

  if (!rule || rule.conditions.length === 0) {
    return undefined;
  }

  if (Number.isFinite(Number(entry?.minItemLevel))) {
    rule.minItemLevel = Number(entry.minItemLevel);
  }

  return rule;
}

function createLegacyRareConditions(entry = {}) {
  const conditions = [{ key: 'Rarity', value: 'Rare' }];
  const minItemLevel = Number(entry.minItemLevel);
  if (Number.isFinite(minItemLevel) && minItemLevel > 0) {
    conditions.push({ key: 'ItemLevel', operator: '>=', value: minItemLevel });
  }
  return conditions;
}

function normalizeStyle(style, fallback = DEFAULT_LOOT_FILTER_PROFILE.styles.default) {
  const source = style && typeof style === 'object' ? style : {};
  const has = (key) => Object.prototype.hasOwnProperty.call(source, key);
  return {
    ...fallback,
    ...source,
    textColor: normalizeColor(source.textColor || fallback.textColor),
    backgroundColor: normalizeColor(source.backgroundColor || fallback.backgroundColor),
    borderColor: normalizeColor(source.borderColor || fallback.borderColor),
    fontSize: normalizeFontSize(source.fontSize || fallback.fontSize),
    alertSound: normalizeAlertSound(has('alertSound') ? source.alertSound : fallback.alertSound),
    tierSounds: normalizeTierSounds(has('tierSounds') ? source.tierSounds : fallback.tierSounds),
    minimapIcon: normalizeMinimapIcon(has('minimapIcon') ? source.minimapIcon : fallback.minimapIcon),
    beam: normalizeBeam(has('beam') ? source.beam : fallback.beam),
    tierBorders: normalizeTierBorders(source.tierBorders || fallback.tierBorders)
  };
}

function normalizeColor(color) {
  const values = Array.isArray(color) ? color : [255, 255, 255, 255];
  return [0, 1, 2, 3].map((index) => {
    const fallback = index === 3 ? 255 : 0;
    return Math.max(0, Math.min(255, Math.round(Number(values[index] ?? fallback) || fallback)));
  });
}

function normalizeFontSize(value) {
  return Math.max(1, Math.min(45, Math.round(Number(value) || 32)));
}

function normalizeAlertSound(alertSound) {
  if (alertSound === null) {
    return null;
  }

  if (!alertSound || typeof alertSound !== 'object' || !alertSound.id) {
    return undefined;
  }

  return {
    id: Math.max(1, Math.round(Number(alertSound.id) || 1)),
    volume: Math.max(0, Math.min(300, Math.round(Number(alertSound.volume) || 80)))
  };
}

function normalizeTierSounds(tierSounds) {
  if (!tierSounds || typeof tierSounds !== 'object') {
    return undefined;
  }

  const output = {};
  for (const tier of ['baseline', 'high', 'valuable']) {
    if (Object.prototype.hasOwnProperty.call(tierSounds, tier)) {
      output[tier] = normalizeCustomAlertSound(tierSounds[tier]);
    }
  }

  return Object.keys(output).length ? output : undefined;
}

function normalizeCustomAlertSound(sound) {
  if (sound === null) {
    return null;
  }

  if (!sound || typeof sound !== 'object') {
    return undefined;
  }

  const file = String(sound.file || '').trim();
  if (!file) {
    return null;
  }

  return {
    file,
    volume: Math.max(0, Math.min(300, Math.round(Number(sound.volume) || 100)))
  };
}

function normalizeMinimapIcon(icon) {
  if (icon === null) {
    return null;
  }

  if (!icon || typeof icon !== 'object') {
    return undefined;
  }

  return {
    size: Math.max(0, Math.min(2, Math.round(Number(icon.size) || 1))),
    color: String(icon.color || 'White'),
    shape: String(icon.shape || 'Circle')
  };
}

function normalizeBeam(beam) {
  if (beam === null) {
    return null;
  }

  if (!beam || typeof beam !== 'object') {
    return undefined;
  }

  return {
    color: String(beam.color || 'White'),
    temporary: beam.temporary !== false
  };
}

function normalizeTierBorders(tierBorders) {
  if (!tierBorders || typeof tierBorders !== 'object') {
    return undefined;
  }

  const output = {};
  for (const [tier, color] of Object.entries(tierBorders)) {
    output[tier] = normalizeColor(color);
  }
  return output;
}

function normalizeRareEquipment(rareEquipment) {
  const source = rareEquipment && typeof rareEquipment === 'object' ? rareEquipment : {};
  return {
    enabled: Boolean(source.enabled),
    armorGroups: normalizeIdList(source.armorGroups, RARE_ARMOR_GROUPS),
    shieldGroups: normalizeIdList(source.shieldGroups, RARE_SHIELD_GROUPS),
    weaponGroups: normalizeIdList(source.weaponGroups, RARE_WEAPON_GROUPS),
    miscGroups: normalizeMiscEquipmentGroups(source),
    baseSelections: normalizeEquipmentBaseSelections(source.baseSelections)
  };
}

function normalizeMiscEquipmentGroups(source) {
  if (Array.isArray(source.miscGroups)) {
    return normalizeIdList(source.miscGroups, EQUIPMENT_MISC_VISIBILITY_GROUPS);
  }

  return source.enabled
    ? []
    : EQUIPMENT_MISC_VISIBILITY_GROUPS.map((group) => group.id);
}

function normalizeIdList(ids, availableGroups) {
  const allowed = new Set(availableGroups.map((group) => group.id));
  const source = Array.isArray(ids) ? ids : availableGroups.map((group) => group.id);
  return source.map(String).filter((id) => allowed.has(id));
}

function normalizeChanceBases(chanceBases) {
  const source = chanceBases && typeof chanceBases === 'object' ? chanceBases : {};
  return {
    enabled: source.enabled !== false,
    bases: normalizeBaseNames(source.bases),
    style: normalizeChanceBaseStyle(source.style),
    tier: source.tier ? String(source.tier) : DEFAULT_LOOT_FILTER_PROFILE.chanceBases.tier
  };
}

function normalizeChanceBaseStyle(style) {
  if (!style || style === 'rare') {
    return DEFAULT_LOOT_FILTER_PROFILE.chanceBases.style;
  }

  return String(style);
}

function normalizeMiscRules(miscRules) {
  const source = miscRules && typeof miscRules === 'object' ? miscRules : {};
  const defaults = DEFAULT_LOOT_FILTER_PROFILE.miscRules;
  const sourceById = new Map(
    (Array.isArray(source.entries) ? source.entries : [])
      .filter((entry) => entry?.id)
      .map((entry) => [String(entry.id), entry])
  );

  const entries = defaults.entries.map((fallback) => normalizeMiscRule({
    ...fallback,
    ...(sourceById.get(fallback.id) || {}),
    id: fallback.id,
    source: 'misc-rule',
    conditions: sourceById.get(fallback.id)?.conditions || fallback.conditions
  })).filter(Boolean);

  return {
    enabled: source.enabled !== false,
    entries
  };
}

function normalizeMiscRule(entry) {
  const rule = normalizeRule({
    ...entry,
    action: entry?.action || 'Show',
    label: entry?.label || 'Misc rule',
    source: 'misc-rule',
    style: entry?.style || 'misc',
    tier: entry?.tier || 'baseline'
  });

  if (!rule || rule.conditions.length === 0) {
    return undefined;
  }

  return rule;
}

function normalizeSpecialItems(specialItems) {
  const source = specialItems && typeof specialItems === 'object' ? specialItems : {};
  return {
    enabled: source.enabled !== false,
    entries: Array.isArray(source.entries) ? source.entries.map(normalizeSpecialItem).filter(Boolean) : []
  };
}

function normalizeSpecialItem(entry) {
  const rule = normalizeRule({
    ...entry,
    action: entry?.action || 'Show',
    label: entry?.label || entry?.name || 'Special item',
    source: 'special-item',
    style: entry?.style || 'specialItems',
    tier: entry?.tier || 'high'
  });

  if (!rule || rule.conditions.length === 0) {
    return undefined;
  }

  return rule;
}

function normalizeEconomyHighlights(economyHighlights) {
  const source = economyHighlights && typeof economyHighlights === 'object' ? economyHighlights : {};
  const defaults = DEFAULT_LOOT_FILTER_PROFILE.economyHighlights;
  return {
    enabled: source.enabled !== false,
    tiers: normalizeEconomyTiers(source.tiers, source),
    types: normalizeTextList(source.types, defaults.types),
    style: String(source.style || defaults.style),
    entries: Array.isArray(source.entries) ? source.entries.map(normalizeEconomyRule).filter(Boolean) : [],
    cacheVersion: normalizeEconomyCacheVersion(source, defaults),
    refreshedAt: source.refreshedAt ? String(source.refreshedAt) : undefined,
    league: source.league ? String(source.league) : undefined,
    source: source.source ? String(source.source) : undefined,
    divineChaosValue: Number.isFinite(Number(source.divineChaosValue)) ? Number(source.divineChaosValue) : undefined,
    errors: Array.isArray(source.errors) ? source.errors.map(String) : []
  };
}

function normalizeEconomyCacheVersion(source, defaults) {
  if (Number.isFinite(Number(source.cacheVersion))) {
    return Number(source.cacheVersion);
  }

  return Array.isArray(source.entries) && source.entries.length > 0
    ? undefined
    : defaults.cacheVersion;
}

function normalizeEconomyRule(rule) {
  const output = normalizeRule(rule);
  if (!output?.conditions?.length || !output.economyProviderType) {
    return output;
  }

  if (output.economyMatchPrecision === 'approximate-unique-base' && output.economyProviderType.startsWith('Unique')) {
    const hasVariantCondition = output.conditions.some((condition) =>
      (condition.key === 'Foulborn' || condition.key === 'Replica') && condition.value === true
    );
    if (!hasVariantCondition) {
      return undefined;
    }

    output.economyMatchPrecision = 'variant-unique-base';
  }

  const classByType = {
    Currency: 'Stackable Currency',
    DivinationCard: 'Divination Cards',
    Fragment: 'Map Fragments',
    Map: 'Maps',
    Scarab: 'Map Fragments'
  };
  const classValue = classByType[output.economyProviderType];
  const hasBaseType = output.conditions.some((condition) => condition.key === 'BaseType');
  const hasClass = output.conditions.some((condition) => condition.key === 'Class');

  if (classValue && hasBaseType && !hasClass) {
    output.conditions = [
      { key: 'Class', value: classValue },
      ...output.conditions
    ];
  }

  return output;
}

function normalizeEconomyTiers(tiers, legacySource = {}) {
  const defaults = DEFAULT_LOOT_FILTER_PROFILE.economyHighlights.tiers;
  const source = Array.isArray(tiers) && tiers.length > 0
    ? tiers
    : [
        { ...defaults[0], minChaos: normalizePositiveNumber(legacySource.minChaos, defaults[0].minChaos) },
        defaults[1],
        defaults[2]
      ];

  return defaults.map((fallback, index) => {
    const tier = source[index] && typeof source[index] === 'object' ? source[index] : {};
    return {
      ...fallback,
      ...tier,
      id: String(tier.id || fallback.id),
      label: String(tier.label || fallback.label),
      minChaos: tier.minChaos === undefined ? fallback.minChaos : normalizePositiveNumber(tier.minChaos, fallback.minChaos),
      minDivines: tier.minDivines === undefined ? fallback.minDivines : normalizePositiveNumber(tier.minDivines, fallback.minDivines),
      style: String(tier.style || fallback.style),
      tier: String(tier.tier || fallback.tier),
      maxItems: Math.max(1, Math.min(2000, Math.round(Number(tier.maxItems) || fallback.maxItems)))
    };
  });
}

function normalizePositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function normalizeTextList(values, fallback = []) {
  const source = Array.isArray(values) ? values : fallback;
  return [...new Set(source.map((entry) => String(entry || '').trim()).filter(Boolean))];
}

function normalizeRarityVisibility(rarityVisibility) {
  const source = rarityVisibility && typeof rarityVisibility === 'object' ? rarityVisibility : {};
  return {
    normal: source.normal !== false,
    magic: source.magic !== false
  };
}

function normalizeBaseNames(values) {
  const seen = new Set();
  const output = [];
  const source = Array.isArray(values) ? values : [];

  for (const value of source) {
    const base = String(value || '').trim().replace(/\s+/g, ' ');
    const key = base.toLowerCase();
    if (!base || seen.has(key)) {
      continue;
    }

    seen.add(key);
    output.push(base);
  }

  return output;
}

function normalizeEquipmentBaseSelections(baseSelections) {
  const source = baseSelections && typeof baseSelections === 'object' ? baseSelections : {};
  return {
    armor: normalizeSelectionMap(source.armor),
    shields: normalizeSelectionMap(source.shields),
    weapons: normalizeSelectionMap(source.weapons),
    misc: normalizeSelectionMap(source.misc)
  };
}

function normalizeSelectionMap(selectionMap) {
  const source = selectionMap && typeof selectionMap === 'object' ? selectionMap : {};
  const output = {};
  for (const [groupId, bases] of Object.entries(source)) {
    output[String(groupId)] = normalizeBaseNames(bases);
  }
  return output;
}

function normalizeCondition(condition) {
  if (!condition || typeof condition !== 'object' || !condition.key) {
    return undefined;
  }

  const output = {
    key: String(condition.key),
    value: condition.value
  };

  if (condition.operator) {
    output.operator = String(condition.operator);
  }

  return output;
}

function getStyleForItem(item) {
  if (isScarabItem(item)) return 'scarabs';
  if (isOilItem(item)) return 'oils';
  if (isFlaskItem(item) && item.rarity !== 'Unique') return 'flasks';
  if (item.category === 'currency') return 'currency';
  if (item.category === 'divination-card') return 'divinationCards';
  if (item.category === 'rare') return 'rare';
  if (item.category === 'map' || item.category === 'unique-map') return 'maps';
  if (item.category === 'fragment') return 'fragments';
  if (item.category === 'gem') return 'gems';
  if (String(item.category || '').startsWith('unique')) return 'unique';
  return 'default';
}

function isOilItem(item) {
  return item?.type === 'Oil'
    || /\bOil\b/i.test(`${item?.name || ''} ${item?.baseType || ''} ${item?.searchLabel || ''}`);
}

function isFlaskItem(item) {
  return FLASK_CLASSES.includes(item?.itemClass)
    || /\bFlask\b/i.test(`${item?.itemClass || ''} ${item?.name || ''} ${item?.baseType || ''} ${item?.searchLabel || ''}`);
}

function isScarabItem(item) {
  return item?.type === 'Scarab'
    || item?.itemClass === 'Scarabs'
    || /\bScarab\b/i.test(`${item?.name || ''} ${item?.baseType || ''} ${item?.searchLabel || ''}`);
}

function createRuleFromItem(item, options = {}) {
  if (!item?.looksLikePoeItem) {
    throw new Error('Clipboard does not look like a Path of Exile item.');
  }

  const defaults = {
    ...DEFAULT_LOOT_FILTER_PROFILE.quickRuleDefaults,
    ...(options.defaults || {})
  };
  const action = options.action === 'Hide' ? 'Hide' : 'Show';
  const conditions = [];

  if (defaults.includeClass && item.itemClass) {
    conditions.push({ key: 'Class', value: item.itemClass });
  }

  if (defaults.includeRarity && item.rarity && ['Normal', 'Magic', 'Rare', 'Unique'].includes(item.rarity)) {
    conditions.push({ key: 'Rarity', value: item.rarity });
  }

  const baseType = item.baseType || (item.category === 'normal' ? item.name : undefined);
  if (defaults.includeBaseType && baseType) {
    conditions.push({ key: 'BaseType', value: baseType });
  }

  if (defaults.includeItemLevel && item.itemLevel) {
    conditions.push({ key: 'ItemLevel', operator: '>=', value: item.itemLevel });
  }

  if (defaults.includeMapTier && item.mapTier) {
    conditions.push({ key: 'MapTier', operator: '>=', value: item.mapTier });
  }

  if (defaults.includeQuality && item.quality) {
    const quality = Number(String(item.quality).match(/\d+/)?.[0]);
    if (Number.isFinite(quality)) {
      conditions.push({ key: 'Quality', operator: '>=', value: quality });
    }
  }

  if (defaults.includeCorrupted && item.corrupted) {
    conditions.push({ key: 'Corrupted', value: true });
  }

  if (conditions.length === 0) {
    conditions.push({ key: 'BaseType', value: item.name });
  }

  return normalizeRule({
    id: `item-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    enabled: true,
    action,
    label: `${action} ${item.searchLabel || item.name}`,
    source: 'captured-item',
    style: getStyleForItem(item),
    tier: item.category === 'rare' ? getRareTier(item) : undefined,
    conditions,
    createdAt: new Date().toISOString(),
    itemSnapshot: {
      name: item.name,
      baseType: item.baseType,
      rarity: item.rarity,
      itemClass: item.itemClass,
      itemLevel: item.itemLevel,
      mapTier: item.mapTier,
      quality: item.quality,
      category: item.category
    }
  });
}

function getRareTier(item) {
  if (item.itemLevel >= 86) return 'high';
  if (item.itemLevel >= 84) return 'valuable';
  return 'baseline';
}

module.exports = {
  DEFAULT_LOOT_FILTER_PROFILE,
  ECONOMY_HIGHLIGHT_CACHE_VERSION,
  EQUIPMENT_MISC_VISIBILITY_GROUPS,
  FLASK_BASE_TYPES,
  FLASK_CLASSES,
  LOOT_FILTER_PROFILE_SCHEMA_VERSION,
  OIL_BASE_TYPES,
  createRuleFromItem,
  normalizeLootFilterProfile,
  normalizeRule,
  normalizeStyle,
  EQUIPMENT_MISC_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
};
