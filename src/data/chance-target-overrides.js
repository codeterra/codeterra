const CHANCE_TARGET_OVERRIDES_METADATA = {
  schemaVersion: 1,
  dataVersion: 'chance-overrides-2026-08-09',
  gameVersion: 'release-reviewed-2026-08-09',
  updatedAt: '2026-08-09',
  source: 'Manual curated overrides reviewed against known boss/drop restrictions.',
  updatePolicy: 'Review after every Path of Exile release, then bump dataVersion and gameVersion before publishing loot-filter rules.'
};

const CHANCE_TARGET_OVERRIDES = [
  chanceable('Headhunter', 'Leather Belt', 'Core world-drop unique; historically used as a chance target.', 'core-world-drop'),
  chanceable('Mageblood', 'Heavy Belt', 'Core world-drop unique; high-value chance target.', 'core-world-drop'),
  chanceable('The Squire', 'Elegant Round Shield', 'Core world-drop unique; high-value chance target.', 'core-world-drop'),

  notChanceable('Starforge', 'Infernal Sword', 'Boss-restricted Shaper drop.', 'boss-drop:shaper'),
  notChanceable('Dying Sun', 'Ruby Flask', 'Boss-restricted Shaper drop.', 'boss-drop:shaper'),
  notChanceable('Solstice Vigil', 'Onyx Amulet', 'Boss-restricted Shaper drop.', 'boss-drop:shaper'),
  notChanceable('The Eternity Shroud', 'Blood Raiment', 'Boss-restricted Shaper drop.', 'boss-drop:shaper'),
  notChanceable("Shaper's Touch", 'Crusader Gloves', 'Boss-restricted Shaper drop.', 'boss-drop:shaper'),
  notChanceable('Voidwalker', 'Murder Boots', 'Boss-restricted Shaper drop.', 'boss-drop:shaper'),
  notChanceable("Watcher's Eye", 'Prismatic Jewel', 'Boss-restricted Elder/Uber Elder drop.', 'boss-drop:elder'),
  notChanceable('Voidforge', 'Infernal Sword', 'Boss-restricted Uber Elder drop.', 'boss-drop:uber-elder'),
  notChanceable('Indigon', 'Hubris Circlet', 'Boss-restricted Elder/Uber Elder drop.', 'boss-drop:elder'),
  notChanceable('Mark of the Shaper', 'Opal Ring', 'Boss-restricted Uber Elder drop.', 'boss-drop:uber-elder'),
  notChanceable('Mark of the Elder', 'Steel Ring', 'Boss-restricted Uber Elder drop.', 'boss-drop:uber-elder'),
  notChanceable("Atziri's Acuity", 'Vaal Gauntlets', 'Boss-restricted Uber Atziri drop.', 'boss-drop:uber-atziri'),
  notChanceable("Atziri's Disfavour", 'Vaal Axe', 'Boss-restricted Uber Atziri drop.', 'boss-drop:uber-atziri'),
  notChanceable("Atziri's Promise", 'Amethyst Flask', 'Boss-restricted Atziri drop.', 'boss-drop:atziri'),
  notChanceable("Atziri's Step", 'Slink Boots', 'Boss-restricted Atziri drop.', 'boss-drop:atziri'),
  notChanceable("Doryani's Catalyst", 'Vaal Sceptre', 'Boss-restricted Atziri drop.', 'boss-drop:atziri'),
  notChanceable('The Vertex', 'Vaal Mask', 'Boss-restricted Atziri drop.', 'boss-drop:atziri'),
  notChanceable('Progenesis', 'Amethyst Flask', 'Boss-restricted Maven drop.', 'boss-drop:maven'),
  notChanceable('Impossible Escape', 'Viridian Jewel', 'Boss-restricted Maven drop.', 'boss-drop:maven'),
  notChanceable('Echoforge', 'Infernal Sword', 'Boss-restricted Maven drop.', 'boss-drop:maven'),
  notChanceable("Viridi's Veil", 'Praetor Crown', 'Boss-restricted Maven drop.', 'boss-drop:maven'),
  notChanceable('Thread of Hope', 'Crimson Jewel', 'Boss-restricted Sirus drop.', 'boss-drop:sirus'),
  notChanceable('The Saviour', 'Legion Sword', 'Boss-restricted Sirus drop.', 'boss-drop:sirus'),
  notChanceable('Crown of the Inward Eye', 'Prophet Crown', 'Boss-restricted Sirus drop.', 'boss-drop:sirus'),
  notChanceable('Hands of the High Templar', 'Crusader Gloves', 'Boss-restricted Sirus drop.', 'boss-drop:sirus'),
  notChanceable('Ashes of the Stars', 'Onyx Amulet', 'Boss-restricted Eater of Worlds drop.', 'boss-drop:eater'),
  notChanceable('Nimis', 'Topaz Ring', 'Boss-restricted Eater of Worlds drop.', 'boss-drop:eater'),
  notChanceable('Forbidden Flesh', 'Cobalt Jewel', 'Boss-restricted Eater of Worlds drop.', 'boss-drop:eater'),
  notChanceable('Melding of the Flesh', 'Cobalt Jewel', 'Boss-restricted Eater of Worlds drop.', 'boss-drop:eater'),
  notChanceable('Crystallised Omniscience', 'Onyx Amulet', 'Boss-restricted Searing Exarch drop.', 'boss-drop:exarch'),
  notChanceable('Forbidden Flame', 'Crimson Jewel', 'Boss-restricted Searing Exarch drop.', 'boss-drop:exarch'),
  notChanceable('Dawnbreaker', 'Colossal Tower Shield', 'Boss-restricted Searing Exarch drop.', 'boss-drop:exarch'),
  notChanceable('The Annihilating Light', 'Quarterstaff', 'Boss-restricted Searing Exarch drop.', 'boss-drop:exarch')
];

function chanceable(name, baseType, reason, source) {
  return {
    name,
    baseType,
    status: 'chanceable',
    confidence: 'high',
    reason,
    source,
    updatedIn: CHANCE_TARGET_OVERRIDES_METADATA.dataVersion
  };
}

function notChanceable(name, baseType, reason, source) {
  return {
    name,
    baseType,
    status: 'not_chanceable',
    confidence: 'high',
    reason,
    source,
    updatedIn: CHANCE_TARGET_OVERRIDES_METADATA.dataVersion
  };
}

module.exports = {
  CHANCE_TARGET_OVERRIDES_METADATA,
  CHANCE_TARGET_OVERRIDES
};
