import type { WMarketPredictor } from '../../../src/predictor.js';
import type { AgentTool } from '../../../src/agents/tool-adapter.js';

export function buildDataTools(predictor: WMarketPredictor): AgentTool[] {
  return [
    {
      name: 'wmarket_predict',
      description: 'Generate a market prediction for a given keyword, token, and chain',
      parameters: {
        keyword: { type: 'string', description: 'Market keyword or event to analyze' },
        token: { type: 'string', description: 'Token symbol (e.g. WBNB, ETH)' },
        chain: { type: 'string', description: 'Chain to query (ethereum, bsc, base, polygon)' },
        timeframe: { type: 'string', description: 'Timeframe for analysis (1h, 4h, 1d)' },
      },
      execute: async (params) => predictor.predict(params as never),
    },
    {
      name: 'wmarket_metrics',
      description: 'Get current SDK performance metrics',
      parameters: {},
      execute: async () => predictor.getMetrics(),
    },
  ];
}
