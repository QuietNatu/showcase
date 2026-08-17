import { axe } from '@natu/axe/vitest';

import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { NatuProductCard } from '.';

const setup = async () => {
  return await render(
    <NatuProductCard.Root>
      <NatuProductCard.Link href="." />

      <NatuProductCard.Media>
        <NatuProductCard.Image alt="Example image" src="." />
      </NatuProductCard.Media>

      <NatuProductCard.Body>
        <NatuProductCard.Heading>Example headline</NatuProductCard.Heading>

        <NatuProductCard.Interactable
          render={
            /* TODO: remove hardcoded style once button styles are added */
            <button type="button" style={{ height: '24px' }}>
              Add to Cart
            </button>
          }
        />
      </NatuProductCard.Body>
    </NatuProductCard.Root>,
  );
};

test('has no accessibility violations', async () => {
  const { container } = await setup();

  expect(await axe(container)).toHaveNoViolations();
});

test('renders content', async () => {
  await setup();

  await expect.element(page.getByRole('article')).toBeInTheDocument();
  await expect.element(page.getByAltText('Example image')).toBeInTheDocument();
  await expect.element(page.getByRole('link', { name: 'Example headline' })).toBeInTheDocument();
  await expect.element(page.getByRole('heading', { name: 'Example headline' })).toBeInTheDocument();
  await expect.element(page.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
});
