module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'turbo',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:rxjs/recommended',
        'plugin:functional/external-typescript-recommended',
        'plugin:functional/recommended',
        'plugin:functional/stylistic',
        'plugin:storybook/recommended',
        'plugin:sonarjs/recommended',
        'prettier', // should be last to override the other configs
      ],
      plugins: [
        '@typescript-eslint',
        '@ngneat/reactive-forms',
        'unused-imports',
        'functional',
        'sonarjs',
      ],
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
                name: '@testing-library/angular',
                importNames: ['render'],
                message: 'use our test helpers.',
              },
              {
                name: '@testing-library/user-event',
                message: 'use our test helpers.',
              },
              {
                name: 'jasmine-axe',
                importNames: ['axe'],
                message: 'use our axe wrapper.',
              },
            ],
            patterns: [
              {
                group: [
                  '**/environments/*',
                  '!**/environments/environment',
                  '!**/environments/environment-types',
                ],
                message: 'import environments/environment',
              },
            ],
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            prefix: 'app',
            style: 'kebab-case',
            type: ['attribute', 'element'],
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            prefix: 'app',
            style: 'camelCase',
            type: ['attribute', 'element'],
          },
        ],
        '@angular-eslint/prefer-on-push-component-change-detection': 'error',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@ngneat/reactive-forms/no-angular-forms-imports': 'error',
        'rxjs/ban-observables': ['error', { first: true }],
        'rxjs/finnish': [
          'error',
          {
            functions: false,
            methods: false,
            parameters: true,
            properties: true,
            strict: false,
            variables: true,
            types: {
              '^EventEmitter$': false,
            },
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
        'functional/no-classes': 'off',
        'functional/immutable-data': ['error', { ignoreClasses: true }],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {
        '@angular-eslint/template/use-track-by-function': 'error',
      },
    },
    {
      files: ['src/**/*.test.ts'],
      extends: ['plugin:jasmine/recommended', 'plugin:testing-library/angular'],
      plugins: ['@typescript-eslint', 'jasmine', 'testing-library', 'functional', 'sonarjs'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        'functional/no-throw-statements': 'off',
        'functional/immutable-data': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'testing-library/no-await-sync-events': 'off',
      },
    },
    {
      files: ['*.stories.[jt]s?(x)'],
      extends: [],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
    {
      files: ['{e2e,vrt}/**/*'],
      extends: ['plugin:playwright/recommended'],
      rules: {},
    },
  ],
};
