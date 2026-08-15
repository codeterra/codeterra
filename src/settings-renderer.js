const leagueInput = document.querySelector('#league-input');
const saveLeagueButton = document.querySelector('#save-league-button');
const saveStatus = document.querySelector('#save-status');
const listingCountInput = document.querySelector('#listing-count-input');
const saveListingCountButton = document.querySelector('#save-listing-count-button');
const listingStatus = document.querySelector('#listing-status');
const lookupShortcutInput = document.querySelector('#lookup-shortcut-input');
const relatedOutcomesShortcutInput = document.querySelector('#related-outcomes-shortcut-input');
const filterRuleShortcutInput = document.querySelector('#filter-rule-shortcut-input');
const settingsShortcutInput = document.querySelector('#settings-shortcut-input');
const clickThroughShortcutInput = document.querySelector('#click-through-shortcut-input');
const hideShortcutInput = document.querySelector('#hide-shortcut-input');
const saveShortcutsButton = document.querySelector('#save-shortcuts-button');
const resetShortcutsButton = document.querySelector('#reset-shortcuts-button');
const shortcutStatus = document.querySelector('#shortcut-status');
const appVersionLabel = document.querySelector('#app-version-label');
const updateChannelLabel = document.querySelector('#update-channel-label');
const checkUpdatesButton = document.querySelector('#check-updates-button');
const installUpdateButton = document.querySelector('#install-update-button');
const updateStatus = document.querySelector('#update-status');
const oauthClientIdInput = document.querySelector('#oauth-client-id-input');
const oauthRedirectUriInput = document.querySelector('#oauth-redirect-uri-input');
const oauthScopesInput = document.querySelector('#oauth-scopes-input');
const saveOauthButton = document.querySelector('#save-oauth-button');
const connectOauthButton = document.querySelector('#connect-oauth-button');
const refreshOauthButton = document.querySelector('#refresh-oauth-button');
const disconnectOauthButton = document.querySelector('#disconnect-oauth-button');
const testProfileButton = document.querySelector('#test-profile-button');
const oauthStatus = document.querySelector('#oauth-status');
const serviceTokenInput = document.querySelector('#service-token-input');
const saveServiceTokenButton = document.querySelector('#save-service-token-button');
const clearServiceTokenButton = document.querySelector('#clear-service-token-button');
const testExchangeButton = document.querySelector('#test-exchange-button');
const exchangeStatus = document.querySelector('#exchange-status');
const filterProfileSelect = document.querySelector('#filter-profile-select');
const filterProfileNameInput = document.querySelector('#filter-profile-name-input');
const newFilterProfileButton = document.querySelector('#new-filter-profile-button');
const duplicateFilterProfileButton = document.querySelector('#duplicate-filter-profile-button');
const deleteFilterProfileButton = document.querySelector('#delete-filter-profile-button');
const importFilterProfileButton = document.querySelector('#import-filter-profile-button');
const exportFilterProfileButton = document.querySelector('#export-filter-profile-button');
const filterOutputPathInput = document.querySelector('#filter-output-path-input');
const filterQuickActionInput = document.querySelector('#filter-quick-action-input');
const saveFilterConfigButton = document.querySelector('#save-filter-config-button');
const writeFilterButton = document.querySelector('#write-filter-button');
const captureFilterRuleButton = document.querySelector('#capture-filter-rule-button');
const refreshFilterPreviewButton = document.querySelector('#refresh-filter-preview-button');
const clearFilterRulesButton = document.querySelector('#clear-filter-rules-button');
const saveFilterWorkbenchButton = document.querySelector('#save-filter-workbench-button');
const filterStatus = document.querySelector('#filter-status');
const filterSummaryPanel = document.querySelector('#filter-summary-panel');
const filterDirtyIndicator = document.querySelector('#filter-dirty-indicator');
const filterCaptureDefaults = document.querySelector('#filter-capture-defaults');
const filterStyleList = document.querySelector('#filter-style-list');
const customStyleNameInput = document.querySelector('#custom-style-name-input');
const addCustomStyleButton = document.querySelector('#add-custom-style-button');
const customStyleStatus = document.querySelector('#custom-style-status');
const currencyBaselineStyle = document.querySelector('#currency-baseline-style');
const currencyTierList = document.querySelector('#currency-tier-list');
const rareBaselineStyle = document.querySelector('#rare-baseline-style');
const rareTierList = document.querySelector('#rare-tier-list');
const addCurrencyTierButton = document.querySelector('#add-currency-tier-button');
const addRareTierButton = document.querySelector('#add-rare-tier-button');
const uniqueRulesEnabledInput = document.querySelector('#unique-rules-enabled-input');
const uniqueRulesStatus = document.querySelector('#unique-rules-status');
const uniqueRuleList = document.querySelector('#unique-rule-list');
const addUniqueRuleButton = document.querySelector('#add-unique-rule-button');
const mapRulesEnabledInput = document.querySelector('#map-rules-enabled-input');
const mapRulesStatus = document.querySelector('#map-rules-status');
const mapRuleList = document.querySelector('#map-rule-list');
const addMapRuleButton = document.querySelector('#add-map-rule-button');
const fragmentRulesEnabledInput = document.querySelector('#fragment-rules-enabled-input');
const fragmentRulesStatus = document.querySelector('#fragment-rules-status');
const fragmentRuleList = document.querySelector('#fragment-rule-list');
const addFragmentRuleButton = document.querySelector('#add-fragment-rule-button');
const blueprintRulesEnabledInput = document.querySelector('#blueprint-rules-enabled-input');
const blueprintRulesStatus = document.querySelector('#blueprint-rules-status');
const blueprintRuleList = document.querySelector('#blueprint-rule-list');
const addBlueprintRuleButton = document.querySelector('#add-blueprint-rule-button');
const gemRulesEnabledInput = document.querySelector('#gem-rules-enabled-input');
const gemRulesStatus = document.querySelector('#gem-rules-status');
const gemRuleList = document.querySelector('#gem-rule-list');
const addGemRuleButton = document.querySelector('#add-gem-rule-button');
const divinationCardRulesEnabledInput = document.querySelector('#divination-card-rules-enabled-input');
const divinationCardRulesStatus = document.querySelector('#divination-card-rules-status');
const divinationCardRuleList = document.querySelector('#divination-card-rule-list');
const addDivinationCardRuleButton = document.querySelector('#add-divination-card-rule-button');
const scarabRulesEnabledInput = document.querySelector('#scarab-rules-enabled-input');
const scarabRulesStatus = document.querySelector('#scarab-rules-status');
const scarabRuleList = document.querySelector('#scarab-rule-list');
const addScarabRuleButton = document.querySelector('#add-scarab-rule-button');
const oilRulesEnabledInput = document.querySelector('#oil-rules-enabled-input');
const oilRulesStatus = document.querySelector('#oil-rules-status');
const oilRuleList = document.querySelector('#oil-rule-list');
const addOilRuleButton = document.querySelector('#add-oil-rule-button');
const jewelRulesEnabledInput = document.querySelector('#jewel-rules-enabled-input');
const jewelRulesStatus = document.querySelector('#jewel-rules-status');
const jewelRuleList = document.querySelector('#jewel-rule-list');
const addJewelRuleButton = document.querySelector('#add-jewel-rule-button');
const rareEquipmentEnabledInput = document.querySelector('#rare-equipment-enabled-input');
const showNormalItemsInput = document.querySelector('#show-normal-items-input');
const showMagicItemsInput = document.querySelector('#show-magic-items-input');
const rareArmorGroupList = document.querySelector('#rare-armor-group-list');
const rareShieldGroupList = document.querySelector('#rare-shield-group-list');
const rareWeaponGroupList = document.querySelector('#rare-weapon-group-list');
const miscEquipmentGroupList = document.querySelector('#misc-equipment-group-list');
const filterRuleList = document.querySelector('#filter-rule-list');
const filterPreviewOutput = document.querySelector('#filter-preview-output');
const filterPreviewSearchInput = document.querySelector('#filter-preview-search-input');
const filterPreviewSearchStatus = document.querySelector('#filter-preview-search-status');
const filterHistoryList = document.querySelector('#filter-history-list');
const filterHistoryStatus = document.querySelector('#filter-history-status');
const refreshDiagnosticsButton = document.querySelector('#refresh-diagnostics-button');
const clearDiagnosticsButton = document.querySelector('#clear-diagnostics-button');
const diagnosticsOutput = document.querySelector('#diagnostics-output');
const diagnosticsStatus = document.querySelector('#diagnostics-status');
const refreshCatalogMetadataButton = document.querySelector('#refresh-catalog-metadata-button');
const catalogMetadataOutput = document.querySelector('#catalog-metadata-output');
const catalogMetadataStatus = document.querySelector('#catalog-metadata-status');
const settingsTabButtons = [...document.querySelectorAll('[data-settings-tab]')];
const settingsPanels = [...document.querySelectorAll('[data-settings-panel]')];
const lootFilterPanel = document.querySelector('[data-settings-panel="loot-filter"]');
const lootTabButtons = [...document.querySelectorAll('[data-loot-tab]')];
const lootSections = [...document.querySelectorAll('[data-loot-section]')];
const equipmentTabButtons = [...document.querySelectorAll('[data-equipment-tab]')];
const equipmentPanes = [...document.querySelectorAll('[data-equipment-pane]')];
const chanceBasesEnabledInput = document.querySelector('#chance-bases-enabled-input');
const chanceBaselineStyle = document.querySelector('#chance-baseline-style');
const chanceBaseInput = document.querySelector('#chance-base-input');
const addChanceBaseButton = document.querySelector('#add-chance-base-button');
const chanceBaseOptionsList = document.querySelector('#chance-base-options');
const chanceBaseStatus = document.querySelector('#chance-base-status');
const chanceBaseList = document.querySelector('#chance-base-list');
const miscRulesEnabledInput = document.querySelector('#misc-rules-enabled-input');
const miscRulesStatus = document.querySelector('#misc-rules-status');
const miscRuleList = document.querySelector('#misc-rule-list');
const flaskRulesEnabledInput = document.querySelector('#flask-rules-enabled-input');
const flaskRulesStatus = document.querySelector('#flask-rules-status');
const flaskRuleList = document.querySelector('#flask-rule-list');
const addFlaskRuleButton = document.querySelector('#add-flask-rule-button');
const economyHighlightsEnabledInput = document.querySelector('#economy-highlights-enabled-input');
const economyTierList = document.querySelector('#economy-tier-list');
const economyTypeList = document.querySelector('#economy-type-list');
const refreshEconomyButton = document.querySelector('#refresh-economy-button');
const addEconomyTierButton = document.querySelector('#add-economy-tier-button');
const economyStatus = document.querySelector('#economy-status');
const economyHighlightList = document.querySelector('#economy-highlight-list');
const specialItemsEnabledInput = document.querySelector('#special-items-enabled-input');
const specialItemLabelInput = document.querySelector('#special-item-label-input');
const specialItemBaseInput = document.querySelector('#special-item-base-input');
const addSpecialItemButton = document.querySelector('#add-special-item-button');
const specialItemStatus = document.querySelector('#special-item-status');
const specialItemList = document.querySelector('#special-item-list');

const DEFAULT_SHORTCUTS = {
  lookup: 'CommandOrControl+D',
  relatedOutcomes: 'CommandOrControl+Alt+B',
  captureFilterRule: 'CommandOrControl+Alt+F',
  settings: 'Shift+Space',
  clickThrough: 'CommandOrControl+Alt+T',
  hideOverlay: 'Escape'
};

const ECONOMY_CACHE_VERSION = 3;

const shortcutInputs = {
  lookup: lookupShortcutInput,
  relatedOutcomes: relatedOutcomesShortcutInput,
  captureFilterRule: filterRuleShortcutInput,
  settings: settingsShortcutInput,
  clickThrough: clickThroughShortcutInput,
  hideOverlay: hideShortcutInput
};

let shortcutValues = { ...DEFAULT_SHORTCUTS };
let lootFilterState;
let lootFilterRefreshToken = 0;
let chanceBaseOptions = [];
let lootFilterSoundFiles = [];
let lootFilterDirty = false;
let renderingLootFilter = false;
let previewAudio;
let previewAudioContext;
const FILTER_FONT_SIZE_MIN = 18;
const FILTER_FONT_SIZE_MAX = 45;

const STYLE_LABELS = {
  default: 'Default',
  currency: 'Currency',
  rare: 'Rare Items',
  chance: 'Chance Bases',
  unique: 'Uniques',
  maps: 'Maps',
  fragments: 'Fragments and Invitations',
  blueprints: 'Blueprints',
  gems: 'Gems',
  divinationCards: 'Divination Cards',
  scarabs: 'Scarabs',
  oils: 'Oils',
  flasks: 'Flasks',
  jewelNormal: 'Normal Jewels',
  jewelMagic: 'Magic Jewels',
  jewelRare: 'Rare Jewels',
  jewelUnique: 'Unique Jewels',
  specialItems: 'Special Items',
  highValue: 'High Value',
  misc: 'Misc Rules'
};

const TIER_OPTIONS = ['high', 'valuable', 'baseline'];
const STYLE_SOUND_TIERS = ['baseline', 'high', 'valuable'];
const INHERIT_STYLE = '__inherit';
const SOUND_OVERRIDE_OPTIONS = [
  { value: 'inherit', label: 'Inherit sound' },
  { value: 'none', label: 'No sound' },
  { value: 'builtin', label: 'Built-in sound' },
  { value: 'custom', label: 'Custom MP3' }
];
const FILTER_EFFECT_COLORS = ['None', 'Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow', 'Cyan', 'Grey', 'Orange', 'Pink', 'Purple'];
const FILTER_ICON_SHAPES = ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Raindrop'];
const STYLE_TIER_LABELS = {
  baseline: 'Base',
  high: 'High',
  valuable: 'Valuable'
};
const DEFAULT_STYLE_OPTIONS = Object.keys(STYLE_LABELS);
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
const FLASK_BASE_TYPES = [
  'Small Life Flask',
  'Divine Life Flask',
  'Eternal Life Flask',
  'Quicksilver Flask',
  'Diamond Flask',
  'Granite Flask',
  'Jade Flask',
  'Quartz Flask'
];
const EQUIPMENT_SLOT_PATTERNS = [
  {
    id: 'helmets',
    label: 'Helmets',
    test: /\b(?:Helmet|Burgonet|Circlet|Cage|Crown|Coif|Bascinet|Sallet|Tricorne|Cap|Hood|Pelt|Mask|Crest|Hat)\b/i
  },
  {
    id: 'body-armours',
    label: 'Body Armours',
    test: /\b(?:Plate|Vest|Vestment|Robe|Regalia|Silks|Wrap|Garb|Leather|Tunic|Jerkin|Pelt|Doublet|Armour|Raiment|Jacket|Coat|Chainmail|Ringmail|Hauberk|Brigandine|Lamellar)\b/i
  },
  {
    id: 'gloves',
    label: 'Gloves',
    test: /\b(?:Gloves|Gauntlets|Mitts)\b/i
  },
  {
    id: 'boots',
    label: 'Boots',
    test: /\b(?:Boots|Greaves|Slippers|Treads|Shoes)\b/i
  }
];
const EQUIPMENT_SLOT_ORDER = new Map(EQUIPMENT_SLOT_PATTERNS.map((slot, index) => [slot.id, index]));
const CATEGORY_RULE_DEFINITIONS = {
  uniques: {
    label: 'Unique',
    enabledInput: uniqueRulesEnabledInput,
    status: uniqueRulesStatus,
    list: uniqueRuleList,
    addButton: addUniqueRuleButton,
    defaultStyle: 'unique',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Rarity', value: 'Unique' }],
    defaultRule: {
      action: 'Show',
      label: 'New unique rule',
      style: 'unique',
      tier: 'baseline',
      conditions: [{ key: 'Rarity', value: 'Unique' }]
    },
    fields: ['itemClass', 'baseTypes', 'minItemLevel', 'maxItemLevel', 'corrupted', 'identified']
  },
  maps: {
    label: 'Map',
    enabledInput: mapRulesEnabledInput,
    status: mapRulesStatus,
    list: mapRuleList,
    addButton: addMapRuleButton,
    defaultStyle: 'maps',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: 'Maps' }],
    defaultRule: {
      action: 'Show',
      label: 'New map rule',
      style: 'maps',
      tier: 'baseline',
      conditions: [
        { key: 'Class', value: 'Maps' },
        { key: 'MapTier', operator: '>=', value: 1 }
      ]
    },
    fields: ['minMapTier', 'maxMapTier', 'baseTypes', 'minItemLevel', 'maxItemLevel']
  },
  fragments: {
    label: 'Fragment',
    enabledInput: fragmentRulesEnabledInput,
    status: fragmentRulesStatus,
    list: fragmentRuleList,
    addButton: addFragmentRuleButton,
    defaultStyle: 'fragments',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: ['Map Fragments', 'Misc Map Items'] }],
    defaultRule: {
      action: 'Show',
      label: 'New fragment rule',
      style: 'fragments',
      tier: 'baseline',
      conditions: [{ key: 'Class', value: ['Map Fragments', 'Misc Map Items'] }]
    },
    fields: ['baseTypes']
  },
  blueprints: {
    label: 'Blueprint',
    enabledInput: blueprintRulesEnabledInput,
    status: blueprintRulesStatus,
    list: blueprintRuleList,
    addButton: addBlueprintRuleButton,
    defaultStyle: 'blueprints',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: 'Blueprints' }],
    defaultRule: {
      action: 'Show',
      label: 'New blueprint rule',
      style: 'blueprints',
      tier: 'baseline',
      conditions: [{ key: 'Class', value: 'Blueprints' }]
    },
    fields: ['rarity', 'baseTypes', 'minItemLevel', 'maxItemLevel']
  },
  gems: {
    label: 'Gem',
    enabledInput: gemRulesEnabledInput,
    status: gemRulesStatus,
    list: gemRuleList,
    addButton: addGemRuleButton,
    defaultStyle: 'gems',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: ['Skill Gems', 'Support Gems'] }],
    defaultRule: {
      action: 'Show',
      label: 'New gem rule',
      style: 'gems',
      tier: 'baseline',
      conditions: [{ key: 'Class', value: ['Skill Gems', 'Support Gems'] }]
    },
    fields: ['baseTypes', 'minGemLevel', 'maxGemLevel', 'minQuality', 'maxQuality', 'corrupted']
  },
  divinationCards: {
    label: 'Divination card',
    enabledInput: divinationCardRulesEnabledInput,
    status: divinationCardRulesStatus,
    list: divinationCardRuleList,
    addButton: addDivinationCardRuleButton,
    defaultStyle: 'divinationCards',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: 'Divination Cards' }],
    defaultRule: {
      action: 'Show',
      label: 'New divination card rule',
      style: 'divinationCards',
      tier: 'baseline',
      conditions: [{ key: 'Class', value: 'Divination Cards' }]
    },
    fields: ['baseTypes']
  },
  scarabs: {
    label: 'Scarab',
    enabledInput: scarabRulesEnabledInput,
    status: scarabRulesStatus,
    list: scarabRuleList,
    addButton: addScarabRuleButton,
    defaultStyle: 'scarabs',
    defaultTier: 'baseline',
    fallbackConditions: [{ key: 'BaseType', value: 'Scarab' }],
    defaultRule: {
      action: 'Show',
      label: 'New scarab rule',
      style: 'scarabs',
      tier: 'baseline',
      conditions: [{ key: 'BaseType', value: 'Scarab' }]
    },
    fields: ['baseTypes']
  },
  oils: {
    label: 'Oil',
    enabledInput: oilRulesEnabledInput,
    status: oilRulesStatus,
    list: oilRuleList,
    addButton: addOilRuleButton,
    defaultStyle: 'oils',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: 'Stackable Currency' }],
    requireBaseTypes: true,
    defaultRule: {
      action: 'Show',
      label: 'New oil rule',
      style: 'oils',
      tier: 'baseline',
      conditions: [
        { key: 'Class', value: 'Stackable Currency' },
        { key: 'BaseType', value: ['Golden Oil'] }
      ]
    },
    fields: ['baseTypes']
  },
  flasks: {
    label: 'Flask',
    enabledInput: flaskRulesEnabledInput,
    status: flaskRulesStatus,
    list: flaskRuleList,
    addButton: addFlaskRuleButton,
    defaultStyle: 'flasks',
    defaultTier: 'baseline',
    baseConditions: [
      { key: 'Class', value: ['Life Flasks', 'Mana Flasks', 'Hybrid Flasks', 'Utility Flasks'] },
      { key: 'Rarity', value: ['Normal', 'Magic', 'Rare'] }
    ],
    defaultRule: {
      action: 'Show',
      label: 'New flask rule',
      style: 'flasks',
      tier: 'baseline',
      conditions: [
        { key: 'Class', value: ['Life Flasks', 'Mana Flasks', 'Hybrid Flasks', 'Utility Flasks'] },
        { key: 'Rarity', value: ['Normal', 'Magic', 'Rare'] }
      ]
    },
    fields: ['baseTypes', 'minQuality', 'maxQuality', 'minItemLevel', 'maxItemLevel']
  },
  jewels: {
    label: 'Jewel',
    enabledInput: jewelRulesEnabledInput,
    status: jewelRulesStatus,
    list: jewelRuleList,
    addButton: addJewelRuleButton,
    defaultStyle: 'jewelRare',
    defaultTier: 'baseline',
    baseConditions: [{ key: 'Class', value: 'Jewels' }],
    defaultRule: {
      action: 'Show',
      label: 'New jewel rule',
      style: 'jewelRare',
      tier: 'baseline',
      conditions: [
        { key: 'Class', value: 'Jewels' },
        { key: 'Rarity', value: 'Rare' }
      ]
    },
    fields: ['rarity', 'baseTypes', 'minItemLevel', 'maxItemLevel', 'corrupted']
  }
};
const ECONOMY_TYPE_LABELS = {
  Currency: 'Currency',
  Fragment: 'Fragments',
  DivinationCard: 'Div Cards',
  Scarab: 'Scarabs',
  UniqueAccessory: 'Unique Accessories',
  UniqueArmour: 'Unique Armour',
  UniqueWeapon: 'Unique Weapons',
  SkillGem: 'Skill Gems'
};
const DEFAULT_ECONOMY_TIERS = [
  { id: 'chaos-50', label: '50c+', minChaos: 50, style: 'highValue', tier: 'baseline', maxItems: 500 },
  { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 500 },
  { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 500 }
];
const SPECIAL_RARITY_OPTIONS = ['', 'Normal', 'Magic', 'Rare', 'Unique'];
const SPECIAL_ACTION_OPTIONS = ['Show', 'Hide'];
const SPECIAL_BOOLEAN_OPTIONS = ['', 'True', 'False'];
const SPECIAL_TEXT_FIELDS = [
  ['baseType', 'Base type', 'BaseType'],
  ['itemClass', 'Class', 'Class'],
  ['socketGroup', 'Socket group', 'SocketGroup'],
  ['influence', 'Influence', 'HasInfluence']
];
const SPECIAL_NUMBER_FIELDS = [
  ['minItemLevel', 'Min ilvl', 'ItemLevel', '>='],
  ['maxItemLevel', 'Max ilvl', 'ItemLevel', '<='],
  ['minDropLevel', 'Min drop', 'DropLevel', '>='],
  ['maxDropLevel', 'Max drop', 'DropLevel', '<='],
  ['minMapTier', 'Min map tier', 'MapTier', '>='],
  ['minQuality', 'Min quality', 'Quality', '>='],
  ['minSockets', 'Min sockets', 'Sockets', '>='],
  ['minLinkedSockets', 'Min links', 'LinkedSockets', '>=']
];
const SPECIAL_BOOLEAN_FIELDS = [
  ['corrupted', 'Corrupted', 'Corrupted'],
  ['identified', 'Identified', 'Identified'],
  ['fractured', 'Fractured', 'FracturedItem'],
  ['synthesised', 'Synthesised', 'SynthesisedItem']
];
const CAPTURE_DEFAULT_LABELS = {
  includeClass: 'Class',
  includeBaseType: 'Base type',
  includeRarity: 'Rarity',
  includeItemLevel: 'Item level',
  includeMapTier: 'Map tier',
  includeQuality: 'Quality',
  includeCorrupted: 'Corrupted'
};

