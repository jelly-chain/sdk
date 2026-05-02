// Integration test 7
import { MarketPredictor } from '../src/predictor';

export async function testIntegration7() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 7 completed');
}
