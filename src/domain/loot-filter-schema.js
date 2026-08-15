// @ts-check

/**
 * @typedef {'Show' | 'Hide'} FilterAction
 * @typedef {'baseline' | 'valuable' | 'high'} FilterTier
 *
 * @typedef {object} LootFilterCondition
 * @property {string} key
 * @property {string=} operator
 * @property {string | number | boolean | Array<string | number | boolean>} value
 *
 * @typedef {object} LootFilterRule
 * @property {string} id
 * @property {boolean} enabled
 * @property {FilterAction} action
 * @property {string} label
 * @property {string} source
 * @property {string=} style
 * @property {FilterTier | string=} tier
 * @property {LootFilterCondition[]} conditions
 */

const LOOT_FILTER_PROFILE_SCHEMA_VERSION = 1;
const ECONOMY_HIGHLIGHT_CACHE_VERSION = 4;
const FILTER_FONT_SIZE_MIN = 18;
const FILTER_FONT_SIZE_MAX = 45;

module.exports = {
  ECONOMY_HIGHLIGHT_CACHE_VERSION,
  FILTER_FONT_SIZE_MAX,
  FILTER_FONT_SIZE_MIN,
  LOOT_FILTER_PROFILE_SCHEMA_VERSION
};
