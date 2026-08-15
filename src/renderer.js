const itemName = document.querySelector('#item-name');
const poeStatus = document.querySelector('#poe-status');
const rarity = document.querySelector('#rarity');
const itemClass = document.querySelector('#item-class');
const baseType = document.querySelector('#base-type');
const details = document.querySelector('#details');
const category = document.querySelector('#category');
const closeButton = document.querySelector('#close-button');
const refreshButton = document.querySelector('#refresh-button');
const lockButton = document.querySelector('#lock-button');
const priceButton = document.querySelector('#price-button');
const pricePanelLabel = document.querySelector('#price-panel-label');
const lookupSpinner = document.querySelector('#lookup-spinner');
const priceValue = document.querySelector('#price-value');
const priceMeta = document.querySelector('#price-meta');
const sparkline = document.querySelector('#sparkline');
const sparklineSvg = document.querySelector('#sparkline-svg');
const sparklineChange = document.querySelector('#sparkline-change');
const tradeButton = document.querySelector('#trade-button');
const copyQueryButton = document.querySelector('#copy-query-button');
const settingsButton = document.querySelector('#settings-button');
const listingPanel = document.querySelector('.listing-panel');
const queryPanel = document.querySelector('.query-panel');
const relatedPanel = document.querySelector('#related-panel');
const relatedTitle = document.querySelector('#related-title');
const relatedMeta = document.querySelector('#related-meta');
const relatedRequired = document.querySelector('#related-required');
const relatedList = document.querySelector('#related-list');
const relatedNotes = document.querySelector('#related-notes');
const modifierPanel = document.querySelector('#modifier-panel');
const modifierList = document.querySelector('#modifier-list');
const insightsPanel = document.querySelector('#insights-panel');
const mapWarnings = document.querySelector('#map-warnings');
const confidenceHints = document.querySelector('#confidence-hints');
const pseudoGroups = document.querySelector('#pseudo-groups');
const optionItemLevel = document.querySelector('#option-item-level');
const optionMapTier = document.querySelector('#option-map-tier');
const optionCorrupted = document.querySelector('#option-corrupted');
const optionIdentified = document.querySelector('#option-identified');
const optionValues = document.querySelector('#option-values');
const presetNameInput = document.querySelector('#preset-name-input');
const savePresetButton = document.querySelector('#save-preset-button');
const presetSelect = document.querySelector('#preset-select');
const applyPresetButton = document.querySelector('#apply-preset-button');
const presetPanel = document.querySelector('.preset-panel');
const listingTable = document.querySelector('#listing-table');
const listingCountLabel = document.querySelector('#listing-count-label');

let activeSettings = { league: 'Standard', listingCount: 20, presets: [] };
let activeItem;
let activeMode = 'price';
let activeLookupId = 0;
let listingSummaryShown = false;
let activeQueryOptions = createDefaultQueryOptionsState();

function createDefaultQueryOptionsState() {
  return {
    selectedModifierIds: [],
    includeItemLevel: false,
    includeMapTier: false,
    includeGemLevel: false,
    includeQuality: false,
    includeCorrupted: false,
    includeIdentified: false,
    includeMirrored: false,
    includeFractured: false,
    includeSynthesised: false,
    includeLinkedSockets: false,
    includeSockets: false,
    includeInfluence: false,
    useModifierValues: true
  };
}

function valueOrDash(value) {
  return value || '-';
}

function isCurrencyLookup(item = activeItem) {
  return item?.category === 'currency';
}

function resetLookupView({ mode, settings: nextSettings, message, clickThrough: nextClickThrough } = {}) {
  activeMode = mode || 'price';
  activeItem = undefined;
  activeSettings = nextSettings || activeSettings;
  activeQueryOptions = createDefaultQueryOptionsState();
  listingSummaryShown = false;

  itemName.textContent = message || 'Capturing hovered item...';
  rarity.textContent = '-';
  itemClass.textContent = '-';
  baseType.textContent = '-';
  details.textContent = '-';
  category.textContent = '-';
  lookupSpinner.hidden = false;
  pricePanelLabel.textContent = activeMode === 'related' ? 'Related Outcomes' : 'Lookup';
  priceValue.textContent = 'Checking...';
  priceMeta.textContent = `League: ${activeSettings.league || 'Standard'} - reading clipboard`;
  priceMeta.className = 'price-meta';
  listingCountLabel.textContent = `Top ${activeSettings.listingCount || 20}`;
  listingTable.innerHTML = '';
  clearRelatedPanel();
  renderSparkline(undefined);
  renderInsights(undefined, []);
  renderQueryOptions();
  updateItemSpecificPanels(undefined);
  setClickThroughLabel(Boolean(nextClickThrough));
  poeStatus.hidden = true;
}

