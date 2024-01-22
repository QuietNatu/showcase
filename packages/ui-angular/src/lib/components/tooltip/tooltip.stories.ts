import { type Meta, type StoryObj, moduleMetadata, argsToTemplate } from '@storybook/angular';
import { NatuTooltipDirective } from './tooltip.directive';
import { natuButtonImports } from '../button/button.directive';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltipDirective,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [moduleMetadata({ imports: [natuButtonImports] })],
  render: (args) => {
    const templateArgs = argsToTemplate(args);

    return {
      props: args,
      template: `<button type="button" [natuButton] [natuTooltip] ${templateArgs}>Show tooltip</button>`,
    };
  },
} satisfies Meta<NatuTooltipDirective>;

export default meta;
type Story = StoryObj<NatuTooltipDirective>;

export const Default: Story = {};
