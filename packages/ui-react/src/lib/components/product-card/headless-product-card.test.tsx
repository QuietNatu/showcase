import { axe } from '@natu/axe/vitest';

import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import {
  NatuHeadlessProductCardHeading,
  NatuHeadlessProductCardInteractable,
  NatuHeadlessProductCardLink,
  NatuHeadlessProductCardRoot,
} from './headless-product-card';

const setup = async () => {
  return await render(
    <NatuHeadlessProductCardRoot>
      <NatuHeadlessProductCardLink href="." />
      <NatuHeadlessProductCardHeading>Example headline</NatuHeadlessProductCardHeading>

      <NatuHeadlessProductCardInteractable
        render={
          /* TODO: remove hardcoded style once button styles are added */
          <button type="button" style={{ height: '24px' }}>
            Add to cart
          </button>
        }
      ></NatuHeadlessProductCardInteractable>
    </NatuHeadlessProductCardRoot>,
  );
};

test('has no accessibility violations', async () => {
  const { container } = await setup();

  expect(await axe(container)).toHaveNoViolations();
});

test('renders content', async () => {
  await setup();

  await expect.element(page.getByRole('article')).toBeInTheDocument();
  await expect.element(page.getByRole('link', { name: 'Example headline' })).toBeInTheDocument();
  await expect.element(page.getByRole('heading', { name: 'Example headline' })).toBeInTheDocument();
  await expect.element(page.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
});

test('product link is labelled by the product heading', async () => {
  await setup();

  const link = page.getByRole('link', { name: 'Example headline' });
  const heading = page.getByRole('heading', { name: 'Example headline' });

  const headingElement = await heading.findElement();
  const headingId = headingElement.id;

  await expect.element(link).toHaveAttribute('aria-labelledby', headingId);
});
