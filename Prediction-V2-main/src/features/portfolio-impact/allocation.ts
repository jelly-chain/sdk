import type { PredictionOutput } from '../../types.js';

export interface AllocationSuggestion {
  asset: string;
  currentWeight: number;
  suggestedWeight: number;
  rationale: string;
}

export class AllocationInterpreter {
  interpret(
    currentAllocations: Record<string, number>,
    predictions: Record<string, PredictionOutput>,
  ): AllocationSuggestion[] {
    return Object.entries(currentAllocations).map(([asset, currentWeight]) => {
      const prediction = predictions[asset];
      let suggestedWeight = currentWeight;
      let rationale = 'No prediction available — holding current allocation';
      if (prediction) {
        if (prediction.signal === 'bullish' && prediction.confidence > 0.65) {
          suggestedWeight = Math.min(1, currentWeight * 1.2);
          rationale = `Bullish signal (${(prediction.confidence * 100).toFixed(0)}% confidence) — slight overweight`;
        } else if (prediction.signal === 'bearish' && prediction.confidence > 0.65) {
          suggestedWeight = currentWeight * 0.8;
          rationale = `Bearish signal — reducing allocation`;
        }
      }
      return { asset, currentWeight, suggestedWeight, rationale };
    });
  }
}
