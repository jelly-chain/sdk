// Integration test 16
import { MarketPredictor } from '../src/predictor';

export async function testIntegration16() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 16 completed');
}
