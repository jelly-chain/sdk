import { WMarketPredictor } from 'wmarket-prediction-sdk';

const predictor = new WMarketPredictor({
  chains: ['bsc'],
  enableRiskAssessment: true,
  enableMetrics: true,
});

const result = await predictor.predict({
  keyword: 'bridge inflow',
  chain: 'bsc',
});

console.log(result);
