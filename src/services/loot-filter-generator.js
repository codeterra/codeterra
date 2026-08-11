const {
  EQUIPMENT_MISC_VISIBILITY_GROUPS,
  RARE_ARMOR_GROUPS,
  RARE_SHIELD_GROUPS,
  RARE_WEAPON_GROUPS,
  normalizeLootFilterProfile
} = require('../domain/loot-filter');

const RARITY_VISIBILITY_EQUIPMENT_CLASSES = [
  'Body Armours',
  'Boots',
  'Gloves',
  'Helmets',
  'Shields',
  ...new Set(RARE_WEAPON_GROUPS.flatMap((group) => group.classes || [])),
  ...new Set(
    EQUIPMENT_MISC_VISIBILITY_GROUPS
      .filter((group) => group.id !== 'jewels')
      .flatMap((group) => group.classes || [])
  )
];

function generateLootFilter(profileLike) {
  const profile = normalizeLootFilterProfile(profileLike);
  const lines = [
    '# POEHelper generated loot filter',
    `# Profile: ${profile.name}`,
    `# Profile Version: ${profile.profileVersion}`,
    `# Generated: ${new Date().toISOString()}`,
    '# Default posture: show all items unless an enabled Hide rule matches first.',
    ''
  ];

  renderSpecialItemFilters(lines, profile);

  lines.push('# Personal captured-item rules');
  for (const rule of profile.userRules.filter((entry) => entry.enabled)) {
    lines.push(...renderRule(rule, profile));
    lines.push('');
  }

  renderEconomyHighlightFilters(lines, profile);
  renderCategoryRuleFilters(lines, profile);

  lines.push('# Currency tiers');
  for (const tier of profile.currencyTiers || []) {
    lines.push(...renderRule({
      action: tier.action || 'Show',
      label: tier.label,
      style: tier.style || 'currency',
      tier: tier.tier,
      conditions: [
        { key: 'Class', value: 'Stackable Currency' },
        { key: 'BaseType', value: tier.bases || [] }
      ]
    }, profile));
    lines.push('');
  }

  lines.push(...renderRule({
    action: 'Show',
    label: 'Currency baseline',
    style: 'currency',
    tier: 'baseline',
    conditions: [{ key: 'Class', value: 'Stackable Currency' }]
  }, profile));
  lines.push('');

  renderChanceBaseFilters(lines, profile);
  renderMiscRuleFilters(lines, profile);
  renderRareItemRuleFilters(lines, profile, 'specific');
  renderRarityVisibilityFilters(lines, profile);
  renderRareEquipmentFilters(lines, profile);
  renderRareItemRuleFilters(lines, profile, 'baseline');
  if (!isCategoryEnabled(profile, 'jewels')) {
    renderJewelRarityFilters(lines, profile);
  }

  lines.push('# Family baseline rules');
  if (!isCategoryEnabled(profile, 'uniques')) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Unique items',
      style: 'unique',
      conditions: [{ key: 'Rarity', value: 'Unique' }]
    }, profile));
    lines.push('');
  }

  if (!isCategoryEnabled(profile, 'maps')) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Maps',
      style: 'maps',
      conditions: [{ key: 'Class', value: 'Maps' }]
    }, profile));
    lines.push('');
  }

  if (!isCategoryEnabled(profile, 'fragments')) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Map fragments and invitations',
      style: 'fragments',
      conditions: [{ key: 'Class', value: ['Map Fragments', 'Misc Map Items'] }]
    }, profile));
    lines.push('');
  }

  if (!isCategoryEnabled(profile, 'gems')) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Gems',
      style: 'gems',
      conditions: [{ key: 'Class', value: ['Skill Gems', 'Support Gems'] }]
    }, profile));
    lines.push('');
  }

  if (!isCategoryEnabled(profile, 'divinationCards')) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Divination cards',
      style: 'divinationCards',
      conditions: [{ key: 'Class', value: 'Divination Cards' }]
    }, profile));
    lines.push('');
  }

  if (!isCategoryEnabled(profile, 'scarabs')) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Scarabs',
      style: 'scarabs',
      conditions: [{ key: 'BaseType', value: 'Scarab' }]
    }, profile));
    lines.push('');
  }

  lines.push('# Fresh-slate default: show everything not matched above');
  lines.push(...renderRule({
    action: 'Show',
    label: 'Default show all',
    style: 'default',
    conditions: []
  }, profile));
  lines.push('');

  return `${lines.join('\n')}\n`;
}

