const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseCopiedItem } = require('../src/domain/item-parser');
const {
  DEFAULT_LOOT_FILTER_PROFILE,
  ECONOMY_HIGHLIGHT_CACHE_VERSION,
  createRuleFromItem,
  normalizeLootFilterProfile
} = require('../src/domain/loot-filter');
const { createEconomyRulesFromOverviews } = require('../src/services/economy-highlights');
const { generateLootFilter } = require('../src/services/loot-filter-generator');

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'copied-items', name), 'utf8');
}

const currency = parseCopiedItem(fixture('currency-chaos-orb.txt'));
const currencyRule = createRuleFromItem(currency, { action: 'Show' });
assert.equal(currencyRule.style, 'currency');
assert.equal(currencyRule.conditions.some((condition) => condition.key === 'Class'), true);
assert.equal(normalizeLootFilterProfile({}).economyHighlights.cacheVersion, ECONOMY_HIGHLIGHT_CACHE_VERSION);

const divinationCardRule = createRuleFromItem({
  looksLikePoeItem: true,
  name: 'The Doctor',
  searchLabel: 'The Doctor',
  category: 'divination-card',
  rarity: 'Divination Card',
  itemClass: 'Divination Cards'
}, { action: 'Show' });
assert.equal(divinationCardRule.style, 'divinationCards');

const scarabRule = createRuleFromItem({
  looksLikePoeItem: true,
  name: 'Ambush Scarab',
  searchLabel: 'Ambush Scarab',
  category: 'normal',
  rarity: 'Normal',
  itemClass: 'Map Fragments'
}, { action: 'Show' });
assert.equal(scarabRule.style, 'scarabs');

const rareWand = parseCopiedItem(fixture('rare-omen-wand.txt'));
const wandRule = createRuleFromItem(rareWand, { action: 'Hide' });
assert.equal(wandRule.action, 'Hide');
assert.equal(wandRule.style, 'rare');
assert.equal(wandRule.conditions.find((condition) => condition.key === 'BaseType').value, 'Omen Wand');
assert.equal(wandRule.conditions.find((condition) => condition.key === 'ItemLevel').operator, '>=');

const profile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  userRules: [wandRule, currencyRule],
  economyHighlights: {
    enabled: true,
    tiers: [
      { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 500 },
      { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 500 },
      { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 500 }
    ],
    style: 'highValue',
    source: 'poe.ninja',
    league: 'Mercenaries',
    refreshedAt: '2026-08-10T12:00:00.000Z',
    entries: [
      {
        id: 'economy-divine-10-UniqueAccessory-foulborn-mageblood',
        enabled: true,
        action: 'Show',
        label: 'Foulborn Mageblood (9000c)',
        source: 'poe.ninja-economy',
        style: 'highValue',
        tier: 'high',
        economyTierId: 'divine-10',
        economyTierLabel: '10 divines+',
        economyChaosValue: 9000,
        economyProviderType: 'UniqueAccessory',
        economyProviderBaseType: 'Heavy Belt',
        economyMatchPrecision: 'approximate-unique-base',
        conditions: [
          { key: 'Rarity', value: 'Unique' },
          { key: 'BaseType', value: 'Heavy Belt' },
          { key: 'Foulborn', value: true }
        ]
      }
    ]
  },
  specialItems: {
    enabled: true,
    entries: [
      {
        id: 'special-gold-ring',
        enabled: true,
        action: 'Show',
        label: 'Special Gold Ring',
        source: 'special-item',
        style: 'specialItems',
        tier: 'high',
        conditions: [
          { key: 'BaseType', value: 'Gold Ring' },
          { key: 'Rarity', value: 'Rare' },
          { key: 'ItemLevel', operator: '>=', value: 84 },
          { key: 'LinkedSockets', operator: '>=', value: 5 },
          { key: 'HasInfluence', value: ['Shaper', 'Elder'] },
          { key: 'Corrupted', value: false },
          { key: 'Identified', value: true },
          { key: 'FracturedItem', value: true },
          { key: 'SynthesisedItem', value: true }
        ]
      }
    ]
  }
});
assert.deepEqual(profile.economyHighlights.tiers.map((tier) => tier.label), ['50c+', '1 divine+', '10 divines+']);
assert.equal(profile.economyHighlights.cacheVersion, undefined);
const renamedEconomyProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  economyHighlights: {
    tiers: [
      { id: 'chaos-50', label: 'Starter', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 500 },
      { id: 'divine-1', label: 'Good Stuff', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 500 },
      { id: 'divine-10', label: 'Big Tickets', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 500 }
    ]
  }
});
assert.deepEqual(renamedEconomyProfile.economyHighlights.tiers.map((tier) => tier.label), ['Starter', 'Good Stuff', 'Big Tickets']);
const emptyMapRulesProfile = normalizeLootFilterProfile({
  categoryRules: {
    maps: {
      enabled: true,
      rules: []
    }
  }
});
assert.equal(emptyMapRulesProfile.categoryRules.maps.rules.length, 0);
assert.equal(emptyMapRulesProfile.categoryRules.oils.rules.length > 0, true);
const output = generateLootFilter(profile);

