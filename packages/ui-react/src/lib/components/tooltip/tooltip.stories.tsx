import type { Meta, StoryObj } from '@storybook/react';
import { NatuTooltip } from './tooltip';
import { NatuButton } from '../button/button';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltip,
  tags: ['autodocs'],
  args: {
    // TODO: remove?
    content: undefined,
    children: undefined,
  },
  render: (args) => (
    <NatuTooltip {...args} content="Tooltip Text">
      <NatuButton type="button">Show tooltip</NatuButton>
    </NatuTooltip>
  ),
} satisfies Meta<typeof NatuTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// TODO: nested tooltip test
