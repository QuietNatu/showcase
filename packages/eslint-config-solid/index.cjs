module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:solid/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:functional/external-typescript-recommended',
    'plugin:functional/recommended',
    'plugin:functional/stylistic',
    'plugin:storybook/recommended',
    'plugin:sonarjs/recommended',
    'prettier', // should be last to override the other configs
  ],
  plugins: ['@typescript-eslint', 'solid', 'jsx-a11y', 'unused-imports', 'functional', 'sonarjs'],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@solidjs/testing-library',
            importNames: ['render', 'renderHook', 'renderDirective'],
            message: 'use our test helpers.',
          },
          {
            name: '@testing-library/user-event',
            message: 'use our test helpers.',
          },
          {
            name: 'vitest-axe',
            importNames: ['axe'],
            message: 'use our axe wrapper.',
          },
        ],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'functional/functional-parameters': [
      'error',
      { allowRestParameter: true, enforceParameterCount: false },
    ],
    'functional/no-expression-statements': 'off',
    'functional/no-conditional-statements': 'off',
    'functional/no-return-void': 'off',
    'functional/no-mixed-types': 'off',
    'functional/prefer-immutable-types': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.test.[jt]s?(x)'],
      extends: ['plugin:vitest/recommended', 'plugin:vitest/all', 'plugin:jest-dom/recommended'],
      plugins: ['vitest', 'jest-dom'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
        'vitest/consistent-test-it': ['error', { fn: 'test' }],
        'vitest/prefer-expect-resolves': 'off',
        'vitest/prefer-expect-assertions': 'off',
        'vitest/prefer-to-be-falsy': 'off',
        'vitest/prefer-to-be-truthy': 'off',
        'vitest/require-top-level-describe': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'functional/no-expression-statements': 'off',
      },
    },
    {
      files: ['src/**/*.stories.[jt]s?(x)'],
      extends: [],
      rules: {},
    },
    {
      files: ['{e2e,vrt}/**/*'],
      extends: ['plugin:playwright/recommended'],
      rules: {},
    },
  ],
};
