import type { WMarketPredictor } from '../../src/predictor.js';
import type { PredictionInput, PredictionOutput } from '../../src/types.js';

export class SkillHandlers {
  private predictor: WMarketPredictor;

  constructor(predictor: WMarketPredictor) {
    this.predictor = predictor;
  }

  async predict(input: PredictionInput): Promise<PredictionOutput> {
    return this.predictor.predict(input);
  }

  async predictByKeyword(keyword: string, chain?: string): Promise<PredictionOutput> {
    return this.predictor.predict({ keyword, chain: chain as never });
  }

  async predictByToken(token: string, chain: string): Promise<PredictionOutput> {
    return this.predictor.predict({ token, chain: chain as never });
  }

  getMetrics(): Record<string, unknown> {
    return this.predictor.getMetrics();
  }

  clearCache(): void {
    this.predictor.clearCache();
  }
}
