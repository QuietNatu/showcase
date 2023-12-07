import { A11yParameters } from '@storybook/addon-a11y';
import { axeRules } from '../../a11y/a11y';

export const storyA11yConfig: A11yParameters = {
  config: { rules: axeRules },
};
