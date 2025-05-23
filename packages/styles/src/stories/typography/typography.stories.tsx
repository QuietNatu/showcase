import type { Meta, StoryObj } from '@storybook/react';

function Component() {
  return <div>Hello</div>;
}

const meta = {
  title: 'Typography',
  component: Component,
  tags: ['!dev'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