function formatExpiry(value) {
  if (!value) {
    return 'unknown expiry';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'unknown expiry';
  }

  return `expires ${date.toLocaleString()}`;
}

function setStatus(element, message, warn = false) {
  element.textContent = message;
  element.classList.toggle('status-line--warn', warn);
}

function renderUpdateStatus(status = {}) {
  appVersionLabel.textContent = `Version ${status.version || '-'}`;
  updateChannelLabel.textContent = status.canCheck ? 'GitHub releases' : 'Development build';
  installUpdateButton.hidden = !status.downloaded;
  setStatus(
    updateStatus,
    status.message || 'Updates have not been checked yet.',
    ['error', 'dev-mode', 'not-ready'].includes(status.status)
  );
}

function activateSettingsPanel(panelName) {
  for (const button of settingsTabButtons) {
    button.classList.toggle('is-active', button.dataset.settingsTab === panelName);
  }

  for (const panel of settingsPanels) {
    panel.classList.toggle('is-active', panel.dataset.settingsPanel === panelName);
  }
}

function activateLootSection(sectionName) {
  for (const button of lootTabButtons) {
    button.classList.toggle('is-active', button.dataset.lootTab === sectionName);
  }

  for (const section of lootSections) {
    section.classList.toggle('is-active', section.dataset.lootSection === sectionName);
  }
}

function acceleratorToLabel(accelerator) {
  return String(accelerator || '')
    .replace(/CommandOrControl/g, 'Ctrl')
    .replace(/Command/g, 'Cmd')
    .replace(/Control/g, 'Ctrl')
    .replace(/Plus/g, '+')
    .replace(/^Escape$/, 'Esc');
}

function keyToAcceleratorKey(event) {
  if (/^Key[A-Z]$/.test(event.code)) {
    return event.code.slice(3);
  }

  if (/^Digit\d$/.test(event.code)) {
    return event.code.slice(5);
  }

  if (/^F\d{1,2}$/.test(event.code)) {
    return event.code;
  }

  const namedKeys = {
    Space: 'Space',
    Escape: 'Escape',
    Tab: 'Tab',
    Enter: 'Enter',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Insert: 'Insert',
    Home: 'Home',
    End: 'End',
    PageUp: 'PageUp',
    PageDown: 'PageDown',
    ArrowUp: 'Up',
    ArrowDown: 'Down',
    ArrowLeft: 'Left',
    ArrowRight: 'Right'
  };

  if (namedKeys[event.code]) {
    return namedKeys[event.code];
  }

  if (event.key === '+') {
    return 'Plus';
  }

  if (event.key && event.key.length === 1) {
    return event.key.toUpperCase();
  }

  return undefined;
}

function eventToAccelerator(event) {
  const key = keyToAcceleratorKey(event);
  if (!key || ['Control', 'Alt', 'Shift', 'Meta'].includes(event.key)) {
    return undefined;
  }

  const modifiers = [];
  if (event.ctrlKey || event.metaKey) modifiers.push('CommandOrControl');
  if (event.altKey) modifiers.push('Alt');
  if (event.shiftKey && key !== 'Shift') modifiers.push('Shift');

  return [...modifiers, key].join('+');
}

function renderShortcuts() {
  for (const [name, input] of Object.entries(shortcutInputs)) {
    input.value = acceleratorToLabel(shortcutValues[name]);
  }
}

function getOauthForm() {
  return {
    clientId: oauthClientIdInput.value,
    redirectUri: oauthRedirectUriInput.value,
    scopes: oauthScopesInput.value
  };
}

function applySettingsPayload(payload) {
  const appSettings = payload?.settings || payload;
  if (appSettings?.league) {
    leagueInput.value = appSettings.league;
  }

  if (appSettings?.listingCount) {
    listingCountInput.value = appSettings.listingCount;
  }

  if (appSettings?.shortcuts) {
    shortcutValues = {
      ...DEFAULT_SHORTCUTS,
      ...appSettings.shortcuts
    };
    renderShortcuts();
  }

  if (appSettings?.oauth) {
    oauthClientIdInput.value = appSettings.oauth.clientId || '';
    oauthRedirectUriInput.value = appSettings.oauth.redirectUri || 'http://127.0.0.1:8585/callback';
    oauthScopesInput.value = appSettings.oauth.scopes || 'account:profile account:item_filter';

    if (appSettings.oauth.connected) {
      const scope = appSettings.oauth.scope ? ` - ${appSettings.oauth.scope}` : '';
      setStatus(oauthStatus, `OAuth connected, ${formatExpiry(appSettings.oauth.expiresAt)}${scope}`);
    } else {
      setStatus(oauthStatus, 'OAuth is not connected.', true);
    }

    setStatus(
      exchangeStatus,
      appSettings.oauth.serviceTokenConfigured
        ? 'Optional service token is saved. Currency Exchange can also use the public endpoint.'
        : 'Currency Exchange can use the public endpoint. No service token is saved.'
    );
  }

  if (appSettings?.lootFilter) {
    filterOutputPathInput.value = appSettings.lootFilter.outputPath || '';
    filterQuickActionInput.value = appSettings.lootFilter.quickAction || 'Show';
    setStatus(
      filterStatus,
      `${appSettings.lootFilter.profileName || 'POEHelper filter'} has ${appSettings.lootFilter.userRuleCount || 0} captured rules.`
    );
    refreshLootFilterState(false);
  }

  if (payload?.shortcuts && !appSettings?.shortcuts) {
    lookupShortcutInput.value = payload.shortcuts.lookup;
    relatedOutcomesShortcutInput.value = payload.shortcuts.relatedOutcomes;
    filterRuleShortcutInput.value = payload.shortcuts.captureFilterRule;
    settingsShortcutInput.value = payload.shortcuts.settings;
    clickThroughShortcutInput.value = payload.shortcuts.clickThrough;
    hideShortcutInput.value = payload.shortcuts.hideOverlay;
  }
}

function formatCondition(condition) {
  const operator = condition.operator ? ` ${condition.operator}` : '';
  const value = Array.isArray(condition.value) ? condition.value.join(', ') : condition.value;
  return `${condition.key}${operator} ${value}`;
}

function renderProfileControls(state) {
  const profiles = state.profiles || [];
  filterProfileSelect.innerHTML = '';

  for (const profile of profiles) {
    const option = document.createElement('option');
    option.value = profile.id;
    option.textContent = `${profile.name} (${profile.userRuleCount || 0} rules)`;
    filterProfileSelect.appendChild(option);
  }

  filterProfileSelect.value = state.activeProfileId || profiles[0]?.id || '';
  filterProfileNameInput.value = state.profileName || state.profile?.name || '';
  deleteFilterProfileButton.disabled = profiles.length <= 1;
}

function normalizeBaseKey(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\bscepters\b/gi, 'sceptre')
    .replace(/\bsceptres\b/gi, 'sceptre')
    .replace(/\bscepter\b/gi, 'sceptre')
    .toLowerCase();
}

function resolveKnownBaseName(value) {
  const key = normalizeBaseKey(value);
  return chanceBaseOptions.find((base) => normalizeBaseKey(base) === key);
}

function getBaseSuggestions(value) {
  const key = normalizeBaseKey(value);
  if (!key) {
    return [];
  }

  return chanceBaseOptions
    .filter((base) => normalizeBaseKey(base).includes(key))
    .slice(0, 4);
}

function colorToHex(color = []) {
  return [0, 1, 2].map((index) =>
    Math.max(0, Math.min(255, Number(color[index]) || 0)).toString(16).padStart(2, '0')
  ).join('').padStart(6, '0').replace(/^/, '#');
}

function hexToColor(hex, alpha = 255) {
  const normalized = String(hex || '#000000').replace('#', '').padEnd(6, '0').slice(0, 6);
  return [
    Number.parseInt(normalized.slice(0, 2), 16) || 0,
    Number.parseInt(normalized.slice(2, 4), 16) || 0,
    Number.parseInt(normalized.slice(4, 6), 16) || 0,
    Math.max(0, Math.min(255, Math.round(Number(alpha) || 255)))
  ];
}

function createTextInput(value, dataset, type = 'text') {
  const input = document.createElement('input');
  input.type = type;
  input.value = value ?? '';
  Object.assign(input.dataset, dataset);
  return input;
}

function createTextarea(value, dataset, placeholder = '') {
  const textarea = document.createElement('textarea');
  textarea.value = value ?? '';
  textarea.placeholder = placeholder;
  textarea.spellcheck = false;
  Object.assign(textarea.dataset, dataset);
  return textarea;
}

function createSelect(value, options, dataset) {
  const select = document.createElement('select');
  Object.assign(select.dataset, dataset);
  for (const optionValue of options) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    option.selected = optionValue === value;
    select.appendChild(option);
  }
  return select;
}

function createOptionSelect(value, options, dataset) {
  const select = document.createElement('select');
  Object.assign(select.dataset, dataset);
  for (const optionConfig of options) {
    const option = document.createElement('option');
    option.value = optionConfig.value;
    option.textContent = optionConfig.label;
    option.selected = optionConfig.value === value;
    select.appendChild(option);
  }
  return select;
}

function createSoundFileSelect(value, dataset) {
  const selected = value || '';
  const options = [
    { value: '', label: 'No custom sound' },
    ...lootFilterSoundFiles.map((file) => ({ value: file, label: file }))
  ];

  if (selected && !lootFilterSoundFiles.includes(selected)) {
    options.push({ value: selected, label: `${selected} (missing)` });
  }

  return createOptionSelect(selected, options, dataset);
}

function getStyleOptions(profile = lootFilterState?.profile) {
  return [
    ...new Set([
      ...DEFAULT_STYLE_OPTIONS,
      ...Object.keys(profile?.styles || {})
    ])
  ];
}

