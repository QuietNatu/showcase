import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NatuAccordionDirective, natuAccordionImports } from './accordion.directive';
import { aliasedArgsToTemplate } from '../../test';

const meta = {
  title: 'Components/Accordion',
  component: NatuAccordionDirective,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [natuAccordionImports] })],
  render: (args) => {
    const templateArgs = aliasedArgsToTemplate(args, 'natuAccordion');

    return {
      props: args,
      template: `
        <div [natuAccordion] ${templateArgs}>
          <button type="button" [natuAccordionTrigger]>Accordion Trigger</button>

          <div [natuAccordionContent]>Accordion Content</div>
        </div>
      `,
    };
  },
} satisfies Meta<NatuAccordionDirective>;

export default meta;
type Story = StoryObj<NatuAccordionDirective>;

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
