import { WMarketPredictor } from '../../src/predictor.js';

async function main() {
  const predictor = new WMarketPredictor({
    chains: ['bsc', 'ethereum'],
    enableRiskAssessment: true,
    enableMetrics: true,
    enableCache: true,
  });

  const result = await predictor.predict({
    keyword: 'bridge inflow',
    token: 'WBNB',
    chain: 'bsc',
    timeframe: '1h',
  });

  console.log('Prediction:', JSON.stringify(result, null, 2));
  console.log('Metrics:', predictor.getMetrics());
}

main().catch(console.error);
