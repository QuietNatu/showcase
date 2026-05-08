import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppLayout } from '../../app/layouts/app-layout';
import { MockRouter } from '../../mocks/router';
import { HomePage } from './home-page';

const meta = {
  title: 'Pages/Home',
  component: () => (
    <MockRouter>
      <AppLayout>
        <HomePage />
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
