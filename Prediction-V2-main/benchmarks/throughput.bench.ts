import { WMarketPredictor } from '../src/predictor.js';

const predictor = new WMarketPredictor({ chains: ['bsc', 'ethereum'], enableMetrics: true });
const DURATION_MS = 5000;
let count = 0;
const start = Date.now();

while (Date.now() - start < DURATION_MS) {
  await predictor.predict({ keyword: 'bridge inflow', chain: 'bsc' });
  count++;
}

const elapsed = Date.now() - start;
console.log(`Throughput Benchmark:`);
console.log(`  ${count} predictions in ${elapsed}ms`);
console.log(`  ${(count / (elapsed / 1000)).toFixed(1)} predictions/sec`);
