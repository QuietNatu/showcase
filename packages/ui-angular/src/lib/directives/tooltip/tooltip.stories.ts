import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { NatuTooltipDirective } from './tooltip.directive';
import { natuButtonImports } from '../button/button.directive';
import { aliasedArgsToTemplate } from '../../stories';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltipDirective,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [moduleMetadata({ imports: [natuButtonImports] })],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuTooltip');

    return {
      props: args,
      template: `
        <button type="button" [natuButton] [natuTooltip]="tooltip" ${templateArgs}>Show tooltip</button>
        <ng-template #tooltip>Tooltip text</ng-template>
      `,
    };
  },
} satisfies Meta<NatuTooltipDirective>;

export default meta;
type Story = StoryObj<NatuTooltipDirective>;

export const Default: Story = {};
