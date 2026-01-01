import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MockRouter } from '../../mocks/router';
import { page } from 'vitest/browser';
import { ProductListingPage } from './product-listing-page';

test('renders', async () => {
  await render(
    <MockRouter>
      <ProductListingPage products={[]} />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
});
