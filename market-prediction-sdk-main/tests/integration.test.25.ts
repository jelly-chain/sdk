// Integration test 25
import { MarketPredictor } from '../src/predictor';

export async function testIntegration25() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 25 completed');
}
