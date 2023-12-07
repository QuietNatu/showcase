import { configureAxe as _configureAxe } from 'vitest-axe';
import { axeRulesObject } from '../../a11y/a11y';

export const axe = _configureAxe({
  rules: {
    ...axeRulesObject,
    'aria-allowed-role': { enabled: false },
    region: { enabled: false },
  },
});