function getStyleLabel(styleName) {
  if (STYLE_LABELS[styleName]) {
    return STYLE_LABELS[styleName];
  }

  return String(styleName || '')
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createStyleSelect(value, dataset, profile = lootFilterState?.profile, options = {}) {
  const select = document.createElement('select');
  Object.assign(select.dataset, dataset);
  if (options.includeInherit) {
    const inheritOption = document.createElement('option');
    inheritOption.value = INHERIT_STYLE;
    inheritOption.textContent = options.inheritLabel || 'Inherit category';
    inheritOption.selected = value === INHERIT_STYLE;
    select.appendChild(inheritOption);
  }
  for (const styleName of getStyleOptions(profile)) {
    const option = document.createElement('option');
    option.value = styleName;
    option.textContent = getStyleLabel(styleName);
    option.selected = styleName === value;
    select.appendChild(option);
  }
  return select;
}

function appendSoundOverrideControls(container, styleOverride = {}) {
  const mode = getSoundOverrideMode(styleOverride);
  appendLabeled(container, 'Sound', createOptionSelect(mode, SOUND_OVERRIDE_OPTIONS, { styleOverrideField: 'soundMode' }));
  appendLabeled(container, 'Sound id', createTextInput(styleOverride.alertSound?.id || '', { styleOverrideField: 'soundId' }, 'number'));
  appendLabeled(container, 'Volume', createTextInput(styleOverride.alertSound?.volume || styleOverride.customAlertSound?.volume || 80, { styleOverrideField: 'soundVolume' }, 'number'));
  appendLabeled(container, 'MP3', createSoundFileSelect(styleOverride.customAlertSound?.file || '', { styleOverrideField: 'soundFile' }));
}

function getSoundOverrideMode(styleOverride = {}) {
  if (!styleOverride || typeof styleOverride !== 'object') {
    return 'inherit';
  }

  if (styleOverride.customAlertSound?.file) {
    return 'custom';
  }

  if (styleOverride.alertSound?.id) {
    return 'builtin';
  }

  if (Object.prototype.hasOwnProperty.call(styleOverride, 'alertSound')
    && styleOverride.alertSound === null
    && Object.prototype.hasOwnProperty.call(styleOverride, 'customAlertSound')
    && styleOverride.customAlertSound === null) {
    return 'none';
  }

  return 'inherit';
}

function collectStyleOverride(container) {
  const get = (field) => container.querySelector(`[data-style-override-field="${field}"]`);
  const mode = get('soundMode')?.value || 'inherit';
  const volume = Math.max(0, Math.min(300, Math.round(Number(get('soundVolume')?.value) || 80)));

  if (mode === 'none') {
    return {
      alertSound: null,
      customAlertSound: null
    };
  }

  if (mode === 'builtin') {
    const id = Math.max(1, Math.round(Number(get('soundId')?.value) || 1));
    return {
      alertSound: { id, volume },
      customAlertSound: null
    };
  }

  if (mode === 'custom') {
    const file = String(get('soundFile')?.value || '').trim();
    return {
      alertSound: null,
      customAlertSound: file ? { file, volume } : null
    };
  }

  return undefined;
}

function normalizeStyleId(value) {
  return String(value || '')
    .trim()
    .replace(/[^A-Za-z0-9 _-]+/g, '')
    .replace(/[-_\s]+(.)?/g, (_, letter = '') => letter.toUpperCase())
    .replace(/^(.)/, (letter) => letter.toLowerCase());
}

function addCustomStyleFromInput() {
  const styleId = normalizeStyleId(customStyleNameInput.value);
  if (!styleId) {
    setStatus(customStyleStatus, 'Enter a style group name first.', true);
    return;
  }

  lootFilterState.profile.styles ||= {};
  if (lootFilterState.profile.styles[styleId]) {
    setStatus(customStyleStatus, `${getStyleLabel(styleId)} already exists.`, true);
    return;
  }

  lootFilterState.profile.styles[styleId] = {
    ...structuredClone(lootFilterState.profile.styles.default || {}),
    tierBorders: structuredClone(lootFilterState.profile.styles.default?.tierBorders || {})
  };
  customStyleNameInput.value = '';
  renderLootFilterState(lootFilterState);
  setStatus(customStyleStatus, `${getStyleLabel(styleId)} added. Save Profile to keep it.`);
}

function appendLabeled(container, labelText, control) {
  const label = document.createElement('label');
  label.textContent = labelText;
  label.appendChild(control);
  container.appendChild(label);
  return control;
}

function appendColorControl(container, labelText, styleName, field, color) {
  const label = document.createElement('label');
  label.textContent = labelText;
  const wrapper = document.createElement('div');
  wrapper.className = 'swatch-input';
  const picker = createTextInput(colorToHex(color), { styleName, styleField: field, colorPart: 'hex' }, 'color');
  const alpha = createTextInput(color?.[3] ?? 255, { styleName, styleField: field, colorPart: 'alpha' }, 'number');
  alpha.min = '0';
  alpha.max = '255';
  wrapper.appendChild(picker);
  wrapper.appendChild(alpha);
  label.appendChild(wrapper);
  container.appendChild(label);
}

function appendInlineColorControl(container, labelText, field, color) {
  const label = document.createElement('label');
  label.textContent = labelText;
  const wrapper = document.createElement('div');
  wrapper.className = 'swatch-input';
  const picker = createTextInput(colorToHex(color), { styleConfigField: field, colorPart: 'hex' }, 'color');
  const alpha = createTextInput(color?.[3] ?? 255, { styleConfigField: field, colorPart: 'alpha' }, 'number');
  alpha.min = '0';
  alpha.max = '255';
  wrapper.appendChild(picker);
  wrapper.appendChild(alpha);
  label.appendChild(wrapper);
  container.appendChild(label);
}

function appendInlineStyleControls(container, style = {}) {
  appendInlineColorControl(container, 'Text', 'textColor', style.textColor);
  appendInlineColorControl(container, 'Background', 'backgroundColor', style.backgroundColor);
  appendInlineColorControl(container, 'Border', 'borderColor', style.borderColor);
  const fontSizeInput = createTextInput(clampFilterFontSize(style.fontSize || 32), { styleConfigField: 'fontSize' }, 'number');
  fontSizeInput.min = String(FILTER_FONT_SIZE_MIN);
  fontSizeInput.max = String(FILTER_FONT_SIZE_MAX);
  fontSizeInput.step = '1';
  appendLabeled(container, 'Font size', fontSizeInput);
  appendLabeled(container, 'Icon color', createSelect(style.minimapIcon?.color || 'None', FILTER_EFFECT_COLORS, { styleConfigField: 'iconColor' }));
  appendLabeled(container, 'Icon shape', createSelect(style.minimapIcon?.shape || 'Circle', FILTER_ICON_SHAPES, { styleConfigField: 'iconShape' }));
  appendLabeled(container, 'Beam', createSelect(style.beam?.color || 'None', FILTER_EFFECT_COLORS, { styleConfigField: 'beamColor' }));
  appendLabeled(container, 'Sound', createOptionSelect(getInlineStyleSoundValue(style), getInlineStyleSoundOptions(style), { styleConfigField: 'sound' }));
  appendLabeled(container, 'Volume', createTextInput(getInlineStyleSoundVolume(style), { styleConfigField: 'soundVolume' }, 'number'));
}

function appendRulePreview(container, labelText, style = {}, rule = {}) {
  const preview = document.createElement('div');
  preview.className = 'rule-preview-row';

  const sample = document.createElement('div');
  sample.className = 'rule-preview-sample';
  sample.textContent = labelText || rule.label || 'Sample item label';
  applyRulePreviewStyle(sample, style);

  const meta = document.createElement('div');
  meta.className = 'rule-preview-meta';
  const parts = [
    rule.action || 'Show',
    formatRulePreviewSound(style),
    style.minimapIcon ? `${style.minimapIcon.color || 'White'} ${style.minimapIcon.shape || 'Circle'} icon` : undefined,
    style.beam ? `${style.beam.color || 'White'} beam` : undefined
  ].filter(Boolean);
  meta.textContent = parts.join(' - ');

  preview.appendChild(sample);
  preview.appendChild(meta);
  container.appendChild(preview);
}

function applyRulePreviewStyle(node, style = {}) {
  node.style.color = colorToCss(style.textColor || [220, 228, 236, 255]);
  node.style.backgroundColor = colorToCss(style.backgroundColor || [0, 0, 0, 180]);
  node.style.borderColor = colorToCss(style.borderColor || [90, 90, 90, 220]);
  node.style.fontSize = `${Math.max(12, Math.min(28, clampFilterFontSize(style.fontSize || 32) - 12))}px`;
}

function colorToCss(color = []) {
  const [r = 0, g = 0, b = 0, a = 255] = Array.isArray(color) ? color : [];
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a / 255))})`;
}

function formatRulePreviewSound(style = {}) {
  if (style.customAlertSound?.file) {
    return `MP3 ${style.customAlertSound.file}`;
  }
  if (style.alertSound?.id) {
    return `sound ${style.alertSound.id}`;
  }
  return 'no sound';
}

function getInlineStyleSoundOptions(style = {}) {
  const options = [
    { value: 'none', label: 'None' },
    ...Array.from({ length: 16 }, (_, index) => {
      const id = index + 1;
      return { value: `builtin:${id}`, label: `Built-in ${id}` };
    }),
    ...lootFilterSoundFiles.map((file) => ({ value: `custom:${file}`, label: file }))
  ];
  const value = getInlineStyleSoundValue(style);
  if (value.startsWith('custom:')) {
    const file = value.slice('custom:'.length);
    if (!lootFilterSoundFiles.includes(file)) {
      options.push({ value, label: `${file} (missing)` });
    }
  }
  return options;
}

function getInlineStyleSoundValue(style = {}) {
  if (style.customAlertSound?.file) {
    return `custom:${style.customAlertSound.file}`;
  }
  if (style.alertSound?.id) {
    return `builtin:${style.alertSound.id}`;
  }
  return 'none';
}

function getInlineStyleSoundVolume(style = {}) {
  return style.customAlertSound?.volume || style.alertSound?.volume || 80;
}

function collectInlineStyleConfig(container, fallbackStyle = {}) {
  const style = structuredClone(fallbackStyle || {});
  const controls = [...container.querySelectorAll('[data-style-config-field]')];
  const colorGroups = {};

  for (const control of controls) {
    const field = control.dataset.styleConfigField;
    if (!field) continue;

    if (control.dataset.colorPart) {
      colorGroups[field] ||= {};
      colorGroups[field][control.dataset.colorPart] = control.value;
      continue;
    }

    if (field === 'fontSize') {
      style.fontSize = clampFilterFontSize(control.value);
    } else if (field === 'iconColor') {
      style.minimapIcon = control.value === 'None'
        ? null
        : { ...(style.minimapIcon || { size: 1, shape: 'Circle' }), color: control.value };
    } else if (field === 'iconShape' && style.minimapIcon) {
      style.minimapIcon.shape = control.value;
    } else if (field === 'beamColor') {
      style.beam = control.value === 'None' ? null : { color: control.value, temporary: true };
    } else if (field === 'sound') {
      applyInlineStyleSound(style, control.value, container);
    }
  }

  for (const [field, parts] of Object.entries(colorGroups)) {
    style[field] = hexToColor(parts.hex, parts.alpha);
  }

  return style;
}

function clampFilterFontSize(value) {
  return Math.max(FILTER_FONT_SIZE_MIN, Math.min(FILTER_FONT_SIZE_MAX, Math.round(Number(value) || 32)));
}

function applyInlineStyleSound(style, value, container) {
  const volume = Math.max(0, Math.min(300, Math.round(Number(container.querySelector('[data-style-config-field="soundVolume"]')?.value) || 80)));
  if (value === 'none') {
    style.alertSound = null;
    style.customAlertSound = null;
  } else if (String(value).startsWith('builtin:')) {
    style.alertSound = { id: Math.max(1, Math.round(Number(value.slice('builtin:'.length)) || 1)), volume };
    style.customAlertSound = null;
  } else if (String(value).startsWith('custom:')) {
    style.alertSound = null;
    style.customAlertSound = { file: value.slice('custom:'.length), volume };
  }
}

async function previewSelectedFilterSound(value, container) {
  const soundValue = String(value || '');
  if (soundValue === 'none') {
    stopPreviewAudio();
    return;
  }

  const volume = Math.max(0, Math.min(300, Math.round(Number(container?.querySelector('[data-style-config-field="soundVolume"]')?.value) || 80)));
  try {
    if (soundValue.startsWith('custom:')) {
      await playCustomFilterSound(soundValue.slice('custom:'.length), volume);
    } else if (soundValue.startsWith('builtin:')) {
      playBuiltInFilterSound(Number(soundValue.slice('builtin:'.length)) || 1, volume);
    }
  } catch (error) {
    setStatus(filterStatus, `Could not preview sound: ${error.message}`, true);
  }
}

async function playCustomFilterSound(fileName, volume) {
  if (!fileName) {
    return;
  }

  const result = await window.poehelper.previewLootFilterSound(fileName);
  if (result?.status !== 'ok' || !result.dataUrl) {
    throw new Error(`${fileName} was not found next to the filter file.`);
  }

  stopPreviewAudio();
  previewAudio = new Audio(result.dataUrl);
  previewAudio.volume = Math.max(0, Math.min(1, volume / 100));
  await previewAudio.play();
}

function playBuiltInFilterSound(soundId, volume) {
  stopPreviewAudio();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  previewAudioContext ||= new AudioContextClass();
  const context = previewAudioContext;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  const frequency = 280 + (Math.max(1, Math.min(16, soundId)) * 45);

  oscillator.type = soundId % 3 === 0 ? 'triangle' : 'sine';
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.25, now + 0.12);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(Math.max(0.02, Math.min(0.35, volume / 300)), now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.3);
}

function stopPreviewAudio() {
  if (previewAudio) {
    previewAudio.pause();
    previewAudio.currentTime = 0;
    previewAudio = undefined;
  }
}

function createStyleOverridePanel(style, hidden) {
  const panel = document.createElement('div');
  panel.className = 'inline-style-panel';
  panel.dataset.styleOverridePanel = 'true';
  panel.hidden = hidden;
  appendInlineStyleControls(panel, style);
  return panel;
}

function mergeInlineStyleConfig(baseStyle = {}, overrideStyle = {}) {
  if (!overrideStyle || typeof overrideStyle !== 'object') {
    return structuredClone(baseStyle || {});
  }

  return {
    ...structuredClone(baseStyle || {}),
    ...structuredClone(overrideStyle)
  };
}

function toggleInlineStylePanel(input) {
  const row = input.closest('.tier-row, .filter-rule-row');
  const panel = row?.querySelector('[data-style-override-panel]');
  if (panel) {
    panel.hidden = !input.checked;
  }
}

function renderCaptureDefaults(profile) {
  if (!filterCaptureDefaults) {
    return;
  }
  filterCaptureDefaults.innerHTML = '';
  for (const [key, labelText] of Object.entries(CAPTURE_DEFAULT_LABELS)) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.captureDefault = key;
    input.checked = Boolean(profile.quickRuleDefaults?.[key]);
    label.appendChild(input);
    label.appendChild(document.createTextNode(labelText));
    filterCaptureDefaults.appendChild(label);
  }
}

function renderStyleList(profile) {
  if (!filterStyleList) {
    return;
  }
  filterStyleList.innerHTML = '';
  lootFilterSoundFiles = lootFilterState?.soundFiles || [];
  for (const styleName of getStyleOptions(profile)) {
    const style = profile.styles?.[styleName] || {};
    const card = document.createElement('article');
    card.className = 'filter-style-card';

    const header = document.createElement('div');
    header.className = 'filter-style-card__header';
    const title = document.createElement('div');
    title.className = 'filter-style-card__title';
    title.textContent = getStyleLabel(styleName);
    header.appendChild(title);
    card.appendChild(header);

    const visualGrid = document.createElement('div');
    visualGrid.className = 'style-visual-grid';
    appendColorControl(visualGrid, 'Text', styleName, 'textColor', style.textColor);
    appendColorControl(visualGrid, 'Background', styleName, 'backgroundColor', style.backgroundColor);
    appendColorControl(visualGrid, 'Border', styleName, 'borderColor', style.borderColor);
    appendLabeled(visualGrid, 'Font size', createTextInput(style.fontSize || 32, { styleName, styleField: 'fontSize' }, 'number'));
    appendLabeled(visualGrid, 'Icon color', createSelect(style.minimapIcon?.color || 'None', ['None', 'Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow', 'Cyan', 'Grey', 'Orange', 'Pink', 'Purple'], { styleName, styleField: 'iconColor' }));
    appendLabeled(visualGrid, 'Icon shape', createSelect(style.minimapIcon?.shape || 'Circle', ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Raindrop'], { styleName, styleField: 'iconShape' }));
    appendLabeled(visualGrid, 'Beam', createSelect(style.beam?.color || 'None', ['None', 'Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow', 'Cyan', 'Grey', 'Orange', 'Pink', 'Purple'], { styleName, styleField: 'beamColor' }));

    const soundGrid = document.createElement('div');
    soundGrid.className = 'style-sound-grid';
    appendLabeled(soundGrid, 'Built-in sound id', createTextInput(style.alertSound?.id || '', { styleName, styleField: 'alertSoundId' }, 'number'));
    appendLabeled(soundGrid, 'Built-in volume', createTextInput(style.alertSound?.volume || 80, { styleName, styleField: 'alertSoundVolume' }, 'number'));

    const tierSoundGrid = document.createElement('div');
    tierSoundGrid.className = 'style-tier-sound-grid';
    for (const tier of STYLE_SOUND_TIERS) {
      const tierSound = style.tierSounds?.[tier];
      const tierRow = document.createElement('div');
      tierRow.className = 'style-tier-sound-row';
      const tierTitle = document.createElement('div');
      tierTitle.className = 'style-tier-sound-row__title';
      tierTitle.textContent = `${STYLE_TIER_LABELS[tier]} sound`;
      tierRow.appendChild(tierTitle);
      appendLabeled(tierRow, 'MP3', createSoundFileSelect(tierSound?.file || '', { styleName, styleField: `tierSoundFile:${tier}` }));
      appendLabeled(tierRow, 'Volume', createTextInput(tierSound?.volume || 100, { styleName, styleField: `tierSoundVolume:${tier}` }, 'number'));
      tierSoundGrid.appendChild(tierRow);
    }

    for (const tier of TIER_OPTIONS) {
      appendColorControl(visualGrid, `${STYLE_TIER_LABELS[tier] || tier} border`, styleName, `tierBorder:${tier}`, style.tierBorders?.[tier] || style.borderColor);
    }

    if (lootFilterSoundFiles.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'filter-rule-row__meta';
      hint.textContent = 'No .mp3 files found next to this profile output path.';
      soundGrid.appendChild(hint);
    }

    card.appendChild(visualGrid);
    soundGrid.appendChild(tierSoundGrid);
    card.appendChild(soundGrid);
    appendRulePreview(card, `${getStyleLabel(styleName)} sample`, style, { action: 'Show' });
    filterStyleList.appendChild(card);
  }
}

function renderTierLists(profile) {
  renderCurrencyBaselineStyle(profile.currencyStyle);
  renderCurrencyTiers(profile.currencyTiers || []);
  renderRareBaselineStyle(profile.rareStyle);
  renderRareTiers(profile.rareTiers || []);
}

function renderCurrencyBaselineStyle(currencyStyle = {}) {
  currencyBaselineStyle.innerHTML = '';
  const row = document.createElement('article');
  row.className = 'category-baseline-row';
  row.dataset.currencyBaselineStyle = 'true';

  const header = document.createElement('div');
  header.className = 'category-baseline-row__title';
  header.textContent = 'Currency baseline style';
  row.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'inline-style-grid';
  appendInlineStyleControls(grid, currencyStyle.styleConfig);
  row.appendChild(grid);
  appendRulePreview(row, 'Chaos Orb', currencyStyle.styleConfig, { action: 'Show' });

  currencyBaselineStyle.appendChild(row);
}

function renderRareBaselineStyle(rareStyle = {}) {
  rareBaselineStyle.innerHTML = '';
  const row = document.createElement('article');
  row.className = 'category-baseline-row';
  row.dataset.rareBaselineStyle = 'true';

  const header = document.createElement('div');
  header.className = 'category-baseline-row__title';
  header.textContent = 'Equipment rule baseline style';
  row.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'inline-style-grid';
  appendInlineStyleControls(grid, rareStyle.styleConfig);
  row.appendChild(grid);
  appendRulePreview(row, 'Rare Astral Plate', rareStyle.styleConfig, { action: 'Show' });

  rareBaselineStyle.appendChild(row);
}

function renderCategoryRules(profile) {
  for (const categoryId of Object.keys(CATEGORY_RULE_DEFINITIONS)) {
    renderCategoryRuleList(categoryId, profile.categoryRules?.[categoryId]);
  }
}

function renderCategoryRuleList(categoryId, category = {}) {
  const definition = CATEGORY_RULE_DEFINITIONS[categoryId];
  const entries = category.rules || [];
  definition.enabledInput.checked = category.enabled !== false;
  definition.list.innerHTML = '';
  setStatus(definition.status, `${entries.filter((entry) => entry.enabled !== false).length} ${definition.label.toLowerCase()} rules enabled.`);

  definition.list.appendChild(createCategoryBaselineRow(categoryId, definition, category));

  if (entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = `No ${definition.label.toLowerCase()} rules configured.`;
    definition.list.appendChild(empty);
    return;
  }

  entries.forEach((rule, index) => {
    const row = document.createElement('article');
    row.className = 'filter-rule-row category-rule-row';
    row.dataset.categoryRuleCategory = categoryId;
    row.dataset.categoryRuleIndex = String(index);

    const header = document.createElement('div');
    header.className = 'filter-rule-row__header';
    const title = document.createElement('div');
    title.className = 'filter-rule-row__title';
    title.textContent = rule.label || `${definition.label} rule ${index + 1}`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'danger-button';
    remove.dataset.removeCategoryRuleCategory = categoryId;
    remove.dataset.removeCategoryRuleIndex = String(index);
    remove.textContent = 'Delete';
    header.appendChild(title);
    header.appendChild(createRuleOrderControls('category', index, { categoryId }));
    header.appendChild(remove);

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = rule.enabled !== false;
    enabled.dataset.categoryRuleField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(rule.label, { categoryRuleField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(rule.action || 'Show', SPECIAL_ACTION_OPTIONS, { categoryRuleField: 'action' }));
    const override = document.createElement('input');
    override.type = 'checkbox';
    override.checked = Boolean(rule.overrideCategoryStyle);
    override.dataset.categoryRuleField = 'overrideCategoryStyle';
    appendLabeled(editGrid, 'Override category', override);

    const conditionsGrid = document.createElement('div');
    conditionsGrid.className = 'special-item-row__conditions';
    appendCategoryConditionControls(conditionsGrid, categoryId, definition, rule);

    const conditionSummary = document.createElement('div');
    conditionSummary.className = 'filter-rule-row__conditions';
    for (const condition of rule.conditions || []) {
      const pill = document.createElement('span');
      pill.className = 'condition-pill';
      pill.textContent = formatCondition(condition);
      conditionSummary.appendChild(pill);
    }

    row.appendChild(header);
    row.appendChild(editGrid);
    const previewStyle = rule.overrideCategoryStyle
      ? mergeInlineStyleConfig(category.styleConfig, rule.styleOverride || rule.styleConfig)
      : category.styleConfig;
    row.appendChild(createStyleOverridePanel(
      previewStyle,
      !rule.overrideCategoryStyle
    ));
    appendRulePreview(row, getSampleLabelForCategory(categoryId, rule), previewStyle, rule);
    row.appendChild(conditionsGrid);
    row.appendChild(conditionSummary);
    definition.list.appendChild(row);
  });
}

function createCategoryBaselineRow(categoryId, definition, category = {}) {
  const row = document.createElement('article');
  row.className = 'category-baseline-row';
  row.dataset.categoryBaselineCategory = categoryId;

  const header = document.createElement('div');
  header.className = 'category-baseline-row__title';
  header.textContent = `${definition.label} baseline style`;
  row.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'inline-style-grid';
  appendInlineStyleControls(grid, category.styleConfig);
  row.appendChild(grid);
  appendRulePreview(row, getSampleLabelForCategory(categoryId), category.styleConfig, { action: 'Show' });

  return row;
}

function getSampleLabelForCategory(categoryId, rule = {}) {
  const typedBase = (rule.conditions || []).find((condition) => condition.key === 'BaseType')?.value;
  const firstBase = Array.isArray(typedBase) ? typedBase[0] : typedBase;
  const samples = {
    uniques: firstBase || 'Unique Heavy Belt',
    maps: firstBase || 'Tier 16 Map',
    fragments: firstBase || 'Screaming Invitation',
    blueprints: firstBase || 'Blueprint',
    gems: firstBase || 'Vaal Lightning Strike',
    divinationCards: firstBase || 'The Doctor',
    scarabs: firstBase || 'Cartography Scarab',
    oils: firstBase || 'Golden Oil',
    flasks: firstBase || 'Diamond Flask',
    jewels: firstBase || 'Cobalt Jewel'
  };
  return samples[categoryId] || firstBase || 'Sample item';
}

function appendCategoryConditionControls(container, categoryId, definition, rule) {
  if (definition.fields.includes('itemClass')) {
    appendLabeled(container, 'Class', createTextarea(getConditionText(rule, 'Class').replace(/,\s*/g, '\n'), { categoryRuleField: 'itemClass' }, 'Optional classes, one per line'));
  }

  if (definition.fields.includes('rarity')) {
    appendLabeled(container, 'Rarity', createSelect(getConditionText(rule, 'Rarity'), SPECIAL_RARITY_OPTIONS, { categoryRuleField: 'rarity' }));
  }

  if (definition.fields.includes('minMapTier')) {
    appendLabeled(container, 'Min map tier', createTextInput(getConditionText(rule, 'MapTier', '>='), { categoryRuleField: 'minMapTier' }, 'number'));
  }

  if (definition.fields.includes('maxMapTier')) {
    appendLabeled(container, 'Max map tier', createTextInput(getConditionText(rule, 'MapTier', '<='), { categoryRuleField: 'maxMapTier' }, 'number'));
  }

  if (definition.fields.includes('minItemLevel')) {
    appendLabeled(container, 'Min ilvl', createTextInput(getConditionText(rule, 'ItemLevel', '>='), { categoryRuleField: 'minItemLevel' }, 'number'));
  }

  if (definition.fields.includes('maxItemLevel')) {
    appendLabeled(container, 'Max ilvl', createTextInput(getConditionText(rule, 'ItemLevel', '<='), { categoryRuleField: 'maxItemLevel' }, 'number'));
  }

  if (definition.fields.includes('minGemLevel')) {
    appendLabeled(container, 'Min gem level', createTextInput(getConditionText(rule, 'GemLevel', '>='), { categoryRuleField: 'minGemLevel' }, 'number'));
  }

  if (definition.fields.includes('maxGemLevel')) {
    appendLabeled(container, 'Max gem level', createTextInput(getConditionText(rule, 'GemLevel', '<='), { categoryRuleField: 'maxGemLevel' }, 'number'));
  }

  if (definition.fields.includes('minQuality')) {
    appendLabeled(container, 'Min quality', createTextInput(getConditionText(rule, 'Quality', '>='), { categoryRuleField: 'minQuality' }, 'number'));
  }

  if (definition.fields.includes('maxQuality')) {
    appendLabeled(container, 'Max quality', createTextInput(getConditionText(rule, 'Quality', '<='), { categoryRuleField: 'maxQuality' }, 'number'));
  }

  if (definition.fields.includes('corrupted')) {
    appendLabeled(container, 'Corrupted', createSelect(getConditionText(rule, 'Corrupted'), SPECIAL_BOOLEAN_OPTIONS, { categoryRuleField: 'corrupted' }));
  }

  if (definition.fields.includes('identified')) {
    appendLabeled(container, 'Identified', createSelect(getConditionText(rule, 'Identified'), SPECIAL_BOOLEAN_OPTIONS, { categoryRuleField: 'identified' }));
  }

  if (definition.fields.includes('baseTypes')) {
    const value = getConditionText(rule, 'BaseType');
    const placeholders = {
      oils: `Leave blank only when this rule should be skipped.\n${OIL_BASE_TYPES.join('\n')}`,
      scarabs: 'Leave blank to match all scarabs.\nAmbush Scarab\nCartography Scarab',
      divinationCards: 'Leave blank to match all divination cards.\nThe Doctor\nBrother\'s Gift',
      gems: 'Leave blank to match all gems.\nScorching Ray\nVaal Lightning Strike',
      fragments: 'Leave blank to match all fragments and invitations.\nScreaming Invitation\nFragment of the Hydra',
      blueprints: 'Leave blank to match all blueprints.\nBlueprint\nRecords Office',
      uniques: 'Leave blank to match all unique items.\nLeather Belt\nHeavy Belt\nMageblood',
      flasks: `Leave blank to match all flasks.\n${FLASK_BASE_TYPES.join('\n')}`,
      jewels: 'Leave blank to match all jewels.\nCobalt Jewel\nLarge Cluster Jewel'
    };
    appendLabeled(container, 'Only these names', createTextarea(value.replace(/,\s*/g, '\n'), { categoryRuleField: 'baseTypes' }, placeholders[categoryId] || 'Leave blank to match the whole category.'));
  }
}

function renderRareEquipment(profile, groups) {
  const rareEquipment = profile.rareEquipment || {};
  const baseSelections = rareEquipment.baseSelections || {};
  const rarityVisibility = profile.rarityVisibility || {};
  rareEquipmentEnabledInput.checked = Boolean(rareEquipment.enabled);
  showNormalItemsInput.checked = rarityVisibility.normal !== false;
  showMagicItemsInput.checked = rarityVisibility.magic !== false;
  renderEquipmentSlotMatrix(
    rareArmorGroupList,
    groups?.armor || [],
    new Set(rareEquipment.armorGroups || []),
    'armorGroup',
    baseSelections.armor || {},
    { splitArmorSlots: true }
  );
  renderEquipmentSlotMatrix(
    rareShieldGroupList,
    groups?.shields || [],
    new Set(rareEquipment.shieldGroups || []),
    'shieldGroup',
    baseSelections.shields || {},
    { fallbackSlotLabel: 'Shields' }
  );
  renderEquipmentGroupList(
    rareWeaponGroupList,
    groups?.weapons || [],
    new Set(rareEquipment.weaponGroups || []),
    'weaponGroup',
    baseSelections.weapons || {}
  );
  renderEquipmentGroupList(
    miscEquipmentGroupList,
    groups?.misc || [],
    new Set(rareEquipment.miscGroups || []),
    'miscGroup',
    baseSelections.misc || {}
  );
}

function renderChanceBases(profile, options = []) {
  chanceBaseOptions = [...new Set(options || [])].sort((a, b) => a.localeCompare(b));
  chanceBaseOptionsList.innerHTML = '';
  for (const base of chanceBaseOptions) {
    const option = document.createElement('option');
    option.value = base;
    chanceBaseOptionsList.appendChild(option);
  }

  const chanceBases = profile.chanceBases || {};
  chanceBasesEnabledInput.checked = chanceBases.enabled !== false;
  renderChanceBaselineStyle(chanceBases);
  renderChanceBaseList(chanceBases.bases || []);
  updateChanceBaseValidation();
}

function renderChanceBaselineStyle(chanceBases = {}) {
  chanceBaselineStyle.innerHTML = '';
  const row = document.createElement('article');
  row.className = 'category-baseline-row';
  row.dataset.chanceBaselineStyle = 'true';

  const header = document.createElement('div');
  header.className = 'category-baseline-row__title';
  header.textContent = 'Chance base style';
  row.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'inline-style-grid';
  appendInlineStyleControls(grid, chanceBases.styleConfig);
  row.appendChild(grid);
  appendRulePreview(row, chanceBases.bases?.[0] || 'Leather Belt', chanceBases.styleConfig, { action: 'Show' });

  chanceBaselineStyle.appendChild(row);
}

function renderEconomyHighlights(profile) {
  const economy = profile.economyHighlights || {};
  economyHighlightsEnabledInput.checked = economy.enabled !== false;
  renderEconomyTiers(economy.tiers || DEFAULT_ECONOMY_TIERS);
  renderEconomyTypes(economy.types || Object.keys(ECONOMY_TYPE_LABELS));
  renderEconomyEntries(economy);
}

function renderMiscRules(profile) {
  const miscRules = profile.miscRules || {};
  const entries = miscRules.entries || [];
  miscRulesEnabledInput.checked = miscRules.enabled !== false;
  miscRuleList.innerHTML = '';
  setStatus(miscRulesStatus, `${entries.filter((entry) => entry.enabled !== false).length} misc rules enabled.`);

  if (entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No misc rules are configured.';
    miscRuleList.appendChild(empty);
    return;
  }

  entries.forEach((rule, index) => {
    const row = document.createElement('article');
    row.className = 'filter-rule-row misc-rule-row';
    row.dataset.miscRuleIndex = String(index);

    const header = document.createElement('div');
    header.className = 'filter-rule-row__header';
    const title = document.createElement('div');
    title.className = 'filter-rule-row__title';
    title.textContent = rule.label;
    header.appendChild(title);
    header.appendChild(createRuleOrderControls('misc', index));

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = rule.enabled !== false;
    enabled.dataset.miscRuleField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(rule.label, { miscRuleField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(rule.action || 'Show', SPECIAL_ACTION_OPTIONS, { miscRuleField: 'action' }));

    const conditions = document.createElement('div');
    conditions.className = 'filter-rule-row__conditions';
    for (const condition of rule.conditions || []) {
      const pill = document.createElement('span');
      pill.className = 'condition-pill';
      pill.textContent = formatCondition(condition);
      conditions.appendChild(pill);
    }

    row.appendChild(header);
    row.appendChild(editGrid);
    const styleGrid = document.createElement('div');
    styleGrid.className = 'inline-style-grid';
    const previewStyle = rule.styleConfig || lootFilterState?.profile?.styles?.[rule.style || 'misc'] || lootFilterState?.profile?.styles?.misc;
    appendInlineStyleControls(styleGrid, previewStyle);
    row.appendChild(styleGrid);
    appendRulePreview(row, rule.label || 'Misc rule', previewStyle, rule);
    row.appendChild(conditions);
    miscRuleList.appendChild(row);
  });
}

function renderStyleSelectOptions(select, selectedValue, options = getStyleOptions()) {
  select.innerHTML = '';
  for (const styleName of options) {
    const option = document.createElement('option');
    option.value = styleName;
    option.textContent = getStyleLabel(styleName);
    option.selected = styleName === selectedValue;
    select.appendChild(option);
  }
}

function renderEconomyTiers(tiers) {
  economyTierList.innerHTML = '';
  tiers.forEach((tier, index) => {
    const fallback = getEconomyTierFallback(index, tier);
    const fallbackStyle = getEconomyTierStyleConfig(tier, fallback);
    const row = document.createElement('article');
    row.className = 'economy-tier-row';
    row.dataset.economyTierIndex = String(index);

    const header = document.createElement('div');
    header.className = 'economy-tier-row__header';
    const title = document.createElement('div');
    title.className = 'economy-tier-row__title';
    title.textContent = tier.label || fallback.label;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'danger-button';
    remove.dataset.removeEconomyTierIndex = String(index);
    remove.textContent = 'Delete';
    header.appendChild(title);
    header.appendChild(createRuleOrderControls('economy', index));
    header.appendChild(remove);
    row.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'economy-tier-row__grid';
    appendLabeled(grid, 'Label', createTextInput(tier.label || fallback.label, { economyTierField: 'label' }));
    appendLabeled(grid, 'Min chaos', createTextInput(tier.minChaos ?? '', { economyTierField: 'minChaos' }, 'number'));
    appendLabeled(grid, 'Min divines', createTextInput(tier.minDivines ?? '', { economyTierField: 'minDivines' }, 'number'));
    appendLabeled(grid, 'Cache cap', createTextInput(tier.maxItems || fallback.maxItems || 500, { economyTierField: 'maxItems' }, 'number'));
    row.appendChild(grid);
    const styleGrid = document.createElement('div');
    styleGrid.className = 'inline-style-grid';
    appendInlineStyleControls(styleGrid, fallbackStyle);
    row.appendChild(styleGrid);
    appendRulePreview(row, tier.label || fallback.label, fallbackStyle, { action: 'Show' });
    economyTierList.appendChild(row);
  });
}

function getEconomyTierFallback(index, tier = {}) {
  if (DEFAULT_ECONOMY_TIERS[index]) {
    return DEFAULT_ECONOMY_TIERS[index];
  }

  return {
    id: tier.id || `economy-rule-${index + 1}`,
    label: `Economy rule ${index + 1}`,
    minChaos: 50,
    style: 'highValue',
    tier: 'baseline',
    maxItems: 500
  };
}

function getEconomyTierStyleConfig(tier = {}, fallback = {}) {
  return tier.styleConfig
    || lootFilterState?.profile?.styles?.[tier.style || fallback.style || 'highValue']
    || lootFilterState?.profile?.styles?.highValue
    || {};
}

function renderEconomyTypes(selectedTypes = []) {
  const selected = new Set(selectedTypes);
  economyTypeList.innerHTML = '';
  for (const [type, labelText] of Object.entries(ECONOMY_TYPE_LABELS)) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.economyType = type;
    input.checked = selected.has(type);
    label.appendChild(input);
    label.appendChild(document.createTextNode(labelText));
    economyTypeList.appendChild(label);
  }
}

function renderEconomyEntries(economy) {
  economyHighlightList.innerHTML = '';
  const entries = economy.entries || [];
  const tiers = economy.tiers || DEFAULT_ECONOMY_TIERS;
  const updated = economy.refreshedAt ? new Date(economy.refreshedAt).toLocaleString() : 'not refreshed yet';
  const errorText = economy.errors?.length ? ` ${economy.errors.length} source errors.` : '';
  const divineText = economy.divineChaosValue ? ` Divine ${Math.round(economy.divineChaosValue * 10) / 10}c.` : '';
  const staleCache = entries.length > 0 && economy.cacheVersion !== ECONOMY_CACHE_VERSION;
  const staleText = staleCache ? ' Cache uses an older selector; refresh economy before writing the filter.' : '';
  setStatus(
    economyStatus,
    `${entries.length} economy items cached for ${economy.league || 'current league'}; updated ${updated}.${divineText}${errorText}${staleText}`,
    Boolean(economy.errors?.length) || staleCache
  );

  if (entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No economy highlights cached yet.';
    economyHighlightList.appendChild(empty);
    return;
  }

  for (const tier of [...tiers].reverse()) {
    const tierEntries = entries.filter((entry) => getEconomyEntryTierId(entry) === tier.id);
    const heading = document.createElement('div');
    heading.className = 'filter-rule-row__meta';
    heading.textContent = `${tier.label}: ${tierEntries.length} / ${tier.maxItems || 500} cached`;
    economyHighlightList.appendChild(heading);

    for (const entry of tierEntries.slice(0, 80)) {
      const chip = document.createElement('div');
      chip.className = 'token-chip';
      const text = document.createElement('span');
      text.textContent = entry.label || 'Economy item';
      chip.appendChild(text);
      economyHighlightList.appendChild(chip);
    }
  }
}

function getEconomyEntryTierId(entry) {
  if (entry.economyTierId) {
    return entry.economyTierId;
  }

  const match = String(entry.id || '').match(/^economy-([^-]+-[^-]+)-/);
  return match?.[1];
}

function renderChanceBaseList(bases) {
  chanceBaseList.innerHTML = '';

  if (!bases.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No chance bases selected.';
    chanceBaseList.appendChild(empty);
    return;
  }

  for (const base of bases) {
    const known = Boolean(resolveKnownBaseName(base));
    const chip = document.createElement('div');
    chip.className = `token-chip${known ? '' : ' token-chip--warn'}`;
    chip.dataset.chanceBase = base;

    const text = document.createElement('span');
    text.textContent = base;
    text.title = known ? 'Matched local base catalog.' : 'Not matched in the local base catalog.';

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.removeChanceBase = base;
    remove.textContent = 'x';
    remove.title = `Remove ${base}`;

    chip.appendChild(text);
    chip.appendChild(remove);
    chanceBaseList.appendChild(chip);
  }
}

function updateChanceBaseValidation() {
  const value = chanceBaseInput.value.trim();
  if (!value) {
    setStatus(chanceBaseStatus, `Local catalog has ${chanceBaseOptions.length} known base names.`);
    return;
  }

  const exact = resolveKnownBaseName(value);
  if (exact) {
    setStatus(chanceBaseStatus, `Matched base: ${exact}`);
    return;
  }

  const suggestions = getBaseSuggestions(value);
  setStatus(
    chanceBaseStatus,
    suggestions.length
      ? `No exact match. Did you mean ${suggestions.join(', ')}?`
      : 'No exact match in the local base catalog. It can still be saved as typed.',
    true
  );
}

function addChanceBaseFromInput() {
  const raw = chanceBaseInput.value.trim().replace(/\s+/g, ' ');
  if (!raw) {
    updateChanceBaseValidation();
    return;
  }

  const base = resolveKnownBaseName(raw) || raw;
  lootFilterState.profile.chanceBases = collectChanceBases();
  const current = lootFilterState?.profile?.chanceBases?.bases || [];
  const exists = current.some((entry) => normalizeBaseKey(entry) === normalizeBaseKey(base));
  if (exists) {
    setStatus(chanceBaseStatus, `${base} is already selected.`, true);
    return;
  }

  lootFilterState.profile.chanceBases = {
    ...(lootFilterState.profile.chanceBases || {}),
    bases: [...current, base]
  };
  chanceBaseInput.value = '';
  renderChanceBases(lootFilterState.profile, lootFilterState.chanceBaseOptions);
  setStatus(chanceBaseStatus, resolveKnownBaseName(base) ? `Added ${base}.` : `Added ${base}; spelling is not matched locally.`, !resolveKnownBaseName(base));
}

function addSpecialItemFromInput() {
  const base = specialItemBaseInput.value.trim().replace(/\s+/g, ' ');
  const label = specialItemLabelInput.value.trim().replace(/\s+/g, ' ');
  if (!base) {
    setStatus(specialItemStatus, 'Enter a base or item name before adding a special item.', true);
    return;
  }

  lootFilterState.profile.specialItems = collectSpecialItems();
  const current = lootFilterState?.profile?.specialItems?.entries || [];
  const entry = {
    id: `special-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    enabled: true,
    action: 'Show',
    label: label || base,
    source: 'special-item',
    style: 'specialItems',
    tier: 'high',
    styleConfig: structuredClone(lootFilterState?.profile?.styles?.specialItems || {}),
    createdAt: new Date().toISOString(),
    conditions: [{ key: 'BaseType', value: base }]
  };

  lootFilterState.profile.specialItems = {
    ...(lootFilterState.profile.specialItems || {}),
    enabled: lootFilterState.profile.specialItems?.enabled !== false,
    entries: [entry, ...current].slice(0, 200)
  };
  specialItemLabelInput.value = '';
  specialItemBaseInput.value = '';
  renderSpecialItems(lootFilterState.profile);
  setStatus(specialItemStatus, `Added ${entry.label}. Tune its options, then Save Profile.`);
}

