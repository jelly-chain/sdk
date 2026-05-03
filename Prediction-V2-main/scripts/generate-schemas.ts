import { INPUT_SCHEMA } from '../src/schemas/input.schema.js';
import { OUTPUT_SCHEMA } from '../src/schemas/output.schema.js';
import { EVENT_SCHEMA } from '../src/schemas/event.schema.js';
import { CONFIG_SCHEMA } from '../src/schemas/config.schema.js';

const schemas = { input: INPUT_SCHEMA, output: OUTPUT_SCHEMA, event: EVENT_SCHEMA, config: CONFIG_SCHEMA };

console.log('Generated schemas:');
for (const [name, schema] of Object.entries(schemas)) {
  console.log(`\n=== ${name.toUpperCase()} SCHEMA ===`);
  console.log(JSON.stringify(schema, null, 2));
}
