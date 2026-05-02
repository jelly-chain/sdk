import { MarketPredictor } from '../src/predictor';

// Test file for MarketPredictor
const predictor = new MarketPredictor({
  dataSources: ['llama-fi', 'bnb-chain-mcp'],
  keywords: ['TVL surge', 'protocol launch']
});

console.log('Predictor test file created');
