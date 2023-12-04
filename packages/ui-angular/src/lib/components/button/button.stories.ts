import { moduleMetadata, type Meta, type StoryObj, argsToTemplate } from '@storybook/angular';
import { NatuButtonDirective, NatuButtonVariants, natuButtonImports } from './button.directive';

interface StoryArgs extends NatuButtonDirective {
  disabled: boolean;
  variants: Array<NatuButtonVariants['variant']>;
}

const meta = {
  title: 'Components/Button',
  component: NatuButtonDirective,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [natuButtonImports] })],
  args: {
    variants: [
      'primary',
      'destructive',
      'outline',
      'outline-destructive',
      'ghost',
      'ghost-destructive',
      'ghost-muted',
    ],
  },
  render: (args) => {
    const templateVariants = args.variants.map((variant) => {
      const buttonArgs = argsToTemplate(args, { exclude: ['variant', 'variants'] });
      return `<button type="button" [natuButton] [variant]="'${variant}'" ${buttonArgs}>Button</button>`;
    });

    return {
      props: args,
      template: templateVariants.join(''),
    };
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomElement: Story = {
  render: (args) => {
    const templateVariants = args.variants.map((variant) => {
      const buttonArgs = argsToTemplate(args, { exclude: ['variant', 'variants'] });
      return `<span [natuButton] [variant]="'${variant}'" ${buttonArgs}>Button</span>`;
    });

    return {
      props: args,
      template: templateVariants.join(''),
    };
  },
};
