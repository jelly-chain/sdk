// Integration test 13
import { MarketPredictor } from '../src/predictor';

export async function testIntegration13() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 13 completed');
}
