const { DEFAULT_ECONOMY_TYPES, createEconomyRulesFromOverviews } = require('../src/services/economy-highlights');
const { fetchPoeNinjaOverview, getPoeNinjaEndpoint } = require('../src/services/pricing');

const USER_AGENT = 'poehelper-local economy-audit';
const league = process.argv[2] || 'Standard';
const tiers = [
  { id: 'chaos-50', label: '50c+', minChaos: 0.01, style: 'highValue', tier: 'baseline', maxItems: 2000 },
  { id: 'divine-1', label: '1 divine+', minDivines: 1, style: 'highValue', tier: 'valuable', maxItems: 2000 },
  { id: 'divine-10', label: '10 divines+', minDivines: 10, style: 'highValue', tier: 'high', maxItems: 2000 }
];
const DENIED_BASE_TYPE_PATTERNS = [
  /^Map \(Tier \d+\)$/i,
  /^(Doryani's Machinarium|Cortex|The Tower of Ordeals|Untainted Paradise)$/i,
  /^(Unnatural Instinct|Watcher's Eye|Impossible Escape|Thread of Hope|Forbidden Flesh|Forbidden Flame|Melding of the Flesh)$/i
];

function conditionValues(condition) {
  return Array.isArray(condition.value) ? condition.value : [condition.value];
}

async function fetchOfficialItemCatalog() {
  const response = await fetch('https://www.pathofexile.com/api/trade/data/items', {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`Official item catalog failed: ${response.status} ${response.statusText}`);
  }

  const body = await response.json();
  const catalog = new Set();
  for (const group of body.result || []) {
    for (const entry of group.entries || []) {
      for (const value of [entry.type, entry.text, entry.name]) {
        if (value) {
          catalog.add(String(value).toLowerCase());
        }
      }
    }
  }
  return catalog;
}

async function fetchEconomyOverviews() {
  const overviews = [];
  for (const type of DEFAULT_ECONOMY_TYPES) {
    const endpoint = getPoeNinjaEndpoint(type);
    const overview = await fetchPoeNinjaOverview(league, type, endpoint);
    overviews.push({ type, endpoint, overview });
    console.log(`${type}: ${overview.lines?.length || 0} rows`);
  }
  return overviews;
}

async function main() {
  const [catalog, overviews] = await Promise.all([
    fetchOfficialItemCatalog(),
    fetchEconomyOverviews()
  ]);
  const rules = createEconomyRulesFromOverviews(overviews, { tiers });
  const invalidBaseTypes = [];
  let transfigured = 0;
  let skillGemRules = 0;
  let skillGemRulesWithLevel = 0;
  let skillGemRulesWithQuality = 0;
  let skillGemRulesWithCorrupted = 0;
  let approximateUniqueBaseRules = 0;

  for (const rule of rules) {
    const conditions = rule.conditions || [];
    if (rule.economyMatchPrecision === 'approximate-unique-base') {
      approximateUniqueBaseRules += 1;
    }

    if (conditions.some((condition) => condition.key === 'Class' && conditionValues(condition).includes('Skill Gems'))
      || conditions.some((condition) => condition.key === 'TransfiguredGem')) {
      skillGemRules += 1;
      if (conditions.some((condition) => condition.key === 'GemLevel')) skillGemRulesWithLevel += 1;
      if (conditions.some((condition) => condition.key === 'Quality')) skillGemRulesWithQuality += 1;
      if (conditions.some((condition) => condition.key === 'Corrupted')) skillGemRulesWithCorrupted += 1;
    }

    for (const condition of rule.conditions || []) {
      if (condition.key === 'BaseType') {
        for (const value of conditionValues(condition)) {
          const text = String(value);
          const denied = DENIED_BASE_TYPE_PATTERNS.some((pattern) => pattern.test(text));
          if (denied || !catalog.has(text.toLowerCase())) {
            invalidBaseTypes.push({
              label: rule.label,
              value: text,
              id: rule.id,
              conditions: rule.conditions
            });
          }
        }
      } else if (condition.key === 'TransfiguredGem') {
        transfigured += 1;
      }
    }
  }

  console.log(`Generated rules: ${rules.length}`);
  console.log(`Transfigured gem rules: ${transfigured}`);
  console.log(`Skill gem rules: ${skillGemRules}`);
  console.log(`Skill gem rules with GemLevel: ${skillGemRulesWithLevel}`);
  console.log(`Skill gem rules with Quality: ${skillGemRulesWithQuality}`);
  console.log(`Skill gem rules with Corrupted: ${skillGemRulesWithCorrupted}`);
  console.log(`Approximate unique-base rules: ${approximateUniqueBaseRules}`);
  console.log(`Invalid BaseType values: ${invalidBaseTypes.length}`);

  if (invalidBaseTypes.length) {
    console.log(JSON.stringify(invalidBaseTypes.slice(0, 80), null, 2));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
