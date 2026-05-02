// Integration test 3
import { MarketPredictor } from '../src/predictor';

export async function testIntegration3() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 3 completed');
}
