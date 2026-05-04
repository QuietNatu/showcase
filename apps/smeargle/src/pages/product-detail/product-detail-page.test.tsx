import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { MockRouter } from '../../mocks/router';
import { ProductDetailPage } from './product-detail-page';

test('renders content', async () => {
  await render(
    <MockRouter>
      <ProductDetailPage />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Product' })).toBeInTheDocument();
});
