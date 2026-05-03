import type { SignalDirection, RiskLevel, ChainId } from '../types.js';

export interface PredictionResultModel {
  id: string;
  signal: SignalDirection;
  confidence: number;
  riskScore: number;
  riskLevel: RiskLevel;
  factors: string[];
  explanations: string[];
  strategy: string;
  chain: ChainId;
  triggeredBy: string;
  sourceCount: number;
  cached: boolean;
  latencyMs: number;
  timestamp: string;
}

export function createPredictionResult(
  partial: Omit<PredictionResultModel, 'id' | 'timestamp'>,
): PredictionResultModel {
  return {
    id: `pred_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...partial,
  };
}
