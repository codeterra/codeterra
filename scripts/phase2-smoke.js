const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseCopiedItem } = require('../src/domain/item-parser');
const { createTradeQuery } = require('../src/domain/trade-query');
const { findBossDropSet, getChanceBaseType } = require('../src/services/related-outcomes');
const {
  CHANCE_TARGET_OVERRIDES_METADATA,
  buildChanceBaseCatalog,
  findChanceBaseEntry
} = require('../src/services/chance-base-catalog');

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'copied-items', name), 'utf8');
}

const currency = parseCopiedItem(fixture('currency-chaos-orb.txt'));

assert.equal(currency.category, 'currency');
assert.equal(currency.name, 'Chaos Orb');
assert.equal(currency.poeNinjaType, 'Currency');
assert.equal(createTradeQuery(currency).query.type, 'Chaos Orb');
assert.equal(findBossDropSet({ name: 'Fragment of the Hydra' }).id, 'shaper');

const unique = parseCopiedItem(fixture('unique-tabula-rasa.txt'));

assert.equal(unique.category, 'unique-armour');
assert.equal(unique.name, 'Tabula Rasa');
assert.equal(unique.baseType, 'Simple Robe');
assert.equal(unique.poeNinjaType, 'UniqueArmour');
assert.equal(createTradeQuery(unique).query.name, 'Tabula Rasa');
assert.equal(createTradeQuery(unique).query.status.option, 'securable');
assert.equal(createTradeQuery(unique, { tradeStatus: 'online' }).query.status.option, 'online');

const normalBase = parseCopiedItem(fixture('normal-simple-robe.txt'));

assert.equal(getChanceBaseType(normalBase), 'Simple Robe');
assert.equal(getChanceBaseType(unique), undefined);

const corruptedNormalBase = parseCopiedItem(`
Item Class: Body Armours
Rarity: Normal
Simple Robe
--------
Item Level: 12
--------
Corrupted
`);

assert.equal(corruptedNormalBase.corrupted, true);
assert.equal(getChanceBaseType(corruptedNormalBase), undefined);

const rareChanceBase = parseCopiedItem(fixture('rare-leather-belt.txt'));

assert.equal(rareChanceBase.category, 'rare');
assert.equal(getChanceBaseType(rareChanceBase), 'Leather Belt');

const magicChanceBase = parseCopiedItem(fixture('magic-heavy-belt.txt'));

assert.equal(magicChanceBase.category, 'magic');
assert.equal(getChanceBaseType(magicChanceBase), 'Heavy Belt');

const chanceCatalog = buildChanceBaseCatalog([
  {
    name: 'Headhunter',
    baseType: 'Leather Belt',
    itemClass: 'Belts',
    poeNinjaType: 'UniqueAccessory',
    chaosValue: 12000
  },
  {
    name: "Atziri's Acuity",
    baseType: 'Vaal Gauntlets',
    itemClass: 'Gloves',
    poeNinjaType: 'UniqueArmour',
    chaosValue: 200
  },
  {
    name: 'Mystery Belt',
    baseType: 'Leather Belt',
    itemClass: 'Belts',
    poeNinjaType: 'UniqueAccessory',
    chaosValue: 50
  }
]);
assert.equal(CHANCE_TARGET_OVERRIDES_METADATA.schemaVersion, 1);
assert.equal(typeof chanceCatalog.curation.dataVersion, 'string');
const leatherBelt = chanceCatalog.bases.find((entry) => entry.baseType === 'Leather Belt');
assert.equal(leatherBelt.filterTier, 'high');
assert.equal(leatherBelt.targetCounts.chanceable, 1);
assert.equal(leatherBelt.targetCounts.unknown, 1);
const oneLineMagicBelt = parseCopiedItem(`
Item Class: Belts
Rarity: Magic
Serrated Leather Belt
--------
Item Level: 84
`);

assert.equal(oneLineMagicBelt.category, 'magic');
assert.equal(oneLineMagicBelt.baseType, undefined);
assert.equal(findChanceBaseEntry(chanceCatalog, oneLineMagicBelt).baseType, 'Leather Belt');
const prefixedSuffixedMagicBelt = parseCopiedItem(fixture('magic-leather-belt-affixed.txt'));

assert.equal(prefixedSuffixedMagicBelt.category, 'magic');
assert.equal(prefixedSuffixedMagicBelt.baseType, undefined);
assert.equal(findChanceBaseEntry(chanceCatalog, prefixedSuffixedMagicBelt).baseType, 'Leather Belt');
assert.equal(findChanceBaseEntry(chanceCatalog, corruptedNormalBase), undefined);
const vaalGauntlets = chanceCatalog.bases.find((entry) => entry.baseType === 'Vaal Gauntlets');
assert.equal(vaalGauntlets.targetCounts.notChanceable, 1);
assert.equal(vaalGauntlets.showInFilter, false);

