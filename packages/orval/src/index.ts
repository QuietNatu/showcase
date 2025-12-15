import { Options } from 'orval';
import { zodOperationNameTransformer } from './zod-transformer';

const targetPath = './src/gen/api';

export const commonApiOptions = {
  output: {
    clean: true,
    target: `${targetPath}/endpoints`,
    schemas: `${targetPath}/models`,
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
      useTypeOverInterfaces: true,
    },
  },
} satisfies Partial<Options>;

export const commonZodOptions = {
  output: {
    client: 'zod',
    fileExtension: '.zod.ts',
    target: `${targetPath}/endpoints`,
    mode: 'tags-split',
    namingConvention: 'kebab-case',
    override: {
      transformer: zodOperationNameTransformer,
    },
  },
  hooks: {
    afterAllFilesWrite: {
      command: `prettier --write ${targetPath}`,
      injectGeneratedDirsAndFiles: false,
    },
  },
} satisfies Partial<Options>;
