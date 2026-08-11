const { getChanceBaseCatalog } = require('../src/services/chance-base-catalog');

async function main() {
  const league = process.argv[2] || 'Standard';
  const minChaos = Number(process.argv[3] || 100);
  const catalog = await getChanceBaseCatalog(league);
  const unknowns = [];

  for (const base of catalog.bases) {
    for (const target of base.chanceTargets || []) {
      if (target.chanceability !== 'unknown') {
        continue;
      }

      const chaosValue = typeof target.chaosValue === 'number' ? target.chaosValue : 0;
      if (chaosValue < minChaos) {
        continue;
      }

      unknowns.push({
        name: target.name,
        baseType: target.baseType,
        type: target.poeNinjaType,
        chaosValue,
        confidence: target.confidence,
        reason: target.reason
      });
    }
  }

  unknowns.sort((a, b) => b.chaosValue - a.chaosValue || a.name.localeCompare(b.name));

  console.log(`Chance catalog report for ${league}`);
  console.log(`Curation data: ${catalog.curation.dataVersion} (${catalog.curation.gameVersion})`);
  console.log(`High-value unknowns >= ${minChaos} chaos: ${unknowns.length}`);

  for (const target of unknowns.slice(0, 80)) {
    console.log(`${target.chaosValue.toFixed(0).padStart(6)}c  ${target.name} | ${target.baseType} | ${target.type} | ${target.confidence}`);
  }

  if (unknowns.length > 80) {
    console.log(`...and ${unknowns.length - 80} more.`);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
