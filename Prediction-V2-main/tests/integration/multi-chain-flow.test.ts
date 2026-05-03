import { describe, it, expect } from 'vitest';
import { WMarketPredictor } from '../../src/predictor.js';

describe('Multi-chain prediction flow', () => {
  it('should handle all supported chains', async () => {
    const chains = ['ethereum', 'bsc', 'base', 'polygon'] as const;
    const predictor = new WMarketPredictor({ chains: [...chains] });
    for (const chain of chains) {
      const result = await predictor.predict({ chain, keyword: 'bridge inflow' });
      expect(result.signal).toBeDefined();
      expect(result.confidence).toBeGreaterThanOrEqual(0);
    }
  });
});
