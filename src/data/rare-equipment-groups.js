// Generated from RePoE PoE1 base_items plus GGG trade item names, then curated into UI groups.
const RARE_EQUIPMENT_GROUPS_METADATA = {
  schemaVersion: 1,
  dataVersion: 'rare-equipment-groups-2026-08-14',
  gameVersion: 'release-reviewed-2026-08-14',
  generatedAt: '2026-08-14',
  source: 'RePoE PoE1 base_items, GGG trade item names, and local UI curation',
  sourceUrl: 'https://www.pathofexile.com/api/trade/data/items',
  sourceRevision: 'GGG trade catalog reviewed 2026-08-14',
  manualOverrides: [
    'Armour, shield, weapon, jewelry, flask, and jewel groups are curated for loot-filter UI ergonomics.',
    'Two-Toned Boots appears in multiple attribute groups because item-filter BaseType cannot distinguish its defensive variant.'
  ],
  updatePolicy: 'Run npm run validate:equipment after every catalog refresh and before publishing a release.'
};

const EQUIPMENT_ARMOR_GROUPS = [
  {
    id: 'str',
    label: 'Armour (STR)',
    bases: [
      'Ancient Gauntlets', 'Ancient Greaves', 'Antique Gauntlets', 'Antique Greaves', 'Arena Plate',
      'Astral Plate', 'Barbute Helmet', 'Basemetal Treads', 'Battle Plate', 'Brimstone Treads',
      'Bronze Gauntlets', 'Bronze Plate', 'Bronze Tower Shield', 'Buckskin Tower Shield', 'Cedar Tower Shield',
      'Chestplate', 'Close Helmet', 'Colossal Tower Shield', 'Colosseum Plate', 'Cone Helmet',
      "Conqueror's Helmet", 'Copper Plate', 'Copper Tower Shield', 'Corroded Tower Shield', 'Crested Tower Shield',
      'Crusader Plate', 'Darksteel Treads', 'Ebony Tower Shield', 'Eternal Burgonet', 'Exothermic Tower Shield',
      'Ezomyte Burgonet', 'Ezomyte Tower Shield', 'Full Plate', "General's Helmet", 'Giantslayer Helmet',
      'Girded Tower Shield', 'Gladiator Helmet', 'Gladiator Plate', 'Glorious Plate', 'Golden Plate',
      'Goliath Gauntlets', 'Goliath Greaves', 'Guarding Gauntlets', 'Heat-attuned Tower Shield', 'Iron Gauntlets',
      'Iron Greaves', 'Iron Hat', 'Legion Plate', 'Leviathan Gauntlets', 'Leviathan Greaves',
      'Lordly Plate', 'Magmatic Tower Shield', 'Mahogany Tower Shield', 'Majestic Plate', 'Painted Tower Shield',
      'Pinnacle Tower Shield', 'Plate Vest', 'Plated Gauntlets', 'Plated Greaves', 'Precursor Gauntlets',
      'Precursor Greaves', 'Preserving Gauntlets', 'Rawhide Tower Shield', 'Reaver Helmet', 'Reinforced Greaves',
      'Reinforced Tower Shield', 'Royal Burgonet', 'Royal Plate', 'Samnite Helmet', 'Shagreen Tower Shield',
      'Siege Helmet', 'Spiked Gloves', 'Splintered Tower Shield', 'Steel Gauntlets', 'Steel Greaves',
      'Sun Plate', 'Thwarting Gauntlets', 'Titan Gauntlets', 'Titan Greaves', 'Titan Plate',
      'Vaal Gauntlets', 'Vaal Greaves', 'War Plate'
    ]
  },
  {
    id: 'dex',
    label: 'Evasion (DEX)',
    bases: [
      'Apprentice Gloves', "Assassin's Garb", 'Astral Leather', 'Battle Buckler', 'Buckskin Tunic',
      'Cloudwhisper Boots', 'Cold-attuned Buckler', 'Coronal Leather', 'Corrugated Buckler', 'Crusader Buckler',
      "Cutthroat's Garb", 'Deerskin Boots', 'Deerskin Gloves', 'Destiny Leather', 'Dire Pelt',
      'Eelskin Boots', 'Eelskin Gloves', 'Eelskin Tunic', 'Enameled Buckler', 'Endothermic Buckler',
      'Exquisite Leather', 'Frontier Leather', 'Full Leather', 'Gilded Buckler', 'Glorious Leather',
      'Goathide Boots', 'Goathide Buckler', 'Goathide Gloves', 'Golden Buckler', 'Gripped Gloves',
      'Grizzly Pelt', 'Hammered Buckler', 'Harpyskin Boots', 'Harpyskin Gloves', 'Hunter Hood',
      'Imperial Buckler', 'Ironwood Buckler', 'Lacquered Buckler', 'Leather Cap', 'Leather Hood',
      'Lion Pelt', 'Majestic Pelt', 'Noble Tricorne', 'Nubuck Boots', 'Nubuck Gloves',
      'Oak Buckler', 'Painted Buckler', 'Pine Buckler', 'Polar Buckler', 'Rawhide Boots',
      'Rawhide Gloves', 'Shabby Jerkin', 'Shagreen Boots', 'Shagreen Gloves', 'Sharkskin Boots',
      'Sharkskin Gloves', 'Sharkskin Tunic', 'Silken Hood', 'Sinner Tricorne', 'Slink Boots',
      'Slink Gloves', 'Stealth Boots', 'Stealth Gloves', 'Stormrider Boots', 'Strapped Leather',
      'Sun Leather', 'Supreme Leather', "Syndicate's Garb", "Thief's Garb", 'Tinker Gloves',
      'Trapsetter Gloves', 'Tricorne', 'Ursine Pelt', 'Vaal Buckler', 'Velour Boots',
      'Velour Gloves', 'War Buckler', 'Wild Leather', 'Windbreak Boots', 'Wolf Pelt',
      'Zodiac Leather'
    ]
  },
  {
    id: 'int',
    label: 'Energy Shield (INT)',
    bases: [
      'Aetherwind Gloves', 'Ancient Spirit Shield', 'Arcane Vestment', 'Arcanist Gloves', 'Arcanist Slippers',
      'Bone Circlet', 'Bone Spirit Shield', 'Brass Spirit Shield', 'Cabalist Regalia', 'Chiming Spirit Shield',
      'Conjurer Boots', 'Conjurer Gloves', "Conjurer's Vestment", 'Destroyer Regalia', 'Dreamquest Slippers',
      'Duskwalk Slippers', 'Embroidered Gloves', 'Exhausting Spirit Shield', 'Fingerless Silk Gloves', 'Fossilised Spirit Shield',
      'Harmonic Spirit Shield', 'Hubris Circlet', 'Iron Circlet', 'Ivory Spirit Shield', 'Jingling Spirit Shield',
      'Lacewood Spirit Shield', 'Leyline Gloves', "Lich's Circlet", 'Lunaris Circlet', "Mage's Vestment",
      'Mind Cage', 'Moonlit Circlet', 'Necromancer Circlet', 'Necromancer Silks', 'Nexus Gloves',
      'Nightweave Robe', 'Nightwind Slippers', "Occultist's Vestment", 'Sage Gloves', 'Sage Slippers',
      "Sage's Robe", 'Samite Gloves', 'Samite Slippers', 'Satin Gloves', 'Satin Slippers',
      "Savant's Robe", 'Scholar Boots', "Scholar's Robe", 'Silk Gloves', 'Silk Robe',
      'Silk Slippers', 'Silken Garb', 'Silken Vest', 'Silken Wrap', 'Simple Robe',
      'Solaris Circlet', 'Sorcerer Boots', 'Sorcerer Gloves', 'Spidersilk Robe', 'Steel Circlet',
      'Subsuming Spirit Shield', 'Sunfire Circlet', 'Tarnished Spirit Shield', 'Thorium Spirit Shield', 'Titanium Spirit Shield',
      'Torture Cage', 'Transfer-attuned Spirit Shield', 'Tribal Circlet', 'Twig Spirit Shield', 'Twilight Regalia',
      'Vaal Regalia', 'Vaal Spirit Shield', 'Velvet Gloves', 'Velvet Slippers', 'Vine Circlet',
      'Walnut Spirit Shield', 'Warlock Boots', 'Warlock Gloves', 'Widowsilk Robe', 'Wool Gloves',
      'Wool Shoes', 'Yew Spirit Shield'
    ]
  },
  {
    id: 'str-dex',
    label: 'Armour/Evasion (STR+DEX)',
    bases: [
      'Atonement Mask', 'Baroque Round Shield', 'Battered Helm', 'Battle Lamellar', 'Bronzescale Boots',
      'Bronzescale Gauntlets', 'Cardinal Round Shield', 'Chimerascale Boots', 'Chimerascale Gauntlets', "Commander's Brigandine",
      'Conquest Helmet', 'Conquest Lamellar', 'Crimson Round Shield', 'Desert Brigandine', 'Dragonscale Boots',
      'Dragonscale Doublet', 'Dragonscale Gauntlets', 'Elegant Round Shield', 'Fencer Helm', 'Field Lamellar',
      'Fir Round Shield', 'Fishscale Gauntlets', 'Fluted Bascinet', 'Full Dragonscale', 'Full Scale Armour',
      'Full Wyrmscale', 'Full Wyvernscale', "General's Brigandine", 'Gilded Sallet', 'Haunted Bascinet',
      'Hussar Brigandine', 'Hydrascale Boots', 'Hydrascale Gauntlets', 'Infantry Brigandine', 'Ironscale Boots',
      'Ironscale Gauntlets', 'Knight Helm', 'Lacquered Helmet', 'Leatherscale Boots', 'Light Brigandine',
      'Maple Round Shield', "Marshall's Brigandine", 'Nightmare Bascinet', 'Penitent Mask', 'Pig-Faced Bascinet',
      'Rotted Round Shield', 'Sallet', 'Scale Doublet', 'Scale Vest', 'Scarlet Round Shield',
      'Secutor Helm', 'Serpentscale Boots', 'Serpentscale Gauntlets', "Soldier's Brigandine", 'Sorrow Mask',
      'Spiked Round Shield', 'Spiny Round Shield', 'Splendid Round Shield', 'Steelscale Boots', 'Steelscale Gauntlets',
      'Studded Round Shield', 'Teak Round Shield', 'Triumphant Lamellar', 'Two-Toned Boots', 'Visored Sallet',
      'Wyrmscale Boots', 'Wyrmscale Doublet', 'Wyrmscale Gauntlets', 'Wyvernscale Boots', 'Wyvernscale Gauntlets'
    ]
  },
  {
    id: 'str-int',
    label: 'Armour/Energy Shield (STR+INT)',
    bases: [
      'Angelic Kite Shield', "Apothecary's Gloves", 'Archdemon Crown', 'Archon Kite Shield', 'Aventail Helmet',
      'Bone Helmet', 'Branded Kite Shield', 'Ceremonial Kite Shield', 'Chain Boots', 'Chain Gloves',
      'Chain Hauberk', 'Chainmail Doublet', 'Chainmail Tunic', 'Chainmail Vest', 'Champion Kite Shield',
      'Conquest Chainmail', 'Crusader Boots', 'Crusader Chainmail', 'Crusader Gloves', 'Crusader Helmet',
      'Demon Crown', 'Devout Chainmail', 'Divine Crown', 'Elegant Ringmail', 'Etched Kite Shield',
      'Faithful Helmet', 'Full Chainmail', 'Full Ringmail', 'Grand Ringmail', 'Great Crown',
      'Great Helmet', 'Holy Chainmail', 'Imp Crown', 'Laminated Kite Shield', 'Latticed Ringmail',
      'Layered Kite Shield', 'Legion Boots', 'Legion Gloves', 'Linden Kite Shield', 'Loricated Ringmail',
      'Magistrate Crown', 'Martyr Boots', 'Martyr Gloves', 'Mesh Boots', 'Mesh Gloves',
      'Mosaic Kite Shield', 'Ornate Ringmail', 'Paladin Boots', 'Paladin Crown', 'Paladin Gloves',
      "Paladin's Hauberk", 'Plank Kite Shield', 'Praetor Crown', 'Prophet Crown', 'Reinforced Kite Shield',
      'Ringmail Boots', 'Ringmail Coat', 'Ringmail Gloves', 'Riveted Boots', 'Riveted Gloves',
      'Rusted Coif', 'Sacred Chainmail', "Saint's Hauberk", 'Saintly Chainmail', 'Soldier Boots',
      'Soldier Gloves', 'Soldier Helmet', 'Steel Kite Shield', 'Two-Toned Boots', 'Zealot Boots',
      'Zealot Gloves', 'Zealot Helmet'
    ]
  },
  {
    id: 'dex-int',
    label: 'Evasion/Energy Shield (DEX+INT)',
    bases: [
      'Alder Spiked Shield', 'Alloyed Spiked Shield', 'Ambush Boots', 'Ambush Mitts', 'Ancient Mask',
      "Assassin's Boots", "Assassin's Mitts", 'Blizzard Crown', 'Blood Raiment', 'Bone Armour',
      'Burnished Spiked Shield', 'Callous Mask', 'Carnal Armour', 'Carnal Boots', 'Carnal Mitts',
      'Clasped Boots', 'Clasped Mitts', 'Compound Spiked Shield', 'Crimson Raiment', 'Crypt Armour',
      'Deicide Mask', 'Driftwood Spiked Shield', 'Ezomyte Spiked Shield', 'Festival Mask', 'Fugitive Boots',
      'Gale Crown', 'Golden Mask', 'Harlequin Mask', 'Infiltrator Boots', 'Infiltrator Mitts',
      'Iron Mask', 'Jester Mask', 'Lacquered Garb', 'Mirrored Spiked Shield', 'Murder Boots',
      'Murder Mitts', 'Necrotic Armour', 'Oiled Coat', 'Oiled Vest', 'Ornate Spiked Shield',
      'Padded Jacket', 'Padded Vest', 'Phantom Boots', 'Phantom Mitts', 'Plague Mask',
      'Polished Spiked Shield', 'Quilted Jacket', 'Raven Mask', 'Redwood Spiked Shield', 'Regicide Mask',
      'Sadist Garb', 'Sanguine Raiment', 'Scare Mask', 'Scarlet Raiment', 'Sentinel Jacket',
      'Shackled Boots', 'Sleek Coat', 'Sovereign Spiked Shield', 'Spiked Bundle', 'Strapped Boots',
      'Strapped Mitts', 'Supreme Spiked Shield', 'Torturer Garb', "Torturer's Mask", 'Trapper Boots',
      'Trapper Mitts', 'Two-Toned Boots', 'Vaal Mask', 'Varnished Coat', 'Waxed Garb',
      'Winter Crown', 'Wrapped Boots', 'Wrapped Mitts'
    ]
  }
];