function renderEquipmentGroupList(container, groups, selected, field, selectedBasesByGroup = {}) {
  container.innerHTML = '';
  container.classList.remove('equipment-group-list--matrix');
  for (const group of groups) {
    const card = document.createElement('div');
    card.className = 'equipment-group';
    card.classList.toggle('is-open', selected.has(group.id));
    card.dataset.equipmentGroupId = group.id;

    const header = document.createElement('div');
    header.className = 'equipment-group__header';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `${field}-${group.id}-visibility`;
    input.dataset.rareEquipmentField = field;
    input.value = group.id;
    input.checked = selected.has(group.id);
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.className = 'equipment-group__label';
    label.title = `${group.label}${group.bases?.length ? ` (${group.bases.length})` : ''}`;
    label.textContent = label.title;
    header.appendChild(input);
    header.appendChild(label);
    card.appendChild(header);

    if (group.bases?.length) {
      const baseGrid = document.createElement('div');
      baseGrid.className = 'equipment-base-grid';
      const selectedBases = Array.isArray(selectedBasesByGroup[group.id])
        ? new Set(selectedBasesByGroup[group.id])
        : new Set(group.bases);

      for (const section of getEquipmentBaseSections(group, field)) {
        const sectionNode = document.createElement('section');
        sectionNode.className = 'equipment-base-section';
        sectionNode.dataset.equipmentBaseSection = 'true';

        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'equipment-base-section__header';
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'equipment-base-section__title';
        sectionHeader.appendChild(sectionTitle);

        const actions = document.createElement('div');
        actions.className = 'equipment-base-actions';
        for (const [action, labelText] of [
          ['all', 'All'],
          ['top2', 'Top 2'],
          ['top5', 'Top 5'],
          ['none', 'None']
        ]) {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.equipmentBaseAction = action;
          button.textContent = labelText;
          actions.appendChild(button);
        }
        sectionHeader.appendChild(actions);
        sectionNode.appendChild(sectionHeader);

        const options = document.createElement('div');
        options.className = 'equipment-base-options';
        for (const base of section.bases) {
          const baseLabel = document.createElement('label');
          const baseInput = document.createElement('input');
          baseInput.type = 'checkbox';
          baseInput.dataset.equipmentBase = 'true';
          baseInput.dataset.equipmentGroupId = group.id;
          baseInput.value = base;
          baseInput.checked = selectedBases.has(base);
          baseLabel.appendChild(baseInput);
          baseLabel.appendChild(document.createTextNode(base));
          options.appendChild(baseLabel);
        }
        sectionNode.appendChild(options);
        updateEquipmentBaseSectionTitle(sectionNode, section.label);
        baseGrid.appendChild(sectionNode);
      }

      card.appendChild(baseGrid);
    }

    container.appendChild(card);
  }
}

