import { configureAxe as _configureAxe } from 'jasmine-axe';
import { axeRulesObject } from '../../a11y/a11y';

export const axe = _configureAxe({
  rules: {
    ...axeRulesObject,
    'aria-allowed-role': { enabled: false },
    'color-contrast': { enabled: false },
    'color-contrast-enhanced': { enabled: false },
    region: { enabled: false },
    'target-size': { enabled: false },
  },
});
