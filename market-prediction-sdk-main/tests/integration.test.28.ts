// Integration test 28
import { MarketPredictor } from '../src/predictor';

export async function testIntegration28() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 28 completed');
}
