import { describe, it, expect } from 'vitest';
import { ConfidenceScorer } from '../../../src/scoring/confidence-scorer.js';

describe('ConfidenceScorer', () => {
  it('should produce a score between 0 and 1', () => {
    const scorer = new ConfidenceScorer();
    const score = scorer.score({ sentimentScore: 0.7, keywordScore: 0.6, onChainScore: 0.8 });
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it('should produce higher score for stronger inputs', () => {
    const scorer = new ConfidenceScorer();
    const low = scorer.score({ sentimentScore: 0.2, keywordScore: 0.1, onChainScore: 0.2 });
    const high = scorer.score({ sentimentScore: 0.9, keywordScore: 0.9, onChainScore: 0.9 });
    expect(high).toBeGreaterThan(low);
  });

  it('should apply volatility penalty', () => {
    const scorer = new ConfidenceScorer();
    const base = scorer.score({ sentimentScore: 0.7, keywordScore: 0.7, onChainScore: 0.7 });
    const penalized = scorer.score({ sentimentScore: 0.7, keywordScore: 0.7, onChainScore: 0.7, volatilityPenalty: 0.5 });
    expect(penalized).toBeLessThan(base);
  });
});
