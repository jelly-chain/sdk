import type { PredictionInput, ChainId } from '../types.js';

export interface PredictionPlan {
  steps: PredictionInput[];
  strategy: string;
  rationale: string;
}

export class Planner {
  plan(goal: string, chains: ChainId[]): PredictionPlan {
    const steps: PredictionInput[] = chains.map((chain) => ({
      keyword: goal,
      chain,
      timeframe: '1h',
    }));

    return {
      steps,
      strategy: 'multi-chain-ensemble',
      rationale: `Scanning ${chains.length} chain(s) for signals matching: "${goal}"`,
    };
  }

  prioritize(plans: PredictionPlan[]): PredictionPlan[] {
    return plans.sort((a, b) => b.steps.length - a.steps.length);
  }
}
