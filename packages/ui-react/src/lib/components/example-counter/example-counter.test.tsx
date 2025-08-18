import { test, expect } from 'vitest';
import { ExampleCounter } from './example-counter';
import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import * as stories from './example-counter.stories';
import { composeStories } from '@storybook/react-vite';
import { axe } from '@natu/axe/vitest';

const { Default } = composeStories(stories);

test('has no accessibility violations', async () => {
  const { container } = render(<Default />);

  expect(await axe(container)).toHaveNoViolations();
});

test('increments counter', async () => {
  render(<ExampleCounter />);

  await page.getByRole('button', { name: 'count is 0' }).click();

  await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
