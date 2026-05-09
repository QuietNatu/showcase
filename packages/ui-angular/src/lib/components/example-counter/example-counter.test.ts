import { axe } from '@natu/axe/vitest';

import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-angular';

import { ExampleCounter } from './example-counter';

test('has no accessibility violations', async () => {
  const { container } = await render(ExampleCounter);

  expect(await axe(container)).toHaveNoViolations();
});

test('increments counter', async () => {
  await render(ExampleCounter);

  await page.getByRole('button', { name: 'count is 0' }).click();

  await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
