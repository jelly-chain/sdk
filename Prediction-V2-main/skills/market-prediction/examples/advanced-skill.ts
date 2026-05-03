import { bootstrapSkill } from '../index.js';

async function main() {
  const skill = bootstrapSkill({
    chains: ['bsc', 'ethereum', 'base'],
    enableRiskAssessment: true,
    enableMetrics: true,
    enableCache: true,
    confidenceThreshold: 0.55,
    riskTolerance: 'medium',
  });

  const tokens = ['WBNB', 'CAKE', 'ETH'];
  const chains = ['bsc', 'ethereum'];

  for (const token of tokens) {
    for (const chain of chains) {
      const result = await skill.predictByToken(token, chain);
      console.log(`${token} on ${chain}: ${result.signal} (${(result.confidence * 100).toFixed(0)}%)`);
    }
  }

  console.log('\nMetrics:', JSON.stringify(skill.getMetrics(), null, 2));
}

main().catch(console.error);
