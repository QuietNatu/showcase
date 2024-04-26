import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  componentWrapperDecorator,
} from '@storybook/angular';
import { NatuTooltipDirective, natuTooltipImports } from './tooltip.directive';
import { natuButtonImports } from '../button/button.directive';
import { NgTemplateOutlet } from '@angular/common';
import { aliasedArgsToTemplate } from '../../test';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltipDirective,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({ imports: [natuTooltipImports, natuButtonImports, NgTemplateOutlet] }),
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuTooltip');

    return {
      props: args,
      template: `
        <ng-container natuTooltip ${templateArgs}>
          <button type="button" natuButton natuTooltipTrigger>Show tooltip</button>
          <ng-template natuTooltipContent>Tooltip text</ng-template>
        </ng-container>
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
        <ng-container natuTooltip ${templateArgs}>
          <button type="button" natuButton natuTooltipTrigger>Show tooltip</button>

          <ng-template natuTooltipContent>
            <ng-container natuTooltip ${templateArgs}>
              <button type="button" natuButton natuTooltipTrigger ${templateArgs}>Show nested tooltip</button>

              <ng-template natuTooltipContent>Nested tooltip text</ng-template>
            </ng-container>
          </ng-template>
        </ng-container>
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
          <ng-container natuTooltip [natuTooltipPlacement]="placement" ${templateArgs}>
            <button type="button"
              natuButton
              natuTooltipTrigger
              [style.width.px]="100"
              [style.grid-row]="row"
              [style.grid-column]="column"
            >
              {{ placement }}
            </button>

            <ng-template natuTooltipContent>
              <div>{{placement}}</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis nec tellus id iaculis.
                In hac habitasse platea dictumst.
              </div>
            </ng-template>
          </ng-container>
        </ng-template>
      `,
    };
  },
};
