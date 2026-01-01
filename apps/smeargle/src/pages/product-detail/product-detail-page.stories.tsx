import type { Meta, StoryObj } from '@storybook/react-vite';

import { MockRouter } from '../../mocks/router';
import { ProductDetailPage } from './product-detail-page';
import { AppLayout } from '../../app/layouts/app-layout';

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
