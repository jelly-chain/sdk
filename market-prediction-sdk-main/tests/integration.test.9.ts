// Integration test 9
import { MarketPredictor } from '../src/predictor';

export async function testIntegration9() {
  const predictor = new MarketPredictor({
    dataSources: ['llama-fi'],
    keywords: ['test']
  });
  console.log('Test 9 completed');
}
