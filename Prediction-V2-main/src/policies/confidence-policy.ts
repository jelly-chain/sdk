import type { PredictionOutput } from '../types.js';

export class ConfidencePolicy {
  private minConfidence: number;

  constructor(minConfidence = 0.3) {
    this.minConfidence = minConfidence;
  }

  check(output: PredictionOutput): boolean {
    return output.confidence >= this.minConfidence;
  }

  setMinConfidence(value: number): void {
    this.minConfidence = value;
  }

  getMinConfidence(): number {
    return this.minConfidence;
  }
}
