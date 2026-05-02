// Integration test 1
import { MarketPredictor } from '../src/predictor';

export async function testIntegration1() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 1 completed');
}
