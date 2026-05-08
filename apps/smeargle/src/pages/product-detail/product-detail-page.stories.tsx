import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppLayout } from '../../app/layouts/app-layout';
import { MockRouter } from '../../mocks/router';
import { ProductDetailPage } from './product-detail-page';

const meta = {
  title: 'Pages/Products/Detail',
  component: () => (
    <MockRouter>
      <AppLayout>
        <ProductDetailPage />
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
