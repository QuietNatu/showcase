import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppLayout } from '../../app/layouts/app-layout';
import { MockRouter } from '../../mocks/router';
import { ProductListingPage } from './product-listing-page';

const meta = {
  title: 'Pages/Product Listing',
  component: ProductListingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <MockRouter>
        <AppLayout>
          <Story />
        </AppLayout>
      </MockRouter>
    ),
  ],
  args: {
    products: [],
  },
} satisfies Meta<typeof ProductListingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
