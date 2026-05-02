// Integration test 24
import { MarketPredictor } from '../src/predictor';

export async function testIntegration24() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 24 completed');
}
