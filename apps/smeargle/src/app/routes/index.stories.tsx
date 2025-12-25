import type { Meta, StoryObj } from '@storybook/react-vite';

import { MockRouter } from '../../mocks/router';

const meta = {
  title: 'Routes/Home',
  component: () => <MockRouter initialEntry="/" />,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
