// Integration test 4
import { MarketPredictor } from '../src/predictor';

export async function testIntegration4() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 4 completed');
}
