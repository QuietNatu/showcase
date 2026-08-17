import type { Meta, StoryObj } from '@storybook/react-vite';

import { createMockProduct } from '../../../../mocks/api/factories/product-factory';
import { MockRouter } from '../../../../mocks/router';
import { ProductListingGrid } from './product-listing-grid';

const products = Array.from({ length: 5 }, createMockProduct);

const meta = {
  title: 'Pages/Product Listing/Grid',
  component: ProductListingGrid,
  decorators: [
    (Story) => (
      <MockRouter>
        <Story />
      </MockRouter>
    ),
  ],
  args: {
    products,
  },
} satisfies Meta<typeof ProductListingGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
