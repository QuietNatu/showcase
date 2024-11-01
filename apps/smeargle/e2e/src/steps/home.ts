import { expect } from '@playwright/test';
import { Given, Then, When } from '../fixtures';

Given('I open the homepage', async ({ page }) => {
  await page.goto('');
});

When('I click a button with name {string}', async ({ page }, name: string) => {
  await page.getByRole('button', { name }).click();
});

Then('I see a button with name {string}', async ({ page }, name: string) => {
  await expect(page.getByRole('button', { name })).toBeVisible();
});
