import { stdDev } from '../utils/math.js';

export interface SentimentOutlierResult {
  isOutlier: boolean;
  score: number;
  mean: number;
  stdDev: number;
  zScore: number;
}

export class SentimentOutlierDetector {
  private history: number[] = [];
  private zThreshold: number;

  constructor(zThreshold = 2.0) {
    this.zThreshold = zThreshold;
  }

  addSample(score: number): void {
    this.history.push(score);
    if (this.history.length > 50) this.history.shift();
  }

  detect(score: number): SentimentOutlierResult {
    if (this.history.length < 5) {
      return { isOutlier: false, score, mean: score, stdDev: 0, zScore: 0 };
    }
    const mean = this.history.reduce((a, b) => a + b, 0) / this.history.length;
    const sd = stdDev(this.history);
    const zScore = sd > 0 ? (score - mean) / sd : 0;
    return { isOutlier: Math.abs(zScore) >= this.zThreshold, score, mean, stdDev: sd, zScore };
  }
}
