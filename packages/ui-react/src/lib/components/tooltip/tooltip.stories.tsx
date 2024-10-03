import type { Meta, StoryObj } from '@storybook/react';
import { NatuTooltip, NatuTooltipContent, NatuTooltipProps, NatuTooltipTrigger } from './tooltip';
import { NatuButton } from '../button/button';
import { NatuOverlayDelayGroup } from '../overlay/overlay-delay-group';
import { storyVariantsDecorator } from '../../stories';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltip,
  parameters: {
    layout: 'centered',
  },
  args: {},
  render: (args) => (
    <NatuTooltip {...args}>
      <NatuTooltipTrigger>
        <NatuButton type="button">Show tooltip</NatuButton>
      </NatuTooltipTrigger>

      <NatuTooltipContent>Tooltip text</NatuTooltipContent>
    </NatuTooltip>
  ),
} satisfies Meta<typeof NatuTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Nested: Story = {
  render: (args) => {
    return (
      <NatuTooltip {...args}>
        <NatuTooltipTrigger>
          <NatuButton type="button">Show tooltip</NatuButton>
        </NatuTooltipTrigger>

        <NatuTooltipContent>
          <NatuTooltip {...args}>
            <NatuTooltipTrigger>
              <NatuButton type="button">Show nested tooltip</NatuButton>
            </NatuTooltipTrigger>

            <NatuTooltipContent>Nested tooltip text</NatuTooltipContent>
          </NatuTooltip>
        </NatuTooltipContent>
      </NatuTooltip>
    );
  },
};

export const DelayGroup: Story = {
  decorators: [storyVariantsDecorator()],
  render: (args) => {
    return (
      <NatuOverlayDelayGroup delay={500}>
        <NatuTooltip {...args}>
          <NatuTooltipTrigger>
            <NatuButton type="button">Show tooltip 1</NatuButton>
          </NatuTooltipTrigger>

          <NatuTooltipContent>Tooltip text 1</NatuTooltipContent>
        </NatuTooltip>

        <NatuTooltip {...args}>
          <NatuTooltipTrigger>
            <NatuButton type="button">Show tooltip 2</NatuButton>
          </NatuTooltipTrigger>

          <NatuTooltipContent>Tooltip text 2</NatuTooltipContent>
        </NatuTooltip>
      </NatuOverlayDelayGroup>
    );
  },
};

export const Playground: Story = {
  render: (args) => (
    <NatuOverlayDelayGroup delay={500}>
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
    </NatuOverlayDelayGroup>
  ),
};

interface PlaygroundButtonProps extends NatuTooltipProps {
  row: number;
  column: number;
}

function PlaygroundButton(props: PlaygroundButtonProps) {
  const { row, column, ...tooltipProps } = props;

  return (
    <NatuTooltip {...tooltipProps}>
      <NatuTooltipTrigger>
        <NatuButton type="button" style={{ gridRow: row, gridColumn: column, width: '100px' }}>
          {props.placement}
        </NatuButton>
      </NatuTooltipTrigger>

      <NatuTooltipContent>
        <div>{props.placement}</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis nec tellus id
          iaculis. In hac habitasse platea dictumst.
        </div>
      </NatuTooltipContent>
    </NatuTooltip>
  );
}