function renderEquipmentSlotMatrix(container, groups, selected, field, selectedBasesByGroup = {}, options = {}) {
  container.innerHTML = '';
  container.classList.add('equipment-group-list--matrix');

  const attributePicker = document.createElement('section');
  attributePicker.className = 'equipment-attribute-picker';
  const attributeTitle = document.createElement('div');
  attributeTitle.className = 'equipment-attribute-picker__title';
  attributeTitle.textContent = 'Defensive Attributes';
  attributePicker.appendChild(attributeTitle);

  const attributeGrid = document.createElement('div');
  attributeGrid.className = 'equipment-attribute-grid';
  for (const group of groups) {
    const label = document.createElement('label');
    label.className = 'equipment-attribute-option';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.rareEquipmentField = field;
    input.value = group.id;
    input.checked = selected.has(group.id);
    label.appendChild(input);
    label.appendChild(document.createTextNode(group.label));
    attributeGrid.appendChild(label);
  }
  attributePicker.appendChild(attributeGrid);
  container.appendChild(attributePicker);

  const selectedGroups = groups.filter((group) => selected.has(group.id));
  const slots = getEquipmentSlotRows(selectedGroups, selectedBasesByGroup, options);
  if (!slots.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Select one or more defensive attributes to choose bases by slot.';
    container.appendChild(empty);
    return;
  }

  const slotList = document.createElement('div');
  slotList.className = 'equipment-slot-list';
  for (const slot of slots) {
    const sectionNode = document.createElement('section');
    sectionNode.className = 'equipment-base-section equipment-slot-row';
    sectionNode.dataset.equipmentBaseSection = 'true';

    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'equipment-base-section__header';
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'equipment-base-section__title';
    sectionHeader.appendChild(sectionTitle);

    const actions = document.createElement('div');
    actions.className = 'equipment-base-actions';
    for (const [action, labelText] of [
      ['all', 'All'],
      ['top2', 'Top 2'],
      ['top5', 'Top 5'],
      ['none', 'None']
    ]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.equipmentBaseAction = action;
      button.textContent = labelText;
      actions.appendChild(button);
    }
    sectionHeader.appendChild(actions);
    sectionNode.appendChild(sectionHeader);

    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'equipment-base-options equipment-base-options--wide';
    for (const item of slot.items) {
      const baseLabel = document.createElement('label');
      baseLabel.className = 'equipment-base-option';
      const baseInput = document.createElement('input');
      baseInput.type = 'checkbox';
      baseInput.dataset.equipmentBase = 'true';
      baseInput.dataset.equipmentGroupId = item.group.id;
      baseInput.value = item.base;
      baseInput.checked = item.selected;
      const text = document.createElement('span');
      text.className = 'equipment-base-option__name';
      text.textContent = item.base;
      const meta = document.createElement('span');
      meta.className = 'equipment-base-option__meta';
      meta.textContent = formatEquipmentBaseMeta(item.base, item.group.label);
      baseLabel.appendChild(baseInput);
      baseLabel.appendChild(text);
      baseLabel.appendChild(meta);
      optionsGrid.appendChild(baseLabel);
    }

    sectionNode.appendChild(optionsGrid);
    updateEquipmentBaseSectionTitle(sectionNode, slot.label);
    slotList.appendChild(sectionNode);
  }
  container.appendChild(slotList);
}

function getEquipmentSlotRows(groups, selectedBasesByGroup = {}, options = {}) {
  const slots = new Map();
  for (const group of groups) {
    const groupBases = group.bases || [];
    const selectedBases = Array.isArray(selectedBasesByGroup[group.id])
      ? new Set(selectedBasesByGroup[group.id])
      : new Set(groupBases);

    for (const base of groupBases) {
      const slot = options.splitArmorSlots
        ? classifyArmorBase(base)
        : { id: options.fallbackSlotId || 'bases', label: options.fallbackSlotLabel || 'Bases' };
      if (!slots.has(slot.id)) {
        slots.set(slot.id, { ...slot, items: [] });
      }
      slots.get(slot.id).items.push({
        base,
        group,
        selected: selectedBases.has(base),
        sortIndex: groupBases.indexOf(base)
      });
    }
  }

  return [...slots.values()]
    .sort((left, right) => (
      (EQUIPMENT_SLOT_ORDER.get(left.id) ?? 99) - (EQUIPMENT_SLOT_ORDER.get(right.id) ?? 99)
    ))
    .map((slot) => ({
      ...slot,
      items: sortEquipmentSlotItems(slot.items)
    }));
}

function sortEquipmentSlotItems(items) {
  return [...items].sort((left, right) => {
    const requirementSort = compareEquipmentBaseTier(left.base, right.base);
    if (requirementSort !== 0) {
      return requirementSort;
    }
    if (left.sortIndex !== right.sortIndex) {
      return left.sortIndex - right.sortIndex;
    }
    return left.group.label.localeCompare(right.group.label);
  });
}

function getEquipmentBaseSections(group, field) {
  if (field === 'armorGroup') {
    const sections = new Map();
    for (const base of sortEquipmentBasesForProgression(group.bases || [])) {
      const slot = classifyArmorBase(base);
      if (!sections.has(slot.id)) {
        sections.set(slot.id, { ...slot, bases: [] });
      }
      sections.get(slot.id).bases.push(base);
    }
    return [...sections.values()].sort((left, right) => (
      (EQUIPMENT_SLOT_ORDER.get(left.id) ?? 99) - (EQUIPMENT_SLOT_ORDER.get(right.id) ?? 99)
    ));
  }

  return [{
    id: group.id,
    label: field === 'weaponGroup' ? 'Bases' : group.label,
    bases: sortEquipmentBasesForProgression(group.bases || [])
  }];
}

function classifyArmorBase(base) {
  for (const slot of EQUIPMENT_SLOT_PATTERNS) {
    if (slot.test.test(base)) {
      return { id: slot.id, label: slot.label };
    }
  }
  return { id: 'other-armour', label: 'Other Armour' };
}

function sortEquipmentBasesForProgression(bases) {
  return [...bases].sort((left, right) => {
    const requirementSort = compareEquipmentBaseTier(left, right);
    if (requirementSort !== 0) {
      return requirementSort;
    }
    return bases.indexOf(left) - bases.indexOf(right);
  });
}

function compareEquipmentBaseTier(left, right) {
  const leftRequirement = getEquipmentBaseRequirement(left);
  const rightRequirement = getEquipmentBaseRequirement(right);
  if (leftRequirement && rightRequirement) {
    return (leftRequirement.level - rightRequirement.level)
      || ((leftRequirement.defenses || 0) - (rightRequirement.defenses || 0))
      || String(left).localeCompare(String(right));
  }
  if (leftRequirement) {
    return 1;
  }
  if (rightRequirement) {
    return -1;
  }
  return 0;
}

function getEquipmentBaseRequirement(base) {
  return lootFilterState?.equipmentBaseRequirements?.[base];
}

function formatEquipmentBaseMeta(base, groupLabel) {
  const requirement = getEquipmentBaseRequirement(base);
  if (!requirement) {
    return groupLabel;
  }
  return `Lvl ${requirement.level} - ${groupLabel}`;
}

function updateEquipmentBaseSectionTitle(sectionNode, label) {
  const inputs = [...sectionNode.querySelectorAll('[data-equipment-base="true"]')];
  const selected = inputs.filter((input) => input.checked).length;
  const title = sectionNode.querySelector('.equipment-base-section__title');
  if (title) {
    title.textContent = `${label} (${selected}/${inputs.length})`;
  }
}

function applyEquipmentBaseAction(sectionNode, action) {
  if (!sectionNode) {
    return;
  }

  const inputs = [...sectionNode.querySelectorAll('[data-equipment-base="true"]')];
  if (!inputs.length) {
    return;
  }

  const selection = window.poehelperEquipmentSelection?.getSelectedEquipmentIndexes
    ? window.poehelperEquipmentSelection.getSelectedEquipmentIndexes(inputs.map((input) => ({
      groupId: input.dataset.equipmentGroupId || 'default'
    })), action)
    : (action === 'all' ? inputs.map((_input, index) => index) : []);
  const selectedIndexes = new Set(selection);
  inputs.forEach((input, index) => {
    input.checked = selectedIndexes.has(index);
  });
  updateEquipmentBaseSectionTitle(sectionNode, getEquipmentBaseSectionLabel(sectionNode));
}

function getEquipmentBaseSectionLabel(sectionNode) {
  const title = sectionNode.querySelector('.equipment-base-section__title')?.textContent || 'Bases';
  return title.replace(/\s+\(\d+\/\d+\)$/, '');
}

function renderCurrencyTiers(tiers) {
  currencyTierList.innerHTML = '';
  tiers.forEach((tier, index) => {
    const row = document.createElement('article');
    row.className = 'tier-row';
    row.dataset.currencyTierIndex = String(index);
    appendTierHeader(row, tier.label || `Currency rule ${index + 1}`, 'currency', index);
    const grid = document.createElement('div');
    grid.className = 'editor-grid';
    appendLabeled(grid, 'Label', createTextInput(tier.label, { currencyTierIndex: index, tierField: 'label' }));
    appendLabeled(grid, 'Action', createSelect(tier.action || 'Show', SPECIAL_ACTION_OPTIONS, { currencyTierIndex: index, tierField: 'action' }));
    const override = document.createElement('input');
    override.type = 'checkbox';
    override.checked = Boolean(tier.overrideCategoryStyle);
    override.dataset.tierField = 'overrideCategoryStyle';
    appendLabeled(grid, 'Override category', override);
    row.appendChild(grid);
    row.appendChild(createStyleOverridePanel(
      tier.overrideCategoryStyle
        ? mergeInlineStyleConfig(lootFilterState?.profile?.currencyStyle?.styleConfig, tier.styleOverride || tier.styleConfig)
        : (lootFilterState?.profile?.currencyStyle?.styleConfig || tier.styleConfig),
      !tier.overrideCategoryStyle
    ));
    appendRulePreview(row, tier.bases?.[0] || tier.label || 'Currency item', tier.overrideCategoryStyle
      ? mergeInlineStyleConfig(lootFilterState?.profile?.currencyStyle?.styleConfig, tier.styleOverride || tier.styleConfig)
      : (lootFilterState?.profile?.currencyStyle?.styleConfig || tier.styleConfig), tier);
    const bases = document.createElement('textarea');
    bases.dataset.currencyTierIndex = String(index);
    bases.dataset.tierField = 'bases';
    bases.placeholder = 'Currency names, one per line';
    bases.value = (tier.bases || []).join('\n');
    row.appendChild(bases);
    currencyTierList.appendChild(row);
  });
}

