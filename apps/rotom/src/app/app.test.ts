import { render } from '@testing-library/angular';
import { page } from '@vitest/browser/context';
import { App } from './app';
import { axe } from '@natu/axe/vitest';

test('has no accessibility violations', async () => {
  const { container } = await render(App);

  expect(await axe(container)).toHaveNoViolations();
});

test('shows recipes', async () => {
  await render(App);

  const recipeNames = page
    .getByRole('article')
    .elements()
    .map((el) => el.textContent);

  expect(recipeNames).toStrictEqual(['Burger', 'Babaganoush']);
});

test('increments counter', async () => {
  await render(App);

  await page.getByRole('button', { name: 'count is 0' }).click();

  await expect.element(page.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
