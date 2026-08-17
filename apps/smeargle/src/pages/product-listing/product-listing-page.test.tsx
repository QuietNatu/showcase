import { axe } from '@natu/axe/vitest';

import type { ComponentProps } from 'react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { createMockProduct } from '../../mocks/api/factories/product-factory';
import { MockRouter } from '../../mocks/router';
import { ProductListingPage } from './product-listing-page';

type SetupOptions = Partial<Pick<ComponentProps<typeof ProductListingPage>, 'products'>>;

const setup = async (options: SetupOptions = {}) => {
  const products = Array.from({ length: 3 }, () => createMockProduct());

  return await render(
    <MockRouter>
      <ProductListingPage products={options.products ?? products} />
    </MockRouter>,
  );
};

test('has no accessibility violations', async () => {
  const { container } = await setup();

  expect(await axe(container)).toHaveNoViolations();
});

test('renders content', async () => {
  const products = Array.from({ length: 3 }, () => createMockProduct());

  await setup({ products });

  await expect.element(page.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
  await expect.element(page.getByText('Product count: 3')).toBeInTheDocument();
  await expect.element(page.getByRole('list')).toBeInTheDocument();
  await expect.element(page.getByRole('listitem')).toHaveLength(3);
});
