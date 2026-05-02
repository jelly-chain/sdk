// Integration test 8
import { MarketPredictor } from '../src/predictor';

export async function testIntegration8() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 8 completed');
}
