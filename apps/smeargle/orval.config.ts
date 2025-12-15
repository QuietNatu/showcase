import { defineConfig } from 'orval';
import { commonApiOptions, commonZodOptions } from '@natu/orval';

export default defineConfig({
  api: {
    ...commonApiOptions,
    input: '../api/openapi.yaml',
    output: {
      ...commonApiOptions.output,
      client: 'axios-functions',
    },
  },

  apiZod: {
    ...commonZodOptions,
    input: '../api/openapi.yaml',
  },
});
