// Integration test 21
import { MarketPredictor } from '../src/predictor';

export async function testIntegration21() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 21 completed');
}
