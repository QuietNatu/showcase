import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  componentWrapperDecorator,
} from '@storybook/angular';
import { NatuTooltipDirective } from './tooltip.directive';
import { natuButtonImports } from '../button/button.directive';
import { aliasedArgsToTemplate } from '../../stories';
import { NgTemplateOutlet } from '@angular/common';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltipDirective,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [moduleMetadata({ imports: [natuButtonImports, NgTemplateOutlet] })],
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

export const Nested: Story = {
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuTooltip');

    return {
      props: args,
      template: `
        <button type="button" [natuButton] [natuTooltip]="tooltip" ${templateArgs}>Show tooltip</button>

        <ng-template #tooltip>
          <button type="button" [natuButton] [natuTooltip]="nestedTooltip" ${templateArgs}>Show nested tooltip</button>
        </ng-template>

        <ng-template #nestedTooltip>Nested tooltip Text</ng-template>
      `,
    };
  },
};

export const Playground: Story = {
  decorators: [
    componentWrapperDecorator((story) => `<div style="display: grid; gap: 10px">${story}</div>`),
  ],
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuTooltip');

    return {
      props: args,
      template: `
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 1, column: 2, placement: 'top-start' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 1, column: 3, placement: 'top' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 1, column: 4, placement: 'top-end' }" />

        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 2, column: 1, placement: 'left-start' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 3, column: 1, placement: 'left' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 4, column: 1, placement: 'left-end' }" />

        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 2, column: 5, placement: 'right-start' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 3, column: 5, placement: 'right' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 4, column: 5, placement: 'right-end' }" />

        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 5, column: 2, placement: 'bottom-start' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 5, column: 3, placement: 'bottom' }" />
        <ng-template [ngTemplateOutlet]="button" [ngTemplateOutletContext]="{ row: 5, column: 4, placement: 'bottom-end' }" />

        <ng-template #button let-row="row" let-column="column" let-placement="placement">
          <button type="button"
            [natuButton]
            [natuTooltip]="tooltip"
            [natuTooltipPlacement]="placement"
            ${templateArgs}
            [style.width.px]="100"
            [style.grid-row]="row"
            [style.grid-column]="column"
          >
            {{ placement }}
          </button>
        </ng-template>

        <ng-template #tooltip let-placement="placement">
          <div>
            <div>{{placement}} tooltip example</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis nec tellus id iaculis.
              In hac habitasse platea dictumst.
            </div>
          </div>
        </ng-template>
      `,
    };
  },
};

// export const Playground: Story = {
//   render: (args) => (
//     <div style={{ display: 'grid', gap: '10px' }}>
//       <PlaygroundButton {...args} row={1} column={2} placement="top-start" />
//       <PlaygroundButton {...args} row={1} column={3} placement="top" />
//       <PlaygroundButton {...args} row={1} column={4} placement="top-end" />

//       <PlaygroundButton {...args} row={2} column={1} placement="left-start" />
//       <PlaygroundButton {...args} row={3} column={1} placement="left" />
//       <PlaygroundButton {...args} row={4} column={1} placement="left-end" />

//       <PlaygroundButton {...args} row={2} column={5} placement="right-start" />
//       <PlaygroundButton {...args} row={3} column={5} placement="right" />
//       <PlaygroundButton {...args} row={4} column={5} placement="right-end" />

//       <PlaygroundButton {...args} row={5} column={2} placement="bottom-start" />
//       <PlaygroundButton {...args} row={5} column={3} placement="bottom" />
//       <PlaygroundButton {...args} row={5} column={4} placement="bottom-end" />
//     </div>
//   ),
// };
