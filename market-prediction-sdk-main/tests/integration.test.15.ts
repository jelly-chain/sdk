// Integration test 15
import { MarketPredictor } from '../src/predictor';

export async function testIntegration15() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 15 completed');
}
