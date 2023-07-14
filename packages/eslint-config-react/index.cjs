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
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:functional/external-typescript-recommended',
    'plugin:functional/recommended',
    'plugin:functional/stylistic',
    'plugin:storybook/recommended',
    'plugin:sonarjs/recommended',
    'prettier', // should be last to override the other configs
  ],
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    'jsx-a11y',
    '@typescript-eslint',
    'unused-imports',
    'functional',
    'sonarjs',
  ],
  rules: {
    'no-console': 'warn',
    'react/button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: false,
      },
    ],
    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@testing-library/react',
            importNames: ['render', 'renderHook'],
            message: 'use our test helpers.',
          },
          {
            name: 'react-dom/test-utils',
            message: 'use testing library instead.',
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
    'functional/functional-parameters': ['error', { enforceParameterCount: false }],
    'functional/no-expression-statements': 'off',
    'functional/no-conditional-statements': 'off',
    'functional/no-return-void': 'off',
    'functional/no-mixed-types': 'off',
    'functional/prefer-immutable-types': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.test.[jt]s?(x)'],
      extends: [
        'plugin:vitest/recommended',
        'plugin:vitest/all',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      plugins: ['vitest', 'jest-dom'],
      rules: {
        'vitest/consistent-test-it': ['error', { fn: 'test' }],
        'testing-library/no-manual-cleanup': 'error',
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