const gem = parseCopiedItem(`
Item Class: Skill Gems
Rarity: Gem
Vaal Lightning Strike
--------
Level: 20
Quality: +20%
`);

assert.equal(gem.category, 'gem');
assert.equal(gem.gemLevel, 20);
assert.equal(gem.poeNinjaType, 'SkillGem');

const rare = parseCopiedItem(`
Item Class: Boots
Rarity: Rare
Victory Road
Dragonscale Boots
--------
Item Level: 84
--------
Unidentified
`);

assert.equal(rare.category, 'rare');
assert.equal(rare.itemLevel, 84);
assert.equal(rare.unidentified, true);
assert.equal(createTradeQuery(rare).query.type, 'Dragonscale Boots');

const pricedRare = parseCopiedItem(fixture('rare-boots-priced.txt'));

assert.equal(pricedRare.modifiers.length, 4);
assert.equal(pricedRare.pseudoGroups.find((group) => group.id === 'pseudo.life').value, 78);
assert.equal(pricedRare.pseudoGroups.find((group) => group.id === 'pseudo.fire-resistance').value, 34);

const noNumberResistance = parseCopiedItem(`
Item Class: Boots
Rarity: Rare
Glyph Pace
Dragonscale Boots
--------
Item Level: 84
--------
Nearby Enemies have Fire Resistance
`);

assert.equal(noNumberResistance.category, 'rare');
assert.equal(noNumberResistance.pseudoGroups.length, 0);

const statReadyItem = {
  ...pricedRare,
  modifiers: pricedRare.modifiers.map((modifier) => modifier.text.includes('maximum Life')
    ? { ...modifier, tradeStatId: 'explicit.stat_3299347043', value: 78 }
    : modifier)
};
const statQuery = createTradeQuery(statReadyItem, {
  selectedModifierIds: [statReadyItem.modifiers[0].id],
  useModifierValues: true
});
assert.equal(statQuery.query.stats[0].filters[0].id, 'explicit.stat_3299347043');
assert.equal(statQuery.query.stats[0].filters[0].value.min > 0, true);

const rareWand = parseCopiedItem(fixture('rare-omen-wand.txt'));
assert.equal(rareWand.category, 'rare');
assert.equal(rareWand.modifiers.length, 5);
assert.equal(rareWand.modifiers[0].type, 'implicit');
assert.equal(rareWand.modifiers.every((modifier) => !modifier.normalized.includes('(')), true);

const statReadyWand = {
  ...rareWand,
  modifiers: rareWand.modifiers.map((modifier) => modifier.text.includes('Lightning Damage to Spells')
    ? { ...modifier, tradeStatId: 'explicit.stat_2831165374', value: 74 }
    : modifier)
};
const wandStatQuery = createTradeQuery(statReadyWand, {
  selectedModifierIds: [statReadyWand.modifiers[3].id],
  useModifierValues: true
});
assert.equal(wandStatQuery.query.stats[0].filters[0].id, 'explicit.stat_2831165374');
assert.equal(wandStatQuery.query.stats[0].filters[0].value.min > 0, true);

const map = parseCopiedItem(fixture('rare-map-dangerous.txt'));

assert.equal(map.category, 'map');
assert.equal(map.mapWarnings.length, 2);

const bossFragment = parseCopiedItem(fixture('boss-fragment-hydra.txt'));
assert.equal(bossFragment.name, 'Fragment of the Hydra');
assert.equal(bossFragment.category, 'fragment');
assert.equal(bossFragment.poeNinjaType, 'Fragment');
assert.equal(findBossDropSet(bossFragment).id, 'shaper');

const bossInvitation = parseCopiedItem(`
Item Class: Misc Map Items
Rarity: Normal
Screaming Invitation
--------
Item Level: 83
--------
{ Implicit Modifier }
Modifiers to Item Quantity affect the amount of rewards dropped by the boss
--------
From the heart of the Tangle, the Eater of Worlds
reaches out for control of the Atlas.
--------
Open portals to Absence of Symmetry and Harmony by using this item in a personal Map Device.
`);
assert.equal(bossInvitation.category, 'fragment');
assert.equal(bossInvitation.poeNinjaType, 'Fragment');
assert.equal(findBossDropSet(bossInvitation).id, 'eater');

console.log('Phase 2 parser/query smoke tests passed.');
