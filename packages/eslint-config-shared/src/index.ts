/// <reference path="./types.d.ts" />

import { angularConfig } from './configs/angular';
import { baseConfig } from './configs/base';
import { playwrightConfig } from './configs/playwright';
import { reactConfig } from './configs/react';
import { storybookConfig } from './configs/storybook';
import { vitestConfig } from './configs/vitest';
import { vrtConfig } from './configs/vrt';
import { buildRestrictedPatterns } from './utils/restricted-imports';

export default {
  configs: {
    angular: angularConfig,
    base: baseConfig,
    react: reactConfig,
    storybook: storybookConfig,
    vitest: vitestConfig,
    playwright: playwrightConfig,
    vrt: vrtConfig,
  },
  utils: {
    buildRestrictedPatterns,
  },
};
