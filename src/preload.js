const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('poehelper', {
  onLookupPending(callback) {
    ipcRenderer.on('lookup-pending', (_event, payload) => callback(payload));
  },
  onLookupResult(callback) {
    ipcRenderer.on('lookup-result', (_event, payload) => callback(payload));
  },
  onClickThroughChanged(callback) {
    ipcRenderer.on('click-through-changed', (_event, enabled) => callback(enabled));
  },
  onPriceResult(callback) {
    ipcRenderer.on('price-result', (_event, payload) => callback(payload));
  },
  onListingResult(callback) {
    ipcRenderer.on('listing-result', (_event, payload) => callback(payload));
  },
  onRelatedOutcomesResult(callback) {
    ipcRenderer.on('related-outcomes-result', (_event, payload) => callback(payload));
  },
  onSettingsUpdated(callback) {
    ipcRenderer.on('settings-updated', (_event, payload) => callback(payload));
  },
  onUpdateStatus(callback) {
    ipcRenderer.on('update-status', (_event, payload) => callback(payload));
  },
  hideOverlay() {
    return ipcRenderer.invoke('hide-overlay');
  },
  toggleClickThrough() {
    return ipcRenderer.invoke('toggle-click-through');
  },
  refreshLookup() {
    return ipcRenderer.invoke('refresh-lookup');
  },
  captureHighlightedItem() {
    return ipcRenderer.invoke('capture-highlighted-item');
  },
  captureRelatedOutcomes() {
    return ipcRenderer.invoke('capture-related-outcomes');
  },
  openSettings() {
    return ipcRenderer.invoke('open-settings');
  },
  getSettings() {
    return ipcRenderer.invoke('get-settings');
  },
  getUpdateStatus() {
    return ipcRenderer.invoke('get-update-status');
  },
  checkForUpdates() {
    return ipcRenderer.invoke('check-for-updates');
  },
  installUpdate() {
    return ipcRenderer.invoke('install-update');
  },
  getDiagnostics() {
    return ipcRenderer.invoke('get-diagnostics');
  },
  clearDiagnostics() {
    return ipcRenderer.invoke('clear-diagnostics');
  },
  getCatalogMetadata() {
    return ipcRenderer.invoke('get-catalog-metadata');
  },
  setLeague(league) {
    return ipcRenderer.invoke('set-league', league);
  },
  setListingCount(listingCount) {
    return ipcRenderer.invoke('set-listing-count', listingCount);
  },
  setLootFilterConfig(config) {
    return ipcRenderer.invoke('set-loot-filter-config', config);
  },
  getLootFilterState() {
    return ipcRenderer.invoke('get-loot-filter-state');
  },
  previewLootFilterSound(fileName) {
    return ipcRenderer.invoke('preview-loot-filter-sound', fileName);
  },
  setActiveLootFilterProfile(profileId) {
    return ipcRenderer.invoke('set-active-loot-filter-profile', profileId);
  },
  createLootFilterProfile(options) {
    return ipcRenderer.invoke('create-loot-filter-profile', options);
  },
  deleteLootFilterProfile(profileId) {
    return ipcRenderer.invoke('delete-loot-filter-profile', profileId);
  },
  exportLootFilterProfile(profileId) {
    return ipcRenderer.invoke('export-loot-filter-profile', profileId);
  },
  previewLootFilterProfileImport() {
    return ipcRenderer.invoke('preview-loot-filter-profile-import');
  },
  confirmLootFilterProfileImport(importId) {
    return ipcRenderer.invoke('confirm-loot-filter-profile-import', importId);
  },
  importLootFilterProfile() {
    return ipcRenderer.invoke('import-loot-filter-profile');
  },
  updateLootFilterProfile(profilePatch) {
    return ipcRenderer.invoke('update-loot-filter-profile', profilePatch);
  },
  writeLootFilter() {
    return ipcRenderer.invoke('write-loot-filter');
  },
  restoreLootFilterHistory(historyId) {
    return ipcRenderer.invoke('restore-loot-filter-history', historyId);
  },
  captureLootFilterRule() {
    return ipcRenderer.invoke('capture-loot-filter-rule');
  },
  removeLootFilterRule(ruleId) {
    return ipcRenderer.invoke('remove-loot-filter-rule', ruleId);
  },
  clearLootFilterRules() {
    return ipcRenderer.invoke('clear-loot-filter-rules');
  },
  refreshLootFilterEconomy() {
    return ipcRenderer.invoke('refresh-loot-filter-economy');
  },
  setShortcuts(shortcuts) {
    return ipcRenderer.invoke('set-shortcuts', shortcuts);
  },
  setOauthConfig(config) {
    return ipcRenderer.invoke('set-oauth-config', config);
  },
  connectGggOauth() {
    return ipcRenderer.invoke('connect-ggg-oauth');
  },
  refreshGggOauth() {
    return ipcRenderer.invoke('refresh-ggg-oauth');
  },
  disconnectGggOauth() {
    return ipcRenderer.invoke('disconnect-ggg-oauth');
  },
  setGggServiceToken(token) {
    return ipcRenderer.invoke('set-ggg-service-token', token);
  },
  setGggSessionToken(token) {
    return ipcRenderer.invoke('set-ggg-session-token', token);
  },
  setGggSessionAccountName(accountName) {
    return ipcRenderer.invoke('set-ggg-session-account-name', accountName);
  },
  validateGggSession() {
    return ipcRenderer.invoke('validate-ggg-session');
  },
  disconnectGggSession() {
    return ipcRenderer.invoke('disconnect-ggg-session');
  },
  refreshSessionAccount() {
    return ipcRenderer.invoke('refresh-session-account');
  },
  getStashState(query) {
    return ipcRenderer.invoke('get-stash-state', query);
  },
  refreshStashIndex(options) {
    return ipcRenderer.invoke('refresh-stash-index', options);
  },
  priceStashIndex(options) {
    return ipcRenderer.invoke('price-stash-index', options);
  },
  compareStashShoppingList(text) {
    return ipcRenderer.invoke('compare-stash-shopping-list', text);
  },
  testGggProfile() {
    return ipcRenderer.invoke('test-ggg-profile');
  },
  testCurrencyExchange() {
    return ipcRenderer.invoke('test-currency-exchange');
  },
  lookupPrice() {
    return ipcRenderer.invoke('lookup-price');
  },
  lookupListings() {
    return ipcRenderer.invoke('lookup-listings');
  },
  lookupRelatedOutcomes() {
    return ipcRenderer.invoke('lookup-related-outcomes');
  },
  openTradeSearch() {
    return ipcRenderer.invoke('open-trade-search');
  },
  copyTradeQuery() {
    return ipcRenderer.invoke('copy-trade-query');
  },
  setQueryOptions(queryOptions) {
    return ipcRenderer.invoke('set-query-options', queryOptions);
  },
  saveSearchPreset(name) {
    return ipcRenderer.invoke('save-search-preset', name);
  },
  applySearchPreset(presetId) {
    return ipcRenderer.invoke('apply-search-preset', presetId);
  }
});
