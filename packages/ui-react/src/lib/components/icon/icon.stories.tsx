import type { Meta, StoryObj } from '@storybook/react';
import { NatuIcon } from './icon';
import RocketIcon from '@natu/assets/svg/rocket.svg?react';

const meta = {
  title: 'Components/Icon',
  component: NatuIcon,
  render: (args) => (
    <NatuIcon {...args} style={{ fontSize: '20px' }}>
      <RocketIcon />
    </NatuIcon>
  ),
} satisfies Meta<typeof NatuIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
