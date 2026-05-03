import type { PredictionOutput } from '../../types.js';

export interface OutcomeModel {
  signal: string;
  probability: number;
  expectedReturn?: number;
  expectedRisk?: number;
}

export function modelOutcomes(output: PredictionOutput): OutcomeModel[] {
  const { confidence, riskScore, signal } = output;
  const bullishProb = signal === 'bullish' ? confidence : signal === 'neutral' ? 0.33 : 1 - confidence;
  const bearishProb = signal === 'bearish' ? confidence : signal === 'neutral' ? 0.33 : 1 - confidence;
  const neutralProb = 1 - bullishProb - bearishProb;
  return [
    { signal: 'bullish', probability: bullishProb, expectedReturn: 0.05, expectedRisk: riskScore },
    { signal: 'bearish', probability: bearishProb, expectedReturn: -0.05, expectedRisk: riskScore },
    { signal: 'neutral', probability: Math.max(0, neutralProb), expectedReturn: 0, expectedRisk: riskScore * 0.5 },
  ];
}
