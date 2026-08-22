import { defineConfig } from 'eslint/config';

import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';

export const vitestConfig = defineConfig({
  files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
  extends: [jestDom.configs['flat/recommended']],
  plugins: {
    vitest,
  },
  rules: {
    ...vitest.configs.all.rules,
    '@typescript-eslint/only-throw-error': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'functional/no-loop-statements': 'off',
    'functional/no-throw-statements': 'off',
    'security/detect-object-injection': 'off',
    'vitest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }],
    'vitest/prefer-expect-resolves': 'off',
    'vitest/prefer-expect-assertions': 'off',
    'vitest/prefer-importing-vitest-globals': 'off',
    'vitest/prefer-to-be-falsy': 'off',
    'vitest/prefer-to-be-truthy': 'off',
    'vitest/require-top-level-describe': 'off',
    'vitest/max-expects': 'off',
    'vitest/no-focused-tests': ['error', { fixable: false }],
    'vitest/no-hooks': 'off',
  },
});
