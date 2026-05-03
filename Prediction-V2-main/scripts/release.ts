import { execSync } from 'child_process';

console.log('Running release process...');
execSync('npx changeset version', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });
execSync('npx changeset publish', { stdio: 'inherit' });
console.log('Release complete.');
