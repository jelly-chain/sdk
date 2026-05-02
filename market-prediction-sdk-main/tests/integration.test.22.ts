// Integration test 22
import { MarketPredictor } from '../src/predictor';

export async function testIntegration22() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 22 completed');
}