function updateItemSpecificPanels(item) {
  const currency = isCurrencyLookup(item);
  const pending = !item;
  const related = activeMode === 'related';

  pricePanelLabel.textContent = pending
    ? related ? 'Related Outcomes' : 'Lookup'
    : currency
      ? 'poe.ninja Economy Price'
      : related
        ? 'Related Outcomes'
        : 'Instant Buyout Estimate';
  listingPanel.hidden = pending || currency || related;
  queryPanel.hidden = pending || currency || related;
  presetPanel.hidden = pending || currency || related;
  tradeButton.hidden = pending || currency || related;
  copyQueryButton.hidden = pending || currency || related;
  relatedPanel.hidden = pending || !related;

  if (pending || currency || related) {
    modifierPanel.hidden = true;
  }
}

function setStatus(poeWindow) {
  poeStatus.hidden = Boolean(poeWindow.detected);
  poeStatus.classList.toggle('status--warn', !poeWindow.detected);
  poeStatus.textContent = poeWindow.detected ? '' : 'No Path of Exile process/window detected. Showing copied text anyway.';
}

function isStalePayload(payload = {}) {
  return Boolean(payload.lookupId && payload.lookupId !== activeLookupId);
}

function setLookupPending(payload = {}) {
  activeLookupId = payload.lookupId || activeLookupId + 1;
  resetLookupView({
    mode: payload.mode,
    settings: payload.settings,
    message: payload.message,
    clickThrough: payload.clickThrough
  });
}

function setLookup(payload) {
  if (isStalePayload(payload)) {
    return;
  }

  activeLookupId = payload.lookupId || activeLookupId;
  const item = payload.item;
  const detailParts = [];

  if (item.itemLevel) detailParts.push(`ilvl ${item.itemLevel}`);
  if (item.mapTier) detailParts.push(`T${item.mapTier}`);
  if (item.corrupted) detailParts.push('corrupted');
  if (item.unidentified) detailParts.push('unidentified');
  if (item.synthesised) detailParts.push('synth');
  if (item.fractured) detailParts.push('fractured');

  activeItem = item;
  activeMode = payload.mode || 'price';
  activeQueryOptions = payload.queryOptions || activeQueryOptions;
  activeSettings = payload.settings || activeSettings;

  itemName.textContent = item.looksLikePoeItem ? item.name : 'Clipboard does not look like a PoE item';
  rarity.textContent = valueOrDash(item.rarity);
  itemClass.textContent = valueOrDash(item.itemClass);
  baseType.textContent = valueOrDash(item.baseType);
  details.textContent = detailParts.length > 0 ? detailParts.join(' / ') : `${item.lineCount} lines`;
  category.textContent = valueOrDash(item.category);

  updateItemSpecificPanels(item);
  renderPresets();
  renderQueryOptions();
  renderModifiers(item, activeQueryOptions);
  renderInsights(item, payload.confidenceHints || []);
  if (activeMode === 'related') {
    setRelatedPending();
  } else {
    setPricePending();
  }

  if (payload.captureWarning) {
    priceMeta.classList.add('price-meta--warn');
    priceMeta.textContent = payload.captureWarning;
  }

  setStatus(payload.poeWindow);
  setClickThroughLabel(payload.clickThrough);
}

