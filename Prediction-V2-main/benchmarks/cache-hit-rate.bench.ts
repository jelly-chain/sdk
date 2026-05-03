import { WMarketPredictor } from '../src/predictor.js';

const predictor = new WMarketPredictor({ chains: ['bsc'], enableCache: true, enableMetrics: true });
const INPUT = { keyword: 'bridge inflow', chain: 'bsc' as const };

let cacheHits = 0;
const ITERATIONS = 50;

for (let i = 0; i < ITERATIONS; i++) {
  const result = await predictor.predict(INPUT);
  if (result.metadata.cached) cacheHits++;
}

const hitRate = (cacheHits / ITERATIONS) * 100;
console.log(`Cache Hit Rate Benchmark (${ITERATIONS} predictions):`);
console.log(`  Hits: ${cacheHits} / ${ITERATIONS} = ${hitRate.toFixed(1)}%`);
