import { defineConfig } from 'orval';
import { commonApiOptions, commonZodOptions } from '@natu/orval';
import { openApiPath } from '@natu/api-contracts';

export default defineConfig({
  api: {
    ...commonApiOptions,
    input: openApiPath,
    output: {
      ...commonApiOptions.output,
      client: 'angular',
    },
  },

  apiZod: {
    ...commonZodOptions,
    input: openApiPath,
  },
});
