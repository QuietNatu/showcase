import { App } from './app';
import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';

import * as stories from './app.stories';
import { composeStories } from '@storybook/react';
import { axe } from '@natu/axe/vitest';

const { Default } = composeStories(stories);

test('has no accessibility violations', async () => {
  const { container } = render(<Default />);

  expect(await axe(container)).toHaveNoViolations();
});

test('increments counter', async () => {
  render(<App />);

  await page.getByRole('button', { name: 'count is 0' }).click();

  await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