function isShieldBase(base) {
  return /\b(?:Buckler|Shield|Bundle)\b/.test(base);
}

function toShieldLabel(label) {
  return label
    .replace(/^Armour\/Evasion/, 'Shield')
    .replace(/^Armour\/Energy Shield/, 'Shield')
    .replace(/^Evasion\/Energy Shield/, 'Shield')
    .replace(/^Armour/, 'Shield')
    .replace(/^Evasion/, 'Shield')
    .replace(/^Energy Shield/, 'Shield');
}

const RARE_SHIELD_GROUPS = EQUIPMENT_ARMOR_GROUPS
  .map((group) => ({
    ...group,
    label: toShieldLabel(group.label),
    bases: group.bases.filter(isShieldBase)
  }))
  .filter((group) => group.bases.length > 0);

const RARE_ARMOR_GROUPS = EQUIPMENT_ARMOR_GROUPS
  .map((group) => ({
    ...group,
    bases: group.bases.filter((base) => !isShieldBase(base))
  }))
  .filter((group) => group.bases.length > 0);

const RARE_WEAPON_GROUPS = [
  {
    id: 'wands',
    label: 'Wands',
    classes: ['Wands'],
    bases: [
      'Accumulator Wand', 'Assembler Wand', 'Blasting Wand', 'Calling Wand', 'Carved Wand', 'Coiled Wand',
      'Congregator Wand', 'Convening Wand', 'Convoking Wand', 'Crystal Wand', "Demon's Horn", 'Driftwood Wand',
      'Engraved Wand', "Faun's Horn", "Goat's Horn", 'Heathen Wand', 'Imbued Wand', 'Kinetic Wand',
      'Omen Wand', 'Opal Wand', 'Pagan Wand', 'Profane Wand', 'Prophecy Wand', 'Quartz Wand',
      'Sage Wand', 'Somatic Wand', 'Spiraled Wand', 'Tornado Wand'
    ]
  },
  {
    id: 'bows',
    label: 'Bows',
    classes: ['Bows'],
    bases: [
      'Assassin Bow', 'Bone Bow', 'Citadel Bow', 'Composite Bow', 'Compound Bow', 'Crude Bow',
      'Death Bow', 'Decimation Bow', 'Decurve Bow', 'Foundry Bow', 'Grove Bow', 'Harbinger Bow',
      'Hedron Bow', 'Highborn Bow', 'Imperial Bow', 'Ivory Bow', 'Long Bow', 'Maraketh Bow',
      'Ranger Bow', 'Recurve Bow', 'Reflex Bow', 'Royal Bow', 'Short Bow', 'Sniper Bow',
      'Solarine Bow', 'Spine Bow', 'Steelwood Bow', 'Thicket Bow'
    ]
  },
  {
    id: 'claws',
    label: 'Claws',
    classes: ['Claws'],
    bases: [
      'Awl', 'Blinder', "Cat's Paw", 'Double Claw', 'Eagle Claw', 'Eye Gouger',
      'Fright Claw', 'Gemini Claw', 'Gouger', 'Great White Claw', 'Gut Ripper', "Hellion's Paw",
      'Imperial Claw', 'Malign Fangs', 'Nailed Fist', 'Noble Claw', 'Prehistoric Claw', 'Shadow Fangs',
      'Sharktooth Claw', 'Sparkling Claw', 'Terror Claw', 'Thresher Claw', 'Throat Stabber', "Tiger's Paw",
      'Timeworn Claw', 'Twin Claw', 'Vaal Claw', 'Void Fangs'
    ]
  },
  {
    id: 'daggers',
    label: 'Daggers',
    classes: ['Daggers', 'Rune Daggers'],
    bases: [
      'Ambusher', 'Boot Blade', 'Boot Knife', 'Butcher Knife', 'Carving Knife', 'Copper Kris',
      'Demon Dagger', 'Ezomyte Dagger', 'Fiend Dagger', 'Flashfire Blade', 'Flaying Knife', 'Flickerflame Blade',
      'Glass Shank', 'Golden Kris', 'Gutting Knife', 'Hollowpoint Dagger', 'Imp Dagger', 'Imperial Skean',
      'Infernal Blade', 'Platinum Kris', 'Pneumatic Dagger', 'Poignard', 'Pressurised Dagger', 'Prong Dagger',
      'Royal Skean', 'Sai', 'Skean', 'Skinning Knife', 'Slaughter Knife', 'Stiletto', 'Trisula'
    ]
  },
  {
    id: 'sceptres',
    label: 'Sceptres',
    classes: ['Sceptres'],
    bases: [
      'Abyssal Sceptre', 'Alternating Sceptre', 'Blood Sceptre', 'Bronze Sceptre', 'Carnal Sceptre',
      'Crystal Sceptre', 'Darkwood Sceptre', 'Driftwood Sceptre', 'Grinning Fetish', 'Horned Sceptre',
      'Iron Sceptre', 'Karui Sceptre', 'Lead Sceptre', 'Ochre Sceptre', 'Opal Sceptre',
      'Oscillating Sceptre', 'Platinum Sceptre', 'Quartz Sceptre', 'Ritual Sceptre', 'Royal Sceptre',
      'Sambar Sceptre', 'Sekhem', 'Shadow Sceptre', 'Stabilising Sceptre', 'Stag Sceptre',
      "Tyrant's Sekhem", 'Vaal Sceptre', 'Void Sceptre'
    ]
  },
  {
    id: 'staves',
    label: 'Staves',
    classes: ['Staves', 'Warstaves'],
    bases: [
      'Battery Staff', 'Capacity Rod', 'Coiled Staff', 'Crescent Staff', 'Eclipse Staff', 'Eventuality Rod',
      'Ezomyte Staff', 'Foul Staff', 'Gnarled Branch', 'Highborn Staff', 'Imperial Staff', 'Iron Staff',
      'Judgement Staff', 'Lathi', 'Long Staff', 'Maelström Staff', 'Military Staff', 'Moon Staff',
      'Potentiality Rod', 'Primitive Staff', 'Primordial Staff', 'Quarterstaff', 'Reciprocation Staff', 'Royal Staff',
      'Serpentine Staff', 'Transformer Staff', 'Vile Staff', 'Woodful Staff'
    ]
  },
  {
    id: 'one-hand-swords',
    label: 'One Hand Swords',
    classes: ['One Hand Swords', 'Thrusting One Hand Swords'],
    bases: [
      'Anarchic Spiritblade', 'Ancient Sword', 'Antique Rapier', 'Apex Rapier', 'Baselard', 'Basket Rapier',
      'Battered Foil', 'Battle Sword', 'Broad Sword', 'Burnished Foil', 'Capricious Spiritblade', 'Copper Sword',
      'Corsair Sword', 'Courtesan Sword', 'Cutlass', 'Dragonbone Rapier', 'Dragoon Sword', 'Dusk Blade',
      'Elder Sword', 'Elegant Foil', 'Elegant Sword', 'Energy Blade', 'Estoc', 'Eternal Sword',
      'Fancy Foil', 'Fickle Spiritblade', 'Gemstone Sword', 'Ghostflame Blade', 'Gladius', 'Golden Blade',
      'Graceful Sword', 'Grappler', 'Harpy Rapier', 'Hook Sword', 'Jagged Foil', 'Jewelled Foil',
      'Legion Sword', 'Midnight Blade', 'Pecoraro', 'Primeval Rapier', 'Rusted Spike', 'Rusted Sword',
      'Sabre', 'Serrated Foil', 'Smallsword', 'Spiraled Foil', 'Tempered Foil', 'Thorn Rapier',
      'Tiger Hook', 'Twilight Blade', 'Vaal Blade', 'Vaal Rapier', 'Variscite Blade', 'War Sword',
      'Whalebone Rapier', 'Wyrmbone Rapier'
    ]
  },
  {
    id: 'two-hand-swords',
    label: 'Two Hand Swords',
    classes: ['Two Hand Swords'],
    bases: [
      'Banishing Blade', 'Bastard Sword', 'Blasting Blade', 'Butcher Sword', 'Corroded Blade', 'Curved Blade',
      'Energy Blade', 'Engraved Greatsword', 'Etched Greatsword', 'Exquisite Blade', 'Ezomyte Blade',
      'Footman Sword', "Headman's Sword", 'Highland Blade', 'Infernal Sword', 'Lion Sword', 'Lithe Blade',
      'Longsword', 'Ornate Sword', 'Reaver Sword', 'Rebuking Blade', 'Spectral Sword', 'Tiger Sword',
      'Two-Handed Sword', 'Vaal Greatsword', 'Wraith Sword'
    ]
  },
  {
    id: 'one-hand-axes',
    label: 'One Hand Axes',
    classes: ['One Hand Axes'],
    bases: [
      'Arming Axe', 'Boarding Axe', 'Broad Axe', 'Butcher Axe', 'Ceremonial Axe', 'Chest Splitter',
      'Cleaver', 'Decorative Axe', 'Disapprobation Axe', 'Engraved Hatchet', 'Etched Hatchet', 'Infernal Axe',
      'Jade Hatchet', 'Jasper Axe', 'Karui Axe', 'Maltreatment Axe', 'Psychotic Axe', 'Reaver Axe',
      'Royal Axe', 'Runic Hatchet', 'Rusted Hatchet', 'Siege Axe', 'Spectral Axe', 'Tomahawk',
      'Vaal Hatchet', 'War Axe', 'Wraith Axe', 'Wrist Chopper'
    ]
  },
  {
    id: 'two-hand-axes',
    label: 'Two Hand Axes',
    classes: ['Two Hand Axes'],
    bases: [
      'Abyssal Axe', 'Apex Cleaver', 'Dagger Axe', 'Despot Axe', 'Double Axe', 'Ezomyte Axe',
      'Fleshripper', 'Gilded Axe', 'Headsman Axe', 'Honed Cleaver', 'Jade Chopper', 'Jasper Chopper',
      'Karui Chopper', 'Labrys', 'Noble Axe', 'Poleaxe', 'Prime Cleaver', 'Shadow Axe',
      'Stone Axe', 'Sundering Axe', 'Talon Axe', 'Timber Axe', 'Vaal Axe', 'Void Axe',
      'Woodsplitter'
    ]
  },
  {
    id: 'one-hand-maces',
    label: 'One Hand Maces',
    classes: ['One Hand Maces'],
    bases: [
      'Ancestral Club', 'Auric Mace', 'Barbed Club', 'Battle Hammer', 'Behemoth Mace', 'Bladed Mace',
      'Boom Mace', 'Ceremonial Mace', 'Crack Mace', 'Dragon Mace', 'Dream Mace', 'Driftwood Club',
      'Flanged Mace', 'Flare Mace', 'Gavel', 'Legion Hammer', 'Nightmare Mace', 'Ornate Mace',
      'Pernach', 'Petrified Club', 'Phantom Mace', 'Rock Breaker', 'Spiked Club', 'Stone Hammer',
      'Tenderizer', 'Tribal Club', 'War Hammer', 'Wyrm Mace'
    ]
  },
  {
    id: 'two-hand-maces',
    label: 'Two Hand Maces',
    classes: ['Two Hand Maces'],
    bases: [
      'Blunt Force Condenser', 'Brass Maul', 'Colossus Mallet', 'Coronal Maul', 'Crushing Force Magnifier',
      'Dread Maul', 'Driftwood Maul', 'Fright Maul', 'Great Mallet', 'Impact Force Propagator',
      'Imperial Maul', 'Jagged Maul', 'Karui Maul', 'Mallet', 'Meatgrinder', 'Morning Star',
      'Piledriver', 'Plated Maul', 'Sledgehammer', 'Solar Maul', 'Spiny Maul', 'Steelhead',
      'Terror Maul', 'Totemic Maul', 'Tribal Maul'
    ]
  }
];

