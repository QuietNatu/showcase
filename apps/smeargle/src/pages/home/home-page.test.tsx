import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { MockRouter } from '../../mocks/router';
import { HomePage } from './home-page';

test('renders content', async () => {
  await render(
    <MockRouter>
      <HomePage />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Showcase' })).toBeInTheDocument();
});
