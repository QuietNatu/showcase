import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NatuDisclosureDirective, natuDisclosureImports } from './disclosure.directive';

const meta = {
  title: 'Utils/Disclosure',
  component: NatuDisclosureDirective,
  decorators: [moduleMetadata({ imports: [natuDisclosureImports] })],
  render: (args) => {
    return {
      props: args,
      template: `
        <div
          natuDisclosure
          [natuDisclosureDefaultIsExpanded]="defaultIsExpanded"
          [natuDisclosureIsExpanded]="isExpanded"
          [natuDisclosureIsDisabled]="isDisabled"
          (natuDisclosureIsExpandedChange)="isExpandedChange?.($event)"
        >
          <button type="button" natuDisclosureTrigger>Disclosure Trigger</button>

          <div natuDisclosureContent>Disclosure Content</div>
        </div>
      `,
    };
  },
} satisfies Meta<NatuDisclosureDirective>;

export default meta;
type Story = StoryObj<NatuDisclosureDirective>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    defaultIsExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
