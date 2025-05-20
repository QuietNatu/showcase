import { ExampleCounter } from './example-counter';
import { render } from '@testing-library/angular';
import { page } from '@vitest/browser/context';
import { axe } from '@natu/axe/vitest';

test('has no accessibility violations', async () => {
  const { container } = await render(ExampleCounter);

  expect(await axe(container)).toHaveNoViolations();
});

test('increments counter', async () => {
  await render(ExampleCounter);

  await page.getByRole('button', { name: 'count is 0' }).click();

  await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
