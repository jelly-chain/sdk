// Integration test 26
import { MarketPredictor } from '../src/predictor';

export async function testIntegration26() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 26 completed');
}