function renderRareItemRuleFilters(lines, profile, placement = 'specific') {
  const entries = (profile.rareTiers || [])
    .filter((rule) => rule.enabled !== false && rule.conditions?.length)
    .filter((rule) => isBaselineRareRule(rule) === (placement === 'baseline'));
  if (entries.length === 0) {
    return;
  }

  lines.push(placement === 'baseline' ? '# Rare baseline rules' : '# Rare item rules');
  for (const rule of entries) {
    lines.push(...renderRule({
      action: rule.action || 'Show',
      label: rule.label,
      style: rule.style || 'rare',
      tier: rule.tier,
      conditions: rule.conditions
    }, profile));
    lines.push('');
  }
}

function isBaselineRareRule(rule) {
  const conditions = rule.conditions || [];
  return conditions.length === 1
    && conditions[0].key === 'Rarity'
    && conditions[0].value === 'Rare'
    && (rule.action || 'Show') === 'Show';
}

function isCategoryEnabled(profile, categoryId) {
  return profile.categoryRules?.[categoryId]?.enabled !== false;
}

function renderCategoryRuleFilters(lines, profile) {
  const categoryRules = profile.categoryRules || {};
  const entries = Object.entries(categoryRules)
    .filter(([, category]) => category?.enabled !== false)
    .flatMap(([categoryId, category]) =>
      (category.rules || [])
        .filter((rule) => rule.enabled !== false && rule.conditions?.length)
        .map((rule) => ({ categoryId, rule }))
    );

  if (entries.length === 0) {
    return;
  }

  lines.push('# Category rules');
  for (const { categoryId, rule } of entries) {
    lines.push(...renderRule({
      ...rule,
      label: rule.label || `${categoryId} rule`
    }, profile));
    lines.push('');
  }
}

function renderSpecialItemFilters(lines, profile) {
  const specialItems = profile.specialItems;
  if (!specialItems?.enabled || !specialItems.entries?.length) {
    return;
  }

  lines.push('# Hand-picked special items');
  for (const entry of specialItems.entries.filter((rule) => rule.enabled !== false && rule.conditions?.length)) {
    lines.push(...renderRule(entry, profile));
    lines.push('');
  }
}

function renderEconomyHighlightFilters(lines, profile) {
  const economy = profile.economyHighlights;
  if (!economy?.enabled || !economy.entries?.length) {
    return;
  }

  lines.push('# Economy high-value items');
  if (economy.refreshedAt) {
    lines.push(`# Source: ${economy.source || 'economy'} / ${economy.league || 'unknown league'} / ${economy.refreshedAt}`);
  }

  for (const tier of getEconomyBucketOrder(economy)) {
    const entries = economy.entries.filter((rule) =>
      rule.enabled !== false && rule.conditions?.length && getEconomyEntryTierId(rule) === tier.id
    );
    if (entries.length === 0) {
      continue;
    }

    lines.push(`# Economy ${tier.label}`);
    for (const entry of entries) {
      lines.push(...renderRule({
        ...entry,
        style: entry.style || economy.style || 'highValue'
      }, profile));
      lines.push('');
    }
  }
}

function getEconomyBucketOrder(economy) {
  const tiers = Array.isArray(economy.tiers) && economy.tiers.length
    ? economy.tiers
    : [];
  return [...tiers].reverse();
}

function getEconomyEntryTierId(entry) {
  if (entry.economyTierId) {
    return entry.economyTierId;
  }

  const match = String(entry.id || '').match(/^economy-([^-]+-[^-]+)-/);
  return match?.[1];
}

function renderJewelRarityFilters(lines, profile) {
  const jewelStyles = [
    ['Normal', 'jewelNormal'],
    ['Magic', 'jewelMagic'],
    ['Rare', 'jewelRare'],
    ['Unique', 'jewelUnique']
  ];

  lines.push('# Jewels by rarity');
  for (const [rarity, style] of jewelStyles) {
    lines.push(...renderRule({
      action: 'Show',
      label: `${rarity} jewels`,
      style,
      conditions: [
        { key: 'Class', value: 'Jewels' },
        { key: 'Rarity', value: rarity }
      ]
    }, profile));
    lines.push('');
  }
}

function renderMiscRuleFilters(lines, profile) {
  const miscRules = profile.miscRules;
  if (!miscRules?.enabled || !miscRules.entries?.length) {
    return;
  }

  const entries = miscRules.entries.filter((rule) => rule.enabled !== false && rule.conditions?.length);
  if (entries.length === 0) {
    return;
  }

  lines.push('# Misc rules');
  for (const entry of entries) {
    lines.push(...renderRule(entry, profile));
    lines.push('');
  }
}

