import type { Meta, StoryObj } from '@storybook/react-vite';

import { MockRouter } from '../../../../mocks/router';

const meta = {
  title: 'Routes/Products/Details',
  component: () => <MockRouter initialEntries={['/products/example-product']} />,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
