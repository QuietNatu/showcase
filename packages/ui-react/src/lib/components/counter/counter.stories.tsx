import type { Meta, StoryObj } from '@storybook/react';
import { NatuCounter } from './counter';

const meta = {
  title: 'Components/Counter',
  component: NatuCounter,
} satisfies Meta<typeof NatuCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
