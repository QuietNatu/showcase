import { render } from '@testing-library/angular';
import { page } from '@vitest/browser/context';
import { App } from './app';

describe(App.name, () => {
  test('shows recipes', async () => {
    await render(App);

    const recipeNames = page
      .getByRole('article')
      .elements()
      .map((el) => el.textContent);

    expect(recipeNames).toEqual(['Burger', 'Babaganoush']);
  });
});
