import type { PredictionOutput, ChainId } from '../../src/types.js';

export interface SkillPredictParams {
  keyword?: string;
  token?: string;
  chain?: ChainId;
  timeframe?: string;
}

export interface SkillPredictResult extends PredictionOutput {
  skillVersion: string;
}

export interface SkillMetrics {
  totalPredictions: number;
  avgConfidence: number;
  avgLatencyMs: number;
  cacheHitRate: number;
}
