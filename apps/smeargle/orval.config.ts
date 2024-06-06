import { defineConfig } from 'orval';

export default defineConfig({
  showcase: {
    input: '../../openapi.yaml',
    output: {
      clean: true,
      workspace: './src/api',
      target: './api.ts',
      mode: 'tags-split',
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
});
