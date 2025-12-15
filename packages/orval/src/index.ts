import { Options } from 'orval';

export const commonApiOptions = {
  output: {
    clean: true,
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
} satisfies Partial<Options>;

export const commonZodOptions = {
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
} satisfies Partial<Options>;
