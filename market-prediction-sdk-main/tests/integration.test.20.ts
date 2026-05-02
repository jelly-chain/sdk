// Integration test 20
import { MarketPredictor } from '../src/predictor';

export async function testIntegration20() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 20 completed');
}
