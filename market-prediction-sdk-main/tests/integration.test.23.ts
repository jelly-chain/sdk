// Integration test 23
import { MarketPredictor } from '../src/predictor';

export async function testIntegration23() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 23 completed');
}
