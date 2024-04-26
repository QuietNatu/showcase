import type { Meta, StoryObj } from '@storybook/react';
import { NatuButton } from '../button/button';
import {
  NatuCardPopover,
  NatuCardPopoverContent,
  NatuCardPopoverContentBody,
  NatuCardPopoverContentHeader,
  NatuCardPopoverTrigger,
} from './card-popover';

const meta = {
  title: 'Components/CardPopover',
  component: NatuCardPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {},
  render: (args) => (
    <NatuCardPopover {...args}>
      <NatuCardPopoverTrigger>
        <NatuButton type="button">Show popover</NatuButton>
      </NatuCardPopoverTrigger>

      <NatuCardPopoverContent>
        <NatuCardPopoverContentHeader>Header</NatuCardPopoverContentHeader>
        <NatuCardPopoverContentBody>Example body</NatuCardPopoverContentBody>
      </NatuCardPopoverContent>
    </NatuCardPopover>
  ),
} satisfies Meta<typeof NatuCardPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