assert.match(output, /# POEHelper generated loot filter/);
assert.match(output, /# Hand-picked special items\n# Special Gold Ring\nShow\n    BaseType "Gold Ring"\n    Rarity Rare\n    ItemLevel >= 84\n    LinkedSockets >= 5\n    HasInfluence Shaper Elder\n    Corrupted False\n    Identified True\n    FracturedItem True\n    SynthesisedItem True/);
assert.ok(output.indexOf('# Hand-picked special items') < output.indexOf('# Personal captured-item rules'));
assert.match(output, /Hide\n    Class Wands/);
assert.match(output, /# Economy high-value items\n# Source: poe\.ninja \/ Mercenaries \/ 2026-08-10T12:00:00\.000Z\n# Economy 10 divines\+\n# Foulborn Mageblood \(9000c\)\nShow\n    Rarity Unique\n    BaseType "Heavy Belt"\n    Foulborn True/);
assert.ok(output.indexOf('# Economy high-value items') < output.indexOf('# Currency tiers'));
assert.match(output, /BaseType "Omen Wand"/);
assert.match(output, /SetBackgroundColor 255 215 65 240/);
assert.match(output, /Show\n    Class "Stackable Currency"/);
assert.match(output, /SetTextColor 80 255 120 255/);
assert.match(output, /Rarity Rare/);
assert.match(output, /# Currency baseline\nShow\n    Class "Stackable Currency"/);
assert.match(output, /# Unique items\nShow\n    Rarity Unique/);
assert.match(output, /SetTextColor 255 170 80 255/);
assert.match(output, /# Category rules\n# Unique items\nShow\n    Rarity Unique/);
assert.match(output, /# Maps tier 14\+\nShow\n    Class Maps\n    MapTier >= 14/);
assert.match(output, /# Maps tier 6-13\nShow\n    Class Maps\n    MapTier >= 6\n    MapTier <= 13/);
assert.match(output, /# Maps tier 1-5\nShow\n    Class Maps\n    MapTier <= 5/);
assert.match(output, /# Premium oils\nShow\n    Class "Stackable Currency"\n    BaseType "Golden Oil" "Silver Oil" "Opalescent Oil"/);
assert.match(output, /# All oils\nShow\n    Class "Stackable Currency"\n    BaseType .*"Clear Oil"/);
assert.ok(output.indexOf('# Category rules') < output.indexOf('# Currency tiers'));
assert.match(output, /# Fragments and invitations\nShow\n    Class "Map Fragments" "Misc Map Items"/);
assert.match(output, /SetBorderColor 75 95 170 255/);
assert.match(output, /# Quality gems\nShow\n    Class "Skill Gems" "Support Gems"\n    Quality >= 20/);
assert.match(output, /# All gems\nShow\n    Class "Skill Gems" "Support Gems"/);
assert.match(output, /# Divination cards\nShow\n    Class "Divination Cards"/);
assert.match(output, /SetBackgroundColor 210 235 255 235/);
assert.match(output, /# Scarabs\nShow\n    BaseType Scarab/);
assert.doesNotMatch(output, /Class Scarabs/);
assert.match(output, /SetBorderColor 130 95 40 255/);
assert.doesNotMatch(output, /# Jewels by rarity/);
assert.match(output, /# Normal jewels\nShow\n    Class Jewels\n    Rarity Normal/);
assert.match(output, /# Rare jewels\nShow\n    Class Jewels\n    Rarity Rare/);
assert.match(output, /SetBorderColor 225 175 60 255/);
assert.match(output, /# Misc rules\n# 6-linked items\nShow\n    LinkedSockets >= 6/);
assert.match(output, /# 6-socket vendor recipe\nShow\n    Sockets >= 6/);
assert.match(output, /# Chromatic RGB recipe\nShow\n    SocketGroup RGB/);
assert.doesNotMatch(output, /# 20% quality gem recipe\nShow/);
assert.match(output, /# Rare item rules\n# Rare ilvl 86\+\nShow\n    Rarity Rare\n    ItemLevel >= 86/);
assert.match(output, /# Fresh-slate default: show everything not matched above\n# Default show all\nShow/);

const hiddenCurrencyProfile = normalizeLootFilterProfile({
  currencyTiers: [
    {
      id: 'hide-scrolls',
      action: 'Hide',
      label: 'Hide scrolls',
      bases: ['Scroll of Wisdom'],
      style: 'currency',
      tier: 'baseline'
    }
  ]
});
const hiddenCurrencyOutput = generateLootFilter(hiddenCurrencyProfile);
assert.match(hiddenCurrencyOutput, /# Hide scrolls\nHide\n    Class "Stackable Currency"\n    BaseType "Scroll of Wisdom"/);

const customSoundProfile = normalizeLootFilterProfile({
  styles: {
    currency: {
      ...DEFAULT_LOOT_FILTER_PROFILE.styles.currency,
      tierSounds: {
        baseline: { file: 'currency-base.mp3', volume: 70 },
        high: { file: 'currency-high.mp3', volume: 110 }
      }
    }
  },
  currencyTiers: [
    {
      id: 'sound-chaos',
      action: 'Show',
      label: 'Sound chaos',
      bases: ['Chaos Orb'],
      style: 'currency',
      tier: 'high'
    }
  ]
});
const customSoundOutput = generateLootFilter(customSoundProfile);
assert.match(customSoundOutput, /# Sound chaos\nShow\n    Class "Stackable Currency"\n    BaseType "Chaos Orb"[\s\S]*CustomAlertSound "currency-high\.mp3" 110\n    DisableDropSoundIfAlertSound/);
assert.match(customSoundOutput, /# Currency baseline\nShow\n    Class "Stackable Currency"[\s\S]*CustomAlertSound "currency-base\.mp3" 70\n    DisableDropSoundIfAlertSound/);

const economyRules = createEconomyRulesFromOverviews([
  {
    type: 'Currency',
    endpoint: 'stash/current/currency/overview',
    overview: {
      lines: [
        { currencyTypeName: 'Divine Orb', chaosEquivalent: 150 },
        { currencyTypeName: 'Orb of Annulment', chaosEquivalent: 60 },
        { currencyTypeName: 'Orb of Chance', chaosEquivalent: 0.2 }
      ]
    }
  },
  {
    type: 'UniqueAccessory',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Mageblood', baseType: 'Heavy Belt', chaosValue: 9000 },
        { name: 'Astral Projector', baseType: 'Topaz Ring', chaosValue: 200 },
        { name: 'Le Heup of All', chaosValue: 2 }
      ]
    }
  },
  {
    type: 'UniqueJewel',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Foulborn Unnatural Instinct', baseType: 'Unnatural Instinct', chaosValue: 5000 }
      ]
    }
  }
], {
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(economyRules.map((rule) => rule.label), ['Divine Orb (150c)', 'Orb of Annulment (60c)']);
assert.deepEqual(economyRules.map((rule) => rule.tier), ['valuable', 'baseline']);
assert.deepEqual(economyRules.map((rule) => rule.economyTierId), ['divine-1', 'chaos-50']);
assert.deepEqual(economyRules.find((rule) => rule.label === 'Divine Orb (150c)').conditions, [
  { key: 'Class', value: 'Stackable Currency' },
  { key: 'BaseType', value: 'Divine Orb' }
]);
assert.equal(economyRules.some((rule) => /Mageblood|Astral Projector/.test(rule.label)), false);
assert.equal(economyRules.some((rule) => /Unnatural Instinct/.test(rule.label)), false);
const plainUniqueEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'UniqueArmour',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Forbidden Shako', baseType: 'Great Crown', chaosValue: 50 },
        { name: "Geofri's Crest", baseType: 'Great Crown', chaosValue: 1 }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.equal(plainUniqueEconomyRules.length, 0);
const divineEconomyOutput = generateLootFilter(normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  economyHighlights: {
    enabled: true,
    tiers: [
      { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
      { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
      { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
    ],
    entries: economyRules.filter((rule) => rule.label === 'Divine Orb (150c)')
  }
}));
assert.match(divineEconomyOutput, /# Economy high-value items\n# Economy 1 divine\+\n# Divine Orb \(150c\)\nShow\n    Class "Stackable Currency"\n    BaseType "Divine Orb"/);
assert.ok(divineEconomyOutput.indexOf('# Divine Orb (150c)') < divineEconomyOutput.indexOf('# Currency tiers'));
const legacyDivineEconomyProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  economyHighlights: {
    entries: [
      {
        id: 'economy-divine-1-Currency-divine-orb',
        label: 'Divine Orb (150c)',
        source: 'poe.ninja-economy',
        style: 'highValue',
        economyProviderType: 'Currency',
        conditions: [{ key: 'BaseType', value: 'Divine Orb' }]
      }
    ]
  }
});
assert.equal(legacyDivineEconomyProfile.economyHighlights.cacheVersion, undefined);
assert.deepEqual(legacyDivineEconomyProfile.economyHighlights.entries[0].conditions, [
  { key: 'Class', value: 'Stackable Currency' },
  { key: 'BaseType', value: 'Divine Orb' }
]);
const legacyApproximateUniqueProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  economyHighlights: {
    entries: [
      {
        id: 'economy-chaos-50-UniqueArmour-forbidden-shako',
        label: 'Forbidden Shako (50c)',
        source: 'poe.ninja-economy',
        style: 'highValue',
        economyProviderType: 'UniqueArmour',
        economyMatchPrecision: 'approximate-unique-base',
        conditions: [
          { key: 'Rarity', value: 'Unique' },
          { key: 'BaseType', value: 'Great Crown' }
        ]
      },
      {
        id: 'economy-divine-10-UniqueAccessory-foulborn-mageblood',
        label: 'Foulborn Mageblood (243799c)',
        source: 'poe.ninja-economy',
        style: 'highValue',
        economyProviderType: 'UniqueAccessory',
        economyMatchPrecision: 'approximate-unique-base',
        conditions: [
          { key: 'Rarity', value: 'Unique' },
          { key: 'BaseType', value: 'Heavy Belt' },
          { key: 'Foulborn', value: true }
        ]
      }
    ]
  }
});
assert.deepEqual(legacyApproximateUniqueProfile.economyHighlights.entries.map((rule) => rule.label), ['Foulborn Mageblood (243799c)']);
assert.equal(legacyApproximateUniqueProfile.economyHighlights.entries[0].economyMatchPrecision, 'variant-unique-base');
const cappedCurrencyPriorityRules = createEconomyRulesFromOverviews([
  {
    type: 'Currency',
    endpoint: 'stash/current/currency/overview',
    overview: {
      lines: [
        { currencyTypeName: 'Divine Orb', chaosEquivalent: 150 }
      ]
    }
  },
  {
    type: 'SkillGem',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Expensive Gem 1', baseType: 'Expensive Gem 1', chaosValue: 1000 },
        { name: 'Expensive Gem 2', baseType: 'Expensive Gem 2', chaosValue: 999 },
        { name: 'Expensive Gem 3', baseType: 'Expensive Gem 3', chaosValue: 998 }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 2 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 2 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 2 }
  ]
});
assert.deepEqual(cappedCurrencyPriorityRules.map((rule) => rule.label), ['Expensive Gem 1 (1000c)', 'Divine Orb (150c)']);

const foulbornLeHeupRules = createEconomyRulesFromOverviews([
  {
    type: 'UniqueAccessory',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Foulborn Le Heup of All', baseType: 'Iron Ring', variant: 'Global Multi, Global Defences', chaosValue: 929.3 },
        { name: 'Le Heup of All', baseType: 'Iron Ring', chaosValue: 2 }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(foulbornLeHeupRules.map((rule) => rule.label), ['Foulborn Le Heup of All (929.3c)']);
assert.deepEqual(foulbornLeHeupRules[0].conditions, [
  { key: 'Rarity', value: 'Unique' },
  { key: 'BaseType', value: 'Iron Ring' },
  { key: 'Foulborn', value: true }
]);

const replicaLinkedUniqueRules = createEconomyRulesFromOverviews([
  {
    type: 'UniqueWeapon',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Replica Wings of Entropy', baseType: 'Ezomyte Axe', links: 6, corrupted: true, quality: 30, chaosValue: 5000 }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(replicaLinkedUniqueRules[0].conditions, [
  { key: 'Rarity', value: 'Unique' },
  { key: 'BaseType', value: 'Ezomyte Axe' },
  { key: 'Replica', value: true },
  { key: 'LinkedSockets', operator: '>=', value: 6 },
  { key: 'Quality', operator: '>=', value: 30 },
  { key: 'Corrupted', value: true }
]);

const cappedEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'SkillGem',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: Array.from({ length: 12 }, (_, index) => ({ name: `Expensive Item ${index + 1}`, baseType: `Expensive Base ${index + 1}`, chaosValue: 2000 - index }))
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 5 }
  ]
});
assert.equal(cappedEconomyRules.filter((rule) => rule.economyTierId === 'divine-10').length, 5);

const transfiguredGemEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'SkillGem',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        {
          name: 'Wave of Conviction of Trarthus',
          baseType: 'Wave of Conviction',
          chaosValue: 1500,
          gemLevel: 21,
          gemQuality: 20,
          corrupted: true,
          tradeFilter: {
            query: {
              type: {
                option: 'Wave of Conviction',
                discriminator: 'alt_y'
              }
            }
          }
        }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(transfiguredGemEconomyRules[0].conditions, [
  { key: 'TransfiguredGem', operator: '==', value: 'Wave of Conviction of Trarthus' },
  { key: 'GemLevel', operator: '>=', value: 21 },
  { key: 'Quality', operator: '>=', value: 20 },
  { key: 'Corrupted', value: true }
]);
const transfiguredGemOutput = generateLootFilter(normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  economyHighlights: {
    enabled: true,
    tiers: [
      { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
      { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
      { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
    ],
    entries: transfiguredGemEconomyRules
  }
}));
assert.match(transfiguredGemOutput, /TransfiguredGem == "Wave of Conviction of Trarthus"/);
assert.match(transfiguredGemOutput, /GemLevel >= 21/);
assert.match(transfiguredGemOutput, /Quality >= 20/);
assert.match(transfiguredGemOutput, /Corrupted True/);
assert.doesNotMatch(transfiguredGemOutput, /BaseType "Wave of Conviction of Trarthus"/);

const holyRelicEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'SkillGem',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        {
          name: 'Summon Holy Relic of Conviction',
          chaosValue: 1500,
          gemLevel: 21,
          gemQuality: 23,
          corrupted: true,
          tradeFilter: {
            query: {
              type: {
                option: 'Summon Holy Relic',
                discriminator: 'alt_x'
              }
            }
          }
        }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(holyRelicEconomyRules[0].conditions, [
  { key: 'TransfiguredGem', operator: '==', value: 'Summon Holy Relic of Conviction' },
  { key: 'GemLevel', operator: '>=', value: 21 },
  { key: 'Quality', operator: '>=', value: 23 },
  { key: 'Corrupted', value: true }
]);

const uniqueMapEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'UniqueMap',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        { name: 'Cortex', baseType: 'Map (Tier 14)', chaosValue: 1500 }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.equal(uniqueMapEconomyRules.length, 0);

const vaalGemEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'SkillGem',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        {
          name: 'Vaal Domination (Dominating Blow of Inspiring)',
          baseType: 'Vaal Domination',
          chaosValue: 1500,
          gemLevel: 20,
          gemQuality: 20,
          corrupted: true,
          tradeFilter: {
            query: {
              type: {
                option: 'Vaal Domination',
                discriminator: 'alt_x'
              }
            }
          }
        }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(vaalGemEconomyRules[0].conditions, [
  { key: 'Class', value: ['Skill Gems', 'Support Gems'] },
  { key: 'BaseType', value: 'Vaal Domination' },
  { key: 'GemLevel', operator: '>=', value: 20 },
  { key: 'Quality', operator: '>=', value: 20 },
  { key: 'Corrupted', value: true }
]);
const vaalGemOutput = generateLootFilter(normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  economyHighlights: {
    enabled: true,
    tiers: [
      { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
      { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
      { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
    ],
    entries: vaalGemEconomyRules
  }
}));
assert.match(vaalGemOutput, /BaseType "Vaal Domination"/);
assert.doesNotMatch(vaalGemOutput, /BaseType "Vaal Domination \(Dominating Blow\)"/);
assert.doesNotMatch(vaalGemOutput, /TransfiguredGem == "Vaal Domination/);

const scorchingRayEconomyRules = createEconomyRulesFromOverviews([
  {
    type: 'SkillGem',
    endpoint: 'stash/current/item/overview',
    overview: {
      lines: [
        {
          name: 'Scorching Ray',
          chaosValue: 147,
          gemLevel: 21,
          gemQuality: 23,
          corrupted: true
        }
      ]
    }
  }
], {
  divineChaosValue: 150,
  tiers: [
    { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 10 },
    { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 10 },
    { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 10 }
  ]
});
assert.deepEqual(scorchingRayEconomyRules[0].conditions, [
  { key: 'Class', value: ['Skill Gems', 'Support Gems'] },
  { key: 'BaseType', value: 'Scorching Ray' },
  { key: 'GemLevel', operator: '>=', value: 21 },
  { key: 'Quality', operator: '>=', value: 23 },
  { key: 'Corrupted', value: true }
]);

const narrowedProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  rareEquipment: {
    enabled: true,
    armorGroups: ['str-int', 'str-dex'],
    shieldGroups: ['str-int', 'str-dex'],
    weaponGroups: ['wands', 'sceptres', 'staves'],
    miscGroups: []
  }
});
const narrowedOutput = generateLootFilter(narrowedProfile);
assert.match(narrowedOutput, /# Equipment narrowing for normal, magic, and rare bases/);
assert.match(narrowedOutput, /Hide\n    Rarity Normal\n    BaseType .*"Astral Plate"/s);
assert.match(narrowedOutput, /Hide\n    Rarity Magic\n    BaseType .*"Astral Plate"/s);
assert.match(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Astral Plate"/s);
assert.match(narrowedOutput, /"Thief's Garb"/);
assert.match(narrowedOutput, /"Cutthroat's Garb"/);
assert.match(narrowedOutput, /"Assassin's Garb"/);
assert.match(narrowedOutput, /"Sage's Robe"/);
assert.match(narrowedOutput, /"Conjurer's Vestment"/);
assert.match(narrowedOutput, /"Savant's Robe"/);
assert.match(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Necromancer Circlet"/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Angelic Kite Shield"/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Saintly Chainmail"/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Dragonscale Boots"/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Commander's Brigandine"/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"Soldier's Brigandine"/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    BaseType .*"General's Brigandine"/s);
assert.doesNotMatch(narrowedOutput, /"Thief Garb"/);
assert.doesNotMatch(narrowedOutput, /"Cutthroat Garb"/);
assert.doesNotMatch(narrowedOutput, /"Assassin Garb"/);
assert.doesNotMatch(narrowedOutput, /"Sage Robe"/);
assert.doesNotMatch(narrowedOutput, /"Conjurer Vestment"/);
assert.doesNotMatch(narrowedOutput, /"Savant Robe"/);
assert.doesNotMatch(narrowedOutput, /"Commanders Brigandine"/);
assert.doesNotMatch(narrowedOutput, /"Soldier Armour"/);
assert.doesNotMatch(narrowedOutput, /"General Armour"/);
assert.doesNotMatch(narrowedOutput, /"Saints Hauberk"/);
assert.match(narrowedOutput, /Hide\n    Rarity Normal\n    Class .*Bows/s);
assert.match(narrowedOutput, /Hide\n    Rarity Magic\n    Class .*Bows/s);
assert.match(narrowedOutput, /Hide\n    Rarity Rare\n    Class .*Bows/s);
assert.match(narrowedOutput, /Hide\n    Rarity Rare\n    Class .*Belts/s);
assert.match(narrowedOutput, /Hide\n    Rarity Rare\n    Class .*Quivers/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    Class .*Wands/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    Class .*Sceptres/s);
assert.doesNotMatch(narrowedOutput, /Hide\n    Rarity Rare\n    Class .*Staves/s);

const rareOverrideProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  rareTiers: [
    {
      id: 'rare-show-necro',
      enabled: true,
      action: 'Show',
      label: 'Show rare Necromancer Circlets',
      source: 'rare-item-rule',
      style: 'rare',
      tier: 'valuable',
      conditions: [
        { key: 'Rarity', value: 'Rare' },
        { key: 'BaseType', value: 'Necromancer Circlet' },
        { key: 'ItemLevel', operator: '>=', value: 70 },
        { key: 'Quality', operator: '>=', value: 20 }
      ]
    }
  ],
  rareEquipment: {
    enabled: true,
    armorGroups: [],
    shieldGroups: [],
    weaponGroups: [],
    miscGroups: []
  }
});
const rareOverrideOutput = generateLootFilter(rareOverrideProfile);
assert.match(rareOverrideOutput, /# Rare item rules\n# Show rare Necromancer Circlets\nShow\n    Rarity Rare\n    BaseType "Necromancer Circlet"\n    ItemLevel >= 70\n    Quality >= 20/);
assert.ok(rareOverrideOutput.indexOf('# Rare item rules') < rareOverrideOutput.indexOf('# Equipment narrowing for normal, magic, and rare bases'));

const chanceProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  chanceBases: {
    enabled: true,
    bases: ['Leather Belt', 'Heavy Belt', 'Platinum Sceptre']
  },
  rareEquipment: {
    enabled: true,
    armorGroups: [],
    shieldGroups: [],
    weaponGroups: [],
    miscGroups: []
  }
});
const chanceOutput = generateLootFilter(chanceProfile);
assert.match(chanceOutput, /# Chance bases\n# Selected chance bases\nShow\n    Rarity Normal\n    Corrupted False\n    BaseType "Leather Belt" "Heavy Belt" "Platinum Sceptre"/);
assert.match(chanceOutput, /SetTextColor 150 255 180 255/);
assert.match(chanceOutput, /SetBorderColor 80 220 120 255/);
assert.match(chanceOutput, /MinimapIcon 1 Green Star/);
assert.ok(chanceOutput.indexOf('# Chance bases') < chanceOutput.indexOf('# Misc rules'));
assert.ok(chanceOutput.indexOf('# Misc rules') < chanceOutput.indexOf('# Equipment narrowing for normal, magic, and rare bases'));

const miscRulesProfile = normalizeLootFilterProfile({
  miscRules: {
    enabled: true,
    entries: [
      {
        id: 'quality-gems',
        enabled: true,
        label: 'Gemcutter recipe',
        action: 'Show',
        style: 'gems',
        tier: 'valuable'
      },
      {
        id: 'quality-flasks',
        enabled: true,
        label: 'Glassblower recipe'
      },
      {
        id: 'six-socket',
        enabled: false
      }
    ]
  }
});
assert.equal(miscRulesProfile.miscRules.entries.find((rule) => rule.id === 'quality-gems').enabled, true);
assert.equal(miscRulesProfile.miscRules.entries.find((rule) => rule.id === 'quality-gems').label, 'Gemcutter recipe');
assert.equal(miscRulesProfile.miscRules.entries.find((rule) => rule.id === 'six-socket').enabled, false);
const miscRulesOutput = generateLootFilter(miscRulesProfile);
assert.match(miscRulesOutput, /# Gemcutter recipe\nShow\n    Class "Skill Gems" "Support Gems"\n    Quality >= 20/);
assert.match(miscRulesOutput, /# Glassblower recipe\nShow\n    Class "Life Flasks" "Mana Flasks" "Hybrid Flasks" "Utility Flasks"\n    Quality >= 20/);
assert.doesNotMatch(miscRulesOutput, /# 6-socket vendor recipe\nShow/);

const legacyChanceProfile = normalizeLootFilterProfile({
  chanceBases: {
    enabled: true,
    bases: ['Leather Belt'],
    style: 'rare'
  }
});
assert.equal(legacyChanceProfile.chanceBases.style, 'chance');

const splitShieldProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  rareEquipment: {
    enabled: true,
    armorGroups: ['dex-int'],
    shieldGroups: ['int'],
    weaponGroups: [],
    miscGroups: []
  }
});
const splitShieldOutput = generateLootFilter(splitShieldProfile);
assert.doesNotMatch(splitShieldOutput, /Hide\n    Rarity Rare\n    BaseType .*"Blood Raiment"/s);
assert.match(splitShieldOutput, /Hide\n    Rarity Rare\n    BaseType .*"Necromancer Circlet"/s);
assert.doesNotMatch(splitShieldOutput, /Hide\n    Rarity Rare\n    BaseType .*"Vaal Spirit Shield"/s);
assert.match(splitShieldOutput, /Hide\n    Rarity Rare\n    BaseType .*"Vaal Buckler"/s);

const runeDaggerOnlyProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  rareEquipment: {
    enabled: true,
    armorGroups: [],
    shieldGroups: [],
    weaponGroups: ['daggers'],
    miscGroups: [],
    baseSelections: {
      weapons: {
        daggers: ['Copper Kris', 'Platinum Kris']
      }
    }
  }
});
const runeDaggerOnlyOutput = generateLootFilter(runeDaggerOnlyProfile);
assert.doesNotMatch(runeDaggerOnlyOutput, /Hide\n    Rarity Rare\n    Class .*Daggers/s);
assert.match(runeDaggerOnlyOutput, /Hide\n    Rarity Rare\n    BaseType .*"Glass Shank"/s);
assert.doesNotMatch(runeDaggerOnlyOutput, /Hide\n    Rarity Rare\n    BaseType .*"Platinum Kris"/s);

const utilityFlaskOnlyProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  rareEquipment: {
    enabled: true,
    armorGroups: [],
    shieldGroups: [],
    weaponGroups: [],
    miscGroups: ['utility-flasks'],
    baseSelections: {
      misc: {
        'utility-flasks': ['Quicksilver Flask', 'Diamond Flask']
      }
    }
  }
});
assert.deepEqual(utilityFlaskOnlyProfile.rareEquipment.miscGroups, []);
const utilityFlaskOnlyOutput = generateLootFilter(utilityFlaskOnlyProfile);
assert.match(utilityFlaskOnlyOutput, /# Quality flasks\nShow\n    Class "Life Flasks" "Mana Flasks" "Hybrid Flasks" "Utility Flasks"\n    Rarity Normal Magic Rare\n    Quality >= 20/);
assert.match(utilityFlaskOnlyOutput, /# All flasks\nShow\n    Class "Life Flasks" "Mana Flasks" "Hybrid Flasks" "Utility Flasks"\n    Rarity Normal Magic Rare/);
assert.doesNotMatch(utilityFlaskOnlyOutput, /Hide\n    Rarity Normal\n    Class .*"Life Flasks"/s);
assert.doesNotMatch(utilityFlaskOnlyOutput, /Hide\n    Rarity Magic\n    BaseType .*"Ruby Flask"/s);
assert.doesNotMatch(utilityFlaskOnlyOutput, /Hide\n    Rarity Unique\n    BaseType .*"Ruby Flask"/s);

const hiddenNormalMagicProfile = normalizeLootFilterProfile({
  ...DEFAULT_LOOT_FILTER_PROFILE,
  chanceBases: {
    enabled: true,
    bases: ['Leather Belt']
  },
  rarityVisibility: {
    normal: false,
    magic: false
  }
});
const hiddenNormalMagicOutput = generateLootFilter(hiddenNormalMagicProfile);
const baseRaritySection = hiddenNormalMagicOutput.slice(
  hiddenNormalMagicOutput.indexOf('# Base rarity visibility'),
  hiddenNormalMagicOutput.indexOf('# Equipment narrowing for normal, magic, and rare bases') > -1
    ? hiddenNormalMagicOutput.indexOf('# Equipment narrowing for normal, magic, and rare bases')
    : hiddenNormalMagicOutput.indexOf('# Family baseline rules')
);
assert.match(hiddenNormalMagicOutput, /# Chance bases\n# Selected chance bases\nShow\n    Rarity Normal\n    Corrupted False\n    BaseType "Leather Belt"/);
assert.match(baseRaritySection, /# Disabled normal equipment\nHide\n    Rarity Normal\n    Class .*"Body Armours".*Wands/s);
assert.match(baseRaritySection, /# Disabled magic equipment\nHide\n    Rarity Magic\n    Class .*"Body Armours".*Wands/s);
assert.match(baseRaritySection, /Class .*Belts/s);
assert.match(baseRaritySection, /Class .*Quivers/s);
assert.match(baseRaritySection, /Class .*Amulets/s);
assert.match(baseRaritySection, /Class .*Rings/s);
assert.doesNotMatch(baseRaritySection, /Class .*"Life Flasks"/s);
assert.doesNotMatch(baseRaritySection, /Class .*"Utility Flasks"/s);
assert.doesNotMatch(baseRaritySection, /Class .*Maps/);
assert.doesNotMatch(baseRaritySection, /Class .*Jewels/);
assert.doesNotMatch(baseRaritySection, /Class .*"Divination Cards"/);
assert.ok(hiddenNormalMagicOutput.indexOf('# Chance bases') < hiddenNormalMagicOutput.indexOf('# Misc rules'));
assert.ok(hiddenNormalMagicOutput.indexOf('# Misc rules') < hiddenNormalMagicOutput.indexOf('# Base rarity visibility'));

console.log('Phase 3 loot-filter smoke tests passed.');
