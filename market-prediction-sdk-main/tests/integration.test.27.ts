// Integration test 27
import { MarketPredictor } from '../src/predictor';

export async function testIntegration27() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 27 completed');
}
