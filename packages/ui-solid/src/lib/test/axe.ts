import { configureAxe as _configureAxe } from 'vitest-axe';

export const axe = _configureAxe({
  rules: {
    'aria-allowed-role': { enabled: false },
    'color-contrast': { enabled: false },
    'color-contrast-enhanced': { enabled: false },
    region: { enabled: false },
    'target-size': { enabled: false },
  },
});
