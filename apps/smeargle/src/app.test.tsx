import App from './app';
import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';

describe(App.name, () => {
  test('increments counter', async () => {
    render(<App />);

    await page.getByRole('button', { name: 'count is 0' }).click();

    await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});
