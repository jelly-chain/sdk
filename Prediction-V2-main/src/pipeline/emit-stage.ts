import type { AggregateResult } from './aggregate-stage.js';
import type { RiskProfile, PredictionOutput } from '../types.js';
import { Logger } from '../logger.js';

export class EmitStage {
  private logger = new Logger({ prefix: 'EmitStage' });

  async run(
    aggregated: AggregateResult,
    risk: RiskProfile,
    meta: { predictionId?: string; triggeredBy?: string; latencyMs?: number; chain?: string },
  ): Promise<PredictionOutput> {
    this.logger.debug('Running emit stage');
    return {
      signal: aggregated.direction,
      confidence: aggregated.confidence,
      riskScore: risk.score,
      factors: aggregated.factors,
      explanations: aggregated.factors.map((f) => `Signal influenced by ${f}`),
      metadata: {
        chain: (meta.chain ?? aggregated.signals[0]?.chain ?? 'unknown') as never,
        sourceCount: aggregated.signals.length,
        cached: false,
        strategy: aggregated.strategy,
        triggeredBy: meta.triggeredBy ?? 'manual',
        latencyMs: meta.latencyMs,
        predictionId: meta.predictionId,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
