import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppLayout } from '../../app/layouts/app-layout';
import { MockRouter } from '../../mocks/router';
import { ProductDetailPage } from './product-detail-page';

const meta = {
  title: 'Pages/Product Detail',
  component: ProductDetailPage,
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
} satisfies Meta<typeof ProductDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
