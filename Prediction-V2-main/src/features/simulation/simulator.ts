import type { PredictionInput, PredictionOutput } from '../../types.js';

export interface SimulationScenario {
  name: string;
  input: PredictionInput;
  parameters: Record<string, unknown>;
}

export interface SimulationResult {
  scenario: string;
  output: PredictionOutput;
  parameters: Record<string, unknown>;
}

export class Simulator {
  async simulate(
    scenarios: SimulationScenario[],
    predictor: (input: PredictionInput) => Promise<PredictionOutput>,
  ): Promise<SimulationResult[]> {
    const results: SimulationResult[] = [];
    for (const scenario of scenarios) {
      const output = await predictor(scenario.input);
      results.push({ scenario: scenario.name, output, parameters: scenario.parameters });
    }
    return results;
  }

  compare(results: SimulationResult[]): Record<string, unknown> {
    return {
      scenarios: results.map((r) => ({ name: r.scenario, signal: r.output.signal, confidence: r.output.confidence })),
      signals: results.map((r) => r.output.signal),
      avgConfidence: results.reduce((a, b) => a + b.output.confidence, 0) / Math.max(1, results.length),
    };
  }
}
