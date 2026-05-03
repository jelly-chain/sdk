import { WMarketPredictor } from '../src/predictor.js';

const predictor = new WMarketPredictor({
  chains: ['bsc'],
  enableMetrics: true,
  enableCache: true,
});

const ITERATIONS = 100;
const start = Date.now();

for (let i = 0; i < ITERATIONS; i++) {
  await predictor.predict({ keyword: 'bridge inflow', chain: 'bsc' });
}

const total = Date.now() - start;
const avg = total / ITERATIONS;
console.log(`Benchmark: ${ITERATIONS} predictions`);
console.log(`Total: ${total}ms | Avg: ${avg.toFixed(2)}ms`);
console.log('Metrics:', JSON.stringify(predictor.getMetrics(), null, 2));
