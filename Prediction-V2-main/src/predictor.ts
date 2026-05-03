import type { SDKConfig, PredictionInput, PredictionOutput } from './types.js';
import { ConfigManager } from './config.js';
import { Logger } from './logger.js';
import { CacheManager } from './cache.js';
import { MetricsCollector } from './metrics.js';
import { IngestStage } from './pipeline/ingest-stage.js';
import { EnrichStage } from './pipeline/enrich-stage.js';
import { ScoreStage } from './pipeline/score-stage.js';
import { AggregateStage } from './pipeline/aggregate-stage.js';
import { RiskStage } from './pipeline/risk-stage.js';
import { EmitStage } from './pipeline/emit-stage.js';
import { TriggerEngine } from './triggers/trigger-engine.js';
import { PolicyEngine } from './policies/policy-engine.js';
import { AuditLog } from './audit/audit-log.js';

export class WMarketPredictor {
  private config: ConfigManager;
  private logger: Logger;
  private cache: CacheManager;
  private metrics: MetricsCollector;
  private ingest: IngestStage;
  private enrich: EnrichStage;
  private score: ScoreStage;
  private aggregate: AggregateStage;
  private risk: RiskStage;
  private emit: EmitStage;
  private triggers: TriggerEngine;
  private policies: PolicyEngine;
  private audit: AuditLog;

  constructor(config: SDKConfig) {
    this.config = new ConfigManager(config);
    this.logger = new Logger({ level: config.logLevel ?? 'info' });
    this.cache = new CacheManager(config.cacheOptions ?? {});
    this.metrics = new MetricsCollector();
    this.ingest = new IngestStage(this.config);
    this.enrich = new EnrichStage();
    this.score = new ScoreStage();
    this.aggregate = new AggregateStage();
    this.risk = new RiskStage(config.riskOptions ?? {});
    this.emit = new EmitStage();
    this.triggers = new TriggerEngine();
    this.policies = new PolicyEngine();
    this.audit = new AuditLog();
  }

  async predict(input: PredictionInput): Promise<PredictionOutput> {
    const start = Date.now();
    const predictionId = `pred_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    this.logger.info('Starting prediction pipeline', { predictionId, input });

    const cacheKey = `pred:${JSON.stringify(input)}`;
    if (this.config.get('enableCache')) {
      const cached = this.cache.get<PredictionOutput>(cacheKey);
      if (cached) {
        this.logger.debug('Cache hit', { cacheKey });
        return { ...cached, metadata: { ...cached.metadata, cached: true } };
      }
    }

    const triggered = await this.triggers.evaluate(input);
    this.logger.debug('Triggers evaluated', { triggered });

    const rawData = await this.ingest.run(input);
    const enriched = await this.enrich.run(rawData);
    const scored = await this.score.run(enriched);
    const aggregated = await this.aggregate.run(scored);
    const riskProfile = await this.risk.run(aggregated);
    const output = await this.emit.run(aggregated, riskProfile, {
      ...input,
      predictionId,
      triggeredBy: triggered.length > 0 ? triggered[0] : 'manual',
      latencyMs: Date.now() - start,
    });

    const allowed = await this.policies.evaluate(output);
    if (!allowed) {
      this.logger.warn('Prediction blocked by policy', { predictionId });
      throw new Error(`Prediction blocked by policy for input: ${JSON.stringify(input)}`);
    }

    if (this.config.get('enableCache')) {
      this.cache.set(cacheKey, output);
    }

    if (this.config.get('enableMetrics')) {
      this.metrics.record('prediction_latency_ms', Date.now() - start);
      this.metrics.record('prediction_confidence', output.confidence);
      this.metrics.record('prediction_risk_score', output.riskScore);
    }

    if (this.config.get('enableAudit')) {
      await this.audit.write({ predictionId, input, output, latencyMs: Date.now() - start });
    }

    this.logger.info('Prediction complete', { predictionId, signal: output.signal, confidence: output.confidence });
    return output;
  }

  getMetrics(): Record<string, unknown> {
    return this.metrics.exportAll();
  }

  clearCache(): void {
    this.cache.clear();
  }
}