function renderRareTiers(tiers) {
  rareTierList.innerHTML = '';
  tiers.forEach((tier, index) => {
    const row = document.createElement('article');
    row.className = 'tier-row';
    row.dataset.rareTierIndex = String(index);
    appendTierHeader(row, tier.label || `Rare rule ${index + 1}`, 'rare', index);

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = tier.enabled !== false;
    enabled.dataset.tierField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(tier.label, { rareTierIndex: index, tierField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(tier.action || 'Show', SPECIAL_ACTION_OPTIONS, { rareTierIndex: index, tierField: 'action' }));
    const override = document.createElement('input');
    override.type = 'checkbox';
    override.checked = Boolean(tier.overrideCategoryStyle);
    override.dataset.tierField = 'overrideCategoryStyle';
    appendLabeled(editGrid, 'Override category', override);

    const conditionsGrid = document.createElement('div');
    conditionsGrid.className = 'special-item-row__conditions';
    appendRareRuleConditionControls(conditionsGrid, tier, index);

    const conditionSummary = document.createElement('div');
    conditionSummary.className = 'filter-rule-row__conditions';
    for (const condition of tier.conditions || []) {
      const pill = document.createElement('span');
      pill.className = 'condition-pill';
      pill.textContent = formatCondition(condition);
      conditionSummary.appendChild(pill);
    }

    row.appendChild(editGrid);
    row.appendChild(createStyleOverridePanel(
      tier.overrideCategoryStyle
        ? mergeInlineStyleConfig(lootFilterState?.profile?.rareStyle?.styleConfig, tier.styleOverride || tier.styleConfig)
        : (lootFilterState?.profile?.rareStyle?.styleConfig || tier.styleConfig),
      !tier.overrideCategoryStyle
    ));
    appendRulePreview(row, getConditionText(tier, 'BaseType').split(',')[0] || tier.label || 'Rare item', tier.overrideCategoryStyle
      ? mergeInlineStyleConfig(lootFilterState?.profile?.rareStyle?.styleConfig, tier.styleOverride || tier.styleConfig)
      : (lootFilterState?.profile?.rareStyle?.styleConfig || tier.styleConfig), tier);
    row.appendChild(conditionsGrid);
    row.appendChild(conditionSummary);
    rareTierList.appendChild(row);
  });
}

function appendRareRuleConditionControls(container, rule, index) {
  appendLabeled(container, 'Attribute group', createOptionSelect(rule.attributeGroup || '', getRareAttributeOptions(), { rareTierIndex: index, tierField: 'attributeGroup' }));
  appendLabeled(container, 'Only these names', createTextarea(getConditionText(rule, 'BaseType').replace(/,\s*/g, '\n'), { rareTierIndex: index, tierField: 'baseTypes' }, 'Leave blank to match all rare items for this rule.'));
  appendLabeled(container, 'Min ilvl', createTextInput(getConditionText(rule, 'ItemLevel', '>=') || rule.minItemLevel || '', { rareTierIndex: index, tierField: 'minItemLevel' }, 'number'));
  appendLabeled(container, 'Max ilvl', createTextInput(getConditionText(rule, 'ItemLevel', '<='), { rareTierIndex: index, tierField: 'maxItemLevel' }, 'number'));
  appendLabeled(container, 'Min quality', createTextInput(getConditionText(rule, 'Quality', '>='), { rareTierIndex: index, tierField: 'minQuality' }, 'number'));
  appendLabeled(container, 'Max quality', createTextInput(getConditionText(rule, 'Quality', '<='), { rareTierIndex: index, tierField: 'maxQuality' }, 'number'));
}

function getRareAttributeOptions() {
  const options = [{ value: '', label: 'Any rare item' }];
  const groups = lootFilterState?.rareEquipmentGroups || {};
  for (const section of ['armor', 'shields']) {
    for (const group of groups[section] || []) {
      options.push({
        value: `${section}:${group.id}`,
        label: `${section === 'shields' ? 'Shield' : 'Armour'} - ${group.label}`
      });
    }
  }
  return options;
}

function appendTierHeader(row, titleText, type, index) {
  const header = document.createElement('div');
  header.className = 'tier-row__header';
  const title = document.createElement('div');
  title.className = 'tier-row__title';
  title.textContent = titleText;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'danger-button';
  button.dataset.removeTierType = type;
  button.dataset.removeTierIndex = String(index);
  button.textContent = 'Delete';
  header.appendChild(title);
  header.appendChild(createRuleOrderControls(type, index));
  header.appendChild(button);
  row.appendChild(header);
}

function createRuleOrderControls(kind, index, extra = {}) {
  const controls = document.createElement('div');
  controls.className = 'rule-order-controls';
  for (const [direction, label] of [['up', 'Up'], ['down', 'Down']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.moveRuleKind = kind;
    button.dataset.moveRuleIndex = String(index);
    button.dataset.moveRuleDirection = direction;
    if (extra.categoryId) {
      button.dataset.moveRuleCategory = extra.categoryId;
    }
    button.textContent = label;
    controls.appendChild(button);
  }
  return controls;
}

function renderSpecialItems(profile) {
  const specialItems = profile.specialItems || {};
  const entries = specialItems.entries || [];
  specialItemsEnabledInput.checked = specialItems.enabled !== false;
  specialItemList.innerHTML = '';

  if (entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No custom rules yet. Add a base or item name above, then tune its conditions.';
    specialItemList.appendChild(empty);
    return;
  }

  entries.forEach((entry, index) => {
    const row = document.createElement('article');
    row.className = 'special-item-row';
    row.dataset.specialItemIndex = String(index);

    const header = document.createElement('div');
    header.className = 'filter-rule-row__header';
    const title = document.createElement('div');
    title.className = 'filter-rule-row__title';
    title.textContent = entry.label || `Special item ${index + 1}`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'danger-button';
    remove.dataset.removeSpecialItemIndex = String(index);
    remove.textContent = 'Delete';
    header.appendChild(title);
    header.appendChild(createRuleOrderControls('special', index));
    header.appendChild(remove);

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = entry.enabled !== false;
    enabled.dataset.specialField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(entry.label, { specialField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(entry.action || 'Show', SPECIAL_ACTION_OPTIONS, { specialField: 'action' }));

    const conditionsGrid = document.createElement('div');
    conditionsGrid.className = 'special-item-row__conditions';
    appendLabeled(conditionsGrid, 'Rarity', createSelect(getConditionText(entry, 'Rarity'), SPECIAL_RARITY_OPTIONS, { specialField: 'rarity' }));

    for (const [field, label, key] of SPECIAL_TEXT_FIELDS) {
      appendLabeled(conditionsGrid, label, createTextInput(getConditionText(entry, key), { specialField: field }));
    }

    for (const [field, label, key, operator] of SPECIAL_NUMBER_FIELDS) {
      appendLabeled(conditionsGrid, label, createTextInput(getConditionText(entry, key, operator), { specialField: field }, 'number'));
    }

    for (const [field, label, key] of SPECIAL_BOOLEAN_FIELDS) {
      appendLabeled(conditionsGrid, label, createSelect(getConditionText(entry, key), SPECIAL_BOOLEAN_OPTIONS, { specialField: field }));
    }

    row.appendChild(header);
    row.appendChild(editGrid);
    const styleGrid = document.createElement('div');
    styleGrid.className = 'inline-style-grid';
    const previewStyle = entry.styleConfig || lootFilterState?.profile?.styles?.[entry.style || 'specialItems'] || lootFilterState?.profile?.styles?.specialItems;
    appendInlineStyleControls(styleGrid, previewStyle);
    row.appendChild(styleGrid);
    appendRulePreview(row, entry.label || 'Custom rule', previewStyle, entry);
    row.appendChild(conditionsGrid);
    specialItemList.appendChild(row);
  });
}

function getConditionText(rule, key, operator) {
  const condition = (rule.conditions || []).find((entry) =>
    entry.key === key && (operator === undefined || entry.operator === operator)
  );
  if (!condition) {
    return '';
  }

  if (typeof condition.value === 'boolean') {
    return condition.value ? 'True' : 'False';
  }

  return Array.isArray(condition.value) ? condition.value.join(', ') : String(condition.value ?? '');
}

function renderFilterSummaryPanel(summary = lootFilterState?.previewSummary, diff = lootFilterState?.previewDiff) {
  if (!filterSummaryPanel) {
    return;
  }

  filterSummaryPanel.innerHTML = '';
  if (!summary) {
    return;
  }

  const equipment = summary.equipment || {};
  const hiddenEquipment = equipment.enabled
    ? (equipment.hiddenArmorBases || 0)
      + (equipment.hiddenShieldBases || 0)
      + (equipment.hiddenWeaponBases || 0)
      + (equipment.hiddenMiscBases || 0)
      + (equipment.hiddenWeaponClasses || 0)
      + (equipment.hiddenMiscClasses || 0)
    : 0;
  const chips = [
    [`${summary.showBlocks || 0} Show`, false],
    [`${summary.hideBlocks || 0} Hide`, (summary.hideBlocks || 0) > 0],
    [`${summary.enabledCategoryRules || 0} category rules`, false],
    [`${summary.enabledCustomRules || 0} custom rules`, false],
    [`${summary.economyEntries || 0} economy entries`, (summary.economyEntries || 0) > 0],
    [`${summary.skippedEconomyEntries || 0} skipped economy rows`, (summary.skippedEconomyEntries || 0) > 0],
    [`${summary.chanceBases || 0} chance bases`, (summary.chanceBases || 0) > 0],
    [equipment.enabled ? `${hiddenEquipment} equipment hides` : 'equipment narrowing off', equipment.enabled && hiddenEquipment > 0],
    [equipment.hiddenSamples?.length ? `hidden: ${equipment.hiddenSamples.join(', ')}` : 'no hidden samples', false],
    [`${summary.lines || 0} lines`, false],
    [`${summary.bytes || 0} bytes`, false]
  ];
  if (diff) {
    chips.push([formatFilterDiffChip(diff), diff.status === 'changed' || diff.status === 'missing' || diff.status === 'unreadable']);
  }

  for (const [text, warn] of chips) {
    const chip = document.createElement('span');
    chip.className = `filter-summary-chip${warn ? ' filter-summary-chip--warn' : ''}`;
    chip.textContent = text;
    filterSummaryPanel.appendChild(chip);
  }
}

function formatFilterDiffChip(diff = {}) {
  if (diff.status === 'unchanged') {
    return 'output unchanged';
  }
  if (diff.status === 'missing' || diff.status === 'missing-path') {
    return `new output file: +${diff.addedLines || 0} lines`;
  }
  if (diff.status === 'unreadable') {
    return `output unreadable: ${diff.error || 'check path'}`;
  }
  return `output changes: ${diff.changedLines || 0} changed, +${diff.addedLines || 0}, -${diff.removedLines || 0}`;
}

function setLootFilterDirty(dirty) {
  lootFilterDirty = Boolean(dirty);
  if (!filterDirtyIndicator) {
    return;
  }

  filterDirtyIndicator.classList.toggle('is-dirty', lootFilterDirty);
  filterDirtyIndicator.textContent = lootFilterDirty ? 'Unsaved changes' : 'Saved';
}

function markLootFilterDirty() {
  if (!renderingLootFilter) {
    setLootFilterDirty(true);
  }
}

function renderFilterPreviewOutput() {
  if (!filterPreviewOutput) {
    return;
  }

  const preview = lootFilterState?.preview || '';
  const query = String(filterPreviewSearchInput?.value || '').trim().toLowerCase();
  if (!query) {
    filterPreviewOutput.textContent = preview || 'No generated filter preview available.';
    setStatus(filterPreviewSearchStatus, 'Raw generated filter output is shown below.');
    return;
  }

  const lines = preview.split(/\r?\n/);
  const included = new Set();
  lines.forEach((line, index) => {
    if (!line.toLowerCase().includes(query)) {
      return;
    }
    for (let offset = -2; offset <= 3; offset += 1) {
      const nextIndex = index + offset;
      if (nextIndex >= 0 && nextIndex < lines.length) {
        included.add(nextIndex);
      }
    }
  });

  if (included.size === 0) {
    filterPreviewOutput.textContent = `No generated filter lines matched "${filterPreviewSearchInput.value}".`;
    setStatus(filterPreviewSearchStatus, 'No preview matches found.', true);
    return;
  }

  const output = [];
  let previous = -1;
  for (const index of [...included].sort((left, right) => left - right)) {
    if (previous !== -1 && index > previous + 1) {
      output.push('...');
    }
    output.push(`${String(index + 1).padStart(5)}  ${lines[index]}`);
    previous = index;
  }
  filterPreviewOutput.textContent = output.join('\n');
  setStatus(filterPreviewSearchStatus, `${included.size} context lines match "${filterPreviewSearchInput.value}".`);
}

function renderFilterHistory(history = lootFilterState?.history || []) {
  if (!filterHistoryList) {
    return;
  }

  filterHistoryList.innerHTML = '';
  setStatus(filterHistoryStatus, history.length ? `${history.length} written snapshots available.` : 'No write history yet.');
  if (!history.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Write the filter file to create a restorable snapshot.';
    filterHistoryList.appendChild(empty);
    return;
  }

  for (const entry of history) {
    const row = document.createElement('div');
    row.className = 'filter-history-row';
    const text = document.createElement('div');
    text.className = 'filter-history-row__text';
    const date = entry.writtenAt ? new Date(entry.writtenAt).toLocaleString() : 'Unknown date';
    text.textContent = `${date} - ${entry.showBlocks || 0} Show / ${entry.hideBlocks || 0} Hide - ${entry.bytes || 0} bytes`;
    const restore = document.createElement('button');
    restore.type = 'button';
    restore.dataset.restoreFilterHistory = entry.id;
    restore.textContent = 'Restore';
    row.appendChild(text);
    row.appendChild(restore);
    filterHistoryList.appendChild(row);
  }
}

function renderLootFilterState(state) {
  renderingLootFilter = true;
  lootFilterRefreshToken += 1;
  lootFilterState = state;
  lootFilterSoundFiles = state.soundFiles || [];
  const profile = state.profile || {};
  renderProfileControls(state);
  filterOutputPathInput.value = state.outputPath || filterOutputPathInput.value;
  filterQuickActionInput.value = state.quickAction || filterQuickActionInput.value || 'Show';
  renderFilterPreviewOutput();
  renderFilterSummaryPanel(state.previewSummary, state.previewDiff);
  renderFilterHistory(state.history || []);
  renderCaptureDefaults(profile);
  renderTierLists(profile);
  renderCategoryRules(profile);
  renderRareEquipment(profile, state.rareEquipmentGroups);
  renderChanceBases(profile, state.chanceBaseOptions);
  renderMiscRules(profile);
  renderEconomyHighlights(profile);
  renderSpecialItems(profile);
  filterRuleList.innerHTML = '';

  const rules = profile.userRules || [];
  if (rules.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No captured rules yet. Hover an item in game and press the loot-filter rule keybind.';
    filterRuleList.appendChild(empty);
  }

  rules.forEach((rule, index) => {
    const row = document.createElement('article');
    row.className = 'filter-rule-row';
    row.dataset.ruleIndex = String(index);

    const header = document.createElement('div');
    header.className = 'filter-rule-row__header';

    const title = document.createElement('div');
    title.className = 'filter-rule-row__title';
    title.textContent = rule.label;

    const removeButton = document.createElement('button');
    removeButton.className = 'danger-button';
    removeButton.type = 'button';
    removeButton.dataset.ruleId = rule.id;
    removeButton.textContent = 'Delete';

    header.appendChild(title);
    header.appendChild(createRuleOrderControls('user', index));
    header.appendChild(removeButton);

    const meta = document.createElement('div');
    meta.className = 'filter-rule-row__meta';
    meta.textContent = `${rule.source || 'manual'} / ${new Date(rule.createdAt || Date.now()).toLocaleString()}`;

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = rule.enabled !== false;
    enabled.dataset.ruleIndex = String(index);
    enabled.dataset.ruleField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(rule.label, { ruleIndex: index, ruleField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(rule.action || 'Show', ['Show', 'Hide'], { ruleIndex: index, ruleField: 'action' }));

    const styleGrid = document.createElement('div');
    styleGrid.className = 'inline-style-grid';
    const previewStyle = rule.styleConfig || lootFilterState?.profile?.styles?.[rule.style || 'default'] || lootFilterState?.profile?.styles?.default;
    appendInlineStyleControls(styleGrid, previewStyle);

    const conditionsGrid = document.createElement('div');
    conditionsGrid.className = 'special-item-row__conditions';
    appendLabeled(conditionsGrid, 'Rarity', createSelect(getConditionText(rule, 'Rarity'), SPECIAL_RARITY_OPTIONS, { ruleIndex: index, ruleField: 'rarity' }));

    for (const [field, label, key] of SPECIAL_TEXT_FIELDS) {
      appendLabeled(conditionsGrid, label, createTextInput(getConditionText(rule, key), { ruleIndex: index, ruleField: field }));
    }

    for (const [field, label, key, operator] of SPECIAL_NUMBER_FIELDS) {
      appendLabeled(conditionsGrid, label, createTextInput(getConditionText(rule, key, operator), { ruleIndex: index, ruleField: field }, 'number'));
    }

    for (const [field, label, key] of SPECIAL_BOOLEAN_FIELDS) {
      appendLabeled(conditionsGrid, label, createSelect(getConditionText(rule, key), SPECIAL_BOOLEAN_OPTIONS, { ruleIndex: index, ruleField: field }));
    }

    row.appendChild(header);
    row.appendChild(meta);
    row.appendChild(editGrid);
    row.appendChild(styleGrid);
    appendRulePreview(row, rule.label || 'Captured item', previewStyle, rule);
    row.appendChild(conditionsGrid);
    filterRuleList.appendChild(row);
  });

  renderingLootFilter = false;
  setLootFilterDirty(false);
  setStatus(filterStatus, `${state.profileName || 'POEHelper filter'} has ${rules.length} captured rules. Preview is ${state.previewBytes || 0} bytes.`);
}

async function refreshLootFilterState(updateStatus = true) {
  const refreshToken = lootFilterRefreshToken + 1;
  lootFilterRefreshToken = refreshToken;
  const state = await window.poehelper.getLootFilterState();
  if (refreshToken !== lootFilterRefreshToken) {
    return;
  }
  renderLootFilterState(state);
  if (updateStatus) {
    setStatus(filterStatus, `Preview refreshed from ${state.outputPath}.`);
  }
  return state;
}

function collectCaptureDefaults() {
  if (!filterCaptureDefaults) {
    return Object.fromEntries(Object.keys(CAPTURE_DEFAULT_LABELS).map((key) => [key, true]));
  }
  const defaults = {};
  for (const input of filterCaptureDefaults.querySelectorAll('[data-capture-default]')) {
    defaults[input.dataset.captureDefault] = input.checked;
  }
  return defaults;
}

function collectStyles() {
  if (!filterStyleList) {
    return structuredClone(lootFilterState?.profile?.styles || {});
  }

  const styles = structuredClone(lootFilterState?.profile?.styles || {});
  for (const styleName of getStyleOptions()) {
    const style = styles[styleName] || {};
    const controls = [...filterStyleList.querySelectorAll(`[data-style-name="${styleName}"]`)];
    const colorGroups = {};

    for (const control of controls) {
      const field = control.dataset.styleField;
      if (!field) continue;

      if (control.dataset.colorPart) {
        colorGroups[field] ||= {};
        colorGroups[field][control.dataset.colorPart] = control.value;
        continue;
      }

      if (field === 'fontSize') {
        style.fontSize = Number(control.value);
      } else if (field === 'alertSoundId') {
        const id = Number(control.value);
        style.alertSound = Number.isFinite(id) && id > 0
          ? { ...(style.alertSound || {}), id }
          : null;
      } else if (field === 'alertSoundVolume') {
        if (style.alertSound) style.alertSound.volume = Number(control.value);
      } else if (field.startsWith('tierSoundFile:')) {
        const tier = field.split(':')[1];
        style.tierSounds ||= {};
        style.tierSounds[tier] = control.value
          ? { ...(style.tierSounds[tier] || {}), file: control.value }
          : null;
      } else if (field.startsWith('tierSoundVolume:')) {
        const tier = field.split(':')[1];
        if (style.tierSounds?.[tier]) {
          style.tierSounds[tier].volume = Number(control.value);
        }
      } else if (field === 'iconColor') {
        style.minimapIcon = control.value === 'None'
          ? null
          : { ...(style.minimapIcon || { size: 1, shape: 'Circle' }), color: control.value };
      } else if (field === 'iconShape' && style.minimapIcon) {
        style.minimapIcon.shape = control.value;
      } else if (field === 'beamColor') {
        style.beam = control.value === 'None' ? null : { color: control.value, temporary: true };
      }
    }

    for (const [field, parts] of Object.entries(colorGroups)) {
      const color = hexToColor(parts.hex, parts.alpha);
      if (field.startsWith('tierBorder:')) {
        const tier = field.split(':')[1];
        style.tierBorders ||= {};
        style.tierBorders[tier] = color;
      } else {
        style[field] = color;
      }
    }

    styles[styleName] = style;
  }

  return styles;
}

function collectCurrencyTiers() {
  return [...currencyTierList.querySelectorAll('[data-currency-tier-index]')]
    .filter((row) => row.classList.contains('tier-row'))
    .map((row, index) => {
      const get = (field) => row.querySelector(`[data-tier-field="${field}"]`)?.value;
      const overrideCategoryStyle = row.querySelector('[data-tier-field="overrideCategoryStyle"]')?.checked === true;
      const categoryStyle = lootFilterState?.profile?.currencyStyle?.styleConfig || {};
      return {
        id: lootFilterState?.profile?.currencyTiers?.[index]?.id || `currency-${Date.now()}-${index}`,
        label: get('label') || `Currency rule ${index + 1}`,
        action: get('action') || 'Show',
        bases: String(get('bases') || '').split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean),
        style: INHERIT_STYLE,
        tier: 'baseline',
        overrideCategoryStyle,
        styleOverride: overrideCategoryStyle ? collectInlineStyleConfig(row, categoryStyle) : undefined
      };
    });
}

function collectCurrencyStyle() {
  const row = currencyBaselineStyle.querySelector('[data-currency-baseline-style]');
  if (!row) {
    return { style: 'currency', tier: 'baseline' };
  }

  const get = (field) => row.querySelector(`[data-currency-baseline-field="${field}"]`);
  return {
    style: 'currency',
    tier: 'baseline',
    styleConfig: collectInlineStyleConfig(row, lootFilterState?.profile?.currencyStyle?.styleConfig)
  };
}

function collectRareStyle() {
  const row = rareBaselineStyle.querySelector('[data-rare-baseline-style]');
  if (!row) {
    return { style: 'rare', tier: 'baseline' };
  }

  return {
    style: 'rare',
    tier: 'baseline',
    styleConfig: collectInlineStyleConfig(row, lootFilterState?.profile?.rareStyle?.styleConfig)
  };
}

function collectRareTiers() {
  return [...rareTierList.querySelectorAll('[data-rare-tier-index]')]
    .filter((row) => row.classList.contains('tier-row'))
    .map((row, index) => {
      const existing = lootFilterState?.profile?.rareTiers?.[index] || {};
      const get = (field) => row.querySelector(`[data-tier-field="${field}"]`);
      const overrideCategoryStyle = get('overrideCategoryStyle')?.checked === true;
      const categoryStyle = lootFilterState?.profile?.rareStyle?.styleConfig || {};
      const minItemLevel = Number(get('minItemLevel')?.value);
      const conditions = [{ key: 'Rarity', value: 'Rare' }];
      const attributeGroup = get('attributeGroup')?.value || '';
      const attributeBases = getRareAttributeBases(attributeGroup);
      const typedBases = splitTextValues(get('baseTypes')?.value);
      const baseTypes = [...new Set([...attributeBases, ...typedBases])];
      if (baseTypes.length > 0) {
        conditions.push({ key: 'BaseType', value: baseTypes.length === 1 ? baseTypes[0] : baseTypes });
      }
      pushNumberCondition(conditions, 'ItemLevel', '>=', get('minItemLevel')?.value);
      pushNumberCondition(conditions, 'ItemLevel', '<=', get('maxItemLevel')?.value);
      pushNumberCondition(conditions, 'Quality', '>=', get('minQuality')?.value);
      pushNumberCondition(conditions, 'Quality', '<=', get('maxQuality')?.value);
      return {
        ...existing,
        id: existing.id || `rare-${Date.now()}-${index}`,
        enabled: get('enabled')?.checked !== false,
        action: get('action')?.value || existing.action || 'Show',
        label: get('label')?.value || `Rare rule ${index + 1}`,
        minItemLevel: Number.isFinite(minItemLevel) && minItemLevel > 0 ? minItemLevel : undefined,
        attributeGroup: attributeGroup || undefined,
        tier: 'baseline',
        style: INHERIT_STYLE,
        overrideCategoryStyle,
        styleOverride: overrideCategoryStyle ? collectInlineStyleConfig(row, categoryStyle) : undefined,
        source: 'rare-item-rule',
        conditions
      };
    });
}

function splitTextValues(value) {
  return String(value || '').split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean);
}

function getRareAttributeBases(attributeGroup) {
  const [section, groupId] = String(attributeGroup || '').split(':');
  if (!section || !groupId) {
    return [];
  }

  const group = (lootFilterState?.rareEquipmentGroups?.[section] || []).find((entry) => entry.id === groupId);
  return group?.bases || [];
}

function collectCategoryRules() {
  const output = {};
  for (const [categoryId, definition] of Object.entries(CATEGORY_RULE_DEFINITIONS)) {
    const baselineRow = definition.list.querySelector(`[data-category-baseline-category="${categoryId}"]`);
    const existingCategory = lootFilterState?.profile?.categoryRules?.[categoryId] || {};
    output[categoryId] = {
      enabled: definition.enabledInput.checked,
      style: definition.defaultStyle,
      tier: 'baseline',
      styleConfig: baselineRow ? collectInlineStyleConfig(baselineRow, existingCategory.styleConfig) : existingCategory.styleConfig,
      rules: [...definition.list.querySelectorAll(`[data-category-rule-category="${categoryId}"]`)]
        .map((row) => collectCategoryRuleRow(categoryId, row))
        .filter((rule) => rule.conditions.length > 0)
    };
  }
  return output;
}

function collectCategoryRuleRow(categoryId, row) {
  const definition = CATEGORY_RULE_DEFINITIONS[categoryId];
  const index = Number(row.dataset.categoryRuleIndex);
  const existing = lootFilterState?.profile?.categoryRules?.[categoryId]?.rules?.[index] || {};
  const get = (field) => row.querySelector(`[data-category-rule-field="${field}"]`);
  const categoryStyle = lootFilterState?.profile?.categoryRules?.[categoryId]?.styleConfig || {};
  const overrideCategoryStyle = get('overrideCategoryStyle')?.checked === true;
  const conditions = structuredClone(definition.baseConditions || []);

  if (definition.fields.includes('itemClass')) {
    removeConditions(conditions, 'Class');
    pushTextCondition(conditions, 'Class', get('itemClass')?.value, true);
  }

  if (definition.fields.includes('rarity')) {
    pushTextCondition(conditions, 'Rarity', get('rarity')?.value);
  }

  pushNumberCondition(conditions, 'MapTier', '>=', get('minMapTier')?.value);
  pushNumberCondition(conditions, 'MapTier', '<=', get('maxMapTier')?.value);
  pushNumberCondition(conditions, 'ItemLevel', '>=', get('minItemLevel')?.value);
  pushNumberCondition(conditions, 'ItemLevel', '<=', get('maxItemLevel')?.value);
  pushNumberCondition(conditions, 'GemLevel', '>=', get('minGemLevel')?.value);
  pushNumberCondition(conditions, 'GemLevel', '<=', get('maxGemLevel')?.value);
  pushNumberCondition(conditions, 'Quality', '>=', get('minQuality')?.value);
  pushNumberCondition(conditions, 'Quality', '<=', get('maxQuality')?.value);
  pushBooleanCondition(conditions, 'Corrupted', get('corrupted')?.value);
  pushBooleanCondition(conditions, 'Identified', get('identified')?.value);

  if (definition.fields.includes('baseTypes')) {
    pushTextCondition(conditions, 'BaseType', get('baseTypes')?.value, true);
  }

  if (definition.fallbackConditions?.length && !conditions.some((condition) => condition.key === 'BaseType')) {
    conditions.push(...structuredClone(definition.fallbackConditions));
  }

  if (definition.requireBaseTypes && !conditions.some((condition) => condition.key === 'BaseType')) {
    conditions.length = 0;
  }

  return {
    ...existing,
    id: existing.id || `${categoryId}-${Date.now()}-${index}`,
    enabled: get('enabled')?.checked !== false,
    label: get('label')?.value?.trim() || existing.label || `${definition.label} rule`,
    action: get('action')?.value || existing.action || 'Show',
    style: INHERIT_STYLE,
    tier: 'baseline',
    overrideCategoryStyle,
    styleOverride: overrideCategoryStyle ? collectInlineStyleConfig(row, categoryStyle) : undefined,
    source: 'category-rule',
    conditions
  };
}

function removeConditions(conditions, key) {
  for (let index = conditions.length - 1; index >= 0; index -= 1) {
    if (conditions[index].key === key) {
      conditions.splice(index, 1);
    }
  }
}

function collectUserRules() {
  return [...filterRuleList.querySelectorAll('.filter-rule-row[data-rule-index]')]
    .map((row) => collectUserRuleRow(row))
    .filter((rule) => rule.conditions.length > 0);
}

function collectUserRuleRow(row) {
  const index = Number(row.dataset.ruleIndex);
  const existing = lootFilterState?.profile?.userRules?.[index] || {};
  const get = (field) => row.querySelector(`[data-rule-field="${field}"]`);
  return {
    ...existing,
    enabled: get('enabled')?.checked !== false,
    label: get('label')?.value?.trim() || existing.label || 'Custom rule',
    action: get('action')?.value || existing.action || 'Show',
    style: existing.style || 'default',
    tier: 'baseline',
    styleConfig: collectInlineStyleConfig(row, existing.styleConfig || lootFilterState?.profile?.styles?.[existing.style || 'default'] || lootFilterState?.profile?.styles?.default),
    source: existing.source || 'manual',
    conditions: collectCustomRuleConditions(get)
  };
}

function collectRareEquipment() {
  return {
    enabled: rareEquipmentEnabledInput.checked,
    armorGroups: [...rareArmorGroupList.querySelectorAll('[data-rare-equipment-field="armorGroup"]')]
      .filter((input) => input.checked)
      .map((input) => input.value),
    shieldGroups: [...rareShieldGroupList.querySelectorAll('[data-rare-equipment-field="shieldGroup"]')]
      .filter((input) => input.checked)
      .map((input) => input.value),
    weaponGroups: [...rareWeaponGroupList.querySelectorAll('[data-rare-equipment-field="weaponGroup"]')]
      .filter((input) => input.checked)
      .map((input) => input.value),
    miscGroups: [...miscEquipmentGroupList.querySelectorAll('[data-rare-equipment-field="miscGroup"]')]
      .filter((input) => input.checked)
      .map((input) => input.value),
    baseSelections: {
      armor: collectEquipmentBaseSelections(rareArmorGroupList, 'armorGroup'),
      shields: collectEquipmentBaseSelections(rareShieldGroupList, 'shieldGroup'),
      weapons: collectEquipmentBaseSelections(rareWeaponGroupList, 'weaponGroup'),
      misc: collectEquipmentBaseSelections(miscEquipmentGroupList, 'miscGroup')
    }
  };
}

function collectEquipmentBaseSelections(container, field) {
  const selections = {};
  const baseInputs = [...container.querySelectorAll('[data-equipment-base="true"]')];
  for (const groupInput of container.querySelectorAll(`[data-rare-equipment-field="${field}"]`)) {
    if (!groupInput.checked) {
      continue;
    }

    const card = groupInput.closest('[data-equipment-group-id]');
    const scopedInputs = card?.querySelector('[data-equipment-base="true"]')
      ? [...card.querySelectorAll('[data-equipment-base="true"]')]
      : baseInputs.filter((input) => input.dataset.equipmentGroupId === groupInput.value);
    const bases = scopedInputs
      .filter((input) => input.checked)
      .map((input) => input.value);
    if (bases.length > 0 || scopedInputs.length > 0) {
      selections[groupInput.value] = bases;
    }
  }
  return selections;
}

function collectChanceBases() {
  const baselineRow = chanceBaselineStyle.querySelector('[data-chance-baseline-style]');
  return {
    enabled: chanceBasesEnabledInput.checked,
    bases: [...chanceBaseList.querySelectorAll('[data-chance-base]')]
      .map((entry) => entry.dataset.chanceBase)
      .filter(Boolean),
    style: 'chance',
    tier: 'baseline',
    styleConfig: baselineRow
      ? collectInlineStyleConfig(baselineRow, lootFilterState?.profile?.chanceBases?.styleConfig)
      : lootFilterState?.profile?.chanceBases?.styleConfig
  };
}

function collectMiscRules() {
  const existingEntries = lootFilterState?.profile?.miscRules?.entries || [];
  return {
    enabled: miscRulesEnabledInput.checked,
    entries: [...miscRuleList.querySelectorAll('[data-misc-rule-index]')]
      .map((row) => {
        const index = Number(row.dataset.miscRuleIndex);
        const existing = existingEntries[index] || {};
        const get = (field) => row.querySelector(`[data-misc-rule-field="${field}"]`);
        return {
          ...existing,
          enabled: get('enabled')?.checked !== false,
          label: get('label')?.value?.trim() || existing.label || 'Misc rule',
          action: get('action')?.value || existing.action || 'Show',
          style: existing.style || 'misc',
          tier: 'baseline',
          styleConfig: collectInlineStyleConfig(row, existing.styleConfig || lootFilterState?.profile?.styles?.[existing.style || 'misc'] || lootFilterState?.profile?.styles?.misc),
          source: 'misc-rule'
        };
      })
  };
}

function collectEconomyHighlights() {
  const existing = lootFilterState?.profile?.economyHighlights || {};
  const persisted = { ...existing };
  delete persisted.maxItems;
  delete persisted.minChaos;
  delete persisted.highValueChaos;
  return {
    ...persisted,
    enabled: economyHighlightsEnabledInput.checked,
    tiers: collectEconomyTiers(),
    style: existing.style || 'highValue',
    types: [...economyTypeList.querySelectorAll('[data-economy-type]')]
      .filter((input) => input.checked)
      .map((input) => input.dataset.economyType)
  };
}

function collectEconomyTiers() {
  return [...economyTierList.querySelectorAll('.economy-tier-row[data-economy-tier-index]')]
    .map((row) => {
      const index = Number(row.dataset.economyTierIndex);
      const existing = lootFilterState?.profile?.economyHighlights?.tiers?.[index] || {};
      const fallback = getEconomyTierFallback(index, existing);
      const get = (field) => row.querySelector(`[data-economy-tier-field="${field}"]`)?.value;
      const minChaos = Number(get('minChaos'));
      const minDivines = Number(get('minDivines'));
      return {
        id: existing.id || fallback.id || `economy-rule-${Date.now()}-${index}`,
        label: get('label') || existing.label || fallback.label,
        minChaos: Number.isFinite(minChaos) && minChaos > 0 ? minChaos : undefined,
        minDivines: Number.isFinite(minDivines) && minDivines > 0 ? minDivines : undefined,
        style: fallback.style,
        tier: 'baseline',
        styleConfig: collectInlineStyleConfig(row, getEconomyTierStyleConfig(
          lootFilterState?.profile?.economyHighlights?.tiers?.[index],
          fallback
        )),
        maxItems: Number(get('maxItems')) || fallback.maxItems
      };
    });
}

function collectSpecialItems() {
  return {
    enabled: specialItemsEnabledInput.checked,
    entries: [...specialItemList.querySelectorAll('[data-special-item-index]')]
      .map((row) => collectSpecialItemRow(row))
      .filter((entry) => entry.conditions.length > 0)
  };
}

function collectSpecialItemRow(row) {
  const index = Number(row.dataset.specialItemIndex);
  const existing = lootFilterState?.profile?.specialItems?.entries?.[index] || {};
  const get = (field) => row.querySelector(`[data-special-field="${field}"]`);
  const conditions = collectCustomRuleConditions(get);

  return {
    ...existing,
    enabled: get('enabled')?.checked !== false,
    label: get('label')?.value?.trim() || existing.label || 'Special item',
    action: get('action')?.value || 'Show',
    style: existing.style || 'specialItems',
    tier: 'baseline',
    styleConfig: collectInlineStyleConfig(row, existing.styleConfig || lootFilterState?.profile?.styles?.[existing.style || 'specialItems'] || lootFilterState?.profile?.styles?.specialItems),
    source: 'special-item',
    conditions
  };
}

function collectCustomRuleConditions(get) {
  const conditions = [];

  pushTextCondition(conditions, 'BaseType', get('baseType')?.value, true);
  pushTextCondition(conditions, 'Class', get('itemClass')?.value, true);
  pushTextCondition(conditions, 'Rarity', get('rarity')?.value);
  pushTextCondition(conditions, 'SocketGroup', get('socketGroup')?.value);
  pushTextCondition(conditions, 'HasInfluence', get('influence')?.value, true);

  for (const [field, , key, operator] of SPECIAL_NUMBER_FIELDS) {
    pushNumberCondition(conditions, key, operator, get(field)?.value);
  }

  for (const [field, , key] of SPECIAL_BOOLEAN_FIELDS) {
    pushBooleanCondition(conditions, key, get(field)?.value);
  }

  return conditions;
}

function pushTextCondition(conditions, key, rawValue, splitValues = false) {
  const value = String(rawValue || '').trim();
  if (!value) {
    return;
  }

  const entries = splitValues
    ? value.split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean)
    : [value];

  conditions.push({
    key,
    value: entries.length === 1 ? entries[0] : entries
  });
}

function pushNumberCondition(conditions, key, operator, rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value) || value <= 0) {
    return;
  }

  conditions.push({
    key,
    operator,
    value: Math.round(value)
  });
}

