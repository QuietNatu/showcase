import { axe } from '@natu/axe/vitest';

import type { ComponentProps } from 'react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { createMockProduct } from '../../../../mocks/api/factories/product-factory';
import { MockRouter } from '../../../../mocks/router';
import type { ProductDto } from '../../../../shared/api/gen/models/product-dto.zod';
import { ProductListingGrid } from './product-listing-grid';

type SetupOptions = Partial<Pick<ComponentProps<typeof ProductListingGrid>, 'products'>>;

const setup = async (options: SetupOptions = {}) => {
  const products = Array.from({ length: 3 }, () => createMockProduct());

  return await render(
    <MockRouter>
      <ProductListingGrid products={options.products ?? products} />
    </MockRouter>,
  );
};

test('has no accessibility violations', async () => {
  const { container } = await setup();

  expect(await axe(container)).toHaveNoViolations();
});

test('renders product list', async () => {
  const products: ProductDto[] = [
    createMockProduct({ name: 'Product 1' }),
    createMockProduct({ name: 'Product 2' }),
    createMockProduct({ name: 'Product 3' }),
  ];

  await setup({ products });

  await expect.element(page.getByRole('list')).toBeInTheDocument();
  await expect.element(page.getByRole('listitem')).toHaveLength(3);

  for (const product of products) {
    await expect.element(page.getByRole('listitem').getByText(product.name)).toBeInTheDocument();
  }
});
