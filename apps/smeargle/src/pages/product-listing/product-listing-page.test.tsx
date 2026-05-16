import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { createMockProduct } from '../../mocks/api/factories/product-factory';
import { MockRouter } from '../../mocks/router';
import { ProductListingPage } from './product-listing-page';

test('renders content', async () => {
  const products = Array.from({ length: 3 }, () => createMockProduct());

  await render(
    <MockRouter>
      <ProductListingPage products={products} />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Products' })).toBeInTheDocument();

  await expect.element(page.getByText('Product count: 3')).toBeInTheDocument();
});
