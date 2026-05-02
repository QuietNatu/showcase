import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MockRouter } from '../../mocks/router';
import { page } from 'vitest/browser';
import { ProductListingPage } from './product-listing-page';
import { createProductMock } from '../../mocks/api/factories/product-factory';

test('renders content', async () => {
  const products = Array.from({ length: 3 }, () => createProductMock());

  await render(
    <MockRouter>
      <ProductListingPage products={products} />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
  await expect.element(page.getByText('Product count: 3')).toBeInTheDocument();
});
