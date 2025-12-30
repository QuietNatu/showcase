import type { Meta, StoryObj } from '@storybook/react-vite';

import { MockRouter } from '../../../mocks/router';
import { ProductListPage } from './product-list-page';
import { AppLayout } from '../../../app/layouts/app-layout';

// TODO: App layout here or not?

const meta = {
  title: 'Pages/Products/List',
  component: () => (
    <MockRouter>
      <AppLayout>
        <ProductListPage products={[]} />
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
