// Integration test 6
import { MarketPredictor } from '../src/predictor';

export async function testIntegration6() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 6 completed');
}
