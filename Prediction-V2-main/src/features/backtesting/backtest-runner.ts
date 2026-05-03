import type { PredictionInput, PredictionOutput } from '../../types.js';

export interface BacktestScenario {
  id: string;
  input: PredictionInput;
  actualOutcome: string;
  timestamp: string;
}

export interface BacktestResult {
  scenarioId: string;
  predicted: PredictionOutput;
  actual: string;
  correct: boolean;
  latencyMs: number;
}

export class BacktestRunner {
  async run(
    scenarios: BacktestScenario[],
    predictor: (input: PredictionInput) => Promise<PredictionOutput>,
  ): Promise<BacktestResult[]> {
    const results: BacktestResult[] = [];
    for (const scenario of scenarios) {
      const start = Date.now();
      const predicted = await predictor(scenario.input);
      const latencyMs = Date.now() - start;
      results.push({
        scenarioId: scenario.id,
        predicted,
        actual: scenario.actualOutcome,
        correct: predicted.signal === scenario.actualOutcome,
        latencyMs,
      });
    }
    return results;
  }
}
