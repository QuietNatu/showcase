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
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  render: (args) => {
    /* TODO: util for this */
    const aliasedArgs = Object.entries(args).map(([key, value]) => [
      `natuTooltip${key[0]?.toUpperCase() + key.slice(1)}`,
      value as unknown,
    ]);
    const templateArgs = argsToTemplate(Object.fromEntries(aliasedArgs));

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
