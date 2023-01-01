import { test, expect } from '@playwright/test';

test('increments count', async ({ page }) => {
  await page.goto('');

  await expect(page.getByText('Vite + React')).toHaveCount(1);
});
