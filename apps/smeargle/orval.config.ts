import { defineConfig } from 'orval';
import { commonApiOptions, commonZodOptions } from '@natu/orval';
import { openApiPath } from '@natu/api-contracts';

export default defineConfig({
  api: {
    ...commonApiOptions,
    input: openApiPath,
    output: {
      ...commonApiOptions.output,
      client: 'axios-functions',
      baseUrl: '/api',
      override: {
        ...commonApiOptions.output.override,
        mutator: {
          path: './src/shared/api/lib/mutator.ts',
          name: 'apiClientMutator',
        },
      },
    },
  },

  apiZod: {
    ...commonZodOptions,
    input: openApiPath,
  },
});
