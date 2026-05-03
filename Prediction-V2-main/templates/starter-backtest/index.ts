import { WMarketPredictor } from 'wmarket-prediction-sdk';
import { BacktestRunner } from 'wmarket-prediction-sdk';
import { ScenarioLoader } from 'wmarket-prediction-sdk';
import { buildBacktestReport } from 'wmarket-prediction-sdk';

const predictor = new WMarketPredictor({ chains: ['bsc'] });
const loader = new ScenarioLoader();
const runner = new BacktestRunner();

const scenarios = loader.generate(10);
const results = await runner.run(scenarios, (input) => predictor.predict(input));
const report = buildBacktestReport(results);

console.log(report.summary);
console.log('By signal:', report.bySignal);
