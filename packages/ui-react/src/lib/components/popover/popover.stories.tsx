import type { Meta, StoryObj } from '@storybook/react';
import { NatuButton } from '../button/button';
import { NatuPopover, NatuPopoverProps } from './popover';

const meta = {
  title: 'Components/Popover',
  component: NatuPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    content: undefined,
    children: undefined,
    title: 'Title',
  },
  render: (args) => (
    <NatuPopover {...args} content="Popover text">
      <NatuButton type="button">Show popver</NatuButton>
    </NatuPopover>
  ),
} satisfies Meta<typeof NatuPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Nested: Story = {
  render: (args) => {
    const content = (
      <NatuPopover {...args} content="Nested popover text">
        <NatuButton type="button">Show nested popover</NatuButton>
      </NatuPopover>
    );

    return (
      <NatuPopover {...args} content={content}>
        <NatuButton type="button">Show popover</NatuButton>
      </NatuPopover>
    );
  },
};

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '10px' }}>
      <PlaygroundButton {...args} row={1} column={2} placement="top-start" />
      <PlaygroundButton {...args} row={1} column={3} placement="top" />
      <PlaygroundButton {...args} row={1} column={4} placement="top-end" />

      <PlaygroundButton {...args} row={2} column={1} placement="left-start" />
      <PlaygroundButton {...args} row={3} column={1} placement="left" />
      <PlaygroundButton {...args} row={4} column={1} placement="left-end" />

      <PlaygroundButton {...args} row={2} column={5} placement="right-start" />
      <PlaygroundButton {...args} row={3} column={5} placement="right" />
      <PlaygroundButton {...args} row={4} column={5} placement="right-end" />

      <PlaygroundButton {...args} row={5} column={2} placement="bottom-start" />
      <PlaygroundButton {...args} row={5} column={3} placement="bottom" />
      <PlaygroundButton {...args} row={5} column={4} placement="bottom-end" />
    </div>
  ),
};

interface PlaygroundButtonProps extends NatuPopoverProps {
  row: number;
  column: number;
}

function PlaygroundButton(props: PlaygroundButtonProps) {
  const { row, column, ...popoverProps } = props;

  const popoverContent = (
    <div>
      <div>{props.placement} popover example</div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis nec tellus id iaculis.
        In hac habitasse platea dictumst.
      </div>
    </div>
  );

  return (
    <NatuPopover {...popoverProps} content={popoverContent}>
      <NatuButton type="button" style={{ gridRow: row, gridColumn: column, width: '100px' }}>
        {props.placement}
      </NatuButton>
    </NatuPopover>
  );
}
