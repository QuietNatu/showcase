import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  componentWrapperDecorator,
} from '@storybook/angular';
import { NatuTooltipDirective, natuTooltipImports } from './tooltip.directive';
import { natuButtonImports } from '../button/button.directive';
import { NgTemplateOutlet } from '@angular/common';
import { NatuOverlayDelayGroupDirective } from '../../overlay';
import { storyVariantsDecorator } from '../../stories';

const meta = {
  title: 'Components/Tooltip',
  component: NatuTooltipDirective,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [
        natuTooltipImports,
        natuButtonImports,
        NgTemplateOutlet,
        NatuOverlayDelayGroupDirective,
      ],
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
    const templateArgs = createTemplateArgs();

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

export const DelayGroup: Story = {
  decorators: [storyVariantsDecorator()],
  render: (args) => {
    const templateArgs = createTemplateArgs();

    return {
      props: args,
      template: `
        <ng-container natuOverlayDelayGroup [natuOverlayDelayGroupDelay]="500">
          <ng-container natuTooltip ${templateArgs}>
            <button type="button" natuButton natuTooltipTrigger>Show tooltip 1</button>
            <ng-template natuTooltipContent>Tooltip text 1</ng-template>
          </ng-container>

          <ng-container natuTooltip ${templateArgs}>
            <button type="button" natuButton natuTooltipTrigger>Show tooltip 2</button>
            <ng-template natuTooltipContent>Tooltip text 2</ng-template>
          </ng-container>
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
        <ng-container natuOverlayDelayGroup [natuOverlayDelayGroupDelay]="500" #natuOverlayDelayGroup="natuOverlayDelayGroup">
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 1, column: 2, placement: 'top-start' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 1, column: 3, placement: 'top' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 1, column: 4, placement: 'top-end' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />


          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 2, column: 1, placement: 'left-start' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 3, column: 1, placement: 'left' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 4, column: 1, placement: 'left-end' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />


          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 2, column: 5, placement: 'right-start' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 3, column: 5, placement: 'right' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 4, column: 5, placement: 'right-end' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />

          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 5, column: 2, placement: 'bottom-start' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 5, column: 3, placement: 'bottom' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
          <ng-template
            [ngTemplateOutlet]="button"
            [ngTemplateOutletContext]="{ row: 5, column: 4, placement: 'bottom-end' }"
            [ngTemplateOutletInjector]="natuOverlayDelayGroup.injector"
          />
        </ng-container>

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

function createTemplateArgs() {
  return `[natuTooltipDefaultIsOpen]="defaultIsOpen"
        [natuTooltipIsOpen]="isOpen"
        [natuTooltipIsDisabled]="isDisabled"
        (natuTooltipIsOpenChange)="isOpenChange?.($event)"`;
}
