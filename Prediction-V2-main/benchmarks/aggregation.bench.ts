import { EnsembleModel } from '../src/prediction/ensemble-model.js';

const ensemble = new EnsembleModel();
const ITERATIONS = 10_000;

const inputs = Array.from({ length: 5 }, (_, i) => ({
  direction: (i % 3 === 0 ? 'bullish' : i % 3 === 1 ? 'bearish' : 'neutral') as 'bullish' | 'bearish' | 'neutral',
  confidence: 0.5 + i * 0.05,
  weight: 1 + i * 0.2,
  strategy: `strategy_${i}`,
}));

const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  ensemble.combine(inputs);
}
const elapsed = performance.now() - start;

console.log(`Aggregation Benchmark (${ITERATIONS} iterations):`);
console.log(`  Total: ${elapsed.toFixed(2)}ms  Avg: ${(elapsed / ITERATIONS).toFixed(4)}ms`);