function renderRarityVisibilityFilters(lines, profile) {
  const visibility = profile.rarityVisibility || {};
  const hiddenRarities = [];
  if (visibility.normal === false) hiddenRarities.push('Normal');
  if (visibility.magic === false) hiddenRarities.push('Magic');

  if (hiddenRarities.length === 0) {
    return;
  }

  lines.push('# Base rarity visibility');
  for (const rarity of hiddenRarities) {
    for (const chunk of chunkValues(RARITY_VISIBILITY_EQUIPMENT_CLASSES, 12)) {
      lines.push(...renderRule({
        action: 'Hide',
        label: `Disabled ${rarity.toLowerCase()} equipment`,
        style: 'default',
        conditions: [
          { key: 'Rarity', value: rarity },
          { key: 'Class', value: chunk }
        ]
      }, profile));
      lines.push('');
    }
  }
}

function renderChanceBaseFilters(lines, profile) {
  const chanceBases = profile.chanceBases;
  if (!chanceBases?.enabled || !chanceBases.bases?.length) {
    return;
  }

  lines.push('# Chance bases');

  for (const chunk of chunkValues(chanceBases.bases, 18)) {
    lines.push(...renderRule({
      action: 'Show',
      label: 'Selected chance bases',
      style: chanceBases.style || 'chance',
      tier: chanceBases.tier || 'valuable',
      conditions: [
        { key: 'Rarity', value: 'Normal' },
        { key: 'Corrupted', value: false },
        { key: 'BaseType', value: chunk }
      ]
    }, profile));
    lines.push('');
  }
}

function renderRareEquipmentFilters(lines, profile) {
  if (!profile.rareEquipment?.enabled) {
    return;
  }

  const selectedArmor = new Set(profile.rareEquipment.armorGroups || []);
  const selectedShields = new Set(profile.rareEquipment.shieldGroups || []);
  const selectedWeapons = new Set(profile.rareEquipment.weaponGroups || []);
  const selectedMisc = new Set(profile.rareEquipment.miscGroups || []);
  const baseSelections = profile.rareEquipment.baseSelections || {};
  const disabledArmorBases = getDisabledBases(RARE_ARMOR_GROUPS, selectedArmor, baseSelections.armor);
  const disabledShieldBases = getDisabledBases(RARE_SHIELD_GROUPS, selectedShields, baseSelections.shields);
  const disabledWeaponBases = getDisabledBases(
    RARE_WEAPON_GROUPS,
    selectedWeapons,
    baseSelections.weapons
  );
  const disabledMiscBases = getDisabledBases(
    EQUIPMENT_MISC_VISIBILITY_GROUPS,
    selectedMisc,
    baseSelections.misc
  );
  const disabledWeaponClasses = RARE_WEAPON_GROUPS
    .filter((group) => !selectedWeapons.has(group.id))
    .flatMap((group) => group.classes || []);
  const disabledMiscClasses = EQUIPMENT_MISC_VISIBILITY_GROUPS
    .filter((group) => !selectedMisc.has(group.id))
    .flatMap((group) => group.classes || []);

  lines.push('# Equipment narrowing for normal, magic, and rare bases');

  for (const chunk of chunkValues(disabledArmorBases, 18)) {
    renderNonUniqueHide(lines, profile, 'Disabled armour bases', { key: 'BaseType', value: chunk });
  }

  for (const chunk of chunkValues(disabledShieldBases, 18)) {
    renderNonUniqueHide(lines, profile, 'Disabled shield bases', { key: 'BaseType', value: chunk });
  }

  for (const chunk of chunkValues(disabledWeaponBases, 18)) {
    renderNonUniqueHide(lines, profile, 'Disabled weapon bases', { key: 'BaseType', value: chunk });
  }

  for (const chunk of chunkValues(disabledMiscBases, 18)) {
    renderNonUniqueHide(lines, profile, 'Disabled equipment bases', { key: 'BaseType', value: chunk });
  }

  for (const chunk of chunkValues(disabledWeaponClasses, 12)) {
    renderNonUniqueHide(lines, profile, 'Disabled weapon classes', { key: 'Class', value: chunk });
  }

  for (const chunk of chunkValues(disabledMiscClasses, 12)) {
    renderNonUniqueHide(lines, profile, 'Disabled equipment classes', { key: 'Class', value: chunk });
  }
}

