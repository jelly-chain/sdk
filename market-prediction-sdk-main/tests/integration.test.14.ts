// Integration test 14
import { MarketPredictor } from '../src/predictor';

export async function testIntegration14() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 14 completed');
}
