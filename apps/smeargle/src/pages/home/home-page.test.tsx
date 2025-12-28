import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MockRouter } from '../../mocks/router';
import { page } from 'vitest/browser';
import { HomePage } from './home-page';

test('renders', async () => {
  await render(
    <MockRouter>
      <HomePage />
    </MockRouter>,
  );

  await expect.element(page.getByRole('heading', { name: 'Showcase' })).toBeInTheDocument();
});
