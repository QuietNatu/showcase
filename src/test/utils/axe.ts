import { configureAxe as _configureAxe } from 'jest-axe';

export const axe = _configureAxe({
  rules: {
    'aria-allowed-role': { enabled: false },
    region: { enabled: false },
  },
});