function pushBooleanCondition(conditions, key, rawValue) {
  if (rawValue !== 'True' && rawValue !== 'False') {
    return;
  }

  conditions.push({
    key,
    value: rawValue === 'True'
  });
}

function collectRarityVisibility() {
  return {
    normal: showNormalItemsInput.checked,
    magic: showMagicItemsInput.checked
  };
}

function collectProfilePatch() {
  return {
    name: filterProfileNameInput.value,
    quickAction: filterQuickActionInput.value,
    quickRuleDefaults: collectCaptureDefaults(),
    styles: collectStyles(),
    currencyStyle: collectCurrencyStyle(),
    currencyTiers: collectCurrencyTiers(),
    rareStyle: collectRareStyle(),
    rareTiers: collectRareTiers(),
    categoryRules: collectCategoryRules(),
    rareEquipment: collectRareEquipment(),
    chanceBases: collectChanceBases(),
    miscRules: collectMiscRules(),
    economyHighlights: collectEconomyHighlights(),
    specialItems: collectSpecialItems(),
    rarityVisibility: collectRarityVisibility(),
    userRules: collectUserRules()
  };
}

async function saveLootFilterWorkbenchState() {
  const profilePatch = collectProfilePatch();
  await window.poehelper.setLootFilterConfig({
    profileName: filterProfileNameInput.value,
    outputPath: filterOutputPathInput.value,
    quickAction: filterQuickActionInput.value
  });
  const state = await window.poehelper.updateLootFilterProfile(profilePatch);
  renderLootFilterState(state);
  return state;
}

function moveArrayEntry(items = [], index, direction) {
  const nextIndex = direction === 'up' ? index - 1 : index + 1;
  if (!Number.isFinite(index) || nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const copy = [...items];
  [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  return copy;
}

function moveWorkbenchRule(button) {
  if (!lootFilterState?.profile) {
    return;
  }

  const kind = button.dataset.moveRuleKind;
  const index = Number(button.dataset.moveRuleIndex);
  const direction = button.dataset.moveRuleDirection;
  const profile = {
    ...lootFilterState.profile,
    ...collectProfilePatch()
  };

  if (kind === 'currency') {
    profile.currencyTiers = moveArrayEntry(profile.currencyTiers || [], index, direction);
  } else if (kind === 'rare') {
    profile.rareTiers = moveArrayEntry(profile.rareTiers || [], index, direction);
  } else if (kind === 'category') {
    const categoryId = button.dataset.moveRuleCategory;
    profile.categoryRules ||= {};
    const category = profile.categoryRules[categoryId] || { enabled: true, rules: [] };
    profile.categoryRules[categoryId] = {
      ...category,
      rules: moveArrayEntry(category.rules || [], index, direction)
    };
  } else if (kind === 'misc') {
    profile.miscRules = {
      ...(profile.miscRules || {}),
      entries: moveArrayEntry(profile.miscRules?.entries || [], index, direction)
    };
  } else if (kind === 'economy') {
    profile.economyHighlights = {
      ...(profile.economyHighlights || {}),
      tiers: moveArrayEntry(profile.economyHighlights?.tiers || [], index, direction)
    };
  } else if (kind === 'special') {
    profile.specialItems = {
      ...(profile.specialItems || {}),
      entries: moveArrayEntry(profile.specialItems?.entries || [], index, direction)
    };
  } else if (kind === 'user') {
    profile.userRules = moveArrayEntry(profile.userRules || [], index, direction);
  }

  lootFilterState.profile = profile;
  renderLootFilterState(lootFilterState);
  setLootFilterDirty(true);
}

function formatDiagnostics(diagnostics) {
  const lines = [];
  if (diagnostics.lastLookup) {
    lines.push(`Last lookup: ${diagnostics.lastLookup.mode || '-'} / ${diagnostics.lastLookup.item || '-'} / ${diagnostics.lastLookup.league || '-'}`);
  }

  if (diagnostics.lastParsedItem) {
    lines.push('Parsed item:');
    lines.push(JSON.stringify(diagnostics.lastParsedItem, null, 2));
  }

  if (diagnostics.lastApiError) {
    lines.push('Last API error:');
    lines.push(JSON.stringify(diagnostics.lastApiError, null, 2));
  }

  if (diagnostics.lastLootFilterWrite) {
    lines.push('Last loot-filter write:');
    lines.push(JSON.stringify(diagnostics.lastLootFilterWrite, null, 2));
  }

  if (diagnostics.lastCopiedTextPreview) {
    lines.push('Copied text:');
    lines.push(diagnostics.lastCopiedTextPreview);
  }

  if (diagnostics.providers && Object.keys(diagnostics.providers).length) {
    lines.push('Provider diagnostics:');
    lines.push(JSON.stringify(diagnostics.providers, null, 2));
  }

  if (diagnostics.events?.length) {
    lines.push('Recent events:');
    lines.push(JSON.stringify(diagnostics.events.slice(0, 12), null, 2));
  }

  return lines.length ? lines.join('\n\n') : 'No diagnostics captured yet.';
}

function formatCatalogMetadata(metadata) {
  const lines = [];
  for (const catalog of metadata?.catalogs || []) {
    lines.push(`${catalog.id}: ${catalog.dataVersion || 'unversioned'} / ${catalog.gameVersion || 'unknown game version'}`);
    if (catalog.entries !== undefined) {
      lines.push(`  entries: ${catalog.entries}${catalog.groups !== undefined ? ` across ${catalog.groups} groups` : ''}`);
    }
    if (catalog.source) {
      lines.push(`  source: ${catalog.source}`);
    }
    if (catalog.sourceRevision) {
      lines.push(`  source revision: ${catalog.sourceRevision}`);
    }
    if (catalog.updatePolicy) {
      lines.push(`  update: ${catalog.updatePolicy}`);
    }
    if (catalog.manualOverrides?.length) {
      lines.push(`  manual overrides: ${catalog.manualOverrides.join(' | ')}`);
    }
    lines.push('');
  }

  if (metadata?.releaseChecklist?.length) {
    lines.push('League update checklist:');
    for (const command of metadata.releaseChecklist) {
      lines.push(`  ${command}`);
    }
  }

  return lines.join('\n').trim() || 'No catalog metadata available.';
}

async function refreshDiagnostics() {
  const diagnostics = await window.poehelper.getDiagnostics();
  diagnosticsOutput.textContent = formatDiagnostics(diagnostics);
  setStatus(diagnosticsStatus, `Diagnostics refreshed with ${(diagnostics.events || []).length} events.`);
}

async function refreshCatalogMetadata() {
  const metadata = await window.poehelper.getCatalogMetadata();
  catalogMetadataOutput.textContent = formatCatalogMetadata(metadata);
  setStatus(catalogMetadataStatus, `Catalog metadata refreshed with ${(metadata.catalogs || []).length} catalogs.`);
}

async function runButton(button, statusElement, workingText, action) {
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = workingText;

  try {
    return await action();
  } catch (error) {
    setStatus(statusElement, error.message || 'Action failed.', true);
    return undefined;
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

window.poehelper.getSettings().then((settings) => {
  applySettingsPayload({ settings });
  refreshLootFilterState(false);
  refreshDiagnostics();
  refreshCatalogMetadata();
});

window.poehelper.getUpdateStatus().then(renderUpdateStatus);

window.poehelper.onSettingsUpdated(applySettingsPayload);
window.poehelper.onUpdateStatus(renderUpdateStatus);

for (const button of settingsTabButtons) {
  button.addEventListener('click', () => activateSettingsPanel(button.dataset.settingsTab));
}

for (const button of lootTabButtons) {
  button.addEventListener('click', () => activateLootSection(button.dataset.lootTab));
}

if (lootFilterPanel) {
  for (const eventName of ['input', 'change']) {
    lootFilterPanel.addEventListener(eventName, (event) => {
      if (event.target?.id === 'filter-profile-select') {
        return;
      }
      markLootFilterDirty();
    });
  }

  lootFilterPanel.addEventListener('click', (event) => {
    const moveButton = event.target?.closest?.('[data-move-rule-kind]');
    if (moveButton) {
      event.preventDefault();
      moveWorkbenchRule(moveButton);
    }
  });
}

saveLeagueButton.addEventListener('click', async () => {
  const settings = await window.poehelper.setLeague(leagueInput.value);
  leagueInput.value = settings.league;
  setStatus(saveStatus, `Saved league: ${settings.league}`);
});

saveListingCountButton.addEventListener('click', async () => {
  const settings = await window.poehelper.setListingCount(listingCountInput.value);
  listingCountInput.value = settings.listingCount;
  setStatus(listingStatus, `Showing top ${settings.listingCount} instant-buyout listings.`);
});

filterProfileSelect.addEventListener('change', async () => {
  const profileId = filterProfileSelect.value;
  if (!profileId || profileId === lootFilterState?.activeProfileId) {
    return;
  }

  setStatus(filterStatus, 'Switching profiles...');
  await saveLootFilterWorkbenchState();
  const state = await window.poehelper.setActiveLootFilterProfile(profileId);
  renderLootFilterState(state);
  setStatus(filterStatus, `Active filter profile: ${state.profileName}.`);
});

newFilterProfileButton.addEventListener('click', () => {
  runButton(newFilterProfileButton, filterStatus, 'Creating...', async () => {
    await saveLootFilterWorkbenchState();
    const state = await window.poehelper.createLootFilterProfile({
      name: 'New Filter',
      copyCurrent: false
    });
    renderLootFilterState(state);
    filterProfileNameInput.focus();
    filterProfileNameInput.select();
    setStatus(filterStatus, `Created ${state.profileName}. Rename it, then Save Profile.`);
  });
});

duplicateFilterProfileButton.addEventListener('click', () => {
  runButton(duplicateFilterProfileButton, filterStatus, 'Duplicating...', async () => {
    await saveLootFilterWorkbenchState();
    const state = await window.poehelper.createLootFilterProfile({
      name: `${lootFilterState?.profileName || 'Filter'} Copy`,
      copyCurrent: true
    });
    renderLootFilterState(state);
    filterProfileNameInput.focus();
    filterProfileNameInput.select();
    setStatus(filterStatus, `Duplicated into ${state.profileName}.`);
  });
});

deleteFilterProfileButton.addEventListener('click', () => {
  if (!lootFilterState?.activeProfileId || (lootFilterState.profiles || []).length <= 1) {
    setStatus(filterStatus, 'Keep at least one loot filter profile.', true);
    return;
  }

  if (!window.confirm(`Delete "${lootFilterState.profileName}" from local profiles? This does not delete an exported JSON file.`)) {
    return;
  }

  runButton(deleteFilterProfileButton, filterStatus, 'Deleting...', async () => {
    const state = await window.poehelper.deleteLootFilterProfile(lootFilterState.activeProfileId);
    renderLootFilterState(state);
    setStatus(filterStatus, `Deleted profile. Active filter profile: ${state.profileName}.`);
  });
});

importFilterProfileButton.addEventListener('click', () => {
  runButton(importFilterProfileButton, filterStatus, 'Importing...', async () => {
    const result = await window.poehelper.importLootFilterProfile();
    if (result.status === 'cancelled') {
      setStatus(filterStatus, 'Profile import cancelled.');
      return;
    }

    renderLootFilterState(result.state);
    setStatus(filterStatus, `Imported ${result.state.profileName}.`);
  });
});

exportFilterProfileButton.addEventListener('click', () => {
  runButton(exportFilterProfileButton, filterStatus, 'Exporting...', async () => {
    await saveLootFilterWorkbenchState();
    const result = await window.poehelper.exportLootFilterProfile(lootFilterState?.activeProfileId);
    if (result.status === 'cancelled') {
      setStatus(filterStatus, 'Profile export cancelled.');
      return;
    }

    setStatus(filterStatus, `Exported ${result.profileName} to ${result.filePath}.`);
  });
});

saveFilterConfigButton.addEventListener('click', () => {
  runButton(saveFilterConfigButton, filterStatus, 'Saving...', async () => {
    await saveLootFilterWorkbenchState();
    setStatus(filterStatus, 'Loot filter workbench saved.');
  });
});

saveFilterWorkbenchButton.addEventListener('click', () => {
  runButton(saveFilterWorkbenchButton, filterStatus, 'Saving...', async () => {
    await saveLootFilterWorkbenchState();
    setStatus(filterStatus, 'Loot filter workbench saved.');
  });
});

writeFilterButton.addEventListener('click', () => {
  runButton(writeFilterButton, filterStatus, 'Writing...', async () => {
    await saveLootFilterWorkbenchState();
    const result = await window.poehelper.writeLootFilter();
    await refreshLootFilterState(false);
    renderFilterSummaryPanel(result.summary, result.previousDiff);
    setStatus(filterStatus, `Wrote ${result.outputPath} (${result.summary?.showBlocks || 0} Show / ${result.summary?.hideBlocks || 0} Hide blocks).`);
  });
});

captureFilterRuleButton.addEventListener('click', () => {
  runButton(captureFilterRuleButton, filterStatus, 'Capturing...', async () => {
    const result = await window.poehelper.captureLootFilterRule();
    applySettingsPayload({ settings: result.settings });
    await refreshLootFilterState(false);
    setStatus(filterStatus, `Added rule: ${result.rule.label}`);
  });
});

addCurrencyTierButton.addEventListener('click', () => {
  lootFilterState.profile.currencyStyle = collectCurrencyStyle();
  lootFilterState.profile.currencyTiers = collectCurrencyTiers();
  lootFilterState.profile.currencyTiers = [
    ...(lootFilterState.profile.currencyTiers || []),
    {
      id: `currency-${Date.now()}`,
      action: 'Show',
      label: 'New currency rule',
      bases: [],
      style: INHERIT_STYLE,
      tier: 'baseline'
    }
  ];
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Currency rule added. Save Profile to keep it.');
});

if (addCustomStyleButton) {
  addCustomStyleButton.addEventListener('click', addCustomStyleFromInput);
}

if (customStyleNameInput) {
  customStyleNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCustomStyleFromInput();
    }
  });
}

addRareTierButton.addEventListener('click', () => {
  lootFilterState.profile.rareStyle = collectRareStyle();
  lootFilterState.profile.rareTiers = collectRareTiers();
  lootFilterState.profile.rareTiers = [
    ...(lootFilterState.profile.rareTiers || []),
    {
      id: `rare-${Date.now()}`,
      enabled: true,
      action: 'Show',
      label: 'New rare rule',
      style: 'rare',
      tier: 'baseline',
      source: 'rare-item-rule',
      conditions: [{ key: 'Rarity', value: 'Rare' }]
    }
  ];
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Rare item rule added. Save Profile to keep it.');
});

for (const [categoryId, definition] of Object.entries(CATEGORY_RULE_DEFINITIONS)) {
  definition.addButton.addEventListener('click', () => addCategoryRule(categoryId));
}

function addCategoryRule(categoryId) {
  const definition = CATEGORY_RULE_DEFINITIONS[categoryId];
  lootFilterState.profile.categoryRules ||= {};
  const category = lootFilterState.profile.categoryRules[categoryId] || { enabled: true, rules: [] };
  lootFilterState.profile.categoryRules[categoryId] = {
    ...category,
    enabled: category.enabled !== false,
    rules: [
      ...(category.rules || []),
      {
        ...structuredClone(definition.defaultRule),
        id: `${categoryId}-${Date.now()}`,
        style: INHERIT_STYLE
      }
    ]
  };
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, `${definition.label} rule added. Save Profile to keep it.`);
}

