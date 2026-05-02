// Integration test 10
import { MarketPredictor } from '../src/predictor';

export async function testIntegration10() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 10 completed');
}
