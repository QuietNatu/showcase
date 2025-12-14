import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: '../api/openapi.yaml',
    output: {
      clean: true,
      client: 'angular',
      target: './src/gen/api/endpoints',
      schemas: './src/gen/api/models',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      indexFiles: false,
      mock: {
        type: 'msw',
        delay: false,
        useExamples: false,
      },
      override: {
        components: {
          schemas: {
            suffix: 'Dto',
          },
          responses: {
            suffix: 'Response',
          },
          parameters: {
            suffix: 'Params',
          },
          requestBodies: {
            suffix: 'Bodies',
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },

  apiZod: {
    input: '../api/openapi.yaml',
    output: {
      client: 'zod',
      fileExtension: '.zod.ts',
      target: './src/gen/api/endpoints',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