const EQUIPMENT_MISC_GROUPS = [
  {
    id: 'belts',
    label: 'Belts',
    classes: ['Belts'],
    bases: [
      'Chain Belt', 'Cloth Belt', 'Cord Belt', 'Crystal Belt', 'Heavy Belt', 'Leather Belt',
      'Mechalarm Belt', 'Mechanical Belt', 'Micro-Distillery Belt', 'Rustic Sash', 'Studded Belt',
      'Stygian Vise', 'Vanguard Belt'
    ]
  },
  {
    id: 'quivers',
    label: 'Quivers',
    classes: ['Quivers'],
    bases: [
      'Artillery Quiver', 'Blazing Arrow Quiver', 'Blunt Arrow Quiver', 'Broadhead Arrow Quiver',
      'Feathered Arrow Quiver', 'Fire Arrow Quiver', 'Heavy Arrow Quiver', 'Penetrating Arrow Quiver',
      'Primal Arrow Quiver', 'Serrated Arrow Quiver', 'Sharktooth Arrow Quiver', 'Spike-Point Arrow Quiver',
      'Two-Point Arrow Quiver', 'Vile Arrow Quiver'
    ]
  },
  {
    id: 'amulets',
    label: 'Amulets',
    classes: ['Amulets'],
    bases: [
      'Agate Amulet', 'Amber Amulet', 'Astrolabe Amulet', 'Blue Pearl Amulet', 'Citrine Amulet',
      'Coral Amulet', 'Focused Amulet', 'Gold Amulet', 'Jade Amulet', 'Jet Amulet',
      'Lapis Amulet', 'Marble Amulet', 'Onyx Amulet', 'Paua Amulet', 'Pearlescent Amulet',
      'Seaglass Amulet', 'Simplex Amulet', 'Turquoise Amulet', 'Unset Amulet'
    ]
  },
  {
    id: 'rings',
    label: 'Rings',
    classes: ['Rings'],
    bases: [
      'Amethyst Ring', 'Bone Ring', 'Breach Ring', 'Cerulean Ring', 'Cogwork Ring', 'Composite Ring',
      'Coral Ring', 'Cryonic Ring', 'Diamond Ring', 'Dusk Ring', 'Enthalpic Ring', 'Formless Ring',
      'Fugitive Ring', 'Geodesic Ring', 'Gloam Ring', 'Gold Ring', 'Helical Ring', 'Iolite Ring',
      'Iron Ring', 'Manifold Ring', 'Moonstone Ring', 'Nameless Ring', 'Opal Ring', 'Organic Ring',
      'Paua Ring', 'Penumbra Ring', 'Prismatic Ring', 'Ratcheting Ring', 'Ring', 'Ruby Ring',
      'Sapphire Ring', 'Shadowed Ring', 'Steel Ring', 'Synaptic Ring', 'Tenebrous Ring', 'Topaz Ring',
      'Two-Stone Ring', 'Unset Ring', 'Vermillion Ring'
    ]
  },
  {
    id: 'life-flasks',
    label: 'Life Flasks',
    classes: ['Life Flasks'],
    bases: [
      'Small Life Flask', 'Medium Life Flask', 'Large Life Flask', 'Greater Life Flask',
      'Grand Life Flask', 'Giant Life Flask', 'Colossal Life Flask', 'Sacred Life Flask',
      'Hallowed Life Flask', 'Sanctified Life Flask', 'Divine Life Flask', 'Eternal Life Flask'
    ]
  },
  {
    id: 'mana-flasks',
    label: 'Mana Flasks',
    classes: ['Mana Flasks'],
    bases: [
      'Small Mana Flask', 'Medium Mana Flask', 'Large Mana Flask', 'Greater Mana Flask',
      'Grand Mana Flask', 'Giant Mana Flask', 'Colossal Mana Flask', 'Sacred Mana Flask',
      'Hallowed Mana Flask', 'Sanctified Mana Flask', 'Divine Mana Flask', 'Eternal Mana Flask'
    ]
  },
  {
    id: 'hybrid-flasks',
    label: 'Hybrid Flasks',
    classes: ['Hybrid Flasks'],
    bases: [
      'Small Hybrid Flask', 'Medium Hybrid Flask', 'Large Hybrid Flask', 'Colossal Hybrid Flask',
      'Sacred Hybrid Flask', 'Hallowed Hybrid Flask'
    ]
  },
  {
    id: 'utility-flasks',
    label: 'Utility Flasks',
    classes: ['Utility Flasks'],
    bases: [
      'Amethyst Flask', 'Aquamarine Flask', 'Basalt Flask', 'Bismuth Flask', 'Corundum Flask',
      'Diamond Flask', 'Gold Flask', 'Granite Flask', 'Iron Flask', 'Jade Flask',
      'Quartz Flask', 'Quicksilver Flask', 'Ruby Flask', 'Sapphire Flask', 'Silver Flask',
      'Stibnite Flask', 'Sulphur Flask', 'Topaz Flask'
    ]
  },
  {
    id: 'jewels',
    label: 'Jewels',
    classes: ['Jewels'],
    bases: [
      'Cobalt Jewel', 'Crimson Jewel', 'Ghastly Eye Jewel', 'Hypnotic Eye Jewel', 'Large Cluster Jewel',
      'Medium Cluster Jewel', 'Murderous Eye Jewel', 'Prismatic Jewel', 'Searching Eye Jewel',
      'Small Cluster Jewel', 'Timeless Jewel', 'Viridian Jewel'
    ]
  }
];

const FLASK_EQUIPMENT_GROUP_IDS = [
  'life-flasks',
  'mana-flasks',
  'hybrid-flasks',
  'utility-flasks'
];

module.exports = {
  EQUIPMENT_MISC_GROUPS,
  FLASK_EQUIPMENT_GROUP_IDS,
  RARE_EQUIPMENT_GROUPS_METADATA,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS
};
