import type { AggregateResult } from './aggregate-stage.js';
import type { RiskProfile, RiskOptions } from '../types.js';
import { scoreToLevel } from '../models/risk-profile.js';
import { Logger } from '../logger.js';

export class RiskStage {
  private options: RiskOptions;
  private logger = new Logger({ prefix: 'RiskStage' });

  constructor(options: RiskOptions = {}) {
    this.options = options;
  }

  async run(aggregated: AggregateResult): Promise<RiskProfile> {
    this.logger.debug('Running risk stage');
    const score = 1 - aggregated.confidence;
    const level = scoreToLevel(score);
    return {
      score,
      level,
      factors: aggregated.factors,
    };
  }
}
