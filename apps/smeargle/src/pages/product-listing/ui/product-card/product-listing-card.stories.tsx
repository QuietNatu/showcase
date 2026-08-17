import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { createMockProduct } from '../../../../mocks/api/factories/product-factory';
import { MockRouter } from '../../../../mocks/router';
import { ProductListingCard } from './product-listing-card';

const product = createMockProduct();

const meta = {
  title: 'Pages/Product Listing/Card',
  component: ProductListingCard,
  decorators: [
    (Story) => (
      <MockRouter>
        <div style={{ maxWidth: '400px' }}>
          <Story />
        </div>
      </MockRouter>
    ),
  ],
  args: {
    imageUrl: product.imageUrl,
    name: product.name,
    slug: product.slug,
    onAddToCart: fn(),
  },
} satisfies Meta<typeof ProductListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
