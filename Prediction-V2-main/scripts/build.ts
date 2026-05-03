import { execSync } from 'child_process';

console.log('Building SDK...');
execSync('tsup', { stdio: 'inherit' });
console.log('Build complete.');
