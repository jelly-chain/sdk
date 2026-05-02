// Integration test 2
import { MarketPredictor } from '../src/predictor';

export async function testIntegration2() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 2 completed');
}
