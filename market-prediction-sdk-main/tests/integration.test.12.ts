// Integration test 12
import { MarketPredictor } from '../src/predictor';

export async function testIntegration12() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 12 completed');
}
