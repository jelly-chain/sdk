// Integration test 29
import { MarketPredictor } from '../src/predictor';

export async function testIntegration29() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 29 completed');
}