function formatNumber(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '-';
  if (value >= 100) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

function setPricePending() {
  listingSummaryShown = false;
  lookupSpinner.hidden = false;
  priceValue.textContent = 'Checking...';
  priceMeta.textContent = isCurrencyLookup()
    ? `League: ${activeSettings.league || 'Standard'} - poe.ninja economy data`
    : `League: ${activeSettings.league || 'Standard'} - instant buyouts only`;
  priceMeta.className = 'price-meta';
  listingCountLabel.textContent = `Top ${activeSettings.listingCount || 20}`;
  listingTable.innerHTML = isCurrencyLookup()
    ? ''
    : '<div class="listing-empty">Loading instant buyouts...</div>';
  renderSparkline(undefined);
}

function setRelatedPending() {
  listingSummaryShown = false;
  lookupSpinner.hidden = false;
  pricePanelLabel.textContent = 'Related Outcomes';
  priceValue.textContent = 'Checking...';
  priceMeta.textContent = `League: ${activeSettings.league || 'Standard'} - checking related outcomes`;
  priceMeta.className = 'price-meta';
  clearRelatedPanel();
  relatedPanel.hidden = false;
  relatedMeta.textContent = 'Loading outcomes...';
  renderSparkline(undefined);
}

function setPriceResult(payload) {
  if (isStalePayload(payload)) {
    return;
  }

  const price = payload.price;
  lookupSpinner.hidden = true;
  renderInsights(activeItem, payload.confidenceHints || price.confidenceHints || []);

  if (price.status === 'priced') {
    const chaos = formatNumber(price.result.chaosValue);
    const divine = formatNumber(price.result.divineValue);
    if (priceValue.textContent === 'Checking...' || priceValue.textContent === 'No instant buyouts') {
      priceValue.textContent = divine !== '-' ? `${chaos} chaos / ${divine} divine` : `${chaos} chaos`;
    }
    if (!listingSummaryShown) {
      priceMeta.textContent = `poe.ninja reference: ${price.result.kind} - ${price.result.label}`;
    }
    if (price.result.confidence === 'low') priceMeta.classList.add('price-meta--warn');
    renderSparkline(price.result.sparkline);
    return;
  }

  if (priceValue.textContent === 'Checking...') {
    priceValue.textContent = price.status === 'error' ? 'Price unavailable' : 'No summary price';
  }
  priceMeta.className = price.status === 'error' ? 'price-meta price-meta--warn' : 'price-meta';
  priceMeta.textContent = price.message || 'No summary market price is available for this item.';
}

function renderSparkline(data) {
  sparkline.hidden = !data?.data?.length;
  sparklineSvg.innerHTML = '';
  sparklineChange.textContent = '';

  if (!data?.data?.length) {
    return;
  }

  const values = data.data;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(0.0001, max - min);
  const width = 220;
  const height = 44;
  const points = values.map((value, index) => {
    const x = values.length === 1 ? 0 : (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', points);
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', data.totalChange >= 0 ? '#8fd18f' : '#e08b82');
  polyline.setAttribute('stroke-width', '2');
  polyline.setAttribute('stroke-linecap', 'round');
  polyline.setAttribute('stroke-linejoin', 'round');
  sparklineSvg.appendChild(polyline);

  if (typeof data.totalChange === 'number') {
    sparklineChange.textContent = `${data.totalChange >= 0 ? '+' : ''}${data.totalChange}%`;
    sparklineChange.className = data.totalChange >= 0
      ? 'sparkline__change sparkline__change--up'
      : 'sparkline__change sparkline__change--down';
  }
}

function setListingResult(payload) {
  if (isStalePayload(payload)) {
    return;
  }

  if (isCurrencyLookup()) {
    return;
  }

  const result = payload.listings;
  listingTable.innerHTML = '';
  listingCountLabel.textContent = `Top ${activeSettings.listingCount || 20}`;

  if (!result || result.status !== 'ready') {
    priceValue.textContent = 'No instant buyouts';
    priceMeta.className = 'price-meta price-meta--warn';
    priceMeta.textContent = result?.message || 'Trade listings are unavailable.';
    listingTable.innerHTML = '<div class="listing-empty">No instant-buyout listings available.</div>';
    return;
  }

  if (!result.listings || result.listings.length === 0) {
    priceValue.textContent = 'No instant buyouts';
    priceMeta.className = 'price-meta price-meta--warn';
    priceMeta.textContent = 'No priced instant-buyout listings found in the fetched trade results.';
    listingTable.innerHTML = '<div class="listing-empty">No instant-buyout listings in fetched results.</div>';
    return;
  }

  if (result.summary) {
    listingSummaryShown = true;
    priceValue.textContent = `${formatNumber(result.summary.median)} ${result.summary.currency}`;
    priceMeta.className = result.summary.confidence === 'low' ? 'price-meta price-meta--warn' : 'price-meta';
    const spread = result.summary.spreadRatio ? ` / spread ${result.summary.spreadRatio}x` : '';
    const warning = result.summary.warnings?.length ? ` - ${result.summary.warnings.join(' ')}` : '';
    priceMeta.textContent = `${result.listings.length} instant buyouts - low ${formatNumber(result.summary.min)} / median ${formatNumber(result.summary.median)} / high ${formatNumber(result.summary.max)} ${result.summary.currency}${spread}${warning}`;
  }

  for (const listing of result.listings) {
    const row = document.createElement('div');
    row.className = 'listing-row';

    const seller = document.createElement('div');
    seller.className = 'listing-row__seller';
    seller.textContent = listing.seller;

    const price = document.createElement('div');
    price.className = 'listing-row__price';
    price.textContent = `${formatNumber(listing.amount)} ${listing.currency}`;

    const age = document.createElement('div');
    age.className = 'listing-row__age';
    age.textContent = listing.age || '';

    row.appendChild(seller);
    row.appendChild(price);
    row.appendChild(age);
    listingTable.appendChild(row);
  }
}

function clearRelatedPanel() {
  relatedTitle.textContent = 'Related Outcomes';
  relatedMeta.textContent = '';
  relatedRequired.innerHTML = '';
  relatedList.innerHTML = '';
  relatedNotes.innerHTML = '';
  relatedPanel.hidden = true;
}

function getRelatedPanelLabel(result) {
  if (result?.kind === 'boss-drops') {
    return 'Boss Drops';
  }

  if (result?.kind === 'chance') {
    return 'Chance Candidates';
  }

  return 'Related Outcomes';
}

function setRelatedOutcomesResult(payload) {
  if (isStalePayload(payload)) {
    return;
  }

  const result = payload.related;
  lookupSpinner.hidden = true;

  relatedRequired.innerHTML = '';
  relatedList.innerHTML = '';
  relatedNotes.innerHTML = '';

  if (!result || result.status !== 'ready') {
    lookupSpinner.hidden = true;
    priceValue.textContent = 'No outcomes';
    priceMeta.className = 'price-meta price-meta--warn';
    priceMeta.textContent = result?.message || 'Related outcomes are unavailable.';
    relatedPanel.hidden = true;
    return;
  }

  lookupSpinner.hidden = true;
  relatedPanel.hidden = false;
  pricePanelLabel.textContent = getRelatedPanelLabel(result);
  relatedTitle.textContent = result.title || getRelatedPanelLabel(result);
  relatedMeta.textContent = result.summary || '';
  priceValue.textContent = result.kind === 'boss-drops'
    ? (result.title || 'Boss Drops')
    : result.kind === 'chance'
      ? (result.title || 'Chance Candidates').replace(/^Chance candidates for /i, '')
      : (result.summary || `${(result.entries || []).length} outcomes`);
  priceMeta.className = 'price-meta';
  priceMeta.textContent = result.summary || result.meta || `${(result.entries || []).length} outcomes`;

  renderOutcomeList(relatedRequired, result.required || [], 'Required');
  renderOutcomeList(relatedList, result.entries || [], result.kind === 'boss-drops' ? 'Drops' : 'Candidates');

  renderMessageList(
    relatedNotes,
    (result.notes || []).map((note) => ({ severity: 'info', text: note })),
    (note) => note.text
  );
}

function renderOutcomeList(container, entries, label) {
  if (!entries.length) {
    return;
  }

  const heading = document.createElement('div');
  heading.className = 'section-title';
  heading.textContent = label;
  container.appendChild(heading);

  for (const entry of entries) {
    const row = document.createElement('div');
    row.className = 'outcome-row';

    const name = document.createElement('div');
    name.className = 'outcome-row__name';
    name.textContent = entry.variant ? `${entry.name} (${entry.variant})` : entry.name;

    const price = document.createElement('div');
    price.className = 'outcome-row__price';
    price.textContent = formatOutcomePrice(entry);

    row.appendChild(name);
    row.appendChild(price);

    const noteParts = [entry.baseType, entry.type, entry.note, entry.confidence === 'low' ? 'low confidence' : undefined]
      .filter(Boolean);
    if (noteParts.length > 0) {
      const note = document.createElement('div');
      note.className = 'outcome-row__note';
      note.textContent = noteParts.join(' - ');
      row.appendChild(note);
    }

    container.appendChild(row);
  }
}

function formatOutcomePrice(entry) {
  if (typeof entry.divineValue === 'number' && Number.isFinite(entry.divineValue) && entry.divineValue >= 0.01) {
    return `${formatNumber(entry.divineValue)} div`;
  }

  if (typeof entry.chaosValue === 'number' && Number.isFinite(entry.chaosValue)) {
    return `${formatNumber(entry.chaosValue)} c`;
  }

  return '-';
}

function setClickThroughLabel(enabled) {
  lockButton.textContent = `Click-through: ${enabled ? 'on' : 'off'}`;
  lockButton.title = enabled
    ? 'Mouse clicks pass through the overlay. Press Ctrl+Alt+T or use the tray menu to turn this off.'
    : 'Mouse clicks interact with the overlay.';
}

function renderQueryOptions() {
  optionItemLevel.checked = Boolean(activeQueryOptions.includeItemLevel);
  optionMapTier.checked = Boolean(activeQueryOptions.includeMapTier);
  optionCorrupted.checked = Boolean(activeQueryOptions.includeCorrupted);
  optionIdentified.checked = Boolean(activeQueryOptions.includeIdentified);
  optionValues.checked = Boolean(activeQueryOptions.useModifierValues);
}

function getSeverityClass(severity) {
  return severity === 'danger' ? 'message--danger' : severity === 'warn' ? 'message--warn' : 'message--info';
}

function renderMessageList(container, messages, formatter) {
  container.innerHTML = '';
  for (const message of messages) {
    const entry = document.createElement('div');
    entry.className = `message ${getSeverityClass(message.severity)}`;
    entry.textContent = formatter(message);
    container.appendChild(entry);
  }
}

function renderInsights(item, hints = []) {
  if (!item) {
    insightsPanel.hidden = true;
    return;
  }

  renderMessageList(mapWarnings, item.mapWarnings || [], (warning) => `${warning.label}: ${warning.text}`);
  renderMessageList(confidenceHints, hints, (hint) => hint.text);

  pseudoGroups.innerHTML = '';
  for (const group of item.pseudoGroups || []) {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = `${group.label}: ${group.value}`;
    pseudoGroups.appendChild(pill);
  }

  insightsPanel.hidden = (item.mapWarnings || []).length === 0 && hints.length === 0 && (item.pseudoGroups || []).length === 0;
}

function renderModifiers(item, queryOptions) {
  modifierList.innerHTML = '';
  if (isCurrencyLookup(item)) {
    modifierPanel.hidden = true;
    return;
  }

  const modifiers = item?.modifiers || [];
  modifierPanel.hidden = modifiers.length === 0;

  for (const modifier of modifiers) {
    const row = document.createElement('label');
    row.className = 'modifier-row';
    if (!modifier.tradeStatId) row.classList.add('modifier-row--disabled');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.modifierId = modifier.id;
    checkbox.checked = (queryOptions.selectedModifierIds || []).includes(modifier.id);
    checkbox.disabled = !modifier.tradeStatId;

    const text = document.createElement('span');
    text.className = 'modifier-row__text';
    text.textContent = modifier.text;

    const meta = document.createElement('span');
    meta.className = 'modifier-row__meta';
    meta.textContent = modifier.tradeStatId
      ? `${modifier.tradeStatType || modifier.type} ${modifier.tradeStatScore || ''}`.trim()
      : 'no trade stat match';

    row.appendChild(checkbox);
    row.appendChild(text);
    row.appendChild(meta);
    modifierList.appendChild(row);
  }
}

function renderPresets() {
  presetSelect.innerHTML = '';
  const presets = activeSettings.presets || [];

  if (presets.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No saved presets';
    presetSelect.appendChild(option);
    return;
  }

  for (const preset of presets) {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = `${preset.name} (${preset.category})`;
    presetSelect.appendChild(option);
  }
}

async function refreshListings() {
  if (isCurrencyLookup()) {
    return;
  }

  const listings = await window.poehelper.lookupListings();
  setListingResult({ listings });
}

async function updateQueryOptions(patch) {
  const result = await window.poehelper.setQueryOptions({ ...activeQueryOptions, ...patch });
  if (result.status === 'updated') {
    activeQueryOptions = result.queryOptions;
    renderQueryOptions();
    renderModifiers(activeItem, activeQueryOptions);
    refreshListings();
  }
  return result;
}

window.poehelper.onLookupPending(setLookupPending);
window.poehelper.onLookupResult(setLookup);
window.poehelper.onClickThroughChanged(setClickThroughLabel);
window.poehelper.onPriceResult(setPriceResult);
window.poehelper.onListingResult(setListingResult);
window.poehelper.onRelatedOutcomesResult(setRelatedOutcomesResult);
window.poehelper.onSettingsUpdated((payload) => {
  activeSettings = payload.settings || activeSettings;
  listingCountLabel.textContent = `Top ${activeSettings.listingCount || 20}`;
  renderPresets();
});

window.poehelper.getSettings().then((settings) => {
  activeSettings = settings || activeSettings;
  listingCountLabel.textContent = `Top ${activeSettings.listingCount || 20}`;
  renderPresets();
});

closeButton.addEventListener('click', () => window.poehelper.hideOverlay());
refreshButton.addEventListener('click', () => window.poehelper.refreshLookup());
settingsButton.addEventListener('click', () => window.poehelper.openSettings());

lockButton.addEventListener('click', async () => {
  const enabled = await window.poehelper.toggleClickThrough();
  setClickThroughLabel(enabled);
});

priceButton.addEventListener('click', async () => {
  if (activeMode === 'related') {
    setRelatedPending();
    const related = await window.poehelper.lookupRelatedOutcomes();
    setRelatedOutcomesResult({ related });
    return;
  }

  setPricePending();
  if (isCurrencyLookup()) {
    const price = await window.poehelper.lookupPrice();
    setPriceResult({ price });
    return;
  }

  const [price, listings] = await Promise.all([
    window.poehelper.lookupPrice(),
    window.poehelper.lookupListings()
  ]);
  setPriceResult({ price });
  setListingResult({ listings });
});

tradeButton.addEventListener('click', async () => {
  tradeButton.disabled = true;
  tradeButton.textContent = 'Opening...';
  const result = await window.poehelper.openTradeSearch();
  tradeButton.disabled = false;
  tradeButton.textContent = 'Open Trade';

  if (result.status !== 'ready') {
    priceMeta.classList.add('price-meta--warn');
    priceMeta.textContent = result.message || `Trade search status: ${result.status}`;
  }
});

copyQueryButton.addEventListener('click', async () => {
  const result = await window.poehelper.copyTradeQuery();
  priceMeta.classList.toggle('price-meta--warn', result.status !== 'copied');
  priceMeta.textContent = result.status === 'copied'
    ? 'Trade query JSON copied to clipboard.'
    : result.message || `Copy status: ${result.status}`;
});

modifierList.addEventListener('change', async (event) => {
  const modifierId = event.target?.dataset?.modifierId;
  if (!modifierId) return;

  const selected = new Set(activeQueryOptions.selectedModifierIds || []);
  if (event.target.checked) selected.add(modifierId);
  else selected.delete(modifierId);

  await updateQueryOptions({ selectedModifierIds: [...selected] });
});

optionItemLevel.addEventListener('change', () => updateQueryOptions({ includeItemLevel: optionItemLevel.checked }));
optionMapTier.addEventListener('change', () => updateQueryOptions({ includeMapTier: optionMapTier.checked }));
optionCorrupted.addEventListener('change', () => updateQueryOptions({ includeCorrupted: optionCorrupted.checked }));
optionIdentified.addEventListener('change', () => updateQueryOptions({ includeIdentified: optionIdentified.checked }));
optionValues.addEventListener('change', () => updateQueryOptions({ useModifierValues: optionValues.checked }));

savePresetButton.addEventListener('click', async () => {
  const result = await window.poehelper.saveSearchPreset(presetNameInput.value);
  if (result.status === 'saved') {
    activeSettings = result.settings;
    presetNameInput.value = '';
    renderPresets();
    priceMeta.classList.remove('price-meta--warn');
    priceMeta.textContent = `Saved preset: ${result.preset.name}`;
  } else {
    priceMeta.classList.add('price-meta--warn');
    priceMeta.textContent = result.message || `Preset status: ${result.status}`;
  }
});

applyPresetButton.addEventListener('click', async () => {
  if (!presetSelect.value) return;

  const result = await window.poehelper.applySearchPreset(presetSelect.value);
  if (result.status === 'applied') {
    activeQueryOptions = result.queryOptions;
    renderQueryOptions();
    renderModifiers(activeItem, activeQueryOptions);
    priceMeta.classList.remove('price-meta--warn');
    priceMeta.textContent = `Applied preset: ${result.preset.name}`;
    refreshListings();
  } else {
    priceMeta.classList.add('price-meta--warn');
    priceMeta.textContent = result.message || `Preset status: ${result.status}`;
  }
});
