import type { CreateStorybookVrtPlansOptions, VrtVariant } from '@natu/vrt';
import { createStorybookVrtPlans } from '@natu/vrt';

type VariantOption = { key: 'theme'; value: 'smeargle' | 'smeargle-dark' };

export const defaultAppVrtVariants: VrtVariant<VariantOption>[] = [
  {
    options: [
      { id: 'smeargle', data: { key: 'theme', value: 'smeargle' } },
      { id: 'smeargle-dark', data: { key: 'theme', value: 'smeargle-dark' } },
    ],
  },
];

/**
 *
 */
export function createAppVrtPlans(options: CreateStorybookVrtPlansOptions<VariantOption>) {
  return createStorybookVrtPlans({
    ...options,
    variants: options.variants ?? defaultAppVrtVariants,
  });
}
