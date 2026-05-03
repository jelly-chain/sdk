import type { WMarketPredictor } from '../../../src/predictor.js';
import type { AgentTool } from '../../../src/agents/tool-adapter.js';

export function buildMetricsTools(predictor: WMarketPredictor): AgentTool[] {
  return [
    {
      name: 'wmarket_get_metrics',
      description: 'Get current SDK performance metrics snapshot',
      parameters: {},
      execute: async () => predictor.getMetrics(),
    },
    {
      name: 'wmarket_clear_cache',
      description: 'Clear the SDK prediction cache',
      parameters: {},
      execute: async () => { predictor.clearCache(); return { cleared: true }; },
    },
  ];
}
