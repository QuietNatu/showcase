import App from './app';
import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';

import * as stories from './app.stories';
import { composeStories } from '@storybook/react';

const { Default } = composeStories(stories);

describe(App.name, () => {
  test('increments counter', async () => {
    render(<App />);

    await page.getByRole('button', { name: 'count is 0' }).click();

    await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });

  test('increments counter with story', async () => {
    render(<Default />);

    await page.getByRole('button', { name: 'count is 0' }).click();

    await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});
