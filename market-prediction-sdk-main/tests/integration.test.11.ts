// Integration test 11
import { MarketPredictor } from '../src/predictor';

export async function testIntegration11() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 11 completed');
}
