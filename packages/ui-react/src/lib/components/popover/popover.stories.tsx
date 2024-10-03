import type { Meta, StoryObj } from '@storybook/react';
import { NatuButton } from '../button/button';
import { NatuPopover, NatuPopoverContent, NatuPopoverProps, NatuPopoverTrigger } from './popover';

const meta = {
  title: 'Components/Popover',
  component: NatuPopover,
  parameters: {
    layout: 'centered',
  },
  args: {},
  render: (args) => (
    <NatuPopover {...args}>
      <NatuPopoverTrigger>
        <NatuButton type="button">Show popover</NatuButton>
      </NatuPopoverTrigger>

      <NatuPopoverContent aria-labelledby="popover-content-id">
        <NatuButton type="button" id="popover-content-id">
          Example popover
        </NatuButton>
      </NatuPopoverContent>
    </NatuPopover>
  ),
} satisfies Meta<typeof NatuPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Nested: Story = {
  render: (args) => {
    return (
      <NatuPopover {...args}>
        <NatuPopoverTrigger>
          <NatuButton type="button" id="popover-button-id">
            Show popover
          </NatuButton>
        </NatuPopoverTrigger>

        <NatuPopoverContent aria-labelledby="popover-button-id">
          <NatuPopover {...args}>
            <NatuPopoverTrigger>
              <NatuButton type="button" id="popover-nested-button-id">
                Show nested popover
              </NatuButton>
            </NatuPopoverTrigger>

            <NatuPopoverContent aria-labelledby="popover-nested-button-id">
              Nested popover text
            </NatuPopoverContent>
          </NatuPopover>
        </NatuPopoverContent>
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
  readonly row: number;
  readonly column: number;
}

function PlaygroundButton(props: PlaygroundButtonProps) {
  const { row, column, ...popoverProps } = props;

  return (
    <NatuPopover {...popoverProps}>
      <NatuPopoverTrigger>
        <NatuButton type="button" style={{ gridRow: row, gridColumn: column, width: '100px' }}>
          {props.placement}
        </NatuButton>
      </NatuPopoverTrigger>

      <NatuPopoverContent>
        <div>{props.placement} popover example</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis nec tellus id
          iaculis. In hac habitasse platea dictumst.
        </div>
      </NatuPopoverContent>
    </NatuPopover>
  );
}
