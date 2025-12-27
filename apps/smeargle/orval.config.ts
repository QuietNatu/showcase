import { defineConfig } from 'orval';
import { commonApiOptions, commonZodOptions } from '@natu/orval';

export default defineConfig({
  api: {
    ...commonApiOptions,
    input: '../api/openapi.yaml',
    output: {
      ...commonApiOptions.output,
      client: 'axios-functions',
      baseUrl: '/api',
      override: {
        ...commonApiOptions.output.override,
        mutator: {
          path: './src/api/mutator/custom-client.ts',
          name: 'customClient',
        },
      },
    },
  },

  apiZod: {
    ...commonZodOptions,
    input: '../api/openapi.yaml',
  },
});
