import type { WMarketPredictor } from '../predictor.js';
import type { PredictionInput, PredictionOutput } from '../types.js';
import { Logger } from '../logger.js';

export interface AgentStep {
  name: string;
  input: PredictionInput;
  output?: PredictionOutput;
  error?: string;
  durationMs: number;
}

export class AgentRuntime {
  private predictor: WMarketPredictor;
  private logger = new Logger({ prefix: 'AgentRuntime' });
  private history: AgentStep[] = [];

  constructor(predictor: WMarketPredictor) {
    this.predictor = predictor;
  }

  async run(input: PredictionInput, stepName = 'predict'): Promise<PredictionOutput> {
    const start = Date.now();
    this.logger.info(`Agent step: ${stepName}`, { input });
    try {
      const output = await this.predictor.predict(input);
      this.history.push({ name: stepName, input, output, durationMs: Date.now() - start });
      return output;
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      this.history.push({ name: stepName, input, error, durationMs: Date.now() - start });
      throw err;
    }
  }

  getHistory(): AgentStep[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}
