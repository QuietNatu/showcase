import { OverrideOutput } from 'orval';

/**
 * Workaroud for Orval's zod client that does not support overriding generated function names to add suffixes.
 * Add **Schema** to the generated function names so it is easier to distinguish from other generated code.
 */
export const zodOperationNameTransformer: OverrideOutput['transformer'] = (verbOptions) => {
  return {
    ...verbOptions,
    typeName: `${verbOptions.typeName}Schema`,
  };
};
