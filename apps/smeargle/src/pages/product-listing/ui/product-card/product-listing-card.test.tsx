import { axe } from '@natu/axe/vitest';

import type { ComponentProps } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { createMockProduct } from '../../../../mocks/api/factories/product-factory';
import { MockRouter } from '../../../../mocks/router';
import { ProductListingCard } from './product-listing-card';

type SetupOptions = Partial<
  Pick<ComponentProps<typeof ProductListingCard>, 'imageUrl' | 'name' | 'slug'>
>;

const setup = async (options: SetupOptions = {}) => {
  const product = createMockProduct();
  const mockOnAddToCart = vi.fn<() => void>();

  const result = await render(
    <MockRouter>
      <ProductListingCard
        imageUrl={options.imageUrl ?? product.imageUrl}
        name={options.name ?? product.name}
        slug={options.slug ?? product.slug}
        onAddToCart={mockOnAddToCart}
      />
    </MockRouter>,
  );

  return { ...result, mockOnAddToCart };
};

test('has no accessibility violations', async () => {
  const { container } = await setup();

  expect(await axe(container)).toHaveNoViolations();
});

test('renders card', async () => {
  await setup({ name: 'Example product' });

  await expect.element(page.getByRole('article')).toBeInTheDocument();
  await expect.element(page.getByAltText('Example product')).toBeInTheDocument();
  await expect.element(page.getByRole('link', { name: 'Example product' })).toBeInTheDocument();
  await expect.element(page.getByRole('heading', { name: 'Example product' })).toBeInTheDocument();
  await expect.element(page.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
});

test('links to the product details page for the given product slug', async () => {
  await setup({ name: 'Example product', slug: 'example_product' });

  await expect
    .element(page.getByRole('link', { name: 'Example product' }))
    .toHaveAttribute('href', '/products/example_product');
});

test('renders the product image using the provided url', async () => {
  await setup({ name: 'Example product', imageUrl: 'https://example.com' });

  await expect
    .element(page.getByAltText('Example product'))
    .toHaveAttribute('src', 'https://example.com');
});

describe('when clicking add to cart button', () => {
  test('triggers callback', async () => {
    const { mockOnAddToCart } = await setup({ name: 'Example product' });

    expect(mockOnAddToCart).toHaveBeenCalledTimes(0);

    await page.getByRole('button', { name: 'Add to cart' }).click();

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });
});
