import type { WMarketPredictor } from '../predictor.js';
import type { PredictionInput } from '../types.js';

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, { type: string; description: string; required?: boolean }>;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}

export class ToolAdapter {
  private predictor: WMarketPredictor;

  constructor(predictor: WMarketPredictor) {
    this.predictor = predictor;
  }

  asTool(): AgentTool {
    return {
      name: 'wmarket_predict',
      description: 'Generate a market prediction for a given keyword, token, and chain',
      parameters: {
        keyword: { type: 'string', description: 'Market keyword or event to analyze' },
        token: { type: 'string', description: 'Token symbol to analyze (e.g. WBNB, ETH)' },
        chain: { type: 'string', description: 'Blockchain to query (ethereum, bsc, base, polygon)' },
        timeframe: { type: 'string', description: 'Timeframe for analysis (1h, 4h, 1d)' },
      },
      execute: async (params: Record<string, unknown>) => {
        const input = params as PredictionInput;
        return this.predictor.predict(input);
      },
    };
  }

  asToolArray(): AgentTool[] {
    return [this.asTool()];
  }
}
