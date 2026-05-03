import { WMarketPredictor } from 'wmarket-prediction-sdk';
import { AgentRuntime } from 'wmarket-prediction-sdk';
import { ToolAdapter } from 'wmarket-prediction-sdk';

const predictor = new WMarketPredictor({
  chains: ['bsc', 'ethereum'],
  enableRiskAssessment: true,
  enableMetrics: true,
});

const runtime = new AgentRuntime(predictor);
const adapter = new ToolAdapter(predictor);

const tools = adapter.asToolArray();
console.log('Available tools:', tools.map((t) => t.name));

const result = await runtime.run({ keyword: 'protocol launch', chain: 'bsc' }, 'initial-scan');
console.log('Agent result:', result);
