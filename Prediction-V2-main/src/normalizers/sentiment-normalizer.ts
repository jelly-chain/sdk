import type { SignalDirection } from '../types.js';

export interface RawSentiment {
  score?: number;
  label?: string;
  magnitude?: number;
  source?: string;
}

export interface NormalizedSentiment {
  direction: SignalDirection;
  score: number;
  magnitude: number;
  source: string;
}

export class SentimentNormalizer {
  normalize(raw: RawSentiment): NormalizedSentiment {
    const score = raw.score ?? 0;
    const magnitude = raw.magnitude ?? Math.abs(score);
    let direction: SignalDirection = 'neutral';
    if (score > 0.1) direction = 'bullish';
    if (score < -0.1) direction = 'bearish';
    return { direction, score, magnitude, source: raw.source ?? 'unknown' };
  }

  normalizeMany(raws: RawSentiment[]): NormalizedSentiment[] {
    return raws.map((r) => this.normalize(r));
  }

  average(normalized: NormalizedSentiment[]): NormalizedSentiment {
    if (normalized.length === 0) return { direction: 'neutral', score: 0, magnitude: 0, source: 'aggregate' };
    const avgScore = normalized.reduce((a, b) => a + b.score, 0) / normalized.length;
    const avgMag = normalized.reduce((a, b) => a + b.magnitude, 0) / normalized.length;
    return this.normalize({ score: avgScore, magnitude: avgMag, source: 'aggregate' });
  }
}
