import { WMarketPredictor } from '../src/predictor.js';

const predictor = new WMarketPredictor({ chains: ['bsc'], enableMetrics: true });
const latencies: number[] = [];

for (let i = 0; i < 100; i++) {
  const start = performance.now();
  await predictor.predict({ keyword: 'bridge inflow', chain: 'bsc' });
  latencies.push(performance.now() - start);
}

const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
const p95 = [...latencies].sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)] ?? 0;
const p99 = [...latencies].sort((a, b) => a - b)[Math.floor(latencies.length * 0.99)] ?? 0;

console.log(`Latency Benchmark (100 iterations):`);
console.log(`  avg: ${avg.toFixed(2)}ms  p95: ${p95.toFixed(2)}ms  p99: ${p99.toFixed(2)}ms`);
