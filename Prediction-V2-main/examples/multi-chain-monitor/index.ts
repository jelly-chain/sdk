import { WMarketPredictor } from '../../src/predictor.js';

const CHAINS = ['bsc', 'ethereum', 'base', 'polygon'] as const;
const KEYWORDS = ['bridge inflow', 'protocol launch', 'tvl surge'];

async function main() {
  const predictor = new WMarketPredictor({
    chains: [...CHAINS],
    enableRiskAssessment: true,
    enableMetrics: true,
    enableCache: true,
  });

  for (const chain of CHAINS) {
    for (const keyword of KEYWORDS) {
      const result = await predictor.predict({ keyword, chain });
      console.log(`[${chain}] "${keyword}" → ${result.signal} (${(result.confidence * 100).toFixed(0)}% conf, ${(result.riskScore * 100).toFixed(0)}% risk)`);
    }
  }
}

main().catch(console.error);
