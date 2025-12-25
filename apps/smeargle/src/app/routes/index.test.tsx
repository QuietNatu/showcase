import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MockRouter } from '../../mocks/router';
import { page } from 'vitest/browser';

// TODO: allow running in NODE env

test('renders', async () => {
  await render(<MockRouter initialEntry="/" />);

  await expect.element(page.getByRole('heading', { name: 'Showcase' })).toBeInTheDocument();
});
