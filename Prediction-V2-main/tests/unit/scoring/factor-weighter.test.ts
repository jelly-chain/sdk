import { describe, it, expect } from 'vitest';
import { FactorWeighter } from '../../../src/scoring/factor-weighter.js';

describe('FactorWeighter', () => {
  it('should apply weights to factors', () => {
    const weighter = new FactorWeighter([{ factor: 'sentiment', weight: 2 }]);
    const result = weighter.applyWeights({ sentiment: 0.5, keyword: 0.3 });
    expect(result['sentiment']).toBe(1.0);
    expect(result['keyword']).toBe(0.3);
  });

  it('should return 1 as default weight for unknown factors', () => {
    const weighter = new FactorWeighter([]);
    expect(weighter.getWeight('unknown')).toBe(0);
  });

  it('should normalize weights to sum to 1', () => {
    const weighter = new FactorWeighter([{ factor: 'a', weight: 2 }, { factor: 'b', weight: 3 }]);
    weighter.normalize();
    expect(weighter.getWeight('a')).toBeCloseTo(0.4);
    expect(weighter.getWeight('b')).toBeCloseTo(0.6);
  });
});
