import type { Meta, StoryObj } from '@storybook/react';
import { NatuHeader } from './header';

const meta = {
  title: 'Components/Header',
  component: NatuHeader,
  args: {
    children: 'Header',
  },
} satisfies Meta<typeof NatuHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
