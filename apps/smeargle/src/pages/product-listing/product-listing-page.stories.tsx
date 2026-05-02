import type { Meta, StoryObj } from '@storybook/react-vite';

import { MockRouter } from '../../mocks/router';
import { ProductListingPage } from './product-listing-page';
import { AppLayout } from '../../app/layouts/app-layout';

const meta = {
  title: 'Pages/Products/List',
  component: () => (
    <MockRouter>
      <AppLayout>
        <ProductListingPage products={[]} />
      </AppLayout>
    </MockRouter>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
