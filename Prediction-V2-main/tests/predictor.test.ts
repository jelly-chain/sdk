import { describe, it, expect, beforeEach } from 'vitest';
import { WMarketPredictor } from '../src/predictor.js';

describe('WMarketPredictor', () => {
  let predictor: WMarketPredictor;

  beforeEach(() => {
    predictor = new WMarketPredictor({
      chains: ['bsc', 'ethereum'],
      enableRiskAssessment: true,
      enableMetrics: true,
      enableCache: true,
    });
  });

  it('should instantiate without errors', () => {
    expect(predictor).toBeDefined();
  });

  it('should return a valid prediction output', async () => {
    const result = await predictor.predict({ keyword: 'bridge inflow', chain: 'bsc' });
    expect(['bullish', 'bearish', 'neutral']).toContain(result.signal);
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
    expect(result.riskScore).toBeGreaterThanOrEqual(0);
    expect(result.riskScore).toBeLessThanOrEqual(1);
    expect(Array.isArray(result.factors)).toBe(true);
    expect(Array.isArray(result.explanations)).toBe(true);
    expect(result.metadata).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  it('should cache predictions on repeated identical inputs', async () => {
    const input = { keyword: 'bridge inflow', chain: 'bsc' as const };
    const r1 = await predictor.predict(input);
    const r2 = await predictor.predict(input);
    expect(r2.metadata.cached).toBe(true);
    expect(r1.signal).toBe(r2.signal);
  });

  it('should return metrics after predictions', async () => {
    await predictor.predict({ keyword: 'test' });
    const metrics = predictor.getMetrics();
    expect(metrics).toBeDefined();
    expect(typeof metrics).toBe('object');
  });

  it('should throw for invalid config (no chains)', () => {
    expect(() => new WMarketPredictor({ chains: [] })).toThrow();
  });

  it('should clear cache', () => {
    expect(() => predictor.clearCache()).not.toThrow();
  });
});
