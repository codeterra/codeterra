(function initEquipmentSelection(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
    return;
  }

  root.poehelperEquipmentSelection = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function createEquipmentSelection() {
  function getSelectedEquipmentIndexes(items, action) {
    const source = Array.isArray(items) ? items : [];
    if (action === 'all') {
      return source.map((_item, index) => index);
    }
    if (action === 'none') {
      return [];
    }

    const keepCount = action === 'top2' ? 2 : action === 'top5' ? 5 : 0;
    if (keepCount <= 0) {
      return [];
    }

    const groups = new Map();
    source.forEach((item, index) => {
      const groupId = item?.groupId || 'default';
      if (!groups.has(groupId)) {
        groups.set(groupId, []);
      }
      groups.get(groupId).push(index);
    });

    const selected = [];
    for (const indexes of groups.values()) {
      selected.push(...indexes.slice(Math.max(indexes.length - keepCount, 0)));
    }
    return selected.sort((left, right) => left - right);
  }

  return {
    getSelectedEquipmentIndexes
  };
}));
