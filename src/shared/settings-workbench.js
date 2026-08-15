(function initSettingsWorkbench(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
    return;
  }

  root.poehelperSettingsWorkbench = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function createSettingsWorkbench() {
  function formatProfileOptionLabel(profile = {}) {
    return `${profile.name || 'Unnamed profile'} (${profile.userRuleCount || 0} rules)`;
  }

  function buildFilterImportReviewModel(preview) {
    if (!preview || preview.status !== 'preview') {
      return undefined;
    }

    const summary = preview.importedSummary || {};
    const rows = [
      { label: 'Output path', value: preview.outputPath || 'default filter path' }
    ];

    if (summary.type === 'Raw .filter') {
      rows.push(
        { label: 'Filter blocks', value: `${summary.blocks || 0} total, ${summary.showBlocks || 0} Show, ${summary.hideBlocks || 0} Hide` },
        { label: 'Filter size', value: `${summary.lines || 0} lines, ${summary.bytes || 0} bytes` }
      );
    } else {
      rows.push({
        label: 'Imported content',
        value: `${summary.capturedRules || 0} captured, ${summary.customRules || 0} custom, ${summary.economyEntries || 0} economy, ${summary.chanceBases || 0} chance bases`
      });
    }

    for (const warning of preview.migration?.warnings || []) {
      rows.push({ label: 'Warning', value: warning, warn: true });
    }

    for (const change of preview.diff?.changes || []) {
      rows.push({ label: change.label, value: `${change.before} -> ${change.after}` });
    }

    return {
      title: `Import ${preview.profileName || 'profile'}`,
      summary: [
        `${summary.type || 'Profile'} from ${preview.filePath || 'selected file'}.`,
        preview.migration
          ? `Version ${preview.migration.fromVersion || '?'} -> ${preview.migration.toVersion || '?'}.`
          : undefined,
        summary.preservesOriginalText ? 'Raw filter text will be preserved exactly.' : undefined
      ].filter(Boolean).join(' '),
      rows
    };
  }

  return {
    buildFilterImportReviewModel,
    formatProfileOptionLabel
  };
}));
