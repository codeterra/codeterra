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
const filterCaptureDefaults = document.querySelector('#filter-capture-defaults');
const filterStyleList = document.querySelector('#filter-style-list');
const customStyleNameInput = document.querySelector('#custom-style-name-input');
const addCustomStyleButton = document.querySelector('#add-custom-style-button');
const customStyleStatus = document.querySelector('#custom-style-status');
const currencyTierList = document.querySelector('#currency-tier-list');
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
const refreshDiagnosticsButton = document.querySelector('#refresh-diagnostics-button');
const clearDiagnosticsButton = document.querySelector('#clear-diagnostics-button');
const diagnosticsOutput = document.querySelector('#diagnostics-output');
const diagnosticsStatus = document.querySelector('#diagnostics-status');
const settingsTabButtons = [...document.querySelectorAll('[data-settings-tab]')];
const settingsPanels = [...document.querySelectorAll('[data-settings-panel]')];
const lootTabButtons = [...document.querySelectorAll('[data-loot-tab]')];
const lootSections = [...document.querySelectorAll('[data-loot-section]')];
const chanceBasesEnabledInput = document.querySelector('#chance-bases-enabled-input');
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

function createStyleSelect(value, dataset, profile = lootFilterState?.profile) {
  const select = document.createElement('select');
  Object.assign(select.dataset, dataset);
  for (const styleName of getStyleOptions(profile)) {
    const option = document.createElement('option');
    option.value = styleName;
    option.textContent = getStyleLabel(styleName);
    option.selected = styleName === value;
    select.appendChild(option);
  }
  return select;
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
  setStatus(customStyleStatus, `${getStyleLabel(styleId)} added. Save Workbench to keep it.`);
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

function renderCaptureDefaults(profile) {
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
    filterStyleList.appendChild(card);
  }
}

