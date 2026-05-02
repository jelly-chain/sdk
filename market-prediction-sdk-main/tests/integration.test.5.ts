// Integration test 5
import { MarketPredictor } from '../src/predictor';

export async function testIntegration5() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 5 completed');
}
