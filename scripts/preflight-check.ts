// This script is meant to run directly with Node. Node now supports running directly TS files that use erasable syntax only.
// To ensure only erasable types are used, set erasableSyntaxOnly tsconfig option to true.

import { execSync } from 'child_process';
import { styleText } from 'util';

process.env.FORCE_COLOR = '1';
process.env.CI = '1';

function run(command: string) {
  execSync(command, { stdio: 'inherit' });
}

try {
  // change to pnpm ci once it is implemented
  run('pnpm i --frozen-lockfile');
  run('pnpm exec playwright install');
  run('pnpm run lint');
  run('pnpm run test');
  run('pnpm run build');
  // pnpm run vrt
  // // it seems there is some conflict with lighthouse when running without a filter and turbo has bugs when using concurrency=1
  // pnpm run lighthouse-mobile --filter rotom
  // pnpm run lighthouse-mobile --filter smeargle
  // pnpm run lighthouse-desktop --filter rotom
  // pnpm run lighthouse-desktop --filter smeargle
  // pnpm run e2e

  console.log('\n' + styleText('green', 'preflight-check success'));
} catch {
  console.error(styleText('red', 'preflight-check failed'));
  process.exit(1);
}