function renderTierLists(profile) {
  renderCurrencyTiers(profile.currencyTiers || []);
  renderRareTiers(profile.rareTiers || []);
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
    appendLabeled(editGrid, 'Style', createStyleSelect(rule.style || definition.defaultStyle, { categoryRuleField: 'style' }));
    appendLabeled(editGrid, 'Tier', createSelect(rule.tier || definition.defaultTier, TIER_OPTIONS, { categoryRuleField: 'tier' }));

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
    row.appendChild(conditionsGrid);
    row.appendChild(conditionSummary);
    definition.list.appendChild(row);
  });
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
  renderEquipmentGroupList(
    rareArmorGroupList,
    groups?.armor || [],
    new Set(rareEquipment.armorGroups || []),
    'armorGroup',
    baseSelections.armor || {}
  );
  renderEquipmentGroupList(
    rareShieldGroupList,
    groups?.shields || [],
    new Set(rareEquipment.shieldGroups || []),
    'shieldGroup',
    baseSelections.shields || {}
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
  renderChanceBaseList(chanceBases.bases || []);
  updateChanceBaseValidation();
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

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = rule.enabled !== false;
    enabled.dataset.miscRuleField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(rule.label, { miscRuleField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(rule.action || 'Show', SPECIAL_ACTION_OPTIONS, { miscRuleField: 'action' }));
    appendLabeled(editGrid, 'Style', createStyleSelect(rule.style || 'misc', { miscRuleField: 'style' }));
    appendLabeled(editGrid, 'Tier', createSelect(rule.tier || 'baseline', TIER_OPTIONS, { miscRuleField: 'tier' }));

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
    const fallback = DEFAULT_ECONOMY_TIERS[index] || DEFAULT_ECONOMY_TIERS[0];
    const row = document.createElement('article');
    row.className = 'economy-tier-row';
    row.dataset.economyTierIndex = String(index);

    const header = document.createElement('div');
    header.className = 'economy-tier-row__header';
    header.textContent = tier.label || fallback.label;
    row.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'economy-tier-row__grid';
    appendLabeled(grid, 'Label', createTextInput(tier.label || fallback.label, { economyTierField: 'label' }));
    appendLabeled(grid, 'Min chaos', createTextInput(tier.minChaos ?? '', { economyTierField: 'minChaos' }, 'number'));
    appendLabeled(grid, 'Min divines', createTextInput(tier.minDivines ?? '', { economyTierField: 'minDivines' }, 'number'));
    appendLabeled(grid, 'Style', createStyleSelect(tier.style || 'highValue', { economyTierField: 'style' }));
    appendLabeled(grid, 'Color tier', createSelect(tier.tier || fallback.tier || 'baseline', TIER_OPTIONS, { economyTierField: 'tier' }));
    appendLabeled(grid, 'Cache cap', createTextInput(tier.maxItems || fallback.maxItems || 500, { economyTierField: 'maxItems' }, 'number'));
    row.appendChild(grid);
    economyTierList.appendChild(row);
  });
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

  const current = lootFilterState?.profile?.specialItems?.entries || [];
  const entry = {
    id: `special-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    enabled: true,
    action: 'Show',
    label: label || base,
    source: 'special-item',
    style: 'specialItems',
    tier: 'high',
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
  setStatus(specialItemStatus, `Added ${entry.label}. Tune its options, then Save Workbench.`);
}

function renderEquipmentGroupList(container, groups, selected, field, selectedBasesByGroup = {}) {
  container.innerHTML = '';
  for (const group of groups) {
    const card = document.createElement('div');
    card.className = 'equipment-group';
    card.classList.toggle('is-open', selected.has(group.id));
    card.dataset.equipmentGroupId = group.id;

    const label = document.createElement('label');
    label.className = 'equipment-group__header';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.rareEquipmentField = field;
    input.value = group.id;
    input.checked = selected.has(group.id);
    label.appendChild(input);
    label.appendChild(document.createTextNode(`${group.label}${group.bases?.length ? ` (${group.bases.length})` : ''}`));
    card.appendChild(label);

    if (group.bases?.length) {
      const baseGrid = document.createElement('div');
      baseGrid.className = 'equipment-base-grid';
      const selectedBases = Array.isArray(selectedBasesByGroup[group.id])
        ? new Set(selectedBasesByGroup[group.id])
        : new Set(group.bases);

      for (const base of group.bases) {
        const baseLabel = document.createElement('label');
        const baseInput = document.createElement('input');
        baseInput.type = 'checkbox';
        baseInput.dataset.equipmentBase = 'true';
        baseInput.dataset.equipmentGroupId = group.id;
        baseInput.value = base;
        baseInput.checked = selectedBases.has(base);
        baseLabel.appendChild(baseInput);
        baseLabel.appendChild(document.createTextNode(base));
        baseGrid.appendChild(baseLabel);
      }

      card.appendChild(baseGrid);
    }

    container.appendChild(card);
  }
}

function renderCurrencyTiers(tiers) {
  currencyTierList.innerHTML = '';
  tiers.forEach((tier, index) => {
    const row = document.createElement('article');
    row.className = 'tier-row';
    row.dataset.currencyTierIndex = String(index);
    appendTierHeader(row, tier.label || `Currency tier ${index + 1}`, 'currency', index);
    const grid = document.createElement('div');
    grid.className = 'editor-grid';
    appendLabeled(grid, 'Label', createTextInput(tier.label, { currencyTierIndex: index, tierField: 'label' }));
    appendLabeled(grid, 'Action', createSelect(tier.action || 'Show', SPECIAL_ACTION_OPTIONS, { currencyTierIndex: index, tierField: 'action' }));
    appendLabeled(grid, 'Tier', createSelect(tier.tier || 'baseline', TIER_OPTIONS, { currencyTierIndex: index, tierField: 'tier' }));
    appendLabeled(grid, 'Style', createStyleSelect(tier.style || 'currency', { currencyTierIndex: index, tierField: 'style' }));
    row.appendChild(grid);
    const bases = document.createElement('textarea');
    bases.dataset.currencyTierIndex = String(index);
    bases.dataset.tierField = 'bases';
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
    appendLabeled(editGrid, 'Style', createStyleSelect(tier.style || 'rare', { rareTierIndex: index, tierField: 'style' }));
    appendLabeled(editGrid, 'Tier', createSelect(tier.tier || 'baseline', TIER_OPTIONS, { rareTierIndex: index, tierField: 'tier' }));

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
  header.appendChild(button);
  row.appendChild(header);
}

function renderSpecialItems(profile) {
  const specialItems = profile.specialItems || {};
  const entries = specialItems.entries || [];
  specialItemsEnabledInput.checked = specialItems.enabled !== false;
  specialItemList.innerHTML = '';

  if (entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No special items yet. Add a base or item name above, then tune its conditions.';
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
    appendLabeled(editGrid, 'Style', createStyleSelect(entry.style || 'specialItems', { specialField: 'style' }));
    appendLabeled(editGrid, 'Tier', createSelect(entry.tier || 'high', TIER_OPTIONS, { specialField: 'tier' }));

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

function renderLootFilterState(state) {
  lootFilterRefreshToken += 1;
  lootFilterState = state;
  const profile = state.profile || {};
  renderProfileControls(state);
  filterOutputPathInput.value = state.outputPath || filterOutputPathInput.value;
  filterQuickActionInput.value = state.quickAction || filterQuickActionInput.value || 'Show';
  filterPreviewOutput.textContent = state.preview || 'No generated filter preview available.';
  renderCaptureDefaults(profile);
  renderStyleList(profile);
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

  for (const rule of rules) {
    const row = document.createElement('article');
    row.className = 'filter-rule-row';

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
    header.appendChild(removeButton);

    const meta = document.createElement('div');
    meta.className = 'filter-rule-row__meta';
    meta.textContent = `${rule.source || 'manual'} / ${new Date(rule.createdAt || Date.now()).toLocaleString()}`;

    const editGrid = document.createElement('div');
    editGrid.className = 'rule-edit-grid';
    const enabled = document.createElement('input');
    enabled.type = 'checkbox';
    enabled.checked = rule.enabled !== false;
    enabled.dataset.ruleIndex = String(rules.indexOf(rule));
    enabled.dataset.ruleField = 'enabled';
    appendLabeled(editGrid, 'Enabled', enabled);
    appendLabeled(editGrid, 'Label', createTextInput(rule.label, { ruleIndex: rules.indexOf(rule), ruleField: 'label' }));
    appendLabeled(editGrid, 'Action', createSelect(rule.action || 'Show', ['Show', 'Hide'], { ruleIndex: rules.indexOf(rule), ruleField: 'action' }));
    appendLabeled(editGrid, 'Style', createStyleSelect(rule.style || 'default', { ruleIndex: rules.indexOf(rule), ruleField: 'style' }));
    appendLabeled(editGrid, 'Tier', createSelect(rule.tier || '', ['', ...TIER_OPTIONS], { ruleIndex: rules.indexOf(rule), ruleField: 'tier' }));

    const conditions = document.createElement('div');
    conditions.className = 'filter-rule-row__conditions';
    for (const condition of rule.conditions || []) {
      const pill = document.createElement('span');
      pill.className = 'condition-pill';
      pill.textContent = formatCondition(condition);
      conditions.appendChild(pill);
    }

    row.appendChild(header);
    row.appendChild(meta);
    row.appendChild(editGrid);
    row.appendChild(conditions);
    filterRuleList.appendChild(row);
  }

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
  const defaults = {};
  for (const input of filterCaptureDefaults.querySelectorAll('[data-capture-default]')) {
    defaults[input.dataset.captureDefault] = input.checked;
  }
  return defaults;
}

function collectStyles() {
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
      return {
        id: lootFilterState?.profile?.currencyTiers?.[index]?.id || `currency-${Date.now()}-${index}`,
        label: get('label') || `Currency tier ${index + 1}`,
        action: get('action') || 'Show',
        bases: String(get('bases') || '').split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean),
        tier: get('tier') || 'baseline',
        style: get('style') || 'currency'
      };
    });
}

function collectRareTiers() {
  return [...rareTierList.querySelectorAll('[data-rare-tier-index]')]
    .filter((row) => row.classList.contains('tier-row'))
    .map((row, index) => {
      const existing = lootFilterState?.profile?.rareTiers?.[index] || {};
      const get = (field) => row.querySelector(`[data-tier-field="${field}"]`);
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
        tier: get('tier')?.value || 'baseline',
        style: get('style')?.value || 'rare',
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
    output[categoryId] = {
      enabled: definition.enabledInput.checked,
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
    style: get('style')?.value || existing.style || definition.defaultStyle,
    tier: get('tier')?.value || existing.tier || definition.defaultTier,
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
  const rules = structuredClone(lootFilterState?.profile?.userRules || []);
  for (const control of filterRuleList.querySelectorAll('[data-rule-index]')) {
    const index = Number(control.dataset.ruleIndex);
    const field = control.dataset.ruleField;
    if (!rules[index] || !field) continue;

    if (field === 'enabled') {
      rules[index].enabled = control.checked;
    } else if (field === 'tier') {
      rules[index].tier = control.value || undefined;
    } else {
      rules[index][field] = control.value;
    }
  }
  return rules;
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
  for (const groupInput of container.querySelectorAll(`[data-rare-equipment-field="${field}"]`)) {
    if (!groupInput.checked) {
      continue;
    }

    const card = groupInput.closest('[data-equipment-group-id]');
    const bases = [...(card?.querySelectorAll('[data-equipment-base="true"]') || [])]
      .filter((input) => input.checked)
      .map((input) => input.value);
    if (bases.length > 0 || card?.querySelector('[data-equipment-base="true"]')) {
      selections[groupInput.value] = bases;
    }
  }
  return selections;
}

function collectChanceBases() {
  return {
    enabled: chanceBasesEnabledInput.checked,
    bases: [...chanceBaseList.querySelectorAll('[data-chance-base]')]
      .map((entry) => entry.dataset.chanceBase)
      .filter(Boolean),
    style: lootFilterState?.profile?.chanceBases?.style || 'chance',
    tier: lootFilterState?.profile?.chanceBases?.tier || 'valuable'
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
          style: get('style')?.value || existing.style || 'misc',
          tier: get('tier')?.value || existing.tier || 'baseline',
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
      const fallback = DEFAULT_ECONOMY_TIERS[index] || DEFAULT_ECONOMY_TIERS[0];
      const get = (field) => row.querySelector(`[data-economy-tier-field="${field}"]`)?.value;
      const minChaos = Number(get('minChaos'));
      const minDivines = Number(get('minDivines'));
      return {
        id: fallback.id,
        label: get('label') || fallback.label,
        minChaos: Number.isFinite(minChaos) && minChaos > 0 ? minChaos : undefined,
        minDivines: Number.isFinite(minDivines) && minDivines > 0 ? minDivines : undefined,
        style: get('style') || fallback.style,
        tier: get('tier') || fallback.tier,
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

  return {
    ...existing,
    enabled: get('enabled')?.checked !== false,
    label: get('label')?.value?.trim() || existing.label || 'Special item',
    action: get('action')?.value || 'Show',
    style: get('style')?.value || 'specialItems',
    tier: get('tier')?.value || 'high',
    source: 'special-item',
    conditions
  };
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
    currencyTiers: collectCurrencyTiers(),
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

  if (diagnostics.lastCopiedTextPreview) {
    lines.push('Copied text:');
    lines.push(diagnostics.lastCopiedTextPreview);
  }

  if (diagnostics.events?.length) {
    lines.push('Recent events:');
    lines.push(JSON.stringify(diagnostics.events.slice(0, 12), null, 2));
  }

  return lines.length ? lines.join('\n\n') : 'No diagnostics captured yet.';
}

async function refreshDiagnostics() {
  const diagnostics = await window.poehelper.getDiagnostics();
  diagnosticsOutput.textContent = formatDiagnostics(diagnostics);
  setStatus(diagnosticsStatus, `Diagnostics refreshed with ${(diagnostics.events || []).length} events.`);
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
    setStatus(filterStatus, `Created ${state.profileName}. Rename it, then Save Workbench.`);
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
    setStatus(filterStatus, `Wrote ${result.outputPath} (${result.userRuleCount} captured rules).`);
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
  lootFilterState.profile.currencyTiers = [
    ...(lootFilterState.profile.currencyTiers || []),
    {
      id: `currency-${Date.now()}`,
      action: 'Show',
      label: 'New currency tier',
      bases: ['Chaos Orb'],
      style: 'currency',
      tier: 'baseline'
    }
  ];
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Currency tier added. Save Workbench to keep it.');
});

addCustomStyleButton.addEventListener('click', addCustomStyleFromInput);

customStyleNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addCustomStyleFromInput();
  }
});

addRareTierButton.addEventListener('click', () => {
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
  setStatus(filterStatus, 'Rare item rule added. Save Workbench to keep it.');
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
        id: `${categoryId}-${Date.now()}`
      }
    ]
  };
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, `${definition.label} rule added. Save Workbench to keep it.`);
}

refreshFilterPreviewButton.addEventListener('click', () => {
  runButton(refreshFilterPreviewButton, filterStatus, 'Refreshing...', () => refreshLootFilterState(true));
});

clearFilterRulesButton.addEventListener('click', () => {
  runButton(clearFilterRulesButton, filterStatus, 'Clearing...', async () => {
    const state = await window.poehelper.clearLootFilterRules();
    renderLootFilterState(state);
    setStatus(filterStatus, 'Captured loot-filter rules cleared.');
  });
});

for (const container of [rareArmorGroupList, rareShieldGroupList, rareWeaponGroupList, miscEquipmentGroupList]) {
  container.addEventListener('change', (event) => {
    if (!event.target?.dataset?.rareEquipmentField) {
      return;
    }

    event.target.closest('.equipment-group')?.classList.toggle('is-open', event.target.checked);
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
    setStatus(economyStatus, `Cached ${count} high-value economy items. Save or Write Filter when ready.`);
  });
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

  lootFilterState.profile.chanceBases = {
    ...(lootFilterState.profile.chanceBases || {}),
    bases: (lootFilterState.profile.chanceBases?.bases || [])
      .filter((entry) => normalizeBaseKey(entry) !== normalizeBaseKey(base))
  };
  renderChanceBases(lootFilterState.profile, lootFilterState.chanceBaseOptions);
  setStatus(chanceBaseStatus, `Removed ${base}. Save Workbench to keep this change.`);
});

specialItemList.addEventListener('click', (event) => {
  const index = Number(event.target?.dataset?.removeSpecialItemIndex);
  if (!Number.isFinite(index) || !lootFilterState?.profile) {
    return;
  }

  lootFilterState.profile.specialItems = {
    ...(lootFilterState.profile.specialItems || {}),
    entries: (lootFilterState.profile.specialItems?.entries || [])
      .filter((_, entryIndex) => entryIndex !== index)
  };
  renderSpecialItems(lootFilterState.profile);
  setStatus(specialItemStatus, 'Special item removed. Save Workbench to keep this change.');
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
    setStatus(definition.status, `${definition.label} rule removed. Save Workbench to keep this change.`);
  });
}

filterRuleList.addEventListener('click', (event) => {
  const ruleId = event.target?.dataset?.ruleId;
  if (!ruleId) {
    return;
  }

  runButton(event.target, filterStatus, 'Deleting...', async () => {
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
  lootFilterState.profile.currencyTiers = (lootFilterState.profile.currencyTiers || []).filter((_, entryIndex) => entryIndex !== index);
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Currency tier removed. Save Workbench to keep this change.');
});

rareTierList.addEventListener('click', (event) => {
  if (event.target?.dataset?.removeTierType !== 'rare') {
    return;
  }

  const index = Number(event.target.dataset.removeTierIndex);
  lootFilterState.profile.rareTiers = (lootFilterState.profile.rareTiers || []).filter((_, entryIndex) => entryIndex !== index);
  renderLootFilterState(lootFilterState);
  setStatus(filterStatus, 'Rare item rule removed. Save Workbench to keep this change.');
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
