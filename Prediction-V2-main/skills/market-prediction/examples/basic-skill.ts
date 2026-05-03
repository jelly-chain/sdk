import { bootstrapSkill } from '../index.js';

async function main() {
  const skill = bootstrapSkill();
  const result = await skill.predictByKeyword('bridge inflow', 'bsc');
  console.log('Prediction result:', JSON.stringify(result, null, 2));
  console.log('Metrics:', skill.getMetrics());
}

main().catch(console.error);