function getDisabledBases(groups, selectedGroups, selectionMap = {}) {
  const allBases = new Set(groups.flatMap((group) => group.bases || []));
  const allowedBases = new Set();

  for (const group of groups) {
    if (!selectedGroups.has(group.id)) {
      continue;
    }

    const groupBases = group.bases || [];
    const selectedBases = Array.isArray(selectionMap[group.id])
      ? selectionMap[group.id]
      : groupBases;
    const available = new Set(groupBases);

    for (const base of selectedBases) {
      if (available.has(base)) {
        allowedBases.add(base);
      }
    }
  }

  return [...allBases].filter((base) => !allowedBases.has(base));
}

function renderNonUniqueHide(lines, profile, label, condition) {
  for (const rarity of ['Normal', 'Magic', 'Rare']) {
    lines.push(...renderRule({
      action: 'Hide',
      label: `${label} (${rarity})`,
      style: 'default',
      conditions: [
        { key: 'Rarity', value: rarity },
        condition
      ]
    }, profile));
    lines.push('');
  }
}

function chunkValues(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

function renderRule(rule, profile) {
  const lines = [
    `# ${rule.label || 'POEHelper rule'}`,
    rule.action === 'Hide' ? 'Hide' : 'Show'
  ];

  for (const condition of rule.conditions || []) {
    lines.push(`    ${renderCondition(condition)}`);
  }

  for (const action of renderStyleActions(getEffectiveStyle(profile, rule.style, rule.tier))) {
    lines.push(`    ${action}`);
  }

  return lines;
}

function getEffectiveStyle(profile, styleName, tier) {
  const style = profile.styles?.[styleName] || profile.styles?.default || {};
  const tierBorder = tier && style.tierBorders?.[tier] ? style.tierBorders[tier] : undefined;
  const soundTier = tier || 'baseline';
  const tierSound = style.tierSounds && Object.prototype.hasOwnProperty.call(style.tierSounds, soundTier)
    ? style.tierSounds[soundTier]
    : undefined;
  return {
    ...style,
    borderColor: tierBorder || style.borderColor,
    customAlertSound: tierSound === undefined ? style.customAlertSound : tierSound
  };
}

function renderStyleActions(style) {
  const actions = [];
  if (style.textColor) actions.push(`SetTextColor ${renderColor(style.textColor)}`);
  if (style.backgroundColor) actions.push(`SetBackgroundColor ${renderColor(style.backgroundColor)}`);
  if (style.borderColor) actions.push(`SetBorderColor ${renderColor(style.borderColor)}`);
  if (style.fontSize) actions.push(`SetFontSize ${Math.max(1, Math.min(45, Number(style.fontSize) || 32))}`);
  if (style.alertSound?.id) actions.push(`PlayAlertSound ${style.alertSound.id} ${style.alertSound.volume || 80}`);
  if (style.customAlertSound?.file) {
    actions.push(`CustomAlertSound "${escapeFilterString(style.customAlertSound.file)}" ${style.customAlertSound.volume || 100}`);
    actions.push('DisableDropSoundIfAlertSound');
  }
  if (style.minimapIcon) {
    actions.push(`MinimapIcon ${style.minimapIcon.size ?? 1} ${style.minimapIcon.color || 'White'} ${style.minimapIcon.shape || 'Circle'}`);
  }
  if (style.beam) {
    actions.push(`PlayEffect ${style.beam.color || 'White'}${style.beam.temporary ? ' Temp' : ''}`);
  }
  return actions;
}

function escapeFilterString(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function renderCondition(condition) {
  const operator = condition.operator ? ` ${condition.operator}` : '';
  if (Array.isArray(condition.value)) {
    return `${condition.key}${operator} ${condition.value.map(renderValue).join(' ')}`;
  }

  return `${condition.key}${operator} ${renderValue(condition.value)}`;
}

function renderValue(value) {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  const text = String(value);
  return /^[A-Za-z0-9_+-]+$/.test(text) ? text : `"${text.replace(/"/g, '\\"')}"`;
}

function renderColor(color) {
  const values = Array.isArray(color) ? color : [];
  return values
    .slice(0, 4)
    .map((value, index) => {
      const fallback = index === 3 ? 255 : 0;
      return Math.max(0, Math.min(255, Math.round(Number(value) || fallback)));
    })
    .join(' ');
}

module.exports = {
  generateLootFilter,
  renderCondition,
  renderStyleActions
};
