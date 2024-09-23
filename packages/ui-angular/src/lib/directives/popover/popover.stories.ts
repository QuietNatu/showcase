import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  componentWrapperDecorator,
} from '@storybook/angular';
import {
  NatuPopoverDirective,
  natuCardPopoverImports,
  natuPopoverImports,
} from './popover.directive';
import { natuButtonImports } from '../button/button.directive';
import { NgTemplateOutlet } from '@angular/common';

const meta = {
  title: 'Components/Popover',
  component: NatuPopoverDirective,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [natuPopoverImports, natuCardPopoverImports, natuButtonImports, NgTemplateOutlet],
    }),
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  render: (args) => {
    const templateArgs = createTemplateArgs();

    return {
      props: args,
      template: `
        <ng-container natuPopover [natuPopoverAttributes]="{ 'aria-labelledby': 'popover-content-id' }" ${templateArgs}>
          <button type="button" natuButton natuPopoverTrigger>
            Show popover
          </button>

          <ng-template natuPopoverContent>
            <button type="button" natuButton id="popover-content-id">Example popover</button>
          </ng-template>
        </ng-container>
      `,
    };
  },
} satisfies Meta<NatuPopoverDirective>;

export default meta;
type Story = StoryObj<NatuPopoverDirective>;

export const Default: Story = {};

export const Nested: Story = {
  render: (args) => {
    const templateArgs = createTemplateArgs();

    return {
      props: args,
      template: `
        <ng-container natuPopover [natuPopoverAttributes]="{ 'aria-labelledby': 'popover-button-id' }" ${templateArgs}>
          <button type="button" natuButton natuPopoverTrigger id="popover-button-id">
            Show popover
          </button>

          <ng-template natuPopoverContent>
            <ng-container natuPopover [natuPopoverAttributes]="{ 'aria-labelledby': 'popover-nested-button-id' }" ${templateArgs}>
              <button type="button" natuButton natuPopoverTrigger id="popover-nested-button-id">Show nested popover</button>

              <ng-template natuPopoverContent>Nested popover text</ng-template>
            </ng-container>
          </ng-template>
        </ng-container>
      `,
    };
  },
};

export const WithCard: Story = {
  render: (args) => {
    const templateArgs = createTemplateArgs();

    return {
      props: args,
      template: `
        <ng-container natuPopover [natuPopoverHasEmbeddedContent]="true" ${templateArgs}>
          <button type="button" natuButton natuPopoverTrigger>
            Show popover
          </button>

          <natu-card *natuPopoverContent natuPopoverCard>
            <natu-card-header natuPopoverCardHeader>Header</natu-card-header>

            <natu-card-body natuPopoverCardBody>Example body</natu-card-body>
          </natu-card>
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
    const templateArgs = createTemplateArgs();

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
          <ng-container
            natuPopover
            [natuPopoverPlacement]="placement"
            [natuPopoverAttributes]="{ 'aria-labelledby': 'popover-button-id' }"
            ${templateArgs}
          >
            <button type="button"
              id="popover-button-id"
              natuButton
              natuPopoverTrigger
              [style.width.px]="100"
              [style.grid-row]="row"
              [style.grid-column]="column"
            >
              {{ placement }}
            </button>

            <ng-template natuPopoverContent>
              <div>{{placement}} popover example</div>

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

function createTemplateArgs() {
  return `[natuPopoverIsDisabled]="isDisabled"
        [natuPopoverDefaultIsOpen]="defaultIsOpen"
        [natuPopoverIsOpen]="isOpen"
        (natuPopoverIsOpenChange)="isOpenChange?.($event)"`;
}
