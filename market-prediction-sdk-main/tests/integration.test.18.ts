// Integration test 18
import { MarketPredictor } from '../src/predictor';

export async function testIntegration18() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 18 completed');
}
