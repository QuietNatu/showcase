import type { Meta, StoryObj } from 'storybook-solidjs';
import { NatuCounter } from './counter';

const meta = {
  title: 'Components/Counter',
  component: NatuCounter,
  tags: ['autodocs'],
} satisfies Meta<typeof NatuCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
