import { describe, it, expect } from 'vitest';
import { WMarketPredictor } from '../src/predictor.js';

describe('Integration: Multi-chain prediction', () => {
  it('should predict for bsc and ethereum', async () => {
    const predictor = new WMarketPredictor({ chains: ['bsc', 'ethereum'], enableRiskAssessment: true });
    const bsc = await predictor.predict({ chain: 'bsc', keyword: 'bridge inflow' });
    const eth = await predictor.predict({ chain: 'ethereum', keyword: 'bridge inflow' });
    expect(bsc.signal).toBeDefined();
    expect(eth.signal).toBeDefined();
  });

  it('should complete pipeline for all default keywords', async () => {
    const predictor = new WMarketPredictor({ chains: ['bsc'] });
    const keywords = ['bridge inflow', 'protocol launch', 'tvl surge', 'rug pull'];
    for (const keyword of keywords) {
      const result = await predictor.predict({ keyword });
      expect(result.signal).toBeDefined();
    }
  });
});
