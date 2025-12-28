import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MockRouter } from '../../../mocks/router';
import { page } from 'vitest/browser';
import { ProductDetailPage } from './product-detail-page';

test('renders', async () => {
  await render(
    <MockRouter>
      <ProductDetailPage />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Product' })).toBeInTheDocument();
});
