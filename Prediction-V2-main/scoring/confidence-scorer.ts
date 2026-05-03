import { clamp, weightedAverage } from '../utils/math.js';

export interface ScoringInput {
  sentimentScore: number;
  keywordScore: number;
  onChainScore: number;
  volatilityPenalty?: number;
  dataQuality?: number;
}

export class ConfidenceScorer {
  private weights: number[];

  constructor(weights = [0.35, 0.3, 0.35]) {
    this.weights = weights;
  }

  score(input: ScoringInput): number {
    const base = weightedAverage(
      [input.sentimentScore, input.keywordScore, input.onChainScore],
      this.weights,
    );
    const penalty = input.volatilityPenalty ?? 0;
    const quality = input.dataQuality ?? 1;
    return clamp(base * quality - penalty * 0.1, 0, 1);
  }

  setWeights(weights: number[]): void {
    if (weights.length !== 3) throw new Error('Weights array must have 3 elements');
    this.weights = weights;
  }
}
