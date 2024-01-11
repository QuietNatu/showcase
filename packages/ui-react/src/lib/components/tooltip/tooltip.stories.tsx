import type { Meta, StoryObj } from '@storybook/react';
import { NatuTooltip, NatuTooltipProps } from './tooltip';
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

export const Nested: Story = {
  render: (args) => {
    const content = (
      <NatuTooltip {...args} content="Nested tooltip Text">
        <NatuButton type="button">Show nested tooltip</NatuButton>
      </NatuTooltip>
    );

    return (
      <NatuTooltip {...args} content={content}>
        <NatuButton type="button">Show tooltip</NatuButton>
      </NatuTooltip>
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
  parameters: {
    layout: 'centered',
  },
};

interface PlaygroundButtonProps extends NatuTooltipProps {
  row: number;
  column: number;
}

function PlaygroundButton(props: PlaygroundButtonProps) {
  const { row, column, ...tooltipProps } = props;

  return (
    <NatuTooltip {...tooltipProps} content={props.placement + ' tooltip example'}>
      <NatuButton type="button" style={{ gridRow: row, gridColumn: column, width: '100px' }}>
        {props.placement}
      </NatuButton>
    </NatuTooltip>
  );
}
