import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NatuDisclosureDirective, natuDisclosureImports } from './disclosure.directive';
import { aliasedArgsToTemplate } from '../../test';

const meta = {
  title: 'Utils/Disclosure',
  component: NatuDisclosureDirective,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [natuDisclosureImports] })],
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuDisclosure');

    return {
      props: args,
      template: `
        <div [natuDisclosure] ${templateArgs}>
          <button type="button" [natuDisclosureTrigger]>Disclosure Trigger</button>

          <div [natuDisclosureContent]>Disclosure Content</div>
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
