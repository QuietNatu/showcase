import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  componentWrapperDecorator,
} from '@storybook/angular';
import { NatuPopoverDirective } from './popover.directive';
import { natuButtonImports } from '../button/button.directive';
import { NgTemplateOutlet } from '@angular/common';
import { aliasedArgsToTemplate } from '../../test';

/* TODO: is there a space so big between header and body of popover? */

const meta = {
  title: 'Components/Popover',
  component: NatuPopoverDirective,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [moduleMetadata({ imports: [natuButtonImports, NgTemplateOutlet] })],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuPopover');

    return {
      props: args,
      template: `
        <button type="button"
          [natuButton]
          [natuPopover]
          [natuPopoverTitle]="'Title'"
          [natuPopoverContent]="popover"
          ${templateArgs}
        >
          Show popover
        </button>
        <ng-template #popover>Popover text</ng-template>
      `,
    };
  },
} satisfies Meta<NatuPopoverDirective>;

export default meta;
type Story = StoryObj<NatuPopoverDirective>;

export const Default: Story = {};

export const Nested: Story = {
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuPopover');

    return {
      props: args,
      template: `
        <button type="button"
          [natuButton]
          [natuPopover]
          [natuPopoverTitle]="'Title'"
          [natuPopoverContent]="popover"
          ${templateArgs}
        >
          Show popover
        </button>

        <ng-template #popover>
          <button type="button" [natuButton] [natuPopover]="nestedPopover" ${templateArgs}>Show nested popover</button>
        </ng-template>

        <ng-template #nestedPopover>Nested popover text</ng-template>
      `,
    };
  },
};

export const Playground: Story = {
  decorators: [
    componentWrapperDecorator((story) => `<div style="display: grid; gap: 10px">${story}</div>`),
  ],
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuPopover');

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
            [natuPopover]
            [natuPopoverTitle]="placement"
            [natuPopoverContent]="popover"
            [natuPopoverPlacement]="placement"
            ${templateArgs}
            [style.width.px]="100"
            [style.grid-row]="row"
            [style.grid-column]="column"
          >
            {{ placement }}
          </button>
        </ng-template>

        <ng-template #popover>
          <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis nec tellus id iaculis.
              In hac habitasse platea dictumst.
          </div>
        </ng-template>
      `,
    };
  },
};
