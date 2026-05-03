import { describe, it, expect } from 'vitest';
import { KeywordTrigger } from '../../../src/triggers/keyword-trigger.js';

describe('KeywordTrigger', () => {
  it('should match known bullish keywords', () => {
    const trigger = new KeywordTrigger(['bridge inflow', 'protocol launch']);
    expect(trigger.evaluate('bridge inflow detected')).toBe(true);
  });

  it('should not match unknown keywords', () => {
    const trigger = new KeywordTrigger(['bridge inflow']);
    expect(trigger.evaluate('nothing special')).toBe(false);
  });

  it('should be case-insensitive', () => {
    const trigger = new KeywordTrigger(['Bridge Inflow']);
    expect(trigger.evaluate('BRIDGE INFLOW happened')).toBe(true);
  });

  it('should return matched keywords', () => {
    const trigger = new KeywordTrigger(['bridge inflow', 'tvl surge']);
    const matched = trigger.getMatchedKeywords('bridge inflow and tvl surge detected');
    expect(matched).toContain('bridge inflow');
    expect(matched).toContain('tvl surge');
  });

  it('should support adding keywords', () => {
    const trigger = new KeywordTrigger([]);
    trigger.addKeyword('whale buy');
    expect(trigger.evaluate('whale buy detected')).toBe(true);
  });
});
