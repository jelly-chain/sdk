// Integration test 17
import { MarketPredictor } from '../src/predictor';

export async function testIntegration17() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 17 completed');
}