refreshFilterPreviewButton.addEventListener('click', () => {
  runButton(refreshFilterPreviewButton, filterStatus, 'Refreshing...', () => refreshLootFilterState(true));
});

if (filterPreviewSearchInput) {
  filterPreviewSearchInput.addEventListener('input', renderFilterPreviewOutput);
}

if (filterHistoryList) {
  filterHistoryList.addEventListener('click', (event) => {
    const historyId = event.target?.dataset?.restoreFilterHistory;
    if (!historyId) {
      return;
    }

    runButton(event.target, filterHistoryStatus, 'Restoring...', async () => {
      const result = await window.poehelper.restoreLootFilterHistory(historyId);
      if (result.status !== 'restored') {
        setStatus(filterHistoryStatus, result.message || 'Could not restore selected history entry.', true);
        return;
      }

      await refreshLootFilterState(false);
      renderFilterSummaryPanel(result.summary, result.previousDiff);
      setStatus(filterHistoryStatus, `Restored ${result.historyEntry?.writtenAt || 'selected snapshot'} to ${result.outputPath}.`);
    });
  });
}

clearFilterRulesButton.addEventListener('click', () => {
  runButton(clearFilterRulesButton, filterStatus, 'Clearing...', async () => {
    const state = await window.poehelper.clearLootFilterRules();
    renderLootFilterState(state);
    setStatus(filterStatus, 'Captured loot-filter rules cleared.');
  });
});

for (const container of [rareArmorGroupList, rareShieldGroupList, rareWeaponGroupList, miscEquipmentGroupList]) {
  container.addEventListener('change', (event) => {
    if (event.target?.dataset?.rareEquipmentField) {
      const card = event.target.closest('.equipment-group');
      if (card) {
        card.classList.toggle('is-open', event.target.checked);
      } else {
        lootFilterState.profile.rareEquipment = collectRareEquipment();
        renderRareEquipment(lootFilterState.profile, lootFilterState.rareEquipmentGroups);
      }
      return;
    }

    if (event.target?.dataset?.equipmentBase) {
      const section = event.target.closest('[data-equipment-base-section]');
      if (section) {
        updateEquipmentBaseSectionTitle(section, getEquipmentBaseSectionLabel(section));
      }
    }
  });

  container.addEventListener('click', (event) => {
    const button = event.target?.closest?.('[data-equipment-base-action]');
    if (!button) {
      return;
    }

    applyEquipmentBaseAction(button.closest('[data-equipment-base-section]'), button.dataset.equipmentBaseAction);
  });
}

for (const button of equipmentTabButtons) {
  button.addEventListener('click', () => {
    const tab = button.dataset.equipmentTab;
    for (const entry of equipmentTabButtons) {
      entry.classList.toggle('is-active', entry === button);
    }
    for (const pane of equipmentPanes) {
      pane.classList.toggle('is-active', pane.dataset.equipmentPane === tab);
    }
  });
}

chanceBaseInput.addEventListener('input', updateChanceBaseValidation);

chanceBaseInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addChanceBaseButton.click();
  }
});

addChanceBaseButton.addEventListener('click', addChanceBaseFromInput);

refreshEconomyButton.addEventListener('click', () => {
  runButton(refreshEconomyButton, economyStatus, 'Refreshing...', async () => {
    await saveLootFilterWorkbenchState();
    const state = await window.poehelper.refreshLootFilterEconomy();
    renderLootFilterState(state);
    const count = state.profile?.economyHighlights?.entries?.length || 0;
    setStatus(economyStatus, `Cached ${count} high-value economy items. Save Profile or Write Filter File when ready.`);
  });
});

addEconomyTierButton.addEventListener('click', () => {
  const current = collectEconomyHighlights();
  lootFilterState.profile.economyHighlights = {
    ...current,
    tiers: [
      ...(current.tiers || []),
      {
        id: `economy-rule-${Date.now()}`,
        label: 'New economy rule',
        minChaos: 50,
        style: 'highValue',
        tier: 'baseline',
        maxItems: 500,
        styleConfig: getEconomyTierStyleConfig({}, DEFAULT_ECONOMY_TIERS[0])
      }
    ]
  };
  renderEconomyHighlights(lootFilterState.profile);
  setStatus(economyStatus, 'Economy rule added. Save Profile to keep it.');
});

economyTierList.addEventListener('click', (event) => {
  const index = Number(event.target?.dataset?.removeEconomyTierIndex);
  if (!Number.isFinite(index)) {
    return;
  }

  const current = collectEconomyHighlights();
  lootFilterState.profile.economyHighlights = {
    ...current,
    tiers: (current.tiers || []).filter((_, tierIndex) => tierIndex !== index)
  };
  renderEconomyHighlights(lootFilterState.profile);
  setStatus(economyStatus, 'Economy rule removed. Save Profile to keep this change.');
});

specialItemBaseInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSpecialItemButton.click();
  }
});

specialItemLabelInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSpecialItemButton.click();
  }
});

addSpecialItemButton.addEventListener('click', addSpecialItemFromInput);

chanceBaseList.addEventListener('click', (event) => {
  const base = event.target?.dataset?.removeChanceBase;
  if (!base || !lootFilterState?.profile) {
    return;
  }

  const current = collectChanceBases();
  lootFilterState.profile.chanceBases = {
    ...current,
    bases: (current.bases || [])
      .filter((entry) => normalizeBaseKey(entry) !== normalizeBaseKey(base))
  };
  renderChanceBases(lootFilterState.profile, lootFilterState.chanceBaseOptions);
  setStatus(chanceBaseStatus, `Removed ${base}. Save Profile to keep this change.`);
});

specialItemList.addEventListener('click', (event) => {
  const index = Number(event.target?.dataset?.removeSpecialItemIndex);
  if (!Number.isFinite(index) || !lootFilterState?.profile) {
    return;
  }

  const current = collectSpecialItems();
  lootFilterState.profile.specialItems = {
    ...current,
    entries: (current.entries || [])
      .filter((_, entryIndex) => entryIndex !== index)
  };
  renderSpecialItems(lootFilterState.profile);
  setStatus(specialItemStatus, 'Special item removed. Save Profile to keep this change.');
});

for (const [categoryId, definition] of Object.entries(CATEGORY_RULE_DEFINITIONS)) {
  definition.list.addEventListener('click', (event) => {
    if (event.target?.dataset?.removeCategoryRuleCategory !== categoryId) {
      return;
    }

    const index = Number(event.target.dataset.removeCategoryRuleIndex);
    if (!Number.isFinite(index) || !lootFilterState?.profile) {
      return;
    }

    lootFilterState.profile.categoryRules ||= {};
    const category = lootFilterState.profile.categoryRules[categoryId] || { enabled: true, rules: [] };
    lootFilterState.profile.categoryRules[categoryId] = {
      ...category,
      rules: (category.rules || []).filter((_, entryIndex) => entryIndex !== index)
    };
    renderCategoryRuleList(categoryId, lootFilterState.profile.categoryRules[categoryId]);
    setStatus(definition.status, `${definition.label} rule removed. Save Profile to keep this change.`);
  });

  definition.list.addEventListener('change', (event) => {
    if (event.target?.dataset?.categoryRuleField === 'overrideCategoryStyle') {
      toggleInlineStylePanel(event.target);
    } else if (event.target?.dataset?.styleConfigField === 'sound') {
      previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
    }
  });
}

currencyTierList.addEventListener('change', (event) => {
  if (event.target?.dataset?.tierField === 'overrideCategoryStyle') {
    toggleInlineStylePanel(event.target);
  } else if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

currencyBaselineStyle.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

rareBaselineStyle.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

rareTierList.addEventListener('change', (event) => {
  if (event.target?.dataset?.tierField === 'overrideCategoryStyle') {
    toggleInlineStylePanel(event.target);
  } else if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

chanceBaselineStyle.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

economyTierList.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

miscRuleList.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

specialItemList.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

filterRuleList.addEventListener('change', (event) => {
  if (event.target?.dataset?.styleConfigField === 'sound') {
    previewSelectedFilterSound(event.target.value, event.target.closest('.inline-style-grid, .inline-style-panel'));
  }
});

filterRuleList.addEventListener('click', (event) => {
  const ruleId = event.target?.dataset?.ruleId;
  if (!ruleId) {
    return;
  }

  runButton(event.target, filterStatus, 'Deleting...', async () => {
    await saveLootFilterWorkbenchState();
    const state = await window.poehelper.removeLootFilterRule(ruleId);
    renderLootFilterState(state);
    setStatus(filterStatus, 'Captured rule deleted.');
  });
});

currencyTierList.addEventListener('click', (event) => {
  if (event.target?.dataset?.removeTierType !== 'currency') {
    return;
  }

  const index = Number(event.target.dataset.removeTierIndex);
  lootFilterState.profile.currencyStyle = collectCurrencyStyle();
  lootFilterState.profile.currencyTiers = collectCurrencyTiers().filter((_, entryIndex) => entryIndex !== index);
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Currency rule removed. Save Profile to keep this change.');
});

rareTierList.addEventListener('click', (event) => {
  if (event.target?.dataset?.removeTierType !== 'rare') {
    return;
  }

  const index = Number(event.target.dataset.removeTierIndex);
  lootFilterState.profile.rareStyle = collectRareStyle();
  lootFilterState.profile.rareTiers = collectRareTiers().filter((_, entryIndex) => entryIndex !== index);
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Rare item rule removed. Save Profile to keep this change.');
});

for (const [name, input] of Object.entries(shortcutInputs)) {
  input.addEventListener('focus', () => {
    input.value = 'Press keys...';
    setStatus(shortcutStatus, 'Press a key combination, then save shortcuts.');
  });

  input.addEventListener('blur', () => {
    renderShortcuts();
  });

  input.addEventListener('keydown', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const accelerator = eventToAccelerator(event);
    if (!accelerator) {
      input.value = 'Press keys...';
      return;
    }

    shortcutValues = {
      ...shortcutValues,
      [name]: accelerator
    };
    input.value = acceleratorToLabel(accelerator);
    input.blur();
  });
}

saveShortcutsButton.addEventListener('click', () => {
  runButton(saveShortcutsButton, shortcutStatus, 'Saving...', async () => {
    const settings = await window.poehelper.setShortcuts(shortcutValues);
    applySettingsPayload({ settings });
    setStatus(shortcutStatus, 'Shortcuts saved and registered.');
  });
});

resetShortcutsButton.addEventListener('click', () => {
  shortcutValues = { ...DEFAULT_SHORTCUTS };
  renderShortcuts();
  setStatus(shortcutStatus, 'Default shortcuts restored. Save to apply them.');
});

checkUpdatesButton.addEventListener('click', () => {
  runButton(checkUpdatesButton, updateStatus, 'Checking...', async () => {
    const status = await window.poehelper.checkForUpdates();
    renderUpdateStatus(status);
  });
});

installUpdateButton.addEventListener('click', () => {
  runButton(installUpdateButton, updateStatus, 'Restarting...', async () => {
    const status = await window.poehelper.installUpdate();
    renderUpdateStatus(status);
  });
});

saveOauthButton.addEventListener('click', async () => {
  const settings = await window.poehelper.setOauthConfig(getOauthForm());
  applySettingsPayload({ settings });
  setStatus(oauthStatus, 'OAuth configuration saved.');
});

connectOauthButton.addEventListener('click', () => {
  runButton(connectOauthButton, oauthStatus, 'Connecting...', async () => {
    await window.poehelper.setOauthConfig(getOauthForm());
    const settings = await window.poehelper.connectGggOauth();
    applySettingsPayload({ settings });
    setStatus(oauthStatus, `OAuth connected, ${formatExpiry(settings.oauth.expiresAt)}`);
  });
});

refreshOauthButton.addEventListener('click', () => {
  runButton(refreshOauthButton, oauthStatus, 'Refreshing...', async () => {
    const settings = await window.poehelper.refreshGggOauth();
    applySettingsPayload({ settings });
    setStatus(oauthStatus, `OAuth refreshed, ${formatExpiry(settings.oauth.expiresAt)}`);
  });
});

disconnectOauthButton.addEventListener('click', async () => {
  const settings = await window.poehelper.disconnectGggOauth();
  applySettingsPayload({ settings });
  setStatus(oauthStatus, 'OAuth disconnected.', true);
});

testProfileButton.addEventListener('click', () => {
  runButton(testProfileButton, oauthStatus, 'Testing...', async () => {
    const result = await window.poehelper.testGggProfile();
    setStatus(oauthStatus, `Profile API connected: ${result.name}`);
  });
});

saveServiceTokenButton.addEventListener('click', async () => {
  const settings = await window.poehelper.setGggServiceToken(serviceTokenInput.value);
  serviceTokenInput.value = '';
  applySettingsPayload({ settings });
  setStatus(exchangeStatus, 'Optional service token saved.');
});

clearServiceTokenButton.addEventListener('click', async () => {
  const settings = await window.poehelper.setGggServiceToken('');
  serviceTokenInput.value = '';
  applySettingsPayload({ settings });
  setStatus(exchangeStatus, 'Optional service token cleared.');
});

testExchangeButton.addEventListener('click', () => {
  runButton(testExchangeButton, exchangeStatus, 'Testing...', async () => {
    const result = await window.poehelper.testCurrencyExchange();
    const detail = typeof result.markets === 'number' ? ` (${result.markets} markets)` : '';
    setStatus(exchangeStatus, `Currency Exchange endpoint reachable${detail}.`);
  });
});

refreshDiagnosticsButton.addEventListener('click', () => {
  runButton(refreshDiagnosticsButton, diagnosticsStatus, 'Refreshing...', refreshDiagnostics);
});

if (refreshCatalogMetadataButton) {
  refreshCatalogMetadataButton.addEventListener('click', () => {
    runButton(refreshCatalogMetadataButton, catalogMetadataStatus, 'Refreshing...', refreshCatalogMetadata);
  });
}

clearDiagnosticsButton.addEventListener('click', () => {
  runButton(clearDiagnosticsButton, diagnosticsStatus, 'Clearing...', async () => {
    const diagnostics = await window.poehelper.clearDiagnostics();
    diagnosticsOutput.textContent = formatDiagnostics(diagnostics);
    setStatus(diagnosticsStatus, 'Diagnostics cleared.');
  });
});

listingCountInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveListingCountButton.click();
  }
});

leagueInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveLeagueButton.click();
  }
});
