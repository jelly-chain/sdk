// Integration test 30
import { MarketPredictor } from '../src/predictor';

export async function testIntegration30() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 30 completed');
}
